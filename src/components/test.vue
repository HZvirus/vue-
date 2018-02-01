<template>
  <div>
    <div class="test">
      {{count}}
    </div>
    <button @click="increment">+</button>
  </div>

</template>

<script>
export default {

  name:'test',
  data () {
    const store = new Vuex.store({
      state:{
        count:0
      },
      mutations:{
        increment: state => state.count++,
        decrement: state => state.count--,
      }
    })
    return {
      count:0
    }
  },
  props:[],
  created () {

  },
  watch:{

  },
  computed: {
    count(){
      return store.state.count
    }
  },
  methods: {
    increment(){
       store.commit('increment')
     },
    decrement(){
       store.commit('decrement')
     },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
