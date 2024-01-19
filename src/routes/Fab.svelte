<script lang="ts">
	import { toggle_values } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import type { ActionData } from './$types';
	import NewHabitForm from './NewHabitForm.svelte';

	const { form } = $props<{ form: ActionData }>();
	let status = $state<'OPEN' | 'CLOSED'>('OPEN');

	function toggle_drawer() {
		status = toggle_values(status, 'OPEN', 'CLOSED');
	}
</script>

{#if status === 'CLOSED'}
	<div class="form_drawer" transition:fly={{ opacity: 0, y: '100%' }}>
		<button class="close button" on:click={toggle_drawer}>Close</button>
		<NewHabitForm mobile={true} {form} onfinish={toggle_drawer} />
	</div>
{/if}

<button class="fab button" on:click={toggle_drawer}>
	<svg width="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
		><path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M8.75 2.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
			fill="var(--white)"
		/></svg
	>
</button>

<style>
	.close {
		position: absolute;
		top: 15px;
		right: 15px;
	}

	.form_drawer {
		background: var(--bg);
		border-radius: 15px;
		position: fixed;
		inset: 40px 0 0 0;
		box-shadow: var(--shadow-upwards);
		z-index: 200;
	}

	.fab {
		position: fixed;
		right: 20px;
		bottom: 80px;
		border-radius: 50%;
		height: 48px;
		width: 48px;
		z-index: 100;
		overflow: hidden;
	}

	@media (width > 700px) {
		.fab {
			display: none;
		}
	}
</style>
