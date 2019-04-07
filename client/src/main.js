import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import emitEvent from './utils/emitEvent'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import { getToken } from './utils/auth'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://10.0.0.105:3000')

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$emitEvent = emitEvent

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !getToken()) {
    next({
      path: '/login'
    })
  }
  next()
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
