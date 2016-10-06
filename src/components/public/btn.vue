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
		/*position: absolute;*/
		/*top: 0;*/
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
	
	.btn-C {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 1.5rem;
		width: 2rem;
		border: 3px dashed #545;
		cursor: pointer;
		border-radius: 10px;

		transition: all .3s;
	}

	.btn-C:hover {
		border-radius: 1rem;
		width: 1.5rem;
		transition: all .3s;
	}

	.btn-C > span {
		width: .3rem;
		height: .6rem; 
		border-top: 4px solid #5a5;
		border-left: 4px solid #5a5;
		/*border-bottom: 4px solid transparent;*/
		/*border-right: 4px solid transparent;*/
		transform: rotate(-135deg);
		transform-origin: 55% 45% ;
	}

	.btn-C:after {
		content: "Update to ASOB"; 
		position: absolute;
		left: 120%;
		font-size: .4rem;
		white-space: nowrap;
	}

</style>

<template>
	<div>
		<span v-on:click="sentEvent('A')" class="btn-A" v-if="btntype == 'A'">{{text}}</span>
		<span v-on:click="sentEvent('B')" class="btn-B" v-if="btntype == 'B'"><span></span></span>
		<span v-on:click="sentEvent('C')" class="btn-C" v-if="btntype == 'C'"><span></span></span>
	</div>
</template>

<script>
	module.exports = {
		props: ['btntype', 'text'],
		methods: {
			// trigger the event just like this: 'A_onClick', based on the value of typeStr
			sentEvent: function(typeStr){
				this.$dispatch( typeStr + '_onClick');
			}
		}
	}
</script>
