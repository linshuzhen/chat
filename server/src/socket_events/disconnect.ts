import { client } from '../libs/redis'
import { hget } from '../utils/redisPromise'
import PORT from '../libs/port'
import logger from '../libs/logger'

const disconnect = (socket: any, io: any) => {
  return async () => {
    // 获取断开socket的对应user_id
    const userIdStr: any = await hget('socketInfo:' + socket.id, 'userId')
    const userId: any = parseInt(userIdStr)
    if (userId) {
      logger.info('用户' + userId + '断开连接')
      // 将该socket从连接池中删除
      client.del('socketInfo:' + socket.id)
      // 将该socket从映射删除
      client.del('userSocket:userId:' + userId)
    }
  }
}

export default disconnect
