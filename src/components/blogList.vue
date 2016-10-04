<!-- blogList.vue -->
<style>
	.blog-list-ul {
		list-style-type: none;
		text-align: center;
		cursor: pointer;
	}

	.blog-list-li {
		margin: .5rem 0;
	}

	.blog-list-li > h2 {
		color: #222;
	}

	.blog-list-li > p {
		color: #555;
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
		color: rgba(97, 83, 120, .7);
		border: 3px dotted rgba(59, 59, 70, .309);
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
		<ul class="blog-list-ul">
			<li v-on:click="showBlog" class="blog-list-li" v-for="elem in blogList">
				<!-- {{elem.id}} -->
				<h2>{{elem.title}}</h2>
				<!-- this is the intro of the body -->
				<!-- <p>{{elem.body.slice(0,25)}}</p> -->
				<p>{{elem.body}}</p>
			</li>
		</ul>

		<ul style="margin: 0 auto;margin-top: 1.5rem;text-align: center;">
			<li v-on:click="changePage($index,this)" v-for="num in serverPage" class="pageNum">
				<span>{{ num + 1}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	var myHeader = require('./public/header.vue');

	// 常量
	var backEnd = "http://127.0.0.1/ProjectBuilding"; 

	module.exports = {
		data: function(){
			return {
				blogList: [

				],
				serverPage: this.get_page()
			}
		},
		components: {
			"v-header": myHeader
		},
		ready: function(){
			$($(".pageNum")[0]).addClass("pageBtn-active");
			this.getBlogsByPage(1); 
		},
		methods: {
			sortById: function(a, b){
				return a.id - b.id;
			},
			showBlog: function(){

			},
			get_page: function(){
				// get_page.php
				return 3;
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
					timeout: 300,
					context: $('body'),
					success: function(data){
						// Supposing this JSON payload was received:
						//   {"project": {"id": 42, "html": "<div>..." }}
						// append the HTML to context object.
						// console.log(data);
						// thatVM.blogList.push(data);
						// console.log(data);
						thatVM.blogList = data.blogList;
					},
					error: function(xhr, type){
						// alert('Ajax error!')
						// do nothing
						// console.log(xhr);
					}
				});
			},
			changePage: function(index,that){
				this.getBlogsByPage(index+1);

				$(".pageNum").removeClass("pageBtn-active");
				$($(".pageNum")[index]).addClass("pageBtn-active")
			}
		}
	}
</script>
