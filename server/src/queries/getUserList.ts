import * as graphql from 'graphql'
import commonType from '../types/common'
import { User } from '../models/User'
import config from '../config/index'
import { Sequelize } from 'sequelize-typescript'
const Op = Sequelize.Op

var getUserList = {
  type: commonType,
  args: {
    token: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any,) => {
    let filter_id = config.jwtVerify(args.token).id
    try {
      let users = await User.findAll({
        where: {
          [Op.not]: [
            { id: filter_id }
          ]
        },
        order: [
          ['createdAt']
        ]
      })
      let _list = JSON.stringify(users)
      return {code: 0, data: _list}
    } catch (e) {
      console.log('error', e)
      return {code: 1}
    }
  }
}

export default getUserList
