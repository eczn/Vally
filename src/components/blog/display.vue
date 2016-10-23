<!-- display -->
<style>
	.a-blog-display {
		position: relative;
		margin: 0 3%;
	}

	.after-wait {
		/*display: none; */
		opacity: 0;
	}

	.opa1 {
		opacity: 1; 
		transition: all .5s; 
	}

	.blog-info {
		position: relative;
		margin: 0 3.5%;
		padding: .5% 1.5%;
		/*border-top: 2px dotted rgb(31,18,50);*/
		/*width: 50%;*/
		text-align: right;
	}

	.blog-info:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0; 
	
		width: 18em; 
		height: 4px; 
		border-radius: 4px;
		/*background-color: #222;*/

		/*filter: blur(1px);*/
		background: linear-gradient(to right, transparent, rgba(31,18,50,0.2), rgba(31,18,50,0.618));
		
	}

	.blog-info > h2 {
		font-weight: normal;
		font-size: 10px;
		color: #222;
	}

</style>

<template>
	<div class="a-blog-display">
		<btn btntype="B" text="return" style="display: inline-block;"></btn>
		<span style="font-size: .3rem;">Simple-introdution 4 this blog here: right side of btn B</span>
		<wait></wait>
		<div class="after-wait">
			<h1 style="text-align: center;font-size: .8rem;margin: .2rem;color: rgb(31,18,50);">{{ blog.title }}</h1>
			<div v-html="processFormat(blog)" class="md" style="font-size: .4rem;padding: 0 5%;"></div>

			<div class="blog-info">
				<h2>blogId: {{$route.query.id}}</h2>
				<h2>写于 {{blog.date}}</h2>
				<h2>最后更新于{{blog.updateDate}}</h2>
			</div>
		</div>
	</div>
</template>

<script>
	var myBtn = require('../public/btn.vue'); 
	var wait = require('../public/waitEff.vue'); 

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
			btn: myBtn,
			wait: wait
		},
		ready: function(){
			// to get blog by id 
			// console.log(this.$route.query.id); chaxun 
			this.$broadcast('waitToggle');

			this.getBlogById(this.$route.query.id); 
		},
		methods: {
			getBlogById: function(queryId){
				var that = this; 
				$.ajax({
					type: 'GET',
					url: backEnd+'/KV/get_blog_by_id.php',
					asyne: false,
					data: {
						id: queryId,
						pw: "" // 应该哈希化这里
					},
					dataType: 'json',
					timeout: 1000,
					success: function(data){
						that.blog = data.blog; 
						// that.$broadcast('waitToggle');
						that.pushAll();
					},
					error: function(xhr, type){
						that.$broadcast('waitToggle');

						that.ready(); 
						console.log(xhr);
						console.log(type);
					}
				});
			},
			pushAll: function(){
				// opacity: 0;
				this.$broadcast('waitToggle');
				$(".after-wait").addClass("opa1");
			},
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
