import Vue from 'vue';
import Vuex from 'vuex';
import VueAMap from 'vue-amap';
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    city:'hangzhou',    //初始城市
    nowData:{},         //实况天气
    airData:{},         //空气质量
    hourlyData:{},      //逐小时预报
    weekData:{},        //7天天气预报
    lifestyleData:{},    //生活指数
    cities:{}
  },
  mutations: {
    /*getcities (state){
      axios.get('http://localhost:8080/api/cities')
      .then((res) => {state.cities = res.data.data})
      .catch((err) => console.log(err))
    },*/
    //城市定位
    getCity (state){
    	axios.get('http://freegeoip.net/json/')
    	.then((res) => {state.city = res.data.city})
    	.catch((err) => console.log(err))
    },
    //获取实况天气
    getnowData (state){
      axios.get('https://free-api.heweather.com/s6/weather/now?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.nowData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    //获取空气质量
    getairData (state){
      axios.get('https://free-api.heweather.com/s6/air/now?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.airData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    //获取逐小时预报
    gethourlyData (state){
      axios.get('https://free-api.heweather.com/s6/weather/hourly?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.hourlyData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    //获取7天天气预报
    getweekData (state){
      axios.get('https://free-api.heweather.com/s6/weather/forecast?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.weekData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    //获取生活指数
    getlifestyle (state){
      axios.get('https://free-api.heweather.com/s6/weather/lifestyle?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.lifestyleData = res.data.HeWeather6[0].lifestyle})
      .catch((err) => console.log(err))
    },
    //切换城市
    changeCity (state,payload){
      state.city = payload.amount;
    }
  },
  actions:{
    /*acgetcities(context){
      context.commit('getcities')
    },*/
    acgetCity(context){
      context.commit('getCity')
    },
    acgetnowData({commit}){
      setTimeout(() => {
        commit('getnowData')
      },500)
    },
    acgetairData({commit}){
      setTimeout(() => {
        commit('getairData')
      },500)
    },
    acgethourlyData({commit}){
      setTimeout(() => {
        commit('gethourlyData')
      },500)
    },
    acgetweekData({commit}){
      setTimeout(() => {
        commit('getweekData')
      },500)
    },
  },  
})
export default store;

