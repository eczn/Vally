<!-- display -->
<style>
	.blog-display {
		position: relative;
		margin: 0 3%;
	}
</style>

<template>
	<div class="blog-display">
		<btn btntype="B" text="return"></btn>
		<h1 style="text-align: center;font-size: .8rem;margin: .2rem;color: rgb(31,18,50);">{{ blog.title }}</h1>
		<div v-html="processFormat(blog)" class="md" style="font-size: .4rem;padding: 0 5%;"></div>
		<div style="padding: 0 5%;">
			<h2>写于 {{blog.date}}</h2>
			<h2>最后更新于{{blog.updateDate}}</h2>
			<h2>blogId: {{$route.query.id}}</h2>
		</div>
	</div>
</template>

<script>
	var myBtn = require('../public/btn.vue');
	module.exports = {
		data: function(){
			return {
				blog: {
					// title: 'asd', 
					// body: '#asdasd',
					// type: 'markdown'
				}
			}
		},
		props: ["id", "page"],
		components: {
			btn: myBtn
		},
		ready: function getBlogById(){
			// to get blog by id 
			// console.log(this.$route.query.id); chaxun 
			var that = this; 
			$.ajax({
				type: 'GET',
				url: backEnd+'/KV/get_blog_by_id.php',
				asyne: false,
				data: {
					id: this.$route.query.id,
					pw: "" // 应该哈希化这里
				},
				dataType: 'json',
				timeout: 500,
				success: function(data){
					that.blog = data.blog; 
				},
				error: function(xhr, type){
					that.getBlogById(); 
					console.log(xhr);
					console.log(type);
				}
			});
		},
		methods: {
			processFormat: function(blog){
				//blogList[blogPosition].body
				if (blog.type == 'text'){
					return blog.format; 
				} else {
					// str.replace(/[\r\n]/g,"");
					var mdHtml = parser.makeHtml(blog.body);
					// mdHtml = mdHtml.replace(/<\/p><p>/g,"<pp>");
					// mdHtml = mdHtml.replace(/<\/p><\/li>/g,"<pl>");
					// mdHtml = mdHtml.replace(/<\/p>/g,"<\/p><br />");
					// mdHtml = mdHtml.replace(/<pp>/g,"<\/p><p>");
					// mdHtml = mdHtml.replace(/<pl>/,"<\/p><\/li>");
					return mdHtml;
				}
			}
		},
		events: {
			B_onClick: function(){
				// sent from myBtn 
				window.history.go(-1);
			}
		},
		// beforeDestroy: function(){
		// 	// alert("!!!");
		// 	// this.$dispatch( , this.icon);
		// }
	}
</script>
