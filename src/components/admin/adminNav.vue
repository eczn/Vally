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
		<btn btntype='C' icon='add' text='新篇目'></btn>
		<hr class="md-hr">
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
