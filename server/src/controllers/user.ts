import * as express from 'express'
import * as jwt from 'jsonwebtoken'
// import { User } from '../models/User'
// import { Card } from '../models/Card'
// import { UserTag } from '../models/UserTag'
// import { Customer } from '../models/Customer'
// import { Event } from '../models/Event'
import logger from '../libs/logger'
// import config from '../config/index'
import { Sequelize } from 'sequelize-typescript'

const Op = Sequelize.Op
const user: any = express.Router()

user.addUser = async (req: any, res: any) => {
  try {
  } catch (e) {
    logger.error('addUser error', e)
    return res.json({code: 1, message: 'addUser error'})
  }
}


export default user
