const md5 = require('md5');

const emitEvent = (socket, event, successCb = null, failCb = null, interval = 2000, timeout = 6000) => {
  let hashMap = JSON.parse(sessionStorage.getItem('hashMap'));
  let sign = md5(new Date().getTime() + event.name)
  if (event.name === 'sendMessage') {
    // 发送的聊天信息需要有个id，作为访客端的排序依据
    let sortId = new Date().getTime()
    Object.assign(event.body, {sortId})
  }
  let intervalId = setInterval(() => {
    socket.emit(event.name, Object.assign({sign}, event.body), (ack) => {
      if (ack.sign in hashMap) {
        return
      } else {
        successCb === null ? null : successCb()
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        hashMap[ack.sign] = true
        sessionStorage.setItem('hashMap',JSON.stringify(hashMap))
      }
    })
  }, interval)
  let timeoutId = setTimeout(() => {
    clearInterval(intervalId)
    failCb === null ? null : failCb()
  }, timeout)
  socket.emit(event.name, Object.assign({sign}, event.body), (ack) => {
    if (ack.sign in hashMap) {
      return
    } else {
      successCb === null ? null : successCb()
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      hashMap[ack.sign] = true;
      sessionStorage.setItem('hashMap',JSON.stringify(hashMap))
    }
  })
}

export default emitEvent
