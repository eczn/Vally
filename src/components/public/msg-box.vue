<!-- msg-box.vue -->
<style>
.messageBox {
	position: fixed;
	width: 100%;  
	height: 100%; 
	top: 0;
	left: 0; 
	background: linear-gradient(to top, rgba(255,255,255, 1), rgba(255,255,255, .9), rgba(255,255,255, .8));;
	z-index: 110; 
	opacity: 1; 
	transition: all .3s;
	display: block;
}

.messageBox-hidden {
	opacity: 0;
}
.messageBox > * {
	/*padding: 0 25%; */
	margin: 0 auto; 
	width: 100%; 
	max-width: 600px; 
}
.clearMargin {
	width: 100%; 
	max-width: none;
}
.messageBox > h1 {
	font-size: .6rem; 
}
.msgTop {
	position: relative;
	border-top: 5px solid ; 
}

.msgMiddle {
	position: relative;
	height: 100px; 
	width: 100%; 
	margin: 50px auto; 
	margin-top: 28px;
	padding: 0;
	white-space: nowrap;
}

.msgMiddle > img {
	max-width: 280px; 
	max-height: 300px;
}

.msgInfo > span {
	position: absolute;
	top: 100%; 
	left: -50%; 
	width: 200%; 
	color: #955; 
	font-size: 20px; 
	text-align: center;
}
.msgInfo:before, .msgInfo:after {
	position: absolute;
	content: ""; 
	top: 0;
	left: 0;
	height: 100%;
	width: 100%; 
	box-shadow: -2px 1px 4px rgba(155,89,88,.4);
}
.msgInfo:before {
	width: 47px; 
	left: 47px;
	width: 6px; 
	height: 70%; 
	border-radius: 0px 6px 12px 0px / 0px 6px 50px 50px;

	background-color: #955; 
}
.msgInfo:after {
	width: 7px; 
	height: 12px; 
	left: 46px;
	border-radius: 4px 12px 12px 0 / 4px 12px 12px 0;
	background-color: #955;
	top: 84%;
}
.msgClose {
	width: 100%; 
	cursor: pointer;
	position: relative;
	top: 0; 
	margin: 0 auto; 
	height: 1px;
	padding: 0;
	transform: rotate(45deg);
	transform-origin: 14px 14px;
}
.msgClose:after, .msgClose:before {
	content: ""; 
	position: absolute;
	height: 28px;
	width: 28px;
	left: 16px; 
	top: 8px; 
	color: #955;
	border: 4px solid;
	border-radius: 4px;
}
.msgClose > span {
	position: absolute;
	left: 16px;
	top: -20px;
	width: 32px;
	height: 96px;
	color: #955;
	transform: translateX(-16px);
	box-shadow: 8px 0px 19px -10px;
}
.msgClose:before {
	border-right: none;
	border-bottom: none;
	transform: translate(14px, 14px);
}
.msgClose:after {
	border-left: none;
	border-top: none;
	transform: translate(-14px, -14px);
}

@media screen and (max-width: 600px) {
	.msgClose {
		transform: rotate(45deg) scale(0.75, 0.75);
	}
}

.fade-transition {
	opacity: 1;
	transition: opacity .3s
}

.fade-enter, .fade-leave {
	opacity: 0
}
.messageBox {
	user-select: none;

}
.messageBox > p {
	padding: 32px 0px;
	max-width: 500px;
	text-align: center;
	z-index: 99;
	position: relative;
	background-color: rgba(240,240,255,.8);
	font-size: 22px;
	transition: opacity .3s;
}
.messageBox > p:hover {
	opacity: 0; 
}
</style>

<template>
	<div v-if="status.dis" class="messageBox" transition="fade">
		<div class="msgTop clearMargin"></div>
		<div class="msgClose" v-on:click="status.dis = false">
			<!-- <span></span> -->
		</div>

		<div v-on:click="status.dis = false" v-if="content.pics.length != 0" style="text-align: center;width: 100%;margin: 50px auto;" class="msgMiddle">
			<img style="display: inline-block;" v-for="s in content.pics" :src="s" alt="">
		</div>
		<div v-else class="msgMiddle msgInfo"><span>** Attention **</span></div>
		
		<p v-html="content.msg"></p>
		
		<div style="font-size: .4rem;" v-html="msg.inner"></div>
	</div>
</template>

<script>
	module.exports = {
		data: function(){
			return {
				status: {
					dis: false,
					disAnimate: false,
					picFlag: false, 
					msgAttention: true
				},
				content: {
					pics: [], 
					msg: 'Vally-StandBy'
				}
			}
		},
		ready: function(){
			
		},
		methods: {
			toggle: function(){
				this.status.dis = !this.status.dis; 
			}
		},
		events: {
			showMsg: function(content){
				this.status.dis = true; 
				console.warn(content);
				this.content = content;
			}
		}
	}
</script>
