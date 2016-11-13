<!-- board.vue -->
<style>
	.comment-board {
		margin: 1rem auto; 
		min-width: 250px; 
		width: 30%; 
		transition: all .3s; 
	}
	.comment-board > li {
		position: relative;
		list-style: none; 
		margin-left: -.4rem;
		margin-bottom: 1rem; 
		/*display: flex;*/
	}

	.comment-board > li > span {
		display: inline-block;
	}

	.comment-user {
		position: relative;
	}
	.comment-user > p {
		width: 50px; 
		text-align: center;
	}

	.comment-body {
		position: relative;

		width: 100%; 
		min-height: 128px;
		border: 1px dashed #bbc; 
		border-radius: .15rem; 
		/*border-bottom: 2px solid #bbc; */
		/*border-top: 3px solid #bbc; */
	}

	@media screen and (max-width: 900px) {
		.comment-board {
			width: 30%; 
		}
		.comment-body {
			padding: .1rem .4rem; 
			margin-left: -.2rem;
			padding-bottom: .5rem; 
		}
	}

	@media screen and (min-width: 900px) {
		.comment-board {
			width: 45%; 
		}
		.comment-body {
			padding: .25rem .4rem;
			margin-left: -.2rem;
			padding-bottom: .5rem; 
		}
	}

	.comment-body > span {
		position: absolute;
		opacity: .5;
		bottom: .1rem; 
		right: .4rem; 
		font-size: .15rem; 
	}

	.comment-body > p {
		font-size: .25rem; 
	}

	.comment-board .comment-input {
		border: none; 
		width: 100%; 
		max-width: 100%; 
		min-height: 128px; 
		background-color: transparent;
	}

	.regis {
		position: fixed;
		display: none; 
		opacity: 0; 
		width: 100%; 
		height: 100%; 
		top: 0; 
		left: 0; 
		height: 100%; 
		z-index: 900; 
		background-color: rgba(0,0,0,.5);
		transition: opacity .5s; 
	}
	.regis:before {
/*		content: ""; 
		position: absolute;
		top: 0;
		left: 0;
		height: 100%; 
		width: 100%; 
		background-image: url('../../images/black_around.png'); 
		background-size: 100%; 
		opacity: .5;
		z-index: 5; */
	}
	.regis > div {
		color: #fff; 
		text-align: center;
		margin: 1rem auto; 
		position: relative;
		z-index: 991; 
	}
	.regis > div > input, .regis > div > p {
		display: block;
		margin: 5px auto; 

		width: 30%; 
		min-width: 300px; 
		font-size: .3rem; 
		text-align: center;
	}
	.regis > div > input {
		padding: .2rem; 
		margin-bottom: .3rem; 
		min-width: 300px;
		width: 30%; 
		background-color: rgba(255,255,255,.1);
		border-radius: 4px; 
		border: 1px dashed; 
		color: #FFF; 
	}
	.regis > div > span {
		display: inline-block;
		cursor: pointer;
		border-radius: 6px; 
		margin: .3rem .2rem; 
		font-size: .3rem; 
		padding: .1rem .2rem; 
		border: 1px dashed; 
	}
	.btn-launch {
		cursor: pointer;

		font-weight: normal;
		font-size: .36rem;
		border: 1px dashed;
		padding: .05rem .18rem;
		margin: 0 .1rem; 
		border-radius: .15rem;
		color: #bbc;
	}
	.comment-board > li > div {
		position: absolute;
		right: 0px;
		bottom: 20px;
	}

</style>
<template>
	<ul class="comment-board">
		<li v-for="comment in comments">
			<!-- <p>{{comment.id}}</p> -->
			<span class="comment-body">
				<p class="md" v-html="mdFilter(comment.comment)"></p>
				<span>{{comment.update_date}}</span>
			</span>
			<span class="comment-user">
				<img style="margin: 5px;" width="40" v-bind:src="comment.avatar" alt="">
				<svg width="40" height="40" style="position: absolute;top: -2px;left: 50px;" xmlns="http://www.w3.org/2000/svg">
					<!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
					<g>
						<title>background</title>
						<rect fill="rgba(255,255,255,0)" id="canvas_background" height="42" width="42" y="-1" x="-1"/>
						<g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
							<rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
						</g>
					</g>
					<g>
						<title>Layer 1</title>
						<path stroke-dasharray="3,2" stroke="#bbc" id="svg_1" d="m-3.5,-59.141235l0,0c0,-6.408365 3.661584,-11.603371 8.178375,-11.603371l3.717445,0l0,0l17.843732,0l33.456988,0c2.169045,0 4.249246,1.222492 5.782992,3.398548c1.533737,2.176056 2.395388,5.12742 2.395388,8.204823l0,29.00843l0,0l0,17.405052l0,0c0,6.408368 -3.661581,11.603371 -8.178378,11.603371l-33.456988,0l-23.310634,29.504675l5.466902,-29.504675l-3.717445,0c-4.516792,0 -8.178375,-5.195002 -8.178375,-11.603371l0,0l0,-17.405052l0,0l-0.000002,-29.00843z" opacity="1" fill="#fff"/>
						<path id="svg_2" d="m49.35074,43.773244l0,0c0,-0.096554 0.076438,-0.174826 0.170729,-0.174826l0.077604,0l0,0l0.3725,0l0.698437,0c0.04528,0 0.088706,0.018419 0.120724,0.051205c0.032018,0.032786 0.050005,0.077254 0.050005,0.123621l0,0.437066l0,0l0,0.262239l0,0c0,0.096554 -0.076438,0.174826 -0.170729,0.174826l-0.698437,0l-0.486625,0.444542l0.114125,-0.444542l-0.077604,0c-0.094291,0 -0.170729,-0.078272 -0.170729,-0.174826l0,0l0,-0.262239l0,0l0,-0.437066z" stroke-width="1" stroke="#000" fill="#fff"/>
					</g>
				</svg>
				<!-- <p>{{comment.who_say}}</p> -->
				<a style="display: block;color: currentColor;text-align: center;" target="_blank" v-bind:href="comment.website">{{comment.who_say}}</a>
			</span>
		</li>

		<li v-on:click="checkUser()">
			<span class="comment-body">
				<textarea v-model="commenter.comment" class="comment-input" type="text" placeholder="轮到你了...."></textarea>
				<span>{{now_time}}</span>
			</span>
			<span class="comment-user">
				<img style="margin: 5px;" width="40" v-bind:src="commenter.avatar" title="{{commenter.email}}">
				<svg width="40" height="40" style="position: absolute;top: -2px;left: 50px;" xmlns="http://www.w3.org/2000/svg">
					<!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
					<g>
						<title>background</title>
						<rect fill="rgba(255,255,255,0)" id="canvas_background" height="42" width="42" y="-1" x="-1"/>
						<g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
							<rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
						</g>
					</g>
					<g>
						<title>Layer 1</title>
						<path stroke-dasharray="3,2" stroke="#bbc" id="svg_1" d="m-3.5,-59.141235l0,0c0,-6.408365 3.661584,-11.603371 8.178375,-11.603371l3.717445,0l0,0l17.843732,0l33.456988,0c2.169045,0 4.249246,1.222492 5.782992,3.398548c1.533737,2.176056 2.395388,5.12742 2.395388,8.204823l0,29.00843l0,0l0,17.405052l0,0c0,6.408368 -3.661581,11.603371 -8.178378,11.603371l-33.456988,0l-23.310634,29.504675l5.466902,-29.504675l-3.717445,0c-4.516792,0 -8.178375,-5.195002 -8.178375,-11.603371l0,0l0,-17.405052l0,0l-0.000002,-29.00843z" opacity="1" fill="#fff"/>
						<path id="svg_2" d="m49.35074,43.773244l0,0c0,-0.096554 0.076438,-0.174826 0.170729,-0.174826l0.077604,0l0,0l0.3725,0l0.698437,0c0.04528,0 0.088706,0.018419 0.120724,0.051205c0.032018,0.032786 0.050005,0.077254 0.050005,0.123621l0,0.437066l0,0l0,0.262239l0,0c0,0.096554 -0.076438,0.174826 -0.170729,0.174826l-0.698437,0l-0.486625,0.444542l0.114125,-0.444542l-0.077604,0c-0.094291,0 -0.170729,-0.078272 -0.170729,-0.174826l0,0l0,-0.262239l0,0l0,-0.437066z" stroke-width="1" stroke="#000" fill="#fff"/>
					</g>
				</svg>
				<!-- <p>{{commenter.name}}</p> -->
				<a style="display: block;border: none; color: currentColor;text-align: center;" target="_blank" v-bind:href="commenter.website">{{commenter.who_say}}</a>
			</span>
			<div v-if="commenter.avatar != ''">
				<span v-on:click="checkUser('√')" class="btn-launch">SettinG</span>
				<span v-on:click="launch" class="btn-launch">LauncH</span>
			</div>
		</li>

		<div class="regis">
			<div>
				<p>your name</p>
				<input v-model="commenter.who_say" type="text">
				<p>avatar (url)</p>
				<input v-model="commenter.avatar" type="text">
				<p>your website</p>
				<input v-model="commenter.website" type="text">
				<p>e-mail</p>
				<input v-model="commenter.email" type="text">

				<span v-on:click="save">SavE</span>
				<span v-on:click="cancel">CanceL</span>
			</div>
		</div>
	</ul>
</template>

<script>
	module.exports = {
		data: function(){
			return {
				now_time: new Date(), 
				commenter: window.localStorage.hasOwnProperty('commenter')?JSON.parse(window.localStorage.commenter):{
					who_say: '', 
					avatar: '', 
					website: '', 
					email: '',
					comment: ''
				},
				comments: []
			}
		},
		ready: function(){
			// alert(this.$route.query.id); 
			// get comments by id
			setInterval(this.add1s, 1000); 

			this.getCommentsById(this.$route.query.id); 
		}, 
		methods: {
			add1s: function(){
				this.now_time = new Date(); 
			}, 
			checkUser: function(force_display){
				if (window.localStorage.commenter == undefined || force_display || this.commenter.avatar == '') {

					$(".regis").css("display", 'block'); 
					setTimeout(function(){
						$(".regis").css("opacity", '1'); 
					},50); 
					return false; 
				} else {
					return true; 
				}
			}, 
			cancel: function(){
				var temp = $(".regis").css('opacity', '0'); 
				setTimeout(function(){
					temp.css('display', 'none'); 
				},500); 
			}, 
			save: function(){
				window.localStorage.commenter = JSON.stringify(this.commenter); 
				this.cancel(); 
			},
			mdFilter: function(str){
				return parser.makeHtml(str);
			}, 
			getCommentsById: function(id){
				var that = this; 
				$.ajax({
					type: 'GET',
					url: backEnd+'get_comments_by_id.php',
					asyne: false,
					data: {
						id: id
					},
					dataType: 'json',
					timeout: 1000,
					success: function(data){
						that.comments = data; 
						// that.comments.reverse(); 
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
						// alert("error: "+type); 
						setTimeout(function(){
							that.getCommentsById(id); 
						}, 1000); 
					}
				});	
			}, 
			launch: function(){
				var that = this; 
				if (this.commenter.comment == ''){
					return ; 
				} else if (this.commenter.comment.length < 8) {
					alert('字数不够 8 也想装逼？'); 
					return ; 
				}
				
				this.commenter.id = this.$route.query.id; 

				$.ajax({
					type: 'post',
					url: backEnd+'post_comment_by_id.php',
					asyne: false,
					data: that.commenter,
					dataType: 'json',
					timeout: 1000,
					success: function(data){
						console.log(data); 
						var i = 0; 
						var tempArr = new Array(); 

						that.commenter.update_date = that.timeGenerator(new Date()); 
						
						for (i in that.commenter){
							tempArr[i] = that.commenter[i]; 
						}

						that.comments.push(tempArr);
						that.commenter.comment = '';
					},
					error: function(xhr, type){
						console.log(xhr);
						console.log(type);
						alert("error: "+type); 
					}
				});
			}, 
			timeGenerator: function(date, config){
				var temp; 

				if (config){

				} else {
					config = new Array(); 
					config[0] = new String('-'); 
					config[1] = new String(':'); 
				}
				temp = date.getFullYear();
				temp = temp.toString(); 
				temp += config[0]+(date.getMonth()+1); 
				temp += config[0]+date.getDate(); 
				temp += " "+date.getHours(); 
				temp += config[1]+date.getMinutes(); 
				temp += config[1]+date.getSeconds();

				// temp.split(' '); 
				// // 2016-11-14 0:16:4
				// var day = temp[0]; 
				// var time = temp[1]; 
				// var i = 0;

				// day = day.split(config[0]); 
				// for (i in day){
				// 	if (parseInt(day[i]) < 10){
				// 		day[i] = "0"+day[i]; 
				// 	}
				// }

				return temp; 
			}
		}
	}	
</script>
