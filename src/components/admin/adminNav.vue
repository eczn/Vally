<!-- adminNav.vue -->
<style>
	.adminNav > div {
		margin: .5rem auto;
	}
	.writeNew a {
		text-decoration: none;
		font-size: .3rem;
	}
</style>

<template>
	<div class="adminNav">
		<div class="btn-A"><a v-link="{ name: 'writedesk' }">new</a></div>
		<!-- <div class="btn-B"><a v-link="{ name: 'admin' }">del</a></div> -->
		<admin-list></admin-list>
	</div>
</template>
	
<script>
	var adminList = require('./adminList.vue'); 
	

	module.exports = {
		components: {
			"admin-list": adminList,
			
		}
	}
</script>
