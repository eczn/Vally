<!-- blogList.vue -->
<!-- this vue component's css and main structure extended from blogList.vue -->
<style>
	.admin-list-li-text, .admin-list-li {
		text-align: left;
	}
	.admin-list-li {
		/*display: block;*/
		display: flex;
		align-items: center;
		position: relative;
		margin: .4rem 0;	
	}
	.admin-list-li-text {
		display: inline-block;
		margin-left: .4rem;
	}

	.admin-list-li > span {
		top: 0;
		margin-right: .4rem;
		margin-left: .1rem;
		font-size: .4rem;
		font-family: "Arial";
		line-height: .5rem;
		height: .5rem; 
	}

	.del-btn {
		width: .5rem;
		height: .5rem;
		top: 0;
		position: relative;
		display: inline-block;
	}

	.admin-ul-pageNum {
		position: absolute;
		/*margin-top: 1rem;*/
		/*align-items: center;*/
		display: flex;
		/*justify-content: center;*/

		flex-direction: column;
		height: 100%;
		top: 2rem;
		left: -1.3rem;
		padding-right: .1rem;
		min-height: 100%;
		border-right: 3px dashed #626;
		/*box-shadow: -16px -20px 4px rgba(0, 0, 30, .1);*/
		border-radius: 1rem;
	}

	.admin-ul-pageNum > li{
		margin: .1rem 0;
		flex-shrink: 0;
	}

</style>

<template>
	<div class="blog-list-container admin-list">
		<!-- <h1 class="btn-C" v-on:click="adminDel">删除</h1> -->
		<hr class="md-hr">
		<div  style="position: relative;" v-if="isShow==false" class="list-container">
			<btn btntype="C" text="删除所选项" icon="false"></btn>
			<ul class="blog-list-ul">
				<li class="admin-list-li" v-for="elem in blogList">
					<input v-bind:blogId="elem.id" class="del-btn" type="checkbox">
					<span>id: {{ elem.id }}</span>
					<div v-on:click="showBlog($index)" class="admin-list-li-text">
						<h1>{{elem.title}}</h1>
						<p>{{elem.body.slice(0, 40) + "......."}}</p>
					</div>
				</li>
			</ul>
			<ul class="admin-ul-pageNum">
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
	var myBtn = require('../public/btn.vue');

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
			btn: myBtn
		},
		ready: function(){
			$($(".pageNum")[0]).addClass("pageBtn-active");
			this.getBlogsByPage(1); 
		},
		methods: {
			adminDel: function(){
				var that = this; 
				$(".del-btn:checked").forEach(function(elem){
					// console.log(elem.getAttribute('blogId'));
					that.delBlogById(elem.getAttribute('blogId')); 
				});
			},
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
					data: {
						page: pageAt,
						pw: "" // 应该哈希化这里
					},
					dataType: 'json',
					timeout: 2000,
					success: function(data){
						thatVM.blogList = data.blogList;
						thatVM.serverPage = parseInt((parseInt(data.count)+6)/7);
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
					}
				});
			},
			changePage: function(index,that){
				this.getBlogsByPage(index+1);
				$(".pageNum").removeClass("pageBtn-active");
				$($(".pageNum")[index]).addClass("pageBtn-active")
			},
			delBlogById: function(id){
				// 
				$.ajax({
					type: 'GET', 
					url: backEnd+'/KV/del_blog_by_id.php',
					asyne: false,
					data: {
						id: id,
						pw: ''
					},
					dataType: 'json', 
					timeout: 2000, 
					success: function(data){
						// alert("删除是否成功： "+data.sql_status); 
					},
					error: function(xhr, type){
						// alert("出错: " + type); 
						console.log(type); 
					}
				});
			}
		},
		events: {
			B_onClick: function(){
				this.hiddenDisplay();
			},
			C_onClick: function(){
				console.log('C onclick');
				this.adminDel(); 
			}
		}
	}
</script>
