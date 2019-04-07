import * as express from 'express'
import * as socketIO from 'socket.io'
import * as path from 'path'
// Node.js 压缩中间件
import * as compress from 'compression'
import * as bodyParser from 'body-parser'
import * as graphqlHTTP from 'express-graphql'

import './sequelize'
import schema from './schema'

// 引入配置文件
import config from './config/index'
import logger from './libs/logger'
// 请求打印控制器
// import requestLog from './middlewares/request_log'
// import validate from './middlewares/validate'
// 路由
import webRouter from './web_router'
// import { getAccessTokenAPI } from './libs/weChat'
import { setSocketInfo, sendMessage, disconnect, startConsult } from './socket_events/index'
const app: any = express()

// 打印请求的时间, 路径, 来源IP, 并在请求结束时打印响应状态, 耗时
// app.use(requestLog)
// 判断请求是否带有openId, 并在req中加入对应userId
// app.use(validate)
// 控制请求的body的最大值
app.use(bodyParser.json({limit: '10mb'}))
// 使用qs库解析url
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
// 压缩
app.use(compress())

// routes
app.use('/', webRouter)

app.use(function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-HTTP-Method-Override, talk, X-Token, smail, Content-Type, Content-Length, X-Requested-With, Accept,Access-Control-Request-Method, Access-Control-Request-Headers, Authorization')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})
// error handler
// 如果是生产环境则返回服务器错误状态500
app.use(function (err: any, req: any, res: any, next: any) {
	logger.error(err)
	return res.status(500).send('500 status')
})
const getClientIp = (req: any) => {
  var ipAddress
  var headers = req.headers
  var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for']
  forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null
  if (!ipAddress) {
	  ipAddress = req.connection.remoteAddress
  }
  return ipAddress.replace('::ffff:', '')
}
const validateJwt = (req: any, res: any, next: any) => {
  let validate = (token: any) => {
    try {
      let validatedData = config.jwtVerify(token)
      req.userInfo = validatedData
      next()
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        logger.error('中间件验证,token过期')
        res.json({code: 401, message: 'token过期'})
      } else {
        res.json({code: 403, message: '验证错误'})
      }
    }
  }
  // 这里不判断talk
  if ('talk' in req.headers) {
    next()
  } else {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      let token = req.headers.authorization.split(' ')[1]
      // logger.debug('req header token', token)
      validate(token)
    } else if (req.query && req.query.token) {
      let token = req.query.token
      validate(token)
    } else if (req.body && req.body.token) {
      let token = req.body.token
      validate(token)
    } else {
      logger.info('请求ip', getClientIp(req))
      logger.info('请求需要带上token')
      res.json({code: 1, message: '请求需要带上token'})
    }
  }
}
// app.use(validateJwt)
app.use('/graphql', (req: any, res: any) => {
  return graphqlHTTP({
    schema,
    graphiql: true,
    context: { req, res }
  })(req, res)
})

const server = app.listen(config.port, function () {
	logger.info('chat listening on port', config.port)
})

let io: socketIO.Server = socketIO(server, {
  pingInterval: 8000,
  pingTimeout: 6000
})

io.on('connection', async (socket) => {
  // socket.on('test', (name) => {
  //   console.log(name);
  //   socket.emit('login', {
  //     nickname: name,
  //     id: socket.id,
  //    });
  // });
  socket.on('setSocketInfo', setSocketInfo(socket, io))
  socket.on('sendMessage', sendMessage(socket, io))
  socket.on('disconnect', disconnect(socket, io))
  socket.on('startConsult', startConsult(socket, io))
})

export { server, io }
