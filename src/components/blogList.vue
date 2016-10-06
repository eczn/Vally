<!-- blogList.vue -->
<style>
	.blog-list-ul {
		list-style-type: none;
		text-align: center;
		cursor: pointer;
	}

	.blog-list-li {
		margin: .5rem 0;
		transition: all .2s; 
	}

	.blog-list-li:hover {
		/*margin: .7rem 0!important;*/
		margin-left: .5rem;
		transform: rotate(1deg);
		text-shadow: -20px -4px 2px rgba(34, 34, 34, .2);
		/*transform-origin: 50% 0;*/
		transition: all .3s;
	}
	.blog-list-li:active {
		font-size: .4rem;
	}

	.blog-list-li > p {
		color: #555;
	}

	.blog-list-li > h1 {
		color: rgb(31,18,50);
	}

	.pageNum {
		margin: 0 5px;
		display: inline-flex;
		justify-content: center;
		align-items: center;

		/*width: 1rem;*/
		width: calc(1rem - 3px * 2);
		/*height: 1rem; */
		height: calc(1rem - 3px * 2);
		border-radius: 11rem;
		/*border: 3px dotted rgb(60, 45, 80);*/
		border: 3px dotted rgba(59, 59, 70, .618);
		/*box-shadow: 0 1rem 200px #eee;*/
		cursor: pointer;
		transition: all .3s;
		color: rgb(60, 45, 80);
	}
	.pageNum > span {
		font-family: Courier;
		font-size: .5rem; 
		font-weight: bolder;
		/*text-shadow: 0 5px 5px #bbb; */
	}

	.pageNum:hover {
		/*color: rgba(97, 83, 120, .7);*/
		/*border: 3px dotted rgba(59, 59, 70, .309);*/
		/*border: 2px dashed #555;*/
		transition: all .3s;
	}

	.pageBtn-active {
		color: #FFF;
		background-color: rgb(60, 45, 80);
	}

	.blog-list-container {
		margin: 0 1rem;
	}
</style>

<template>
	<div style="margin: 0 10%;" class="blog-list-container">
		<v-header position="first"></v-header>

		<div v-if="isShow==false" class="list-container">
			<ul class="blog-list-ul">
				<li v-on:click="showBlog($index)" class="blog-list-li" v-for="elem in blogList">
					<h1>{{elem.title}}</h1>
					<p>{{elem.body.slice(0, 26) + "......."}}</p>
				</li>
			</ul>

			<ul style="margin: 0 auto;margin-top: 1.5rem;text-align: center;">
				<li v-on:click="changePage($index,this)" v-for="num in serverPage" class="pageNum">
					<span>{{ num + 0 }}</span>
				</li>
			</ul>
		</div>
	
		<div style="position: relative;" v-else style="margin: 0 3%;" class="blog-display">
			<btn btntype="B" text="return"></btn>
			<h1 style="text-align: center;font-size: .8rem;margin: .2rem;color: rgb(31,18,50);">{{ blogList[blogPosition].title }}</h1>
			<div v-html="processFormat(blogList[blogPosition])" class="md" style="font-size: .4rem;padding: 0 5%;"></div>
		</div>
	</div>
</template>

<script>
	var myHeader = require('./public/header.vue');
	var myBtn = require('./public/btn.vue');
	// 常量
	var backEnd = "http://127.0.0.1/ProjectBuilding"; 
	var parser = new HyperDown(); 
				// 	mdAfterParse = parser.makeHtml( this.article.body );
	module.exports = {
		data: function(){
			return {
				blogList: [

				],
				serverPage: 5,
				blogPosition: 0,
				isShow: false,
				myParser: parser
			}
		},
		components: {
			"v-header": myHeader,
			btn: myBtn
		},
		ready: function(){
			$($(".pageNum")[0]).addClass("pageBtn-active");
			this.getBlogsByPage(1); 
		},
		methods: {
			processFormat: function(blog){
				//blogList[blogPosition].body
				if (blog.type == 'text'){
					return blog.format; 
				} else {
					return this.myParser.makeHtml(blog.body); 
				}
			},
			sortById: function(a, b){
				return a.id - b.id;
			},
			showBlog: function(index){
				this.blogPosition = index;
				this.isShow = true;
			},
			hiddenDisplay: function(){
				this.isShow = false;
			},
			getBlogsByPage: function(pageAt){
				var thatVM = this; 
				$.ajax({
					type: 'GET',
					url: backEnd+'/KV/get_blog.php',
					asyne: false,
					// data to be added to query string:
					data: {
						page: pageAt,
						pw: "" // 应该哈希化这里
					},
					// type of data we are expecting in return:
					dataType: 'json',
					timeout: 2000,
					success: function(data){
						// Supposing this JSON payload was received:
						//   {"project": {"id": 42, "html": "<div>..." }}
						// append the HTML to context object.
						// console.log(data);
						// thatVM.blogList.push(data);
						// console.log(data);
						thatVM.blogList = data.blogList;
						thatVM.serverPage = parseInt((parseInt(data.count)+7)/7);
						// console.log((parseInt(data.count)+7)/7);
					},
					error: function(xhr, type){
						// alert('Ajax error!')
						// do nothing
						// console.log(xhr);
						console.log(xhr);
						console.log(type);
					}
				});
			},
			changePage: function(index,that){
				this.getBlogsByPage(index+1);

				$(".pageNum").removeClass("pageBtn-active");
				$($(".pageNum")[index]).addClass("pageBtn-active")
			}
		},
		events: {
			B_onClick: function(){
				this.hiddenDisplay();
			}
		}
	}
</script>
