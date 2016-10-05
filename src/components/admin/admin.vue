<!-- admin.vue -->
<style>
	.admin-container {
		margin: 0 10%;
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
