import * as graphql from 'graphql'
import commonType from '../types/common'
import { User } from '../models/User'
import md5 from '../utils/md5'
import config from '../config/index'
import * as jwt from 'jsonwebtoken'

// import * as jwt from 'jsonwebtoken'
let accountLife = 60 * 60 * 24 * 7 * 1000
var getUser = {
  type: commonType,
  args: {
    tel: {
      type: graphql.GraphQLString
    },
    password: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any) => {
    let tel: string = args.tel
    let password: string = md5(args.password)
    const existUser: any = await User.findOne({
      where: {
        tel: tel,
        password: password
      },
      raw: true
    })
    if (existUser) {
      const userToken = {
        id: existUser.id,
        tel: existUser.tel,
        time: new Date().getTime() + accountLife,
        life: accountLife
      }
      const token = jwt.sign(userToken, config.secretKey, { expiresIn: '7d' })
      return { code: 0, message: token, data: JSON.stringify({ token: token }) }
    } else {
      return { code: -1, message: '登录失败' }
    }
  }
}
export default getUser