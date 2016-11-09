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
		/*color: rgb(93, 93, 93); */
		color: rgba(255,255,255,1);
		text-align: center;
		/*margin-bottom: 3rem; */
		/*margin-bottom: 200px; */
	}

	.footer-container > div {
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: rgb(85, 85, 85);
		height: 200px;
		width: 100%;
		z-index: -999;
		overflow: hidden;
	}
	.footer-container > div:after {
		content: ""; 
		position: absolute;
		width: 200%; 
		height: 200%; 
		left: -50%; 
		top: -50%;
		/*background-color: rgba(0,0,0,.4);*/
		/*background-image: url("http://localhost/lib/torzo-z.png");*/
		background-image: url("http://eczn.website/picStore/torzo-z.png");
		background-repeat: repeat;
		transform: rotate(12deg);
		z-index: -998; 
	}
	.footer-container > div > span {
		position: absolute;
		display: block; 
		width: 100%; 
		bottom: 0; 
		
		text-align: center;
	}

	.footer-container ul {
		display: flex;
		justify-content: center;
	}

	.footer-container ul li {
		margin-top: 35px;
		
	}

	.torzo {
		display: flex;
		align-items: center;
	}

	.torzo img {
		height: 100px;
		/*filter: grayscale(0);*/

		/*filter: drop-shadow(0px 0px 0px #FFF) opacity(.8);*/
		filter: brightness(16);
	}
	.torzo span {
		font-size: .3rem;
	}

	.footerBigger {
		color: rgb(48, 103, 133);
		font-size: .2rem;
		transition: all .3s;
	}

</style>

<template>
	<div class="footer-container">
		<!-- <div>
			<ul>
				<li class="torzo">
					<span>学于装</span>
					<a href="http://vec.moe/qun/" target="_blank">
						<img src="../../images/bb256.png" align="middle" alt="">
					</a>
					<span>装于学</span>
				</li>
				<li></li>
			</ul>
			<span>eczn@Cscw | {{time.getFullYear()}} GDUT</span>
		</div> -->
		<span style="color: #222">eczn@Cscw | {{time.getFullYear()}} GDUT</span>
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
