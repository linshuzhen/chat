<template>
  <div id="Register">
    <el-input v-model="obj.tel" placeholder="请输入电话号"></el-input>
    <el-input v-model="obj.name" placeholder="请输入用户名"></el-input>
    <el-input v-model="obj.password" placeholder="请输入密码" type="password"></el-input>
    <el-button type="primary" @click="addUser">注册</el-button>
  </div>
</template>

<script>
import addUser from "@/api/mutations/addUser";

export default {
  name: "Register",
  data() {
    return {
      obj: {
        tel: "",
        password: "",
        name: ""
      }
    };
  },
  mounted() {

  },
  methods: {
    async addUser() {
      // this.$socket.emit('setSocketInfo', body,function(res){
      //   console.log(res);
      // });
      try {
        let res = await addUser(this.obj);
        let resData = res.data.data.addUser;
        if (resData.code === 0) {
          this.$message.success("新建成功");
        }
      } catch (e) {
        this.$message.error("请求错误");
      }
    }
  }
  // sockets: {
  //   connect() {
  //     console.log("socket connected");
  //   },
  //   getSocketInfo(value) {
  //     console.log(value);
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#Register {
}
</style>

