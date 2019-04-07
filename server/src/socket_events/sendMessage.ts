import emitEvent from '../libs/emitEvent'
import { hset, rsetWithExpire, rget, lpush, hget } from '../utils/redisPromise'
import PORT from '../libs/port'
import logger from '../libs/logger'
import config from '../config/index'

const sendMessage = (socket: any, io: any) => {
  return async (body: any, fn: any) => {
    let isReceived = await rget('eventsign:' + body.sign)
    if (isReceived) {
      return
    } else {
      await rsetWithExpire('eventSign:' + body.sign, 'sendMessage', 60 * 60 * 24 * 1)
    }
    // 判断参数是否正确
    if (body.msg_from && body.msg_to && body.msg_type && body.msg_content) {
      // 将from  token 转化成 id
      body.msg_from = config.jwtVerify(body.msg_from).id;
      const message: any = {
        'msg_from': body.msg_from,
        'msg_to': body.msg_to,
        'msg_type': body.msg_type,
        'msg_content': body.msg_content,
        'msg_time': new Date().toString()
      }
      // 将消息放入消息队列
      await lpush('mq:message', JSON.stringify(message))
      // 获取消息接收方的socketid
      let msgToSocketId: any = await rget('userSocket:userId:' + body.msg_to)
      if (msgToSocketId) {
        emitEvent(io, {socketId: msgToSocketId, name: 'receiveMessage', body: message})
      } else {
        // 如果访客不在连接池中则他们间的未读消息加一
        const oldOfflineMessageNumberStr: any = await hget('offlineMessage:userId:' + body.msg_to, body.msg_from.toString())
        const oldOfflineMessageNumber: number = parseInt(oldOfflineMessageNumberStr)
        const newOfflineMessageNumber: number = oldOfflineMessageNumber ? oldOfflineMessageNumber + 1 : 1
        await hset('offlineMessage:userId:' + body.msg_to, body.msg_from.toString(), newOfflineMessageNumber.toString())
      }
      logger.info('用户' + body.msg_from + '发送消息成功')
    } else {
      logger.error('message params error')
    }
    fn({sign: body.sign || false})
  }
}

export default sendMessage
