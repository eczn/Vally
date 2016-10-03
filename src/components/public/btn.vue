<!-- btn.vue -->
<style>
	.btn-A {
		font-size: .6rem;
		border: 2px dashed #555;
		padding: .3rem .5rem;
		border-radius: 16px;
		cursor: pointer;
	}
</style>

<template>
	<div>
		<span v-on:click="A_onClick" class="btn-A" v-if="btntype == 'A'">{{text}}</span>
	</div>
</template>

<script>
	module.exports = {
		props: ['btntype', 'text'],
		methods: {
			A_onClick: function(){
				this.$dispatch('A_onClick');
			}
		}
	}
</script>
