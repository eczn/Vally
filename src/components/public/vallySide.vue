<!-- vallySide.vue -->
<style>
	.vally-side {
		position: fixed;
		height: 100%; 
		width: 400px; 
		left: -400px;
		/*left: -390px;*/
		/*opacity: 0; */
		top: 0;

		color: #FFF;
		/*background-color: #555; */
		background-color: rgb(51, 46, 57);

		transition: left .6s;
	}

	.vally-push {
		/*isPushed == true*/
		/*opacity: 1;*/
		left: 0px; 
		/*transition: left .5s; */
	}
	
	.VS-btn {
		position: absolute;
		bottom: 0; 
		left: 400px;
		color: #222;
	}

	.VS-navTitle {
		/*<h1>ASOB</h1>*/
		margin: 5px;
	}
	.VS-intro {
		 text-align:center;
	}
</style>

<template>
	<div class="vally-side" v-bind:class="{'vally-push': isPushed}">
		<h1 class="VS-navTitle">Vally demo: ASOB</h1>

		<div class="VS-intro">
			<h2>yoo 我是eczn， 这破站的建立者。</h2>
		</div>

		<div class="VS-btn">
			<btn btntype="VS-toggle" class="VS-call" v-bind:toggle-status="isPushed" text="return"></btn>
		</div>
	</div>
</template>

<script>
	var vsBtn = require('./btn.vue'); 

	module.exports = {
		data: function(){
			return {
				isPushed: false, 
			}
		},
		components: {
			'btn': vsBtn
		},
		ready: function(){
			// alert("side Vally standBy"); 
			// var that = this; 
			// that.isPushed = true;
			// setTimeout(function(){
			// 	that.isPushed = true;
			// },200); 
			// if (this.$route.query.side == "✓") {
			if (this.$route.query.side != undefined) {
				var that = this; 
				setTimeout(function(){
					that.isPushed = true;
				},200);
			}
		},
		methods: {
			toggleIt: function(){
				this.isPushed = !this.isPushed;
			}
		},
		events: {
			"sideToggle": function(){
				this.toggleIt(); 
			},
			"VS-toggle_onClick": function(){
				// sent from myBtn 
				// window.history.go(-1);
				this.toggleIt(); 
			}
		}
	}
</script>
