<!-- blogList.vue -->
<style>
	.blog-list-ul {
		list-style-type: none;
		text-align: center;
		cursor: pointer;
	}

	.blog-list-li {
		position: relative;
		margin: .5rem 0;
		/*padding: 16px 0; */
		padding-bottom: .5rem;
		/*min-width: 320px;*/
		/*border-radius: .4rem;*/
		transition: all .65s;
	}

	.blog-list-li > p {
		color: #555;

		/*font-size: */
	}

	.blog-list-li > h1 {
		color: rgb(31,18,50);
		font-size: 0.6rem;
		font-weight: normal;
		/*white-space: nowrap;*/
	}

	.blog-list-li > span {
		position: relative;
		/*z-index: -9;*/
		/*filter: blur(1px);*/
		/*display: flex;*/
		display: block;
		justify-content: flex-start;
		align-items: center;
		/*text-align: left;*/
		/*right: 10%;*/
		margin: 0 10%;
		width: 80%;
		height: 100%; 
		top: 0;
		/*font-size: 1rem;*/
		font-size: .6rem;
		font-weight: bold;
		/*color: rgba(31,18,50, .0618);*/
		/*color: rgb(31,18,50);*/
		color: rgb(255,255,255);

		/*text-align: center;*/
	}
	.blog-list-li > span:after {
		content: "";
		border-radius: 2px;
		/*position: absolute;*/
		/*position: relative;*/
		margin: 0 auto;
		margin-top: 20px;
		width: 24px;
		height: 24px;

		border-left: 2px solid rgba(31,18,50,0.8);
		border-top: 2px solid rgba(31,18,50,0.8);
		transform: rotate(45deg);
		display: block;
		bottom: 0;
		/*z-index: 999; */

		/*left: 50%;*/
	}

	.blog-list-li ul {

	}

	.blog-list-li li {
		list-style: none; 
		display: inline-block;
		margin: 2px 4px;
		/*z-index: 999;*/
	}

	@media screen and (min-width: 768px) {
		.blog-list-li:hover {
			opacity: .8;
			/*margin-left: .5rem;*/
			/*transform: rotate(1deg);*/
			background-color: rgba(31,18,50,.02);
			/*background-color: rgba(31,18,50,.2);*/
			/*text-shadow: -20px -4px 2px rgba(34, 34, 34, .2);*/
			text-shadow: 0px 6px 4px rgba(34, 34, 34, .2);

			transition: all .3s;
		}
		.blog-list-li:active {
			/*font-size: .3rem;*/
			opacity: 0;
			transition: opacity .3s;
		}
	}

	@media screen and (max-width: 768px) {
		.blog-list-li > h1:active {
			margin-top: .4rem;
			opacity: 0.5;
		}
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
/*		border-bottom: 1px dashed;
		padding-bottom: 1rem;*/
	}
</style>

<template>
	<div class="blog-list-container">
		<v-header position="first"></v-header>
		<div v-if="this.$route.name=='blogList'">
			<ul class="blog-list-ul">
				<li v-on:click="showBlog($index)" class="blog-list-li" v-for="elem in blogList">
					<h1>{{elem.title}}</h1>
					<p>{{elem.intro}}</p>
					<!-- <p v-html="elem.tags"></p> -->
					<span></span>
					<ul>
						<li v-for="tag in elem.tags.split(',')">
							{{tag}}
						</li>
					</ul>
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
	
	module.exports = {
		data: function(){
			return {
				blogList: [

				],
				serverPage: 5,
				blogPosition: 0,
				isShow: false,
				myParser: parser,
				nowArch: 'none'
			}
		},
		components: {
			"v-header": myHeader,
			btn: myBtn
		},
		ready: function(){
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
						archive: thatVM.nowArch,
						need_body: 'no'
					},
					// type of data we are expecting in return:
					dataType: 'json',
					timeout: 2000,
					success: function(data){
						
						if (data.status == 404){
							thatVM.blogList = [{"id":"-404","title":"Not Found!","intro":"没找到这个分类...","body":"404 not fonud","format":"","type":"markdown","date":new Date(),"updateDate":new Date(),"tags":"#404 #Vally-Sys"}]; 
							thatVM.serverPage = 1;
						} else {
							thatVM.blogList = data.blogList;
							thatVM.serverPage = parseInt((parseInt(data.count)+6)/7);
							footOn('v-top');
						}
						

						// console.log((parseInt(data.count)+7)/7);
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
						setTimeout(function(){
							thatVM.getBlogsByPage(pageAt);
						},400); 
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
		}, 
		events: {
			newArch: function(newArch){
				// alert(typeof newArch.key);

				// alert(newArch.key)
				this.nowArch = newArch.key;
				this.getBlogsByPage(1); 
			}
		}
	}
</script>
