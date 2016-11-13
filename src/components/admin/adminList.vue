<!-- adminList.vue -->
<style>
	.admin-list-li-text, .admin-list-li {
		text-align: left;
	}
	.admin-list-li {
		/*display: flex;*/
		
		position: relative;
		margin: .4rem 0;	
	}
	.admin-list-li-text {
		display: inline-block;
		margin-left: .4rem;
		/*min-width: 250px; */
	}
	.admin-list-li-text > h1 {
		font-weight: normal;
	}
	@media screen and (max-width: 400px){
		.admin-list-li-text {
			display: block;
			margin-top: .2rem;
			margin-bottom: 1rem; 
			text-align: center;

		}
	}

	@media screen and (min-width: 400px){
		.admin-list-li {
			display: flex;
			align-items: center;
		}
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
		width: 26px;
		height: 26px; 
		margin: 4px; 
		top: 0;
		position: relative;
		display: inline-block;
	}

	.admin-ul-pageNum {
		position: absolute;
		display: flex;
		width: 1rem;

		flex-direction: column;
		-webkit-flex-direction: column;
		

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
		<div style="position: relative;" class="list-container">
			<btn btntype="C" text="删除所选项" icon="false"></btn>
			<ul class="blog-list-ul">
				<li class="admin-list-li" v-for="elem in blogList">
					<input v-bind:blogId="elem.id" class="del-btn" type="checkbox">
					<span>id: {{ elem.id }}</span>
					<div v-on:click="showBlog($index)" class="admin-list-li-text">
						<h1>{{elem.title}}</h1>
						<p>{{elem.intro}}</p>
					</div>
				</li>
			</ul>
			<ul class="admin-ul-pageNum">
				<li v-on:click="changePage($index,this)" v-for="num in serverPage" class="pageNum">
					<span>{{ num + 0 }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	var myBtn = require('../public/btn.vue');
	var writeDesk = require('./writedesk.vue'); 

	module.exports = {
		data: function(){
			return {
				blogList: [

				],
				serverPage: 5,
				blogPosition: 0,
				// isShow: false,
				myParser: parser
			}
		},
		components: {
			btn: myBtn,
			writedesk: writeDesk
		},
		ready: function(){
			$($(".pageNum")[0]).addClass("pageBtn-active");
			this.getBlogsByPage(1); 
		},
		methods: {
			// textDis: function(textSrc){
			// 	return textSrc.replace(/\n/g, "<br />")+"<br /><br /><br /><br /><br />"; 
			// },
			adminDel: function(){
				var that = this; 
				$(".del-btn:checked").forEach(function(elem){
					that.delBlogById(elem.getAttribute('blogId')); 
				});
			},
			showBlog: function(index){
				window.localStorage.toEdit = JSON.stringify(this.blogList[index]); 
				this.blogPosition = index;

				this.$route.router.go({
					name: 'writedesk',
					query: {
						edit: 'yes'
					}
				}); 
			},
			hiddenDisplay: function(){
				this.isShow = false;
			},
			getBlogsByPage: function(pageAt){
				var thatVM = this; 
				$.ajax({
					type: 'GET',
					url: backEnd+'get_blog.php',
					asyne: false,
					data: {
						page: pageAt,
						need_body: 'yes'
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
						thatVM.getBlogsByPage(pageAt); 
					}
				});
			},
			changePage: function(index,that){
				this.getBlogsByPage(index+1);
				$(".pageNum").removeClass("pageBtn-active");
				$($(".pageNum")[index]).addClass("pageBtn-active")
			},
			delBlogById: function(id){
				var cHash = getCookie('objHash');
				var cRand = getCookie('objRand'); 
				var that = this; 
				$.ajax({
					type: 'POST', 
					url: backEnd+'del_blog_by_id.php',
					asyne: false,
					data: {
						id: id,
						// hash 
						cHash: cHash,
						cRand: cRand
					},
					dataType: 'json', 
					timeout: 2000, 
					success: function(data){
						// alert("删除是否成功： "+data.sql_status);
						if (data.status == 1){
							alert("删除成功");

							// old code 
							$($(".pageNum")[0]).addClass("pageBtn-active");
							that.getBlogsByPage(1); 

						} else {
							alert("出错了");
						}
					},
					error: function(xhr, type){
						alert("error: "+type); 
						console.log(xhr); 
						console.log(type); 
					}
				});
			}
		},
		events: {
			B_onClick: function(){
				this.hiddenDisplay();
			},
			C_onClick: function(type){
				if (type == 'false'){
					this.adminDel();
				} else if (type == 'true'){
					this.updateById();
				}
			}
		}
	}
</script>
