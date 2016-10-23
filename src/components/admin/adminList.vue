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


	.admin-blog-display {
		/*width: 125%;*/
		width: 48%;
		right: 1%;
		top: 10%;
		height: 90%;
		overflow-y: scroll; 
		position: absolute!important;
		border: 1px solid #222;
	}
	.blog-edit > input, .blog-edit > textarea{
		width: 100%!important;
		max-width: 100%!important;
		overflow-x: hidden;
		margin: 0!important;
		padding: 0!important;
		width: 100%!important;
	}
	.blog-edit > input {
		height: 10%;
		text-align: center;
		border-bottom: none!important;
	}
	.blog-edit > textarea {
		height: 90%;
	}

	.blog-edit {
		text-align: center;
		width: 48%;
		left: 1%;
		height: 90%; 
		top: 10%; 
		position: absolute!important;
		font-size: .3rem;
		/*min-height: 100000rem!important;*/
	}
	.edit {
		background-color: #fff;
		position: fixed;
		width: 100%;

		height: 100%; 
		left: 0;
		top: 0;
	}

	.beenSelected {
		font-size: .35rem;
	}

	.type-change {
		display: inline-block;
	}
	.type-change span {
		margin: 2px;
	}

</style>

<template>
	<div class="blog-list-container admin-list">
		<!-- <h1 class="btn-C" v-on:click="adminDel">删除</h1> -->
		<div  style="position: relative;" v-if="isShow==false" class="list-container">
			<btn btntype="C" text="删除所选项" icon="false"></btn>
			<ul class="blog-list-ul">
				<li class="admin-list-li" v-for="elem in blogList">
					<input v-bind:blogId="elem.id" class="del-btn" type="checkbox">
					<span>id: {{ elem.id }}</span>
					<div v-on:click="showBlog($index)" class="admin-list-li-text">
						<h1>{{elem.title}}</h1>
						<!-- <p>{{elem.body.slice(0, 40) + "......."}}</p> -->
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

		<div class="edit" v-else>
			<btn style="display: inline-block" btntype="B" text="return"></btn>
			<div class="type-change">
				<span v-on:click="blogList[blogPosition].type = 'text'" v-bind:class="{ 'beenSelected': blogList[blogPosition].type == 'text' }">htmlText</span>
				<span v-on:click="blogList[blogPosition].type = 'markdown'" v-bind:class="{ 'beenSelected': blogList[blogPosition].type == 'markdown' }">markDown</span>
			</div>
			
			<btn style="display: inline-block" btntype="C" icon="true" text="update"></btn>

			<div class="blog-display admin-blog-display">
				<h1>type: {{ blogList[blogPosition].type }}</h1>
				<h1>createAt: {{ blogList[blogPosition].date }}</h1>
				<h1>lastUpdate: {{ blogList[blogPosition].updateDate }}</h1>
				<h1 style="text-align: center;font-size: .8rem;margin: .2rem;color: rgb(31,18,50);">{{ blogList[blogPosition].title }}</h1>
				<div v-if="blogList[blogPosition].type == 'text'" v-html="textDis(blogList[blogPosition].body)"></div>
				<div v-else v-html="markVally(blogList[blogPosition])" class="md" style="font-size: .4rem;padding: 0 5%;"></div>
				<!-- .editInputarea defined in writedesk.vue -->
			</div>
			<div class="writedesk blog-edit">
				<input v-model="blogList[blogPosition].title" class="editInputTextarea" type="text">
				<input v-model="blogList[blogPosition].intro" placeholder="简短的介绍" class="editInputTextarea" type="text">
				<textarea v-model="blogList[blogPosition].body" class="editInputTextarea"></textarea>
			</div>
		</div>
	</div>
</template>

<script>
	var myBtn = require('../public/btn.vue');
					// mdHtml.toString(); 
					// console.log(mdHtml);
					// alert("!");
					// mdHtml.replace('sscc', '<scr'+'ipt>'); 
					// mdHtml.replace('ccss', '</scr'+'ipt>'); 
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
			textDis: function(textSrc){
				// blogList[blogPosition].body.replace(/\n/g, '<br />')
				return textSrc.replace(/\n/g, "<br />")+"<br /><br /><br /><br /><br />"; 

			},
			adminDel: function(){
				var that = this; 
				$(".del-btn:checked").forEach(function(elem){
					// console.log(elem.getAttribute('blogId'));
					that.delBlogById(elem.getAttribute('blogId')); 
				});
			},
			updateById: function(){
				// alert(this.blogList[id].id);
				$.ajax({
					type: 'post',
					url: backEnd+'/KV/update_blog_by_id.php',
					asyne: false,
					data: {
						id: this.blogList[this.blogPosition].id,
						title: this.blogList[this.blogPosition].title,
						intro: this.blogList[this.blogPosition].intro,
						body: this.blogList[this.blogPosition].body,
						req: 'update',
						type: this.blogList[this.blogPosition].type, 
						pwd: "asd123" // 应该哈希化这里
					},
					dataType: 'json',
					timeout: 2000,
					success: function(data){
						alert("update success");
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
					}
				});

			},
			markVally: function(blog){
				//blogList[blogPosition].body
				if (blog.type == 'text'){
					return blog.format;
				} else {
					// footnotes
					var mdHtml = this.myParser.makeHtml(blog.body); 
					return mdHtml+"<br /><br /><br /><br /><br />"; 
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
			C_onClick: function(type){
				if (type == 'false'){
					alert("false");
					this.adminDel(); 	
				} else if (type == 'true'){
					this.updateById();
				}
			}
		}
	}
</script>
