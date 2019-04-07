import '../sequelize'
import { Message } from '../models/Message'
import { rpop } from '../utils/redisPromise'

const popMq = async () => {
	while (1) {
		const msgStr: any = await rpop('mq:message')
		if (msgStr) {
			const msg: any = JSON.parse(msgStr)
			if (msg instanceof Object && msg.msg_from &&  msg.msg_to &&  msg.msg_type &&  msg.msg_content &&  msg.msg_time) {
				await Message.create({
					msg_from: msg.msg_from,
					msg_to: msg.msg_to,
					msg_type: msg.msg_type,
					msg_content: msg.msg_content,
					msg_time: msg.msg_time
				})
			}
		}
	}
}

popMq()
