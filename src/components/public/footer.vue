<!-- footer.vue -->
<style>
	.footer-container {
		width: 6rem;
		margin: 0 auto;
		padding-top: .1rem;
		font-size: .2rem;
		margin-top: 2rem;
		border-radius: 6rem / 1rem;
		border-top: 2px dashed rgb(93, 93, 93);
		color: rgb(93, 93, 93); 
		text-align: center;
	}

	.torzo {
		/*width: 100%; */
		/*text-align: center;*/
		/*margin: .5em;*/
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgb(93, 93, 93);
		transition: all .3s;
	}
	.torzo img {
		width: 1.0rem;
		height: 1.0rem;
		/*border: 3px dashed rgb(48, 103, 133);*/
		border-radius: 3rem;
		margin: 0 .2rem;
		filter: grayscale(1);
		transition: all 3s; 
	}
	.torzo img:hover {
		filter: grayscale(0);
		box-shadow: 0 0 15px rgb(48, 103, 133);
		transition: all 2s; 
	}

	.footerBigger {
		color: rgb(48, 103, 133);
		font-size: .2rem;
		transition: all .3s;
	}

</style>

<template>
	<div class="footer-container">
		<div v-on:click="make" class="torzo" :class="{ footerBigger: showFooter }">
			<span>装于学</span>
			<a href="http://vec.moe/qun/" target="_blank"><img src="../../images/bb256.png" align="middle" alt=""></a>
			<span>学于装</span>
		</div>
		<span>eczn@Cscw | {{time.getFullYear()}} GDUT</span>
	</div>
</template>

<script>
	var time = new Date(); 
	module.exports = {
		data: function(){
			return {
				time: time,
				showFooter: false
			}
		},
		methods: {
			make: function(){
				// this.showFooter = !this.showFooter;
				// if (this.showFooter){
				// 	$("#main-body").addClass("addBlur");
				// } else {
				// 	$("#main-body").removeClass("addBlur");
				// }
			}
		}
	}
</script>
