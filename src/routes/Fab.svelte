<script lang="ts">
	import { app } from '$lib/state.svelte';
	import { toggle_values } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import type { ActionData } from './$types';
	import NewHabitForm from './NewHabitForm.svelte';

	const { form } = $props<{ form: ActionData }>();
	let status = $state<'OPEN' | 'CLOSED'>('CLOSED');

	function toggle_drawer() {
		status = toggle_values(status, 'OPEN', 'CLOSED');
	}
</script>

{#if status === 'OPEN'}
	<div class="form_drawer" transition:fly={{ opacity: 0, y: '100%' }}>
		<div class="form_drawer_container">
			<button class="ghost button" on:click={toggle_drawer}>Cancel</button>
			<NewHabitForm mobile={true} {form} onfinish={toggle_drawer} />
		</div>
	</div>
{/if}

<div>
	<button class="button no-fab" on:click={toggle_drawer}>
		<svg width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8.75 2.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
				fill="var(--white)"
			/></svg
		> Add New Habit
	</button>
</div>

{#if app.mode === 'NORMAL' || app.mode === 'THINKING'}
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
{:else if app.mode === 'REORDER'}
	<button class="fab button save" on:click={() => app.thinking()}>
		<svg width="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8.75 2.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
				fill="var(--black)"
			/></svg
		>
		Save Order
	</button>
{/if}

<style>
	.ghost {
		position: absolute;
		top: 15px;
		left: 15px;
	}

	.form_drawer {
		background: var(--bg);
		border-radius: 15px;
		position: fixed;
		inset: 40px 0 0 0;
		box-shadow: var(--shadow-upwards);
		z-index: 200;
	}

	.form_drawer :global(input) {
		width: 100%;
	}
	.form_drawer :global(input[type='number']) {
		width: 80px;
	}

	.form_drawer :global(h3) {
		text-align: center;
	}

	.form_drawer_container {
		margin: 0 auto;
		max-width: 700px;
	}

	.fab {
		position: fixed;
		right: 20px;
		bottom: 80px;
		border-radius: 50%;
		height: 48px;
		z-index: 100;
		overflow: hidden;
	}

	.save {
		background: var(--green);
		border: solid 1px var(--green);
		border-radius: 20px;
		--fg: var(--black);
		color: var(--black);
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.no-fab {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	@media (width < 700px) {
		.no-fab {
			display: none;
		}
	}
	@media (width > 700px) {
		.fab {
			display: none;
		}
	}
</style>
