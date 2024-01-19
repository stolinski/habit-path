<script lang="ts">
	import DropMenu from '$lib/DropMenu.svelte';
	import { datez } from '$lib/state.svelte';
	import { get_circular_array_item } from '$lib/utils.js';
	import { fade } from 'svelte/transition';
	import type { TransformedHabits } from './+page.server';
	import DailyButton from './DailyButton.svelte';

	const { row, habit } = $props<{
		row: number;
		habit: TransformedHabits;
	}>();

	const colors = ['#FFD817', '#FF9E02', '#FF5A00', '#FF0084', '#a0dcc8', '#0001FB'];
	const dark_colors = ['#0001FB'];
</script>

<div class="heading">
	<h3>
		{habit.name}
		<!-- {@render go_to_detail(habit)} -->
	</h3>
	<DropMenu {habit} />
</div>
<article
	transition:fade
	style:--habit_fg={dark_colors.includes(get_circular_array_item(colors, row))
		? 'oklch(100% 0 0 / 90%)'
		: 'oklch(0 0 0 / 70%)'}
	style:--habit_color={get_circular_array_item(colors, row)}
>
	<div class="day_buttons">
		{#each [...Array(datez.days_in_active_month)] as _, i (habit.id + i)}
			<DailyButton habit_id={habit.id} {i} bind:checks={habit.checks} />
		{/each}
	</div>
</article>

<!-- {#snippet hide_habit(habit)}
	<form action="?/hide_habit" method="POST">
		<input type="hidden" name="habit_id" value={habit.id} />
		<button><Eye /></button>
	</form>
{/snippet} -->

<!-- {#snippet go_to_detail(habit)}
	<a href="/{habit.id}/year"
		><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.75 1a.75.75 0 0 1 .75.75V3h5V1.75a.75.75 0 0 1 1.5 0V3h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2V1.75A.75.75 0 0 1 4.75 1ZM2.5 4.5V6h11V4.5h-11Zm0 9v-6h11v6h-11ZM11 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
				fill="#000"
			/></svg
		></a
	>
{/snippet} -->

<style>
	h3 :global(.menu_button) {
		opacity: 0;
		transition: 0.2s ease opacity;
		pointer-events: none;
	}

	:is(h3:hover, h3:focus) :global(.menu_button) {
		opacity: 0.5;
		pointer-events: all;
	}

	article {
		margin-bottom: 1.2rem;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 14px;
		display: flex;
		gap: 10px;
	}

	.heading {
		left: 0;
		z-index: 1;
		position: sticky;
		display: flex;
		justify-content: space-between;
	}

	h3 form button,
	h3 a {
		border: none;
		padding: 0;
	}

	h3 form :is(button:hover, a:hover) {
		cursor: pointer;
		background: transparent;
		opacity: 1;
	}

	.day_buttons {
		display: flex;
		gap: 2px;
	}
</style>
