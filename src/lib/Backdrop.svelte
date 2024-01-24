<script>
	const { onclick } = $props();
</script>

<div {onclick} role="button" tabindex="0" />

<style>
	div {
		position: absolute;
		inset: 0;
		background: transparent;
		z-index: 1;
	}
</style>
