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
// 引入双语
import i18n from './lang/index'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,//挂载
  render: h => h(App)
}).$mount('#app')
