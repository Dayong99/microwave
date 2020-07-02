/* eslint-disable */
import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/timePlay.css'
import '@/styles/prompt/movePrompt.css'

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
// import './icons' // icon
// import './utils/error-log' // error log
import request from '@/utils/request'

import '@/permission' // permission control
import db from '@/utils/localstorage'
// !animated动画库
import animated from 'animate.css'
// !导入moment日期插件
import moment from 'moment'
// !导入D3
import * as d3 from "d3";
import vueDrag from './utils/vue-drag'
// !设置moment时区  || moment.lang('zh-cn')
moment.locale('zh-cn');
// !将moment挂载到原型
Vue.prototype.$moment = moment;
Vue.use(vueDrag)
Vue.use(animated)
// !挂载d3
Vue.prototype.$d3 = d3;
window.d3 = d3;
// !引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts
// import * as filters from './filters' // global filters
// import { hasPermission, hasNoPermission, hasAnyPermission } from './utils/permissionDirect'

// const Plugins = [
//   hasPermission,
//   hasNoPermission,
//   hasAnyPermission
// ]

// Plugins.map((plugin) => {
//   Vue.use(plugin)
// })

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$getbuffer = request.getbuffer
Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload
Vue.prototype.$login = request.login
Vue.prototype.$db = db
// register global utility filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
