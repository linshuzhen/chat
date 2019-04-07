import * as graphql from 'graphql'
import commonType from '../types/common'
import { Message } from '../models/Message'
import config from '../config/index'
import { Sequelize } from 'sequelize-typescript'
const Op = Sequelize.Op

var getUserList = {
  type: commonType,
  args: {
    token: {
      type: graphql.GraphQLString
    },
    target_id: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any,) => {
    let user_id = config.jwtVerify(args.token).id
    try {
      const chatHistory = await Message.findAll({
        where: {
          [Op.or]: [{msg_from: user_id, msg_to: args.target_id}, {msg_to: user_id, msg_from: args.target_id}]
        },
        raw: true,
        order: [['msg_time']],
      })
      let _list = JSON.stringify(chatHistory);
      return {code: 0, data: _list}
    } catch (e) {
      console.log('error', e)
      return {code: 1}
    }
  }
}

export default getUserList
