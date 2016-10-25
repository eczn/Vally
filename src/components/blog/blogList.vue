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
		/*font-size: .3rem;*/
		opacity: 0;
		transition: all .3s;
	}

	.blog-list-li > p {
		color: #555;
	}

	.blog-list-li > h1 {
		color: rgb(31,18,50);
		white-space: nowrap;
	}

	.pageNum {
		margin: 0 5px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 1rem;
		height: 1rem; 
		width: calc(1rem - 3px * 2);
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
		/*margin: 0 1rem;*/
	}
</style>

<template>
	<div class="blog-list-container">
		<v-header position="first"></v-header>

		<div v-if="this.$route.name=='blogList'">
			<ul class="blog-list-ul">
				<li v-on:click="showBlog($index)" class="blog-list-li" v-for="elem in blogList">
					<h1>{{elem.title}}</h1>
					<!-- <p>{{elem.body.slice(0, 26) + "......."}}</p> -->
					<p>{{elem.intro}}</p>
				</li>
			</ul>

			<ul style="margin: 0 auto;margin-top: 1.5rem;text-align: center;">
				<li v-on:click="changePage($index,this)" v-for="num in serverPage" class="pageNum" v-bind:class="{'pageBtn-active': $route.query.page==num}">
					<span>{{ num + 0 }}</span>
				</li>
			</ul>
		</div>
		
		<router-view v-bind:blog="blogList[blogPosition]"></router-view>
	</div>
</template>

<script>
	var myHeader = require('../public/header.vue');
	var myBtn = require('../public/btn.vue');
	// 常量
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
			// alert(this.$route.query.page)
			// $($(".pageNum")[this.$route.query.page]).addClass("pageBtn-active");
			// if (this.$route.name == 'display'){
			// 	return;
			// }
			// alert("!!");
			if (this.$route.name == 'display'){
				this.$broadcast("whereUserActuallyFrom", "display");
			} else {
				this.$broadcast("whereUserActuallyFrom", "blogList");
			}

			if (this.$route.query.page == undefined){
				if (this.$route.name != 'display'){
					this.$route.router.go({
						name: "blogList", 
						query: {
							page: 0
						}
					});
					this.getBlogsByPage(0+1);
				} else {
					// this.getBlogsByPage(); 
					// this.$brocast("pageAt",this.$route.query.page)
				}
				
			} else {
				this.getBlogsByPage(parseInt(this.$route.query.page)+1);
			}
		},
		methods: {
			processFormat: function(blog){
				//blogList[blogPosition].body

				if (blog.type == 'text'){
					return blog.format; 
				} else {
					// str.replace(/[\r\n]/g,"");
					console.log(blog.body);
					var mdHtml = this.myParser.makeHtml(blog.body);
					// mdHtml = mdHtml.replace(/<\/p><p>/g,"<pp>");
					// mdHtml = mdHtml.replace(/<\/p><\/li>/g,"<pl>");
					// mdHtml = mdHtml.replace(/<\/p>/g,"<\/p><br />");
					// mdHtml = mdHtml.replace(/<pp>/g,"<\/p><p>");
					// mdHtml = mdHtml.replace(/<pl>/,"<\/p><\/li>");

					console.log(mdHtml);
					return mdHtml;
				}

			},
			sortById: function(a, b){
				return a.id - b.id;
			},

			showBlog: function(index){
				this.blogPosition = index;
				// this.isShow = true;
				this.$route.router.go({
					name: "display",
					query: {
						id: this.blogList[this.blogPosition].id
					}
				});
			},
			getBlogsByPage: function(pageAt){
				var thatVM = this;
				$.ajax({
					type: 'GET',
					url: backEnd+'get_blog.php',
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

						thatVM.serverPage = parseInt((parseInt(data.count)+6)/7);
						// console.log((parseInt(data.count)+7)/7);
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
					}
				});
			},
			changePage: function(index,that){
				this.getBlogsByPage(index+1);
				this.$route.router.go({
					name: "blogList", 
					query: {
						page: index
					}
				});
			}
		}
	}
</script>
