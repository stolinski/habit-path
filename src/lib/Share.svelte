<script lang="ts">
	import type { TransformedHabits } from '../server/data_utils';
	import Modal from './Modal.svelte';
	import Share from '$lib/icons/Share.svelte';
	const { habit } = $props<{
		habit: TransformedHabits;
	}>();

	let active = $state<boolean>(false);

	function onclick() {
		active = !active;
	}
</script>

<button {onclick}><Share /></button>

<Modal bind:active>
	<h2 class="h5">Share</h2>
</Modal>

<style>
	button {
		border: none;
	}
</style>
