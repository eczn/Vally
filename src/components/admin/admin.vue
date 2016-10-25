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
</style>

<template>
	<div class="admin-container">
		<v-header position="admin"></v-header>
		<div v-if="!isEnter">
			<input v-model="pwd" type="text">
			<span v-on:click="enter">enter Back</span>
		</div>
		<router-view v-else></router-view>
	</div>
</template>

<script>
	var header = require('../public/header.vue');
	var ASOBADM = ''; 

	module.exports = {
		data: function(){
			return {
				pwd: ASOBADM,
				isEnter: false
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
				this.isEnter = true;
			}
		},
		components: {
			"v-header": header
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
							that.isEnter = true; 
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
