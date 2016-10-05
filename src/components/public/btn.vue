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
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: Courier;
		position: absolute;
		top: 0;
		font-size: 1rem;
		height: 1rem;
		width: 1rem;
		/*width: calc(1rem - 6px);*/
		/*height: calc(1rem - 6px);*/
		border: 2px dashed #555;

		border-radius: 1rem;
		cursor: pointer;
	}
	.btn-B > span {
		width: .3rem;
		height: .3rem; 
		border-top: 4px solid #555;
		border-left: 4px solid #555;
		/*border-bottom: 4px solid transparent;*/
		/*border-right: 4px solid transparent;*/
		transform: rotate(-45deg);
		transform-origin: 75% 25% ;
	}
</style>

<template>
	<div>
		<span v-on:click="A_onClick" class="btn-A" v-if="btntype == 'A'">{{text}}</span>
		<span v-on:click="A_onClick" class="btn-B" v-if="btntype == 'B'"><span></span></span>
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
