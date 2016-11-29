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
			margin: 0 0rem;
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

	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
	::-webkit-scrollbar { 
		width: 6px;  
		height: 16px;  
		/*background-color: rgba(255,255,255,0);*/
	}  

	/*定义滚动条轨道 内阴影+圆角*/  
	::-webkit-scrollbar-track {  
		/*border: 3px solid rgba(255,255,255,0.5);*/
		/*background-color: rgba(31,18,50,0.01);  */
		/*background-color: transparent;  */
		/*background: linear-gradient(to right, transparent, rgba(31,18,50,0.1), rgba(31,18,50,0.2));*/
	}  

	/*定义滑块 内阴影+圆角*/  
	::-webkit-scrollbar-thumb {
		/*border-radius: 12px 0 0 12px / 16px 0 0 16px;*/
		/*border-right: 12px dashed rgba(31,18,50,.4);*/
		background-color: rgba(25,15,60,.3);
	}

	#app {
		/*background: linear-gradient(to top, transparent, rgba(31,18,50,0.05));*/
		padding: 0;
		margin: 0;
		display: block;
		background-color: #FFF;
	}
</style>

<template>
	<div id="app">
		<div id="v-top"></div>
		<div id="main-body" class="container">
			<!-- text -->
			<router-view></router-view>
		</div>
		<msg-box></msg-box>
		<v-footer></v-footer>
		<vally-side></vally-side>
	</div>
</template>

<script>
	var header = require("./components/public/header.vue"); 
	var myFooter = require("./components/public/footer.vue");
	var vallySide = require("./components/public/vallySide.vue"); 
	var msgBox = require("./components/public/msg-box.vue"); 

	module.exports = {
		data: function(){
			return {
				host: ""
			}
		},
		ready: function(){
			// console.log(accordion);
			// this.$broadcast('showMsg', {
			// 	pics: [], 
			// 	msg: 'hello, Vally'
			// }); 
		},
		methods: {

		},
		components: {
			"v-header": header,
			"v-footer": myFooter,
			"vally-side": vallySide,
			"msg-box": msgBox
		},
		events: {
			HelpMeBroadCast: function(event_name, args){
				this.$broadcast(event_name, args); 
			}
		}
	}
</script>
