import * as crypto from 'crypto'

const md5: any = function (str: string) {
  var md5sum = crypto.createHash('md5')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}

export default md5
