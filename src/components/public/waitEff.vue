<!-- waitEff -->
<style>
	.wait-container {
		/*position: fixed;*/
		/*top: 0;*/
		/*left: 0;*/
		/*width: 100%;*/
		/*height: 100%; */
		/*background-color: rgba(0, 0, 0, .2);*/
		text-align: center;
		padding: 1rem 0;
	}
	.ui-loading {
		width: 20px;
		height: 20px;
		display: inline-block;
		background: url("/images/loading_sprite.png");
		background-size: auto 20px;
		animation: am-rotate 1s steps(12) infinite;
	}
	
	.wait-bye {
		height: 0;
		padding: 0;
		transition: all .5s; 
	}

	@keyframes am-rotate {
		from {
			background-position: 0 0;
		} to {
			background-position: -240px 0;
		}
	}
</style>

<template>
	<div class="wait-container" v-bind:class="{'wait-bye': !isShow}">
	    <i class="ui-loading" v-bind:class="{'wait-bye': !isShow}"></i>
	    <!-- <h1>asdasd</h1> -->
	</div>
</template>

<script>
	module.exports = {
		data: function(){
			return {
				isShow: false
			}
		},
		events: {
			waitToggle: function(){
				this.isShow = !this.isShow; 
			}
		}
	}
</script>
