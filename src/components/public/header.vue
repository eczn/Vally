<!-- header.vue -->
<style>
.header-container h1 {
	font-weight: normal;
}

.header-container > div {
	color: rgb(31,18,50);
}
.header-notFir {
	margin: .25rem 0;
	padding-top: .25rem;
	padding-bottom: .25rem;
	text-align: center;
}
.header-notFir h1 {
	margin-bottom: .15rem;
}
.header-notFir > span {
	display: block;
	height: .04rem;
	background: linear-gradient(to right, transparent, rgba(31,18,50, .2), transparent);
	width: 100%; 
}

.header-fir {
	margin: .5rem 0;
	margin-bottom: .25rem; 
	padding-bottom: .25rem;
	border-bottom: 1px dashed rgba(0, 0, 30, .5);
}


@media screen and (min-width: 768px) {
	.header-fir ul {
		text-align: right;
		margin-bottom: -0.15rem;

	}
	.header-fir > div {
		margin-bottom: -.25rem; 
	}
}		
@media screen and (max-width: 768px) {
	.header-fir ul {
		text-align: center;
		margin-bottom: -0.15rem;
		margin-top: .4rem;
		border-top: 1px dashed rgba(0, 0, 30, .5);
		padding-top: .1rem;
	}

	.header-fir > div {
		margin: 0 4% .5rem 4%;
	}
}		
.header-fir:after {
	content: ""; 
	position: absolute;
	top: 0; 
	left: 0; 
	width: 100%; 
	border-top: 5px dashed; 
	height: 0;
	z-index: -999; 
}
.header-fir ul li {
	display: inline-block;
	padding: .2em 1em;
	margin: 0 .4em;
	color: rgb(31,18,50);
	cursor: pointer;
}

.header-admin {
	margin: .25rem 0;
	padding-top: .25rem;
	padding-bottom: .25rem;
	border-bottom: 4px dotted rgba(0, 0, 30, .5);
}
</style>

<template>
	<div class="header-container">
		<div class="header-fir" v-if="position == 'first'">
			<div>
				<h1 style="display: inline-block;">ASOB - Dashed</h1>
				<div style="display: inline-block;float: right;">
					<span :id="'archs'+$index" class="archs" style="transition: all .3s;cursor: pointer;display: inline-block;margin: .25em .5em;padding: .25em .5em;background-color: #446;color: white;border-radius: 5px;margin-bottom: .8em;" v-for="s in archiveList" v-on:click="arch($index)">{{s.name}}</span>
				</div>
				
				<p >A State Of B</p>
			</div>
			<ul style="clear: both;">
				<li v-on:click="routo('about')">About</li>
				<!-- <li v-link="{name: 'display', query: {id: historyId}}">History</li> -->
				<li v-on:click="routo('history')">History</a></li>
				<li v-link="{name: 'blogList', query: {page: 0}}">Home</li>
				<li v-link="{name: 'admin'}">Admin</li>
			</ul>
		</div>
		<div class="header-notFir" v-if="position=='asob'">
			<h1>ASOB</h1>
			<span></span>
		</div>
		<div class="header-admin" v-if="position=='admin'">
			<h1>aVally - admin</h1>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ["position"],
		data: function(){
			return {
				aboutId: config.aboutId,
				historyId: config.historyId,
				archiveList: [
					{
						key: '*',
						name: '全部'
					},{
						key: 'code',
						name: '编程'
					},{
						key: 'life',
						name: '生活', 
					}
				]
				
			}
		},
		ready: function(){
			$('#archs1').css('background-color', '#cef').css('color', 'rgb(31,18,50)'); 
		},
		methods: {
			routo: function(r4){
				var tar; 
				var that = this; 

				// if (this.$route.name != 'display'){
				// 	return; 
				// }
				if (r4 == 'about'){
					tar = config.aboutId; 
				} else if (r4 == 'history') {
					tar = config.historyId; 
				}	


				(function(r){
					r.router.go({
						name: 'blogList'
					}); 
					
					setTimeout(function(){
						r.router.go({
							name: 'display', 
							query: {
								id: tar 
							}
						}); 
					}, 500); 
				})(this.$route); 
			},
			arch: function(idx){
				$('.archs').css('background-color', '#446').css('color', 'rgb(255,255,255)'); 
				$('#archs'+idx).css('background-color', '#cef').css('color', 'rgb(31,18,50)'); 
				this.$dispatch('newArch', this.archiveList[idx]); 
			}
		}
	}
</script>
