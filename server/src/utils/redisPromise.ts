import { client } from '../libs/redis'

const exists = (key: string) => {
  return new Promise((resolve: any, reject: any) => {
    client.exists(key, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const lpush = (listName: string, value: any) => {
  return new Promise((resolve: any, reject: any) => {
    client.lpush(listName, value, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const llen = (listName: string) => {
  return new Promise((resolve: any, reject: any) => {
    client.llen(listName, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const hget = (htable: string, key: string) => {
  return new Promise((resolve: any, reject: any) => {
    client.hget(htable, key, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const hgetall = (htable: string) => {
  return new Promise((resolve: any, reject: any,) => {
    client.hgetall(htable, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const hlen = (htable: string) => {
  return new Promise((resolve: any, reject: any) => {
    client.hlen(htable, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const rget = (key: string) => {
  return new Promise(function (resolve: any, reject: any) {
    client.get(key, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const rsetWithExpire = (key: string, value: string, expire: number) => {
  return new Promise(function (resolve: any, reject: any) {
    client.set(key, value, 'EX', expire, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const rset = (key: string, value: string) => {
  return new Promise(function (resolve: any, reject: any) {
    client.set(key, value, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const hset = (htable: string, key: string, value: string) => {
  return new Promise(function (resolve: any, reject: any) {
    client.hset(htable, key, value, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const hmset = (htable: string, obj: any) => {
  return new Promise(function (resolve: any, reject: any) {
    client.hmset(htable, obj, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const lrange = (command: string, start: string, end: string) => {
  return new Promise(function (resolve: any, reject: any) {
    client.lrange(command, start, end, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const keys = () => {
  return new Promise((resolve: any, reject: any) => {
    client.keys('*', (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

const rpop = (listName: string) => {
  return new Promise((resolve: any, reject: any) => {
    client.rpop(listName, (err: any, data: any) => {
      if (!err) {
        try {
          resolve(data)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(err)
      }
    })
  })
}

export { hget, llen, hlen, lrange, hset, hmset, exists, hgetall, keys, lpush, rset, rget, rsetWithExpire, rpop }
