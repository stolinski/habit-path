<script lang="ts">
	import { enhance } from '$app/forms';
	import { app } from '$lib/state.svelte';
	import { toggle_values } from '$lib/utils';
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { TransformedHabits } from '../server/data_utils';
	import type { ActionData } from './$types';
	import NewHabitForm from './NewHabitForm.svelte';

	let { form, habits, clean_habits } = $props<{
		form: ActionData;
		habits: TransformedHabits[];
		clean_habits: TransformedHabits[];
	}>();
	let status = $state<'OPEN' | 'CLOSED'>('CLOSED');

	function toggle_drawer() {
		status = toggle_values(status, 'OPEN', 'CLOSED');
	}

	function getOrderedHabitIds() {
		// Select the #visible_habits container
		const container = document.querySelector('#reorder_habits');

		// Find all elements with 'data-habit-id-parent' within the container
		const elements = container.querySelectorAll('[data-habit-id-parent]');

		// Extract the IDs and store them in an array
		const habitIds = Array.from(elements).map((el) =>
			parseInt(el.getAttribute('data-habit-id-parent')),
		);

		// Return the array of IDs
		return habitIds;
	}

	function sort_root_habits(habit_array: TransformedHabits[], id_array: number[]) {
		// Create a map for faster lookup
		const idIndexMap = new Map();
		habit_array.forEach((habit) => {
			idIndexMap.set(habit.id, habit);
		});

		const new_order = id_array.map((id) => idIndexMap.get(id));
		return new_order;
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

{#if app.mode === 'NORMAL'}
	<div style="margin: 1rem 0;">
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
{/if}

{#if app.mode === 'NORMAL'}
	<button class="fab button" on:click={toggle_drawer}>
		<svg width="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8.75 2.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
				fill="var(--white)"
			/>
		</svg>
	</button>
{:else if app.mode === 'REORDER'}
	<form
		action="?/reorder"
		method="POST"
		use:enhance={({ formData }) => {
			const new_id_order = getOrderedHabitIds();
			// This should reorder the main data without going to the server via binding
			let test = sort_root_habits(clean_habits, getOrderedHabitIds());
			for (let i = 0; i < habits.length; i++) {
				habits[i] = { ...test[i] };
			}
			tick();
			app.normal();
			formData.append('new_ids', JSON.stringify(new_id_order));
			return ({ update }) => {
				update();
				// TODO Toast system
			};
		}}
	>
		<button class="button save" type="submit" transition:fly={{ opacity: 0, y: '100%' }}>
			Done Reordering
		</button>
	</form>
{/if}

{#if app.mode === 'REORDER'}
	<div class="cancel_zone">
		<button
			onclick={app.normal}
			class="button close"
			type="submit"
			transition:fly={{ opacity: 0, y: '100%' }}
		>
			Cancel Reordering
		</button>
	</div>
{/if}

<style>
	.cancel_zone {
		padding: 20px;
	}

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
		box-shadow:
			5px 5px 5px rgba(1, 9, 42, 0.1),
			1px 7px 6px rgba(1, 9, 42, 0.2),
			5px 7px 6px rgba(1, 9, 42, 0.1),
			2px 2px 5px rgba(255, 255, 255, 0.1) inset,
			1px 1px 2px rgba(255, 255, 255, 0.3) inset;
	}

	.save {
		position: fixed;
		right: 20px;
		bottom: 80px;
		border-radius: 50%;
		height: 48px;
		z-index: 100;
		overflow: hidden;
		background: var(--blue);
		border: solid 1px var(--blue);
		border-radius: 20px;
		--fg: var(--white);
		color: var(--fg);
		display: flex;
		align-items: center;
		gap: 10px;
		box-shadow:
			5px 5px 5px rgba(1, 9, 42, 0.1),
			1px 7px 6px rgba(1, 9, 42, 0.2),
			5px 7px 6px rgba(1, 9, 42, 0.1),
			2px 2px 5px rgba(255, 255, 255, 0.1) inset,
			1px 1px 2px rgba(255, 255, 255, 0.3) inset;
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
