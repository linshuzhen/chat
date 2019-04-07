import * as request from "request"

const requestPromise = (config: any) => {
  return new Promise((resolve: any, reject: any) => {
    request(config, (err: string, res: any, body: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

export default requestPromise
