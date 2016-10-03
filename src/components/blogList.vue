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
		margin: .1rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;

		width: 1rem;
		height: 1rem; 
		border-radius: 1rem; 
		border: 2px dashed rgb(60, 45, 80);
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
		border: 2px dashed rgb(97, 83, 120);
		/*border: 2px dashed #555;*/
		transition: all .3s;
	}

</style>

<template>
	<div class="blog-list-container">
		<v-header position="first"></v-header>
		<ul class="blog-list-ul">
			<li class="blog-list-li" v-for="elem in blogList">
				<!-- {{elem.id}} -->
				<h2>{{elem.title}}</h2>
				<p>{{elem.body}}</p>
				
			</li>
		</ul>
		
		<div style="margin: 0 auto;margin-top: 1.5rem;text-align: center;">
			<div class="pageNum">
				<span>1</span>
			</div>

			<div class="pageNum">
				<span>2</span>
			</div>
		</div>
	</div>
</template>

<script>
	var myHeader = require('./public/header.vue');

	module.exports = {
		data: function(){
			return {
				blogList: [

				]
			}
		},
		components: {
			"v-header": myHeader
		},
		ready: function(){
			var tempId = 0; 
			var thatVM = this; 
			for (;tempId<7;tempId++){
				$.ajax({
					type: 'GET',
					url: 'http://127.0.0.1/ProjectBuilding/KV/get_blog.php',
					asyne: false,
					// data to be added to query string:
					data: {
						id: tempId
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

						thatVM.blogList.push(data);
					},
					error: function(xhr, type){
						// alert('Ajax error!')
						// do nothing
					}
				})
			}

			thatVM.blogList.sort(thatVM.sortById);

		},
		methods: {
			sortById: function(a, b){
				return a.id - b.id;
			}
		}
	}
</script>
