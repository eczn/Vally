<!-- writedesk -->
<style>
	.writedesk {
		position: relative;
		margin-bottom: 3rem;
	}

	.writedesk input {
		font-size: .8rem;
	}

	.writedesk input, .writedesk textarea, .editInputTextarea {
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

	.writearea {
		margin: 0 auto;
		width: 100%;
		text-align: center;
	}


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
    	/*border-radius: 0 .3em 0 0;*/
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
	.type-choiced {
		color: #d55!important;
		font-size: .35rem!important;
		/*margin-left: -1px;*/
		transition: all .3s;
	}
</style>

<template>
	<div class="writedesk">
		<btn btntype="B"></btn>

		
		<div class="writearea">
			<div class="blog-type">
				<span v-on:click="article.isMD=!article.isMD" v-bind:class="{ 'type-choiced': !article.isMD }">htmlText</span>
				<span v-on:click="article.isMD=!article.isMD" v-bind:class="{ 'type-choiced': article.isMD }">markDown</span>
			</div>
			<input v-model="article.title" style="text-align:center;" type="text" placeholder="标题">
			<!-- <t type="text" placeholder="body"> -->
			<textarea v-model="article.body" placeholder="文章 [纯文本,Markdown] enabled"></textarea>
			<btn btntype="C" text="Update to ASOB" icon="true"></btn>
		</div>
		<!-- {{ article.body.replace("\n", "<br>") }} -->


		<!-- rtmsg = rtmsg.Replace("\r\n", "\\r\\n"); -->
		<!-- <p>{{article.title}}</p> -->
		<!-- <p>{{article.body}}</p> -->
	</div>
</template>

<script>
	var myBtn = require('../public/btn.vue');
	 
	module.exports = {
		data: function(){
			return {
				article: {
					title: '',
					body: '',
					isMD: true
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

				// this.article.title = 
				// this.article.body = this.article.body.replace(/[\r\n]/g,"\n");

				// var parser,mdAfterParse;
				// if (this.article.isMD){
				// 	parser = new HyperDown(); 
				// 	mdAfterParse = parser.makeHtml( this.article.body );

				// 	mdAfterParse.replace(/[\']/g, "\'");
				// 	console.log(mdAfterParse);
				// } else {
				// 	// this.article.body = this.article.body.replace(/[\r\n]/g, "\\r\\n");
				// }

				$.ajax({
					type: 'POST',
					url: backEnd+'/KV/add_blog.php',
					asyne: false,
					// data to be added to query string:
					data: {
						title: that.article.title,
						body: that.article.body,
						type: that.article.isMD?'markdown':'text',
						pwd: "asd123" // 应该哈希化这里
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
