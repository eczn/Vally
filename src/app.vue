<style>
	.container{
		/*display: flex;*/
		/*position: relative;
		width: 80%;
		margin: 0 auto;
		filter: blur(0px);*/
		/*transition: all 1.5s;*/
		/*min-height: 100%;*/
		margin: 0 10%;
	}

	/*@media screen and (min-width: 425px) and (max-width: 1000px) */
	@media screen and (max-width: 768px) {
		.container {
			margin: 0 .3rem;
		}
	}

	* {
		/*font-family: "Microsoft Yahei";*/
		margin: 0;
		padding: 0;
		font-family: "Heiti SC", "Hiragino Sans GB", "microsoft yahei", "WenQuanYi Microhei", "微软雅黑";
	}

	.addBlur {
		filter: blur(20px);
		transition: all 1.5s;
	}

</style>

<template>
	<div>
		<div id="main-body" class="container">
			<router-view></router-view>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	var header = require("./components/public/header.vue"); 
	var myFooter = require("./components/public/footer.vue");
	module.exports = {
		data: function(){
			return {
				host: ""
			}
		},
		ready: function(){
			// console.log(accordion);
		},
		methods: {

		},
		components: {
			"v-header": header,
			"v-footer": myFooter
		}
	}
</script>
