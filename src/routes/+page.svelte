<script lang="ts">
	import { enhance } from '$app/forms';
	import DailyButton from './DailyButton.svelte';
	import { datez } from '$lib/state.svelte';
	import Eye from '$lib/Eye.svelte';
	import { getDaysInEachMonth, get_circular_array_item, string_2_bool } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import Cookies from 'js-cookie';

	const colors = ['#0001FB', '#FFD817', '#FF9E02', '#FF5A00', '#FF0084', '#a0dcc8'];
	const dark_colors = ['#0001FB'];
	let { data } = $props();
	let show_hidden = $state(string_2_bool(Cookies.get('show_hidden')) || false);
	let year = $state(2024);
	let days_in_each_month_for_year = getDaysInEachMonth(year);

	function toggle_hidden() {
		show_hidden = !show_hidden;
		Cookies.set('show_hidden', show_hidden);
	}
</script>

{@render new_habit()}

<section class="habits">
	{#each data.habits.filter((habit) => habit.visible) as habit, i}
		<h3>
			{habit.name}
			{@render hide_habit(habit)}
		</h3>
		<article
			style:--habit_fg={dark_colors.includes(get_circular_array_item(colors, i))
				? 'oklch(100% 0 0 / 90%)'
				: 'oklch(0 0 0 / 70%)'}
			style:--habit_color={get_circular_array_item(colors, i)}
		>
			<div class="day_buttons">
				{#each [...Array(days_in_each_month_for_year[datez.today.getMonth()])] as _, i}
					<DailyButton habit_id={habit.id} {i} checks={habit.checks} />
				{/each}
			</div>
		</article>
	{/each}
</section>

<button class:active={show_hidden} class="toggle-hidden" on:click={toggle_hidden}>↓</button>

{#if show_hidden}
	<section class="habits" transition:fade>
		<h2>Hidden</h2>
		{#each data.habits.filter((habit) => !habit.visible) as habit, i (habit.id)}
			<h3>
				{habit.name}
				{@render hide_habit(habit)}
			</h3>
			<article
				style:--habit_fg={dark_colors.includes(get_circular_array_item(colors, i))
					? 'oklch(100% 0 0 / 90%)'
					: 'oklch(0 0 0 / 70%)'}
				style:--habit_color={get_circular_array_item(colors, i)}
			>
				<div class="day_buttons">
					{#each [...Array(days_in_each_month_for_year[datez.today.getMonth()])] as _, i}
						<DailyButton habit_id={habit.id} {i} checks={habit.checks} />
					{/each}
				</div>
			</article>
		{/each}
	</section>
{/if}

{#snippet hide_habit(habit)}
	<form action="?/hide_habit" method="POST" use:enhance>
		<input type="hidden" name="habit_id" value={habit.id} />
		<button><Eye /></button>
	</form>
{/snippet}

{#snippet new_habit()}
	<div class="form">
		<h3>New Habit</h3>
		<form action="?/new_habit" method="POST" use:enhance>
			<label for="name">Name</label>
			<input type="text" name="name" id="name" />
			<label for="days_per_month">Days Per Month</label>
			<input type="number" max="31" name="days_per_month" id="days_per_month" />
			<button type="submit">Save</button>
		</form>
	</div>
{/snippet}

<!-- TODO YEAR View for each habit -->
<!-- TODO YEAR view for all habits -->
<!-- TODO User login -->
<!-- TODO Optimistic UI because updating is slow -->
<!-- TODO make all habits scroll together -->
<!-- TODO move habit form to drawer -->
<!-- TODO streaks -->

<style>
	article {
		margin-bottom: 2rem;
	}

	h3 form button {
		opacity: 0;
		pointer-events: none;
	}

	:is(h3:hover, h3:focus) form button {
		opacity: 0.5;
		pointer-events: all;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 14px;
		display: flex;
		gap: 10px;
		position: sticky;
		left: 0;
	}

	h3 form button {
		border: none;
		padding: 0;
	}

	h3 form button:hover {
		cursor: pointer;
		background: transparent;
		opacity: 1;
	}

	label {
		font-size: 12px;
	}

	.day_buttons {
		display: flex;
		gap: 2px;
	}

	.today {
		border: solid 2px yellow;
	}

	.form {
		padding: 20px;
		margin-bottom: 2rem;
		border-radius: 4px;
		border: solid 1px #999;
	}

	.habits {
		grid-column: 2/4;
		max-width: 100%; /* Control the maximum width */
		max-height: 100%; /* Control the maximum height */
		overflow: auto;
	}
	.toggle-hidden {
		opacity: 0.3;
		cursor: pointer;
		border: none;
		background: transparent;
	}
	.toggle-hidden:hover {
		opacity: 1;
		background: transparent;
	}

	.active {
		rotate: 180deg;
	}
</style>
