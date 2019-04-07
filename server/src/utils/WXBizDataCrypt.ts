import * as crypto from 'crypto'

const WXBizDataCrypt: any = function (appId: string, sessionKey: string) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData: any, iv: any) {
  // base64 decode
  const sessionKey: any = new Buffer(this.sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')

  try {
     // 解密
    var decipher: any = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded: any = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    
    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

export default WXBizDataCrypt