<!-- writedesk -->
<style>
	.writedesk {
		position: relative;
		margin-bottom: 3rem;
	}

	.writedesk input {
		font-size: .8rem;
	}

	.writedesk input, .writedesk textarea {
		border: 2px dashed #555;
		color: #222;
		width: 80%; 
		max-width: 80%;

		padding: .1rem; 
		margin: .2rem auto;

	}
	.writedesk textarea {
		min-height: 10rem;
		font-size: .4rem;
		/*text-indent: 2em;*/

	}
</style>

<template>
	<div class="writedesk">
		<btn btntype="B"></btn>
		<center>
			<input v-model="article.title" style="text-align:center;" type="text" placeholder="标题">
			<!-- <t type="text" placeholder="body"> -->
			<textarea v-model="article.body" placeholder="文章 （现在仅支持纯文本..）"></textarea>
			<btn btntype="C"></btn>
		</center>

		<!-- <p>{{article.title}}</p> -->
		<!-- <p>{{article.body}}</p> -->
	</div>
</template>

<script>
	var myBtn = require('../public/btn.vue');
	var backEnd = "http://127.0.0.1/ProjectBuilding"; 

	module.exports = {
		data: function(){
			return {
				article: {
					title: '',
					body: ''
				}
			}
		},
		components: {
			btn: myBtn
		},
		events: {
			B_onClick: function(){
				this.$route.router.go({
					name: 'admin'
				});
			},
			C_onClick: function(){
				// alert("updating!");

				var that = this; 

				if (this.article.title == '' || this.article.body == ''){
					alert("您似乎遗漏了什么东西没填...."); 
					return 0; 
				}

				$.ajax({
					type: 'POST',
					url: backEnd+'/KV/add_blog.php',
					asyne: false,
					// data to be added to query string:
					data: {
						title: that.article.title,
						body: that.article.body,
						type: 'justText',
						pw: "" // 应该哈希化这里
					},
					// type of data we are expecting in return:
					dataType: 'json',
					timeout: 2000,
					success: function(data){
						console.log(data); 
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
						alert("出错了。。。 可能是超时了 也可能是当机了。。");
					}
				});
			}
		}
	}
</script>
