import * as graphql from 'graphql'
import commonType from '../types/common'
import { User } from '../models/User'
import md5 from '../utils/md5'

// import * as jwt from 'jsonwebtoken'
var addUser = {
  type: commonType,
  args: {
    name: {
      type: graphql.GraphQLString
    },
    password: {
      type: graphql.GraphQLString
    },
    tel: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any) => {
    let name: string = args.name
    let password: string = md5(args.password)
    let tel: string = args.tel
    const existUser: any = await User.findOne({
      where: {
        tel: tel
      },
      raw: true
    })
    if(existUser){
      return {code: -1001, message: '用户已存在'}
    }
    let user = await User.create({
      name: name,
      tel: tel,
      password: password,
      avatar: 'https://app.papaquan.com/static/index/image/initialimg.png'
    })
    if(user){
      return {code: 0, message: '创建成功'}
    }else{
      return {code: -1, message: '创建失败'}
    }
  }
}
export default addUser