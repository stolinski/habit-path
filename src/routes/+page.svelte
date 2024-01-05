<script lang="ts">
	import { enhance } from '$app/forms';
	import { eachDayOfInterval, startOfMonth, endOfMonth, format, getDay } from 'date-fns';
	import DailyButton from './DailyButton.svelte';
	import { today } from '$lib/state.svelte';
	import Eye from '$lib/Eye.svelte';
	import { createUTCDate, get_circular_array_item } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import Cookies from 'js-cookie';

	const colors = ['#0001FB', '#FFD817', '#FF9E02', '#FF5A00', '#FF0084'];
	let { data } = $props();
	let show_hidden = $state(Cookies.get('show_hidden') || false);
	let year = $state(2024);
	// let habits = $state(data.habits);

	// $effect(() => {
	// 	habits = data.habits;
	// });
	// $inspect(habits);

	let days_in_each_month_for_year = getDaysInEachMonth(year);

	function getDaysInEachMonth(year) {
		const months = [];
		for (let month = 0; month < 12; month++) {
			const startDate = startOfMonth(createUTCDate(year, month));
			const endDate = endOfMonth(createUTCDate(year, month));
			const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate }).length;
			months.push(daysInMonth);
		}
		return months;
	}

	function toggle_hidden() {
		show_hidden = !show_hidden;
		Cookies.set('show_hidden', show_hidden);
	}
</script>

{@render new_habit()}

<section class="habits">
	{#each data.habits.filter((habit) => habit.visible) as habit, i}
		<article style:--habit_color={get_circular_array_item(colors, i)}>
			<h3>
				{habit.name}
				{@render hide_habit(habit)}
			</h3>
			<div class="day_buttons">
				{#each [...Array(days_in_each_month_for_year[today.getMonth()])] as _, i}
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
		{#each data.habits.filter((habit) => !habit.visible) as habit, i}
			<article style:--habit_color={get_circular_array_item(colors, i)}>
				<h3>
					{habit.name}
					{@render hide_habit(habit)}
				</h3>
				<div class="day_buttons">
					{#each [...Array(days_in_each_month_for_year[today.getMonth()])] as _, i}
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

<!-- TODO Hidden by default habit property with server cookie to show / hide -->
<!-- TODO YEAR View for each habit -->
<!-- TODO YEAR view for all habits -->
<!-- TODO User login -->

<style>
	article {
		margin-bottom: 2rem;
	}

	article h3 form button {
		opacity: 0;
		pointer-events: none;
	}

	:is(article:hover, article:focus) h3 form button {
		opacity: 0.5;
		pointer-events: all;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 14px;
		display: flex;
		gap: 10px;
	}

	h3 form button {
		border: none;
		padding: 0;
	}

	article h3 form button:hover {
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
		max-width: 100%; /* Control the maximum width */
		max-height: 100%; /* Control the maximum height */
		overflow: auto;
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
