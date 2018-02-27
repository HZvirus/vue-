<template>
  <div class="appbox">
      <transition name="slide-fade">
        <div v-show="citybox" class="citybox">
          <div class="citybox_search">
            <input v-model='search' placeholder="城市名/拼音" />
          </div>
          <div class="citybox_result">
            <ul class="hot">
              <li v-for="item in hot">
                <span @click="changeCity(item.name)">{{item.name}}</span>
              </li>
            </ul>
            <ul v-show="search" class="list">
              <li v-for="item in items">
                <span @click="changeCity(item.name)">{{item.name}}({{item.pinyin}})</span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
     <div v-if="nowData.basic" class="today" v-bind:class="`today${nowData.now.cond_code}`">
        <div class="now">
          <h1 @click="cityboxShow" v-if="nowData.basic">{{nowData.basic.parent_city}}▼</h1>
          <h2>{{nowData.now.tmp}}</h2>
          <h3>{{nowData.now.cond_txt}} / {{nowData.now.wind_dir}}{{nowData.now.wind_sc}}级</h3>
          <router-link v-if="airData.air_now_city" v-bind:class="`air${colorClass}`" class="child-view air" to="/air">{{airData.air_now_city.aqi}} {{airData.air_now_city.qlty}}</router-link>
          <p>相对湿度 : {{nowData.now.hum}}</p>
      </div>
     <div class="hour">
        <ul>
          <li v-for="item in hourlyData.hourly">
            <p>{{item.time.substring(11)}}</p>
            <p v-bind:class="`icon${item.cond_code}`"  class="icon"></p>
            <p class="point">{{item.tmp}}</p>
          </li>
        </ul>
      </div>
    </div> 
    <div class="week">
      <ul>
        <li v-for="(item,index) in weekData.daily_forecast">
          <span v-if="new Date().getDay() == new Date(item.date).getDay()">今天 {{item.date.substring(5)}}</span>
          <span v-else-if="new Date().getDay() == new Date(item.date).getDay() - 1">明天 {{item.date.substring(5)}}</span>
          <span v-else>{{dayArr[new Date(item.date).getDay()]}} {{item.date.substring(5)}}</span>
          <span>{{item.cond_txt_d}}</span>
          <span>{{item.tmp_max}}~{{item.tmp_min}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import cities from "../../static/json/data.json"
export default {
  name:'index',
  data () {
    return {
      dayArr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],  //周期
      citybox: false,//
      hotorlist: false,
      search: '',                                                        //输入框内容
      hot:[                                                              //热门城市
        {name: '北京',pinyin: 'beijing'},
        {name: '上海',pinyin: 'shanghai'},
        {name: '南京',pinyin: 'nanjing'},
        {name: '杭州',pinyin: 'hangzhou'},
        {name: '宁波',pinyin: 'ningbo'},
        {name: '黄山',pinyin: 'huangshan'},
        {name: '三亚',pinyin: 'sanya'},
        {name: '天津',pinyin: 'tianjin'},
      ],                                                                      
      citiesdata:cities
    }
  },
  created () {

  },
  mounted () {
    /*this.getcities()*/
    this.getCity()
    this.getnowData()
    this.getairData()
    this.gethourlyData()
    this.getweekData()
  },
  computed:{
    colorClass () {                                                      //空气质量颜色
      if( this.$store.state.airData.air_now_city.aqi <= 50){
        return 1
      }else if(this.$store.state.airData.air_now_city.aqi > 50 && this.$store.state.airData.air_now_city.aqi <= 100){
        return 2
      }else if(this.$store.state.airData.air_now_city.aqi > 100 && this.$store.state.airData.air_now_city.aqi <= 150){
        return 3
      }else if(this.$store.state.airData.air_now_city.aqi > 150 && this.$store.state.airData.air_now_city.aqi <= 200){
        return 4
      }else if(this.$store.state.airData.air_now_city.aqi > 200 && this.$store.state.airData.air_now_city.aqi <= 300){
        return 5
      }else if(this.$store.state.airData.air_now_city.aqi > 300){
        return 6
      }
    },
    items () {                                                          //城市筛选
      let _search = this.search;
      if (_search) {
        return this.citiesdata.cities.filter(
        (product) => Object.keys(product).some((key) => String(product[key]).toLowerCase().indexOf(_search) > -1)
        )
      }
      return this.citiesdata;
    },
    city () {
      return this.$store.state.city
    },
    nowData () {
      return this.$store.state.nowData
    },
    airData () {
      return this.$store.state.airData
    },
    hourlyData () {
      return this.$store.state.hourlyData
    },
    weekData () {
      return this.$store.state.weekData
    },
/*    cities () {
      return this.$store.state.cities
    }*/
  },
  methods: {
    ...mapMutations([
     /* 'getcities',*/
      'getCity',
      'getnowData',
      'getairData',
      'gethourlyData',
      'getweekData'
    ]),
    cityboxShow(){
      this.citybox = true
    },
    changeCity(msg){                                                    // 切换城市
        this.$store.commit('changeCity',{
          amount:msg
        })
        this.getnowData()
        this.getairData()
        this.gethourlyData()
        this.getweekData()  
        this.citybox = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
.left-fade-enter-active,.slide-fade-enter-active {
  transition: 0.3s ease-in-out;
}
.left-fade-leave-active,.slide-fade-leave-active {
  transition: 0.3s ease-in-out;
}
.left-fade-enter, .left-fade-leave-to
{
  transform: translateX(-50px);
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateY(50px);
  opacity: 0;
}
.today{
  height: 370px;
  padding-top: 10px;
  box-sizing: border-box;
  color: #fff;
  transition: 1s ease-in-out;
}
.today h2{
  font-size: 84px;
  text-align: center;
  font-family: 'HelveticaNeue-Thin','temp_font';
  font-weight: lighter;
  position: relative;
}
.today h2:after{
  content: " 。";
  color:#fff;
  font-size: 40px;
  position: absolute;
  top:-20px;
}
.today h3{
  font-size: 18px;
  text-align: center;
}
.now{
  width: 93%;
  margin:0 auto;
  height: 245px;
}
.air{
  font-size: 16px;
  display: block;
  padding:4px 0;
  margin: 10px auto;
  border-radius: 4px;
  color: #fff;
  width: 55px;
  text-align: center;
}
.air1{
  background: #40c057;
}
.air2{
  background: #82c91e;
}
.air3{
  background: #f76707;
}
.air4{
  background: #e03131;
}
.air5{
  background: #841c3c;
}
.air6{
  background: #540822;
}
.hour{
  width: 100%;
  height: 100px;
  position: relative;
  overflow-y:auto;
  text-align: center;
  margin-top: 10px;
}
.hour ul{
  width: 464px;
  height: 100%;
  margin: 0 auto;
}
.hour ul li{
  height: 100%;
  width: 58px;
  float: left;
}
.week{
  padding: 0 5px;
}
.week li{
  height: 50px;
  border-bottom:1px solid #e3e3e3;
  line-height: 50px;
  display: flex;
  align-items: center;
}
.week li span{
  width: 33.33%;
  text-align: center;
}
.half-mouth{
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.half-mouth a{
  color: #000;
}
.point{
  position: relative;
  font-size: 16px;
}
.point:after{
  content: " 。";
  color:#fff;
  position: absolute;
  top:-20px;
}
.citybox{
  z-index: 99;
  position: absolute;
  width: 100%;
  top:0;
  background: rgba(255,255,255,0.5);
  padding: 35px 5px;
  box-sizing: border-box;
}
.citybox_search{
  height: 30px;
}
.citybox_search input{
  border: 1px solid #666;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  padding-left: 5px;
  box-sizing: border-box;
}
.citybox_result{
  height: 300px;
  overflow-y: auto;
}
.citybox .hot{
  height: 100px;
}
.citybox .hot li{
  width: 25%;
  float: left;
  text-align: center;
  margin: 7px 0;
}
.citybox .hot li span{
  font-size: 18px;
  color: #666;
  display: inline-block;
  border: 1px solid #666;
  padding:5px 10px;
  border-radius: 5px;
}
.citybox .list li{
  height: 30px;
  margin: 10px 0;
  padding: 0 17px;
}
.citybox .list li span{
  font-size: 18px;
  color: #666;
  display: inline-block;
  width: 100%;
}
.today100{
  background: url("../../static/img/d100.jpg")no-repeat;
}
.today101{
  background: url("../../static/img/d101.jpg")no-repeat;
}
 .today102{
  background: url("../../static/img/d102.jpg")no-repeat;
}
.today103{
  background: url("../../static/img/d103.jpg")no-repeat;
}
.today104{
  background: url("../../static/img/d104.jpg")no-repeat;
}
.today105{
  background: url("../../static/img/d105.jpg")no-repeat;
}
.today407{
  background: url("../../static/img/d407.jpg")no-repeat;
} 
.today501{
  background: url("../../static/img/d501.jpg")no-repeat;
}
/* 天气图标 */
 .icon{
  width: 58px;
  height: 54px;
  background: url("../../static/img/weatherIcon.png")no-repeat;
}
/* 多云 */
.icon101{
  background-position: -120px -25px;
}
/* 晴天 */
.icon100,.icon103{
  background-position: -20px -25px;
}
/* 阴天 */
.icon104{
  background-position: -220px -25px;
}
/* 小雨，毛毛细雨 */
.icon305,.icon309{
  background-position: -420px -25px;
} 
/* 中雨 */
.icon306{
  background-position: -320px -25px;
} 
/* 大雨 */
.icon307{
  background-position: -520px -25px;
}
/* 中雪 */
.icon401{
  background-position: -420px -145px;
}
/* 大雪 */
.icon402{
  background-position: -520px -145px;
}
/* 雨夹雪 */
.icon404{
  background-position: -120px -260px;
}
</style>
