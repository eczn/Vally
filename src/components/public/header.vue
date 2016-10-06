<!-- header.vue -->
<style>
	.header-container > div {
		color: rgb(31,18,50);
	}
	
	.header-notFir {
		margin: .25rem 0;
		/*padding: .5rem;*/
		padding-top: .25rem;
		padding-bottom: .25rem;
		border-bottom: 8px dotted rgba(0, 0, 30, .5);
		text-align: center;
	}

	.header-fir {
		margin: .25rem 0;
		/*color: #222;*/
		padding-top: .25rem;
		padding-bottom: .25rem;
		border-bottom: 4px dotted rgba(0, 0, 30, .5);
		/*text-align: center;*/
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
			<h1>ASOB - Dashed</h1>
			<p>A State Of B</p>
		</div>
		<div class="header-notFir" v-if="position=='asob'">
			<h1>ASOB</h1>
		</div>
		<div class="header-admin" v-if="position=='admin'">
			<h1>aVally - admin</h1>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ["position"]
	}
</script>
