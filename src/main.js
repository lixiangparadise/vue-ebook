import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// 引入图标
import './assets/styles/icon.css'
// 引入字体
// import './assets/fonts/daysOne.css'
// 引入global
import './assets/styles/global.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
