<!-- ASOB.vue -->
<style>
	.asob-container {

	}
	.asob-container > div {
		text-align: center;
		margin: 1rem;
	}
</style>

<template>
	<div class="asob-container">
		<v-header position="asob"></v-header>
		<div>
			<h2>fortunately, i</h2>
			<h2>make this for blogging</h2>
			<btn style="margin-top: 1.5rem;" btntype="A" text="Hack in here"></btn>
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
