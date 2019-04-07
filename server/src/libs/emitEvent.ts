import md5 from '../utils/md5'
import { client } from './redis'
import { rsetWithExpire, rget, hset, hget } from '../utils/redisPromise'
import logger from './logger'

/*
* params: io
* params: event Object: event 相关的信息
* params: interval Int: 执行事件的时间间隔
* params: timeout Int: 失败多久之后放弃
*/

let emitEvent: any = async (io: any, event: any, interval: number = 2000, timeout: number = 5 * 60 * 1000) => {
  try {
    let socketId = event.socketId
    let sign = md5(new Date().getTime() + event.name)
    logger.info('准备发送消息：', JSON.stringify(event))
    try { 
      io.sockets.connected[socketId].emit(event.name, Object.assign({sign}, event.body), (ack: any) => {
        logger.info('收到反馈，发送成功', event.name)
        clearInterval(intervalId)
        clearTimeout(timeoutId)
      })
      // 未收到反馈, 启动定时器
      let intervalId = setInterval(async () => {
        try {
          logger.info('没收到反馈，启动计时器发送', event.name)
          io.sockets.connected[socketId].emit(event.name, Object.assign({sign}, event.body), async (ack: any) => {
            try {
              logger.info('ack', ack)
              let isReceived = await rget('eventsign:' + ack.sign)
              if (isReceived) {
                return
              } else {
                await rsetWithExpire('eventsign:' + ack.sign, event.name, 60 * 60 * 24 * 1)
                logger.info('发送成功，取消计时器', event.name)
                clearInterval(intervalId)
                clearTimeout(timeoutId)
              }
            } catch (e) {
              logger.error(event.name, e)
            }
          })
        } catch (e) {
          logger.error('socket 已经断开，取消发送', event.name, e)
          clearInterval(intervalId)
          clearTimeout(timeoutId)
        }
      }, interval)
      // 重发5分钟失败则取消定时器
      let timeoutId = setTimeout(() => {
        clearInterval(intervalId)
      }, timeout)
    } catch (e) {
      logger.info('发送失败，访客已经下线/掉线, 离线消息数加一')
      // 如果发送消息失败则他们间的未读消息加一
      if (event.name === 'receiveMessage') {
        const oldOfflineMessageNumberStr: any = await hget('offlineMessage:userId:' + event.body.msg_to, event.body.msg_from)
        const oldOfflineMessageNumber: number = parseInt(oldOfflineMessageNumberStr)
        const newOfflineMessageNumber: number = oldOfflineMessageNumber ? oldOfflineMessageNumber + 1 : 1
        await hset('offlineMessage:userId:' + event.body.msg_to, event.body.msg_from, newOfflineMessageNumber.toString())
      }
    }
  } catch (e) {
    logger.error(event.name, e)
  }
}

export default emitEvent
