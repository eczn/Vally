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

		/*padding: .5rem;*/
		padding-top: .25rem;
		padding-bottom: .25rem;
		/*border-bottom: .1rem dotted rgba(0, 0, 30, .5);*/
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
		/*background-color: #eee; */
	}

	.header-fir {
		margin: .5rem 0;
		margin-bottom: .25rem; 
		/*color: #222;*/
		/*padding-top: .25rem;*/
		padding-bottom: .25rem;
		border-bottom: 1px dashed rgba(0, 0, 30, .5);
		/*text-align: center;*/
	}
	.header-fir > div {
		margin-bottom: -.25rem; 

	}
	.header-fir ul {
		/*position: absolute;*/
		text-align: right;
		margin-bottom: -0.15rem;
		
		
	}
	/*.header-fir ul:after {*/
	.header-fir:after {
		content: ""; 
		position: absolute;
		top: 0; 
		left: 0; 
		width: 100%; 
		/*height: 1.3em; */
		border-top: 5px dashed; 
		height: 0;
		/*height: 5px; */
		z-index: -999; 
		/*background-color: rgb(31,18,50);*/

	}
	.header-fir ul li {
		display: inline-block;
		padding: .2em 1em;
		margin: 0 .4em;
		
		/*border-radius: 0 0 .4em .4em;*/
		/*background-color: rgb(31,18,50);*/
		/*color: rgba(255, 255, 255, 0.65);*/
		color: rgb(31,18,50);
		/*background: linear-gradient(to bottom, rgb(31,18,50), rgb(31,18,50), transparent);*/
		/*font-weight: lighter;*/
		cursor: pointer;
	}

	.header-admin {
		margin: .25rem 0;
		/*color: #222;*/
		padding-top: .25rem;
		padding-bottom: .25rem;
		border-bottom: 4px dotted rgba(0, 0, 30, .5);
		/*text-align: center;*/
	}
</style>

<template>
	<div class="header-container">
		<div class="header-fir" v-if="position == 'first'">
			<div>
				<h1>ASOB - Dashed</h1>
				<p>A State Of B</p>
			</div>
			<ul>
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
				historyId: config.historyId
			}
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
			}
		}
	}
</script>
