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
		margin-top: 4px;
		display: inline-block;
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

	.icon_true {
		width: .3rem;
		height: .6rem; 
		border-top: 4px solid #5a5;
		border-left: 4px solid #5a5;
		/*border-bottom: 4px solid transparent;*/
		/*border-right: 4px solid transparent;*/

		transform: rotate(-135deg);
		transform-origin: 55% 45% ;
	}

	.icon_false, .icon_add {
		position: relative;
		display: inline-block;
		margin-top: .4rem;
		margin-left: .4rem;
		margin-top: calc(.4rem + 3px);
		width: .4rem;
		height: .4rem; 
		border-top: 4px solid #a55;
		border-left: 4px solid #a55;
		transform: rotate(45deg);
		transform-origin: 3px 3px;
	}
	
	.icon_false:after, .icon_add:after {
		content: '';
		position: absolute;
		display: inline-block;
		height: 100%; 
		width: 100%; 
		top: -100%;
		left: -100%; 
		top: calc(-100% - 4px); 
		left: calc(-100% - 4px); 
		border-bottom: 4px solid #a55;
		border-right: 4px solid #a55;
	}
	
	.icon_add {
		transform: rotate(0deg);
		border-color: #5a5;
	}
	.icon_add:after {
		border-color: #5a5;
	}
	

	.btn-C div {
		position: absolute;
		/*display: inline-block;*/
		top: 30%;

		left: 120%;
		font-size: .4rem;
		white-space: nowrap;
	}

</style>

<template>
	<div>
		<span v-on:click="sentEvent('A')" class="btn-A" v-if="btntype == 'A'">{{text}}</span>
		<span v-on:click="sentEvent('B')" class="btn-B" v-if="btntype == 'B'"><span></span></span>
		<span v-on:click="sentEvent('C')" class="btn-C" v-if="btntype == 'C'">
			<span v-bind:class="{ 'icon_true': icon=='true', 'icon_false': icon=='false', 'icon_add': icon=='add' }"></span>
			<div>{{text}}</div>
		</span>
	</div>
</template>

<script>
	module.exports = {
		props: ['btntype', 'text', 'icon'],
		methods: {
			// trigger the event just like this: 'A_onClick', based on the value of typeStr
			sentEvent: function(typeStr){
				this.$dispatch( typeStr + '_onClick', this.icon);
			}
		}
	}
</script>
