<!-- adminNav.vue -->
<style>
	.adminNav > div {
		margin: .5rem auto;
	}
</style>

<template>
	<div class="adminNav">
		<div class="btn-A"><a v-link="{ name: 'writedesk' }">new a blog</a></div>
		<div class="btn-A"><a v-link="{ name: 'admin' }">delete a blog</a></div>
	</div>
</template>

<script>
	module.exports = {

	}
</script>
