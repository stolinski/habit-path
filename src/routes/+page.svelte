<script lang="ts">
	import Eye from '$lib/Eye.svelte';
	import { datez } from '$lib/state.svelte';
	import {
		getDaysInEachMonth,
		get_circular_array_item,
		jump_2_today,
		string_2_bool,
	} from '$lib/utils';
	import Cookies from 'js-cookie';
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import DailyButton from './DailyButton.svelte';
	import Fab from './Fab.svelte';
	import NewHabitForm from './NewHabitForm.svelte';

	const colors = ['#FFD817', '#FF9E02', '#FF5A00', '#FF0084', '#a0dcc8', '#0001FB'];
	const dark_colors = ['#0001FB'];

	let { data, form } = $props();
	const initial_hidden = string_2_bool(Cookies.get('show_hidden'));
	let show_hidden = $state(initial_hidden);
	let year = $state(2024);
	let days_in_each_month_for_year = $derived(getDaysInEachMonth(year));

	function toggle_hidden() {
		show_hidden = !show_hidden;
		Cookies.set('show_hidden', show_hidden.toString(), {
			sameSite: 'lax',
		});
	}

	onMount(async () => {
		await tick();
		jump_2_today();
	});
</script>

<NewHabitForm {form} />

<section class="habits" id="visible_habits">
	{#each data.habits.filter((habit) => habit.visible) as habit, i (habit.id)}
		{@render habit_row({ habit, i })}
	{/each}
</section>

<button class:active={show_hidden} class="toggle-hidden" on:click={toggle_hidden}>↓</button>

{#if show_hidden}
	<section class="habits" transition:fade>
		<h2>Hidden</h2>
		{#each data.habits.filter((habit) => !habit.visible) as habit, i (habit.id)}
			{@render habit_row({ habit, i })}
		{/each}
	</section>
{/if}

<Fab {form} />

{#snippet habit_row({ habit, i })}
	<h3>
		{habit.name}
		{@render hide_habit(habit)}
		<!-- {@render go_to_detail(habit)} -->
	</h3>
	<article
		transition:fade
		style:--habit_fg={dark_colors.includes(get_circular_array_item(colors, i))
			? 'oklch(100% 0 0 / 90%)'
			: 'oklch(0 0 0 / 70%)'}
		style:--habit_color={get_circular_array_item(colors, i)}
	>
		<div class="day_buttons">
			{#each [...Array(days_in_each_month_for_year[datez.active_date.getMonth()])] as _, i (habit.id + i)}
				<DailyButton habit_id={habit.id} {i} bind:checks={habit.checks} />
			{/each}
		</div>
	</article>
{/snippet}

{#snippet hide_habit(habit)}
	<form action="?/hide_habit" method="POST">
		<input type="hidden" name="habit_id" value={habit.id} />
		<button><Eye /></button>
	</form>
{/snippet}

{#snippet go_to_detail(habit)}
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
{/snippet}

<!-- BEEF WITH RUNES -> Not being able to export State primatives -->
<!-- BEEF WITH RUNES  Error on wrong line -->
<!-- BEEF WITH RUNES  let date = $state(new Date()) isn't reactive when modifying date aka date state isn't reactive -->
<!-- aka not everything is reactive... what's the point if it's not reactive? -->

<!-- TODO premium feature themes? -->
<!-- TODO YEAR View for each habit -->
<!-- TODO YEAR view for all habits -->
<!-- TODO move habit form to drawer -->
<!-- TODO streaks -->

<style>
	article {
		margin-bottom: 1.2rem;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 14px;
		display: flex;
		gap: 10px;
		position: sticky;
		left: 0;
	}

	h3 form :is(button, a) {
		opacity: 0;
		pointer-events: none;
	}

	:is(h3:hover, h3:focus) form :is(button, a) {
		opacity: 0.5;
		pointer-events: all;
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

	.habits {
		grid-column: 2 / 4;
		overflow: auto;
		margin-left: -2.5vw;
		padding-left: 2.5vw;
	}

	.day_buttons {
		display: flex;
		gap: 2px;
	}

	.today {
		border: solid 2px yellow;
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

	/* Desktop */
	@media (width > 700px) {
	}

	/* Mobile */
	@media (width < 700px) {
	}
</style>
