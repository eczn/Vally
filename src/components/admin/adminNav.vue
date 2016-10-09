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
		<!-- <div class="btn-C"><a v-link="{ name: 'writedesk' }">new</a></div> -->
		<btn btntype='C' icon='add' text='新篇目'></btn>
		<hr class="md-hr">
		<!-- <div class="btn-B"><a v-link="{ name: 'admin' }">del</a></div> -->
		<admin-list></admin-list>
	</div>
</template>
	
<script>
	var adminList = require('./adminList.vue'); 
	var myBtn = require('../public/btn.vue');

	module.exports = {
		components: {
			"admin-list": adminList,
			btn: myBtn
		},
		events: {
			C_onClick: function(){
				this.$route.router.go({
					name: 'writedesk'
				});
			}
		}
	}
</script>
