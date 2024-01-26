<script lang="ts">
	const { is_today } = $props<{ is_today: boolean }>();
</script>

<div class:is_today />

<style>
	div {
		height: 60px;
		width: 80px;
		background-color: red;
	}

	.is_today {
		width: 100%;
		height: 10px;
		background: #000;
	}
</style>
