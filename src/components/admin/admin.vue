<!-- admin.vue -->
<style>
	.admin-container {
		margin: 0 10%;
	}

	@media screen and (max-width: 768px) {
		.admin-container {
			margin: 0 .3rem 0 1.6rem;
		}
	}


	.pwd-input-area {
		z-index: 100;
		position: fixed; 
		height: 100%; 
		width: 100%; 
		top: 0; 
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		background-color: rgb(51, 46, 57);
		color: rgba(255,255,255,.65);
		opacity: 1; 
		transition: opacity .5s;
	}
	.pwd-input-area > input {
		background-color: rgb(51, 46, 57);
		color: rgba(255,255,255,.65);
		border: dashed 3px rgba(255,255,255,.45);
		border-radius: 8px;
		/*margin: 20px;*/
		height: 50px;
		width: 360px;
		text-align: center;
		font-size: 24px;
		margin-bottom: 10px;
	}

	.pwd-input-area > div {
		height: 50px;
		width: 50px;
		margin: 10px;
		
	}

	.traceInto {
		opacity: 0; 
		transition-property: opacity; 
		transition-duration: .5s; 
	}

</style>

<template>
	<div class="admin-container">
		<v-header position="admin"></v-header>

		<div class="pwd-input-area">
			<input type="password" v-model="pwd" placeholder="admin-password" type="text">
			<!-- <div v-on:click="enter">TraceInto</div> -->
			<!-- <btn btntype="C" icon="true" text=""></btn> -->
			<span v-on:click="enter" class="btn-C">
				<span class="icon_true"></span>
			</span>
		</div>

		
		<router-view v-else></router-view>
	</div>
</template>

<script>
	var header = require('../public/header.vue');
	var ASOBADM = ''; 
	var myBtn = require('../public/btn.vue'); 

	module.exports = {
		data: function(){
			return {
				pwd: ASOBADM,
				isEnter: false,
				loginMsg: 'dd'
			}
		},
		ready: function(){
			var cHash = getCookie("objHash"); 
			var cRand = getCookie("objRand"); 
			
			if (cHash.length != 0 || cRand.length != 0){
				console.group("cHash cRand"); 
				console.warn('cHash: '+cHash);
				console.log('cRand: '+cRand);
				console.groupEnd();
				// this.isEnter = true;

				setTimeout(function(){
					$(".pwd-input-area").addClass("traceInto");
					setTimeout(function(){
						$(".pwd-input-area").css("display", "none"); 
					},500);
				},200);
			}
		},
		components: {
			"v-header": header,
			"btn": myBtn
		},
		methods: {
			enter: function(){
				// this.isEnter = true; 
				var obj = new Object(); 

				obj.pwd = this.pwd; 
				obj.rand = this.return4RandNum();
				obj.hash = md5(obj.pwd+obj.rand); 

				obj.pwd = ''; 
				this.pwd = ''; 
				// alert(obj.hash);

				var that = this;
				$.ajax({
					type: 'post',
					url: backEnd+'very_pwd.php',
					asyne: false,
					data: {
						hash: obj.hash, 
						rand: obj.rand
					},
					dataType: 'json',
					timeout: 2000,
					success: function(res){
						console.log(res); 
						// obj.hash will be stored in cookie;
						if (res.status == 1){
							// pwd true; 
							setCookie("objHash", obj.hash, 14);
							setCookie("objRand", obj.rand, 14);
							// that.isEnter = true; 
							$(".pwd-input-area").addClass("traceInto"); 
						} else if (res.status == 0) {
							// pwd false; 
							setCookie("objHash", '', -1); 
							setCookie("objHash", '', -1); 
							alert("密码错误"); 
						}
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
					}
				});

			},
			return4RandNum: function(){
				var rand = Math.random();
				rand = rand * 10000; 
				rand = parseInt(rand); 
				rand = rand.toString();
				return rand; 
			}
		}
	}
</script>
