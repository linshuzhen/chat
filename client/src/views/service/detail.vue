<template>
  <div class="sendMessage">
    <ul class="list">
      <li :class="item.msg_to === to_user_id?'me':'he'" v-for="(item, index) in list" :key="index">
        <template v-if="item.msg_to === to_user_id">
          <p>{{item.msg_content}}</p>
          <p>: 我</p>
        </template>
        <template v-else>
          <p>{{to_user_id}}: </p>
          <p>{{item.msg_content}}</p>
        </template>
      </li>
      <li class="me">

      </li>
    </ul>
    <el-input v-model="content" @keyup.13="sendMessage"></el-input>
    <el-button @click="sendMessage">发送1</el-button>
  </div>
</template>

<script>
import getHistory from '@/api/queries/getHistory'
import { getToken } from '@/utils/auth'
export default {
  name: 'sendMessage',
  data () {
    return {
      content: '',
      list: [],
      to_user_id: parseInt(this.$route.query.id)
    }
  },
  mounted () {
    this.getHistory()
    console.log(this.$socket)
    this.$socket.onevent('receiveMessage', (body, fn) => {
      console.log(123)
      this.list.push(body)
      fn({ sign: body.sign || false })
    })
  },
  methods: {
    sendMessage () {
      let body = {
        msg_from: getToken(),
        msg_to: this.to_user_id,
        msg_type: 'text',
        msg_content: this.content
      }
      this.$emitEvent(
        this.$socket,
        {
          name: 'sendMessage',
          body: body
        },
        () => {
          this.list.push(body)
          console.log('发送成功')
        },
        () => {
          console.log('发送失败')
        }
      )
    },
    async getHistory () {
      try {
        let res = await getHistory({
          token: getToken(),
          target_id: parseInt(this.to_user_id)
        })
        let resData = res.data.data.getHistory
        if (resData.code === 0) {
          this.list = JSON.parse(resData.data)
        } else {
          this.$message.error(resData.message)
        }
      } catch (e) {
        this.$message.error('请求错误')
      }
    }
  }
  // sockets: {
  //   receiveMessage(body, fn){
  //     console.log(body)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sendMessage {
  .list {
    padding: 20px;
    li {
      display: flex;
      &.me {
        justify-content: flex-end;
      }
    }
  }
}
</style>
