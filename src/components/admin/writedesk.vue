<!-- writedesk -->
<style>
	.writedesk {
		position: absolute;
		top: 0; 
		left: 0; 
		width: 100%; 
		height: 100%; 
		background-color: #eee; 
		/*margin-bottom: 3rem;*/
	}
	
	.controler > span {
		cursor: pointer;
		transition: all .3s;
	}
	.type-choiced {
		color: #d55;
		/*transition: all .3s;*/
	}

	.writearea {

		/*background-color: #ddd;*/

	}
	.writearea input, .writearea textarea {
		width: 100%; 
		max-width: 100%; 
		display: block;
		border: 1px dashed #bbc;
		background-color: #eee; 
	}
	.atricle-meta {
		display: flex;
		height: 20%; 
		flex-direction: column;
		justify-content: center;
	}
	.writearea textarea {
		/*font-size: .5%; */
		/*height: */
	}
	.writearea input {
		/*height: 5%; */
		padding: 1% 0; 
		margin: .5% 0;
	}
	/*.write*/

	.preview-area {
		/*display: inline-block;*/

		overflow-y: scroll;
	}

	.preview-area{
			position: absolute;
			right: 0%; 
			padding-right: 2%;
			top: 5%; 
			width: 46%;
			height: 95%; 
	}
	
	@media screen and (min-width: 900px) {
		.writearea {
			width: 50%; 
			position: absolute;
			top: 5%; 
			left: 0; 
			display: inline-block;
		}
		.controler {
			height: 5%; 
		}
	}
	
	@media screen and (max-width: 900px) {
		.preview-area {
			display: none; 
		}
		.writearea {
			width: 80%; 
			margin: 0 auto;

		}
		/*body {
			overflow: hidden;
		}*/
	}

	@media screen and (max-width: 321px) {
		.writearea {
			width: 94%!important; 
		}
	}


</style>

<template>
	<div class="writedesk">
		<div class="controler">
			<span class="return" v-link="{name: 'admin'}">return</span>
			<span class=""></span>
			<span v-on:click="isMD=!isMD" v-bind:class="{ 'type-choiced': !isMD }">htmlText</span>
			<span v-on:click="isMD=!isMD" v-bind:class="{ 'type-choiced': isMD }">markDown</span>
			<span class="" v-on:click="toServer">launch</span>
			<br />
			<span>mode: {{mode}}</span>
			<span>id: {{article.id}}</span>
		</div>

		<div class="writearea">
			<div class="atricle-meta">
				<input v-model="article.title" style="text-align:center;" type="text" placeholder="标题">
				<input v-model="article.intro" style="text-align:center;" type="text" placeholder="简短的blog介绍">
				<input v-model="article.tags" style="text-align:center;" type="text" placeholder="文章标签">
			</div>

			<textarea v-model="article.body" column="123" placeholder="文章 [纯文本,Markdown] enabled"></textarea>
		</div>

		<div v-html="markVally(article)" class="md preview-area">
			
		</div>
		
	</div>
</template>

<script>
	var myBtn = require('../public/btn.vue');
	 
	module.exports = {
		data: function(){
			return {
				article: {
					id: 'newId',
					title: '',
					body: '',
					intro: '', 
					tags: '', 
				},
				mode: 'new', 
				isMD: true
			}
		},
		components: {
			btn: myBtn
		},
		ready: function(){
			if (this.$route.query.edit){
				// alert(this.mode); 
				this.mode = 'edit'; 
				this.article = JSON.parse(window.localStorage['toEdit']); 
				if (this.article.type == 'text') {
					this.isMD = false; 
				} else {
					this.isMD = true; 
				}
			}

			$(".writearea textarea").css("height", window.innerHeight * 0.78); 
		},
		methods: {
			markVally: function(blog){
				//blogList[blogPosition].body
				if (blog.isMD == false){
					return blog.format;
				} else {
					// footnotes
					var mdHtml = parser.makeHtml(blog.body); 
					return mdHtml+"<br /><br /><br /><br /><br />"; 
				}
			},
			// 
			toServer: function(){
				// alert("updating!");

				var that = this; 

				if (this.article.title == '' || this.article.body == ''){
					alert("您似乎遗漏了什么东西没填...."); 
					return 0; 
				}

				var cHash = getCookie('objHash');
				var cRand = getCookie('objRand'); 

				if (this.mode == 'new'){
					$.ajax({
						type: 'POST',
						url: backEnd+'add_blog.php',
						asyne: false,
						// data to be added to query string:
						data: {
							title: that.article.title,
							intro: that.article.intro,
							body: that.article.body,
							tags: that.article.tags,
							// type: that.article.isMD?'markdown':'text',
							type: that.isMD?'markdown':'text',
							cHash: cHash,
							cRand: cRand
						},
						// type of data we are expecting in return:
						dataType: 'json',
						timeout: 2000,
						success: function(data){
							console.log(data); 
							alert("update成功");
						},
						error: function(xhr, type){
							console.log(xhr);
							console.log(type);
							alert("error: "+type);
						}
					});
				} else { // edit
					$.ajax({
						type: 'post',
						url: backEnd+'update_blog_by_id.php',
						asyne: false,
						data: {
							id: that.article.id,
							title: that.article.title,
							intro: that.article.intro,
							body: that.article.body,
							// type: that.article.type,
							type: that.isMD?'markdown':'text',
							tags: that.article.tags,
							req: 'update',
							cHash: cHash,
							cRand: cRand
						},
						dataType: 'json',
						timeout: 2000,
						success: function(data){
							alert("update success");
							localStorage.removeItem('toEdit'); 
						},
						error: function(xhr, type){
							console.log(xhr);
							alert("error: "+type);
						}
					});
				}
			}
		}
	}
</script>
