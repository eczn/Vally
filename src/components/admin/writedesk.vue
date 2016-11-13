<!-- writedesk -->
<style>
	.blog-type {
		font-size: 0!important;
		cursor: pointer;
		margin-left: 10%;
		text-align: left;

	}
	.blog-type span {
		font-size: .3rem;
		display: inline-flex;
    	position: relative;
		margin: 0 .2rem;
		color: #5a5;
		padding: 0 .1rem;
    	line-height: 1.5;
    	background-color: #ddd;
		transition: all .3s;
	}

	.blog-type span:before, .blog-type span:after{
	    position: absolute;
	    content: "";
	}
	.blog-type span:before {
		border: transparent 0.75em solid;
		border-right-color: #ddd;
		top: 0;
		left: -1.5em;
		height: 0;
		width: 0;
	}






	.writedesk {
		position: absolute;
		top: 0; 
		left: 0; 
		width: 100%; 
		height: 100%; 
		background-color: #eee; 
		/*margin-bottom: 3rem;*/
	}
	
	.controler {
		height: 5%; 
	}
	.controler > span {
		transition: all .3s;
	}
	.type-choiced {
		color: #d55;
		/*transition: all .3s;*/
	}

	.writearea {
		width: 50%; 
		position: absolute;
		top: 5%; 
		left: 0; 
		display: inline-block;

		background-color: #ddd;

	}
	.writearea input, .writearea textarea {
		width: 100%; 
		max-width: 100%; 
		display: block;
		border: 1px dashed #bbb;
	}
	.atricle-meta {
		display: flex;
		height: 20%; 
		flex-direction: column;
		justify-content: center;

	}
	.writearea textarea {
		height: 75%; 
	}
	.writearea input {
		/*height: 5%; */
		padding: 1% 0; 
		margin: .5% 0;
	}
	/*.write*/

	.preview-area {
		/*display: inline-block;*/
		position: absolute;
		right: 0; 
		top: 5%; 
		width: calc(50% - 4px);
	}
</style>

<template>
	<div class="writedesk">
<!-- 		<div class="writearea">
			<input v-model="article.title" style="text-align:center;" type="text" placeholder="标题">
			<input v-model="article.intro" style="text-align:center;" type="text" placeholder="简短的blog介绍">
			<input v-model="article.tags" style="text-align:center;" type="text" placeholder="文章标签">
			<textarea v-model="article.body" placeholder="文章 [纯文本,Markdown] enabled"></textarea>
			<btn btntype="C" text="Update to ASOB" icon="true"></btn>
		</div> -->


		<div class="controler">
			<span class="return" v-link="{name: 'admin'}">return</span>
			<span class=""></span>
			<span v-on:click="article.isMD=!article.isMD" v-bind:class="{ 'type-choiced': !article.isMD }">htmlText</span>
			<span v-on:click="article.isMD=!article.isMD" v-bind:class="{ 'type-choiced': article.isMD }">markDown</span>
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
					title: '',
					body: '# i am eczn, building this;',
					intro: '', 
					tags: '', 
					isMD: true
				}
			}
		},
		components: {
			btn: myBtn
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
			}
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

				var cHash = getCookie('objHash');
				var cRand = getCookie('objRand'); 

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
						type: that.article.isMD?'markdown':'text',
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
						alert("出错了。。。 可能是超时了 也可能是当机了。。");
					}
				});
			}
		}
	}
</script>
