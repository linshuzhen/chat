import emitEvent from '../libs/emitEvent'
import { rset, rsetWithExpire, rget, hmset, hgetall } from '../utils/redisPromise'
import PORT from '../libs/port'
import logger from '../libs/logger'
import config from '../config/index'

const setSocketInfo = (socket: any, io: any) => {
  return async (body: any, fn: any) => {
    let isReceived = await rget('eventsign:' + body.sign)
    if (isReceived) {
      return
    } else {
      await rsetWithExpire('eventSign:' + body.sign, 'setSocketInfo', 60 * 60 * 24 * 1)
    }
    // 判断参数是否正确
    if (body.token) {
      // 将token转化成user_id
      body.user_id = config.jwtVerify(body.token).id;
      // 将socket对应信息放入连接池
      await hmset('socketInfo:' + socket.id, {
        'userId': body.user_id,
        'time': new Date().toString()
      })
      // 添加映射
      await rset('userSocket:userId:' + body.user_id, socket.id)
      // 获取离线消息记录
      const offlineMessage: any = await hgetall('offlineMessage:userId:' + body.user_id.toString())
      // 计算所有离线消息数
      let offlineMessageNumber: number = 0
      for (let item in offlineMessage) {
        if (offlineMessage[item] && parseInt(offlineMessage[item]) && typeof parseInt(offlineMessage[item]) === 'number') {
          offlineMessageNumber += parseInt(offlineMessage[item])
        }
      }
      // 进入连接时返回未读消息总数
      emitEvent(io, {socketId: socket.id, name: 'receiveOfflineMessageNumber', body: {offlineMessageNumber: offlineMessageNumber}})
      logger.info('用户' + body.user_id + 'setSocketInfo成功')
    } else {
      logger.error('token is null')
    }
    fn({sign: body.sign || false})
  }
}

export default setSocketInfo
