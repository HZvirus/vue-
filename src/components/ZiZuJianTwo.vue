<template>
	<div class="zizujiantwo">
		<h1>two组件</h1>
		<span>从one接收：{{msg}}</span>
	</div>
</template>
<script type="text/javascript">
	import bus from '../../static/js/event'
	export default {
		name:'zizujiantwo',
		data() {
			return{
				msg:''
			}
		},
		methods:{

		},
		mounted() {
			var self = this;
			bus.$on('sonWordmsg',function(msg){
				self.msg = msg
			})
		}
	}
</script>
<style scoped>
	.zizujiantwo{
		border: 1px solid #000;
	}
</style>