<!-- btn.vue -->
<!-- <btn btntype="A" text="Hack in here"></btn> -->
<style>
	.btn-A {
		font-size: .6rem;
		border: 2px dashed #555;
		padding: .3rem .5rem;
		border-radius: 16px;
		cursor: pointer;
	}
	.btn-B {
		position: absolute;
		top: 0;
		font-size: .6rem;
		border: 2px dashed #555;
		/*padding: .3rem .5rem;*/
		border-radius: 16px;
		cursor: pointer;
	}
</style>

<template>
	<div>
		<span v-on:click="A_onClick" class="btn-A" v-if="btntype == 'A'">{{text}}</span>
		<span v-on:click="A_onClick" class="btn-B" v-if="btntype == 'B'">{{text}}</span>
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
