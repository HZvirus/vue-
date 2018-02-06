import Vue from 'vue';
import Vuex from 'vuex';
import VueAMap from 'vue-amap';
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    city:'hangzhou',
    nowData:{},
    airData:{},
    hourlyData:{},
    weekData:{},
    lifestyleData:{}
  },
  mutations: {
    getCity (state){
    	axios.get('http://freegeoip.net/json/')
    	.then((res) => {state.city = res.data.city})
    	.catch((err) => console.log(err))
    },
    getnowData (state){
      axios.get('https://free-api.heweather.com/s6/weather/now?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.nowData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    getairData (state){
      axios.get('https://free-api.heweather.com/s6/air/now?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.airData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    gethourlyData (state){
      axios.get('https://free-api.heweather.com/s6/weather/hourly?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.hourlyData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    getweekData (state){
      axios.get('https://free-api.heweather.com/s6/weather/forecast?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.weekData = res.data.HeWeather6[0]})
      .catch((err) => console.log(err))
    },
    getlifestyle (state){
      axios.get('https://free-api.heweather.com/s6/weather/lifestyle?location='+state.city+'&key=c861f54eeb0c49a6a73ebf46f6d14ccf')
      .then((res) => {state.lifestyleData = res.data.HeWeather6[0].lifestyle})
      .catch((err) => console.log(err))
    },
    changeCity (state,payload){
      state.city = payload.amount;
    }
  },
  actions:{
    acgetCity(context){
      context.commit('getCity')
    },
    acgetnowData({commit}){
      setTimeout(() => {
        commit('getnowData')
      },1000)
    },
    acgetairData({commit}){
      setTimeout(() => {
        commit('getairData')
      },1000)
    },
    acgethourlyData({commit}){
      setTimeout(() => {
        commit('gethourlyData')
      },1000)
    },
    acgetweekData({commit}){
      setTimeout(() => {
        commit('getweekData')
      },1000)
    },
  },
  getters:{

  }	  
})
export default store;

