<!-- admin.vue -->
<style>
	.admin-container {
		margin: 0 10%;
	}

	@media screen and (max-width: 768px) {
		.admin-container {
			margin: 0 .3rem 0 1.6rem;
		}
	}
</style>

<template>
	<div class="admin-container">
		<v-header position="admin"></v-header>

		<router-view></router-view>
	</div>
</template>

<script>
	var header = require('../public/header.vue');
	
	module.exports = {
		components: {
			"v-header": header
		}
	}
</script>
