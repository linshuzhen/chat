import * as redis from 'redis'
// import Redlock from 'redlock'
import PORT from './port'

let redisClient: any = redis.createClient

//建立redis pub、sub连接
let pub: any = redisClient({
  port: 6379,
  host: '39.108.213.139'
})

let sub: any = redisClient({
  port: 6379,
  host: '39.108.213.139'
})

//建立redis pub、sub连接
let client: any = redisClient({
  port: 6379,
  host: '39.108.213.139'
})

// const redlock = new Redlock(
// 	// you should have one client for each independent redis node
// 	// or cluster
// 	[client],
// 	{
// 		// the expected clock drift; for more details
// 		// see http://redis.io/topics/distlock
// 		driftFactor: 0.01, // time in ms

// 		// the max number of times Redlock will attempt
// 		// to lock a resource before erroring
// 		retryCount:  10,

// 		// the time in ms between attempts
// 		retryDelay:  200, // time in ms

// 		// the max time in ms randomly added to retries
// 		// to improve performance under high contention
// 		// see https://www.awsarchitectureblog.com/2015/03/backoff.html
// 		retryJitter:  200 // time in ms
// 	}
// )

sub.subscribe(3000) // 每个进程订阅以端口为标识的频道

client.on('error', (err: any) => {
  console.error('Error ' + err)
})

pub.on('error', (err: any) => {
  console.error('Error ' + err)
})

sub.on('error', (err: any) => {
  console.error('Error ' + err)
})

// redlock.on('clientError', (err) => {
// 	console.error('A redis error has occurred:', err)
// })

export { client, pub, sub }
