<!-- ASOB.vue -->
<style>
	.asob-container {
		margin: 1rem 10%;		
	}
	.asob-container > div {
		text-align: center;

	}
</style>

<template>
	<div class="asob-container">
		<v-header position="asob"></v-header>
		<div>
			<h2>fortunately, i</h2>
			<h2 style="margin-bottom: 1.5rem;">make this for blogging</h2>
			<btn btntype="A" text="Hack in here"></btn>
		</div>
	</div>
</template>

<script>
	var myHeader = require('./header.vue');
	var btn = require('./btn.vue');

	module.exports = {
		components: {
			"v-header": myHeader,
			btn: btn
		},
		events: {
			"A_onClick": function(){
				// alert("!!");
				this.$route.router.go({
					name: 'blogList'
				});
			}
		}
	}
</script>
