import emitEvent from '../libs/emitEvent'
// import { Event } from '../models/Event'
// import { Card } from '../models/Card'
import { rget, rsetWithExpire, lpush } from '../utils/redisPromise'
import logger from '../libs/logger'
import { Sequelize } from 'sequelize-typescript'

const Op = Sequelize.Op

const startConsult = (socket: any, io: any) => {
  return async (body: any, fn: any) => {
    let isReceived = await rget('eventsign:' + body.sign)
    if (isReceived) {
      return
    } else {
      await rsetWithExpire('eventSign:' + body.sign, 'startConsult', 60 * 60 * 24 * 1)
    }
    // 判断参数是否正确
    // if (body.operate_user_id && body.target_user_id) {
    //   // 生成进入咨询事件
    //   await Event.create({
    //     name: '进入咨询',
    //     operate_user_id: body.operate_user_id,
    //     target_user_id: body.target_user_id
    //   })
    //   // 查询进30分钟是否进入过咨询, 没有则开始发送自动回复
    //   let latestEvents: Array<any> = await Event.findAll({
    //     where: {
    //       name: '进入咨询',
    //       operate_user_id: body.operate_user_id,
    //       target_user_id: body.target_user_id,
    //       createdAt: {
    //         [Op.gte]: new Date(Date.now() - 1000 * 60 * 30)
    //       }
    //     }
    //   })
    //   if (!latestEvents || !latestEvents.length) {
    //     let card: any = await Card.findOne({
    //       where: {
    //         user_id: body.target_user_id
    //       },
    //       raw: true
    //     })
    //     // 判断咨询的人是否有名片并且有自动回复, 有则发送自动回复
    //     if (card && card.auto_reply) {
    //       const message: any = {
    //         'msg_from': body.target_user_id,
    //         'msg_to': body.operate_user_id,
    //         'msg_type': 'text',
    //         'msg_content': card.auto_reply,
    //         'msg_time': new Date().toString()
    //       }
    //       // 将消息放入消息队列
    //       await lpush('mq:message', JSON.stringify(message))
    //       emitEvent(io, {socketId: socket.id, name: 'receiveMessage', body: message})
    //     }
    //   }
    // } else {
    //   logger.error('startConsult params error')
    // }
    fn({sign: body.sign || false})
  }
}

export default startConsult
