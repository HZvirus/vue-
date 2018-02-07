<template>
  <div class="appbox">
    <div v-if="nowData.basic" class="airqlt">
      <div class="airqlt-cover">
        <h1 v-if="nowData.basic">{{nowData.basic.parent_city}}<span>{{airData.air_now_city.pub_time.substring(10)}} 发布</span></h1>
        <h2>{{airData.air_now_city.aqi}}<small>{{airData.air_now_city.qlty}}</small></h2>
        <div class="progressbar">
          <div class="arrow">
            <i v-bind:style="{left:airData.air_now_city.aqi+'px'}">▼</i>
          </div>
          <div class="progressbar-color">
            <span class="level1"></span>
            <span class="level2"></span>
            <span class="level3"></span>
            <span class="level4"></span>
            <span class="level5"></span>
            <span class="level6"></span>
          </div>
          <div class="progressbar-text">
            <ul>
              <li>
                <p><span>0</span><span class="limit">50</span></p>
                <p>优</p>
              </li>
              <li>
                <p><span></span><span class="limit">100</span></p>
                <p>良</p>
              </li>
              <li>
                <p><span></span><span class="limit">150</span></p>
                <p>轻度</p>
              </li>
              <li>
                <p><span></span><span class="limit">200</span></p>
                <p>中度</p>
              </li>
              <li>
                <p><span></span><span class="limit">300</span></p>
                <p>重度</p>
              </li>
              <li>
                <p><span></span><span class="limit">500</span></p>
                <p>严重</p>
              </li>
            </ul>
          </div>
        </div>
      </div> 
     <div class="pollutants">
       <h3>主要污染物</h3>
       <ul v-if="airData.air_now_city">
         <li>
           <div><span>PM2.5</span><span>{{airData.air_now_city.pm25}}</span></div>
           <div><small>(可入肺颗粒物)</small><small>μg/m<sup>3</sup></small></div>
         </li>
         <li>
           <div><span>PM10</span><span>{{airData.air_now_city.pm10}}</span></div>
           <div><small>(可入肺颗粒物)</small><small>μg/m<sup>3</sup></small></div>
         </li>
         <li>
           <div><span>No2</span><span>{{airData.air_now_city.no2}}</span></div>
           <div><small>二氧化氮</small><small>μg/m<sup>3</sup></small></div>
         </li>
          <li>
           <div><span>So2</span><span>{{airData.air_now_city.so2}}</span></div>
           <div><small>二氧化硫</small><small>μg/m<sup>3</sup></small></div>
         </li>
          <li>
           <div><span>Co</span><span>{{airData.air_now_city.co}}</span></div>
           <div><small>一氧化碳</small><small>mg/m<sup>3</sup></small></div>
         </li>
          <li>
           <div><span>O3</span><span>{{airData.air_now_city.o3}}</span></div>
           <div><small>臭氧</small><small>μg/m<sup>3</sup></small></div>
         </li>
       </ul>
     </div>
     <div class="lifestyle">
        <h3>生活指数</h3>
        <ul v-if="lifestyleData">
          <li>
            <img src="../../static/img/coat_short.png">
            <p>穿衣指数:{{lifestyleData[1].brf}}</p>
          </li>
          <li>
            <img src="../../static/img/ganmao.png">
            <p>感冒:{{lifestyleData[2].brf}}</p>
          </li>
          <li>
            <img src="../../static/img/fangsai.png">
            <p>紫外线:{{lifestyleData[5].brf}}</p>
          </li>
          <li>
            <img src="../../static/img/chenlian.png">
            <p>{{lifestyleData[3].brf}}</p>
          </li>
          <li>
            <img src="../../static/img/chuxing.png">
            <p>{{lifestyleData[4].brf}}</p>
          </li>
          <li>
            <img src="../../static/img/xiche.png">
            <p>{{lifestyleData[6].brf}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    this.getlifestyleData()
  },
  computed: {
    nowData () {
      return this.$store.state.nowData
    },
    airData () {
      return this.$store.state.airData
    },
    lifestyleData () {
      return this.$store.state.lifestyleData
    }
  },
  methods: {
    getlifestyleData(){
        this.$store.commit('getlifestyle')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.airqlt{
  height: 230px;
  background: -webkit-gradient(linear, 0% 0%, 0% 100%,from(#2a6eb3),to(#4587cb));
  color: #fff;
  padding: 20px 10px 0 10px;
  box-sizing: border-box;
}
.airqlt h1{
  font-size: 18px;
  margin-bottom: 30px;
}
.airqlt h1 span{
  float: right;
  color:rgba(255, 255, 255, .5);
}
.airqlt h2{
  font-size: 70px;
}
.airqlt h2 small{
  font-size: 24px;
  margin-left: 5px;
}
.progressbar{
  position: relative;
}
.arrow{
  position: relative;
  height: 20px;
}
.arrow i{
  color: #40c057;
  position: absolute;
  top:4px;
  left: 0px;
}
.progressbar{
  height: 73px;
}
.progressbar-color{
  margin-bottom: 5px;
}
.progressbar-color span{
  width: 16.66%;
  float: left;
  display: inline-block;
  height: 2px;
}
.progressbar-color .level1{
  background: #40c057;
}
.progressbar-color .level2{
  background: #82c91e;
}
.progressbar-color .level3{
  background: #f76707;
}
.progressbar-color .level4{
  background: #e03131;
}
.progressbar-color .level5{
  background: #841c3c;
}
.progressbar-color .level6{
  background: #540822;
}
.progressbar-text li{
  width: 16.66%;
  float: left;
}
.progressbar-text li p:nth-child(1){
  text-align: right;
  font-size: 13px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
.progressbar-text li p:nth-child(2){
  text-align: right;
  font-size: 13px;
}
.pollutants,.lifestyle{
  color:#000;
  padding: 0 10px;
  height: 210px;
}
.pollutants h3,.lifestyle h3{
  font-size: 20px;
  margin: 10px 0;
}
.pollutants li{
  width: 45%;
  margin: 0 2.5% 10px 2.5%;
  height: 50px;
  float: left;
  border-bottom: 1px solid #c1e3ec;
}
.pollutants li div{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pollutants li div:nth-child(1){
  margin: 4px 0;
}
.pollutants li div span{
  font-size: 16px;
  color:#333;
}
.pollutants li div small{
  font-size: 12px;
  color:#a4a4a4;
}
.pollutants li div small sup{
  line-height: 1;
}
.lifestyle li{
  width: 33.33%;
  float: left;
  text-align: center;
  margin-top: 15px;
}
.lifestyle li img{
  width: 40px;
  height: 40px;
}
.lifestyle li p{
  margin-top:5px;
}
</style>
