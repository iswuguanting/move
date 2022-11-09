import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vantConfig from './vant-config'
import VueAxiosPlugin from 'vue-axios-plugin'
import WotDesign from 'wot-design'
import 'wot-design/lib/theme-default/index.css'

Vue.use(WotDesign)

Vue.config.productionTip = false

Vue.use(vantConfig);

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => ({
    ...config,
    baseURL: 'https://apis.netstart.cn/music/',
  }),
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: ({ data }) => data,
  resErrorFunc: error => Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
