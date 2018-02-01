// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import AMap from 'vue-amap'
import store from './store/index'
import '../static/css/global.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '4fef6da3246cb67fa9c975e8c33dd0a5',
  plugin: ['AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
