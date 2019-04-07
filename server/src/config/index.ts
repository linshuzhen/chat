import * as path from 'path'
import * as jwt from 'jsonwebtoken'

const secretKey: string = 'rzp'
const jwtVerify = (token: string, key: string = secretKey): any => {
  return jwt.verify(token, key)
}

const config: any = {
  host: 'localhost',
  // 打印路径
  log_dir: path.join(__dirname, '../../logs'),
  // redis 配置，默认是本地
  redis_host: '39.108.213.139',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',

  // session_secret: 'kuai-card-secret', // 务必修改
  // auth_cookie_name: 'kuai-card',

  // 程序运行的端口
  port: 3000,

  file_limit: '10MB',
  secretKey: secretKey,
  jwtVerify: jwtVerify
}

export default config
