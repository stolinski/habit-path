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
		<a href="/{habit.id}/year">
			{habit.name}
		</a>
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
