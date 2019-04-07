<template>
  <div id="Login">
    <el-input v-model="obj.tel" placeholder="请输入电话号"></el-input>
    <el-input v-model="obj.password" placeholder="请输入密码" type="password"></el-input>
    <el-button type="primary" @click="Login">登录</el-button>
  </div>
</template>

<script>
import getUser from '@/api/queries/getUser'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data () {
    return {
      obj: {
        tel: '',
        password: ''
      }
    }
  },
  mounted () {

  },
  methods: {
    async Login () {
      try {
        let res = await getUser(this.obj)
        let resData = res.data.data.getUser
        if (resData.code === 0) {
          this.$message.success('登录成功')
          setToken(JSON.parse(resData.data).token)
          setTimeout(() => {
            this.$router.push({name: 'Layout'})
          }, 300)
        } else {
          this.$message.error(resData.message)
        }
      } catch (e) {
        this.$message.error('请求错误')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#Login {
}
</style>
