// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/MyCss/global.css'
import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(Router)

/* eslint-disable no-new */
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: {App},
  template: '<App/>'
})
