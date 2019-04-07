import * as express from 'express'
import * as multer from 'multer'
// 注册
import user from './controllers/user'

const webRouter: any = express.Router()

// user
webRouter.post('/user/addUser', user.addUser)
// image
// 配置 multer 模块
// dest 表示文件上传之后保存的路径
// const limits: any = { fileSize: 5 * 1024 * 1024 }
// const introductionUpload: any = multer({
//   dest: 'images/introduction',
//   limits
// })

// webRouter.post('/upload/introduction/add', introductionUpload.single('introduction'), image.addIntroduction)
// webRouter.post('/upload/introduction/update', introductionUpload.single('introduction'), image.updateIntroduction)
// webRouter.post('/upload/introduction/del', image.delIntroduction)
// webRouter.get('/images/introduction/:fileName', image.get)

export default webRouter
