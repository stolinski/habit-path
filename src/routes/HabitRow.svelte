<script lang="ts">
	import DropMenu from '$lib/DropMenu.svelte';
	import { COLORS, DARK_COLORS } from '$lib/const';
	import { app } from '$lib/state.svelte';
	import { date_without_timezone, get_circular_array_item } from '$lib/utils.js';
	import { fade } from 'svelte/transition';

	import { format } from 'date-fns';
	import type { TransformedHabits } from '../server/data_utils';
	import DailyButton from './DailyButton.svelte';
	import type { ActionData } from '../../.svelte-kit/types/src/routes/$types';

	let right_now = date_without_timezone(new Date());
	const today = format(
		new Date(Date.UTC(right_now.getUTCFullYear(), right_now.getUTCMonth(), right_now.getUTCDate())),
		'yyyy-MM-dd',
	);

	let { form, row, habit } = $props<{
		form: ActionData;
		row: number;
		habit: TransformedHabits;
	}>();
</script>

<div class="heading {app.mode}" data-habit-id-parent={habit.id}>
	<h3>
		{#if app.mode === 'NORMAL'}
			<a href="/{habit.id}/year">
				{habit.name}
			</a>
		{:else}
			{habit.name}
		{/if}
	</h3>

	<DropMenu {form} {habit} />

	<div class="handle {app.mode}">
		<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.5 2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm11.5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-1.25 7a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.25 4.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM2.25 9.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm7-1.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM8 15a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 8 15ZM9.25 2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM2.25 15a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
				fill="var(--fg)"
			/>
		</svg>
	</div>
</div>

<article
	data-habit-id={habit.id}
	class="habit_row {app.mode}"
	transition:fade
	style:--habit_fg={DARK_COLORS.includes(get_circular_array_item(COLORS, row))
		? 'oklch(100% 0 0 / 90%)'
		: 'oklch(0 0 0 / 70%)'}
	style:--habit_color={get_circular_array_item(COLORS, row)}
>
	<div class="day_buttons">
		{#each habit.checks as day, i (habit.id + i)}
			<DailyButton {today} habit_id={habit.id} {i} bind:day />
		{/each}
	</div>
</article>

<style>
	a {
		text-decoration: none;
	}

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
		position: relative;
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
		top: 0;
		position: sticky;
		display: flex;
		width: 100vw;
		transition: 0.3s ease padding;
		justify-content: space-between;
	}

	.heading.REORDER {
		padding: 20px 0 20px 20px;
		border-bottom: solid 1px var(--shade);
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

	.handle {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		align-content: center;
		background: var(--bg);
		height: 100%;
		padding: 20px;
		opacity: 0;
		z-index: -10;
		pointer-events: none;
	}

	.handle.REORDER {
		z-index: 20;
		opacity: 1;
		pointer-events: all;
	}

	article.REORDER {
		display: none;
	}
</style>
