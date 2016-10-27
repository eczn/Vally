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

		/*color: #FFF;*/
		color: rgba(255,255,255,.65); 
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
		font-size: 0; 
		color: #222;
	}

	.VS-navTitle {
		/*<h1>ASOB</h1>*/
		margin: 5px;
	}
	.VS-intro {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	
	.VS-intro .avatar span {
		width: 125px;
		height: 125px;
		background-image: url("http://eczn.website/intro/cir.png");
		background-size: 125px;
		display: inline-block;
	}
	
	.VS-intro .avatar {
		text-align: center;
		/*margin: 25px 0; */
		padding: 25px 0;
		width: 80%; 
		margin: 25px 10%;
		border-top: 2px dashed rgba(255,255,255,.2);
		border-bottom: 2px dashed rgba(255,255,255,.2);
	}

	.VS-contact {
		/*margin: */
		margin: 25px 10%; 
		align-self: flex-start;
		font-family: "Consolas";
		font-size: .3rem;
		/*color: rgba(255,255,255,.6);*/
	}
	.VS-contact a {
		color: rgba(255,255,255,.3);
		/*text-decoration-color: rgba(255,255,255,.3);*/
		text-decoration: none;
		padding: 0 .25em;
		border-bottom: dotted 2px; 
		transition: color .3s; 
	}
	.VS-contact a:hover {
		color: rgba(200,200,255,.6);
	}


	.VS-intro h2 {
		margin: 8px 0;
	}

</style>

<template>
	<div class="vally-side" v-bind:class="{'vally-push': isPushed}">
		<h1 class="VS-navTitle">Vally demo: ASOB</h1>

		<div class="VS-intro">
			<h2>yoo 我是eczn， 这破站的建立者。</h2>
			<div class="avatar">
				<span></span>
				<a v-link="{name: 'admin'}"><h2>varEczn</h2></a>
			</div>
			<div class="VS-contact">
				<!-- <h2>联系我：</h2> -->
				<h2>Contact Connecting</h2>
				<ul>
					<li>QQ: 1975845422</li>
					<!-- <li>Tel: 15625058135</li> -->
					<li>mail: eczn@moebaka.com</li>
					<li>Pixiv: <a href="http://www.pixiv.net/member.php?id=3185353" target="_blank">ecznPI</a></li>
					<li>webSite: <a href="http://eczn.website" target="_blank">varEczn</a></li>
					
				</ul>
			</div>
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
