<template>
	<div class="zizujianone">
		<h1>one组件</h1>
		<button @click='send'>向组件传值</button>
	</div>
</template>
<script type="text/javascript">
	import bus from '../../static/js/event'
	export default {
		name:'zizujianone',
		data() {
			return{
				
			}
		},
		methods:{
			send(){
				bus.$emit('sonWordmsg','this message from one')
			}
		},
		mounted:function(){
			
		}
	}
</script>
<style scoped>
	.zizujianone{
		border: 1px solid #000;margin: 20px 0;
	}
</style>