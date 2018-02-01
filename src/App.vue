<template>
  <div id="app">
  	<transition name="left-fade">
    	<router-view></router-view>
    </transition>
    </div>
  </div>
</template>
<script>

export default {
  name: 'app',

}
</script>
<style>

</style>
