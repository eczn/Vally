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
					<!-- {{elem.id}} -->
					<h1>{{elem.title}}</h1>
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
	
		<div style="position: relative;" v-else style="margin: 0 3%;" class="blog-display">
			<btn btntype="B" text="return"></btn>
			<h1 style="text-align: center;font-size: .8rem;margin: .2rem;">{{ blogList[blogPosition].title }}</h1>
			<p style="text-indent: 2em;font-size: .4rem;padding: 0 5%;line-height: 1.5em;">{{ blogList[blogPosition].body }}</p>
			<!-- <p style="text-indent: 2em;font-size: .4rem;padding: 0 5%;line-height: 1.5em;">嗯，先要说明的是，这本书在中国大陆出版了，它经过了删改，所以如果想读到些“禁言”是不可能的。 怎么说呢，作者还是肯定大于否定的，不过仔细想想，书里有否定的东西吗？不记得了，有也是很少的。 书主要写的是他个人的人生经历，各大bbs的传闻很少见到，而且也很少涉及中国社会，如果对他这个人感兴趣的话，这本书倒是可以读读。</p>
			<p style="text-indent: 2em;font-size: .4rem;padding: 0 5%;line-height: 1.5em;">《活着》讲述一个人一生的故事，这是一个历尽世间沧桑和磨难老人的人生感言，是一幕演绎人生苦难经历的戏剧。小说的叙述者“我”在年轻时获得了一个游手好闲的职业——去乡间收集民间歌谣。在夏天刚刚来到的季节，遇到那位名叫福贵的老人，听他讲述了自己坎坷的人生经历： 地主少爷福贵嗜赌成性，终于赌光了家业一贫如洗，穷困之中福贵因母亲生病前去求医，没想到半路上被国民党部队抓了壮丁，后被解放军所俘虏，回到家乡他才知道母亲已经过世，妻子家珍含辛茹苦带大了一双儿女，但女儿不幸变成了哑巴。
真正的悲剧从此才开始渐次上演。家珍因患有软骨病而干不了重活；儿子因与县长夫人血型相同，为救县长夫人抽血过多而亡；女儿凤霞与队长介绍的城里的偏头二喜喜结良缘，产下一男婴后，因大出血死在手术台上；而凤霞死后三个月家珍也相继去世；二喜是搬运工，因吊车出了差错，被两排水泥板夹死；外孙苦根便随福贵回到乡下，生活十分艰难，就连豆子都很难吃上，福贵心疼便给苦根煮豆吃，不料苦根却因吃豆子撑死……生命里难得的温情将被一次次死亡撕扯得粉碎，只剩得老了的福贵伴随着一头老牛在阳光下回忆。[1] </p> -->
		</div>
	</div>
</template>

<script>
	var myHeader = require('./public/header.vue');
	var myBtn = require('./public/btn.vue');
	// 常量
	var backEnd = "http://127.0.0.1/ProjectBuilding"; 

	module.exports = {
		data: function(){
			return {
				blogList: [

				],
				serverPage: this.get_page(),
				blogPosition: 0,
				isShow: false
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
					timeout: 2000,
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
		},
		events: {
			B_onClick: function(){
				this.hiddenDisplay();
			}
		}
	}
</script>
