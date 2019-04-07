<template>
  <div class="sendMessage">
    <ul class="list">
      <li v-for="(item, index) in list" :key="index">
        <p class="title">{{item.name}}</p>
        <el-button type="primary" @click="$router.push({name:'Detail',query:{id: item.id}})">聊天</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import getUserList from "@/api/queries/getUserList";
export default {
  name: "sendMessage",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.socketInit();
    this.getList();
  },
  methods: {
    socketInit() {
      let body = {
        token: getToken()
      };
      this.$emitEvent(this.$socket, {
        name: "setSocketInfo",
        body: body
      });
      this.$socket.on("receiveOfflineMessageNumber", (body, fn) => {
        fn({ sign: body.sign || false });
      });
    },
    async getList () {
      try {
        let res = await getUserList({token: getToken()});
        let resData = res.data.data.getUserList;
        if (resData.code === 0) {
          this.list = JSON.parse(resData.data);
          console.log(this.list);
        }else{
          this.$message.error(resData.message);
        }
      } catch (e) {
        this.$message.error("请求错误");
      }
    }
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    receiveOfflineMessageNumber(body, fn) {
      console.log(body)
      console.log(fn)
      // fn({ sign: body.sign || false });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sendMessage {
  .list {
    padding: 20px;
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border: 2px solid transparent;
      border-bottom: #000;
    }
  }
}
</style>

