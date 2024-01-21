<script lang="ts">
	import { format } from 'date-fns';

	const { data } = $props();

	function getAllDaysOfYear(year: number): string[] {
		const startDate: Date = new Date(year, 0, 1);
		const endDate: Date = new Date(year, 11, 31);
		const days: string[] = [];

		for (
			let currentDate = new Date(startDate);
			currentDate <= endDate;
			currentDate.setDate(currentDate.getDate() + 1)
		) {
			const formattedDate: string = new Date(currentDate).toISOString().split('T')[0];
			days.push(formattedDate);
		}

		return days;
	}
	const year: number = 2024;
	const daysOfYear: string[] = getAllDaysOfYear(year);

	function parseIsoToLocalDate(isoStr) {
		const parts = isoStr.split('-');
		// Subtract 1 from month because months are 0-indexed in JavaScript Date
		return new Date(parts[0], parts[1] - 1, parts[2]);
	}
</script>

<a href="/">Back</a>
<h1>{data.habit.name}</h1>

<div class="grid" style:--habit_color="#a0dcc8" style:--habit_fg="oklch(0 0 0 / 70%)">
	{#each daysOfYear as day}
		<button class:complete={data.habit.checks.includes(day)} class="daily_button"
			>{format(new Date(parseIsoToLocalDate(day)), 'MM/dd')}</button
		>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, 80px);
		gap: 10px;
	}

	.daily_button {
		flex-shrink: 0;
		border-radius: 0;
		border: 0;
		height: 60px;
		width: 80px;
		color: #999;
		font-weight: 400;
		flex: 1;
		transition: 0.2s ease-in-out all;
		position: relative;
		background: var(--shade);
		overflow: hidden;
		border-radius: 2px;
	}

	.complete {
		background-color: var(--habit_color);
		border: none;
		color: var(--habit_fg);
		border: solid 0.5px var(--tint);
		box-shadow:
			2px 2px 5px rgba(0, 0, 0, 0.1) inset,
			1px 1px 2px rgba(0, 0, 0, 0.3) inset;
		position: relative;
	}

	.complete::after {
		content: '';
		position: absolute;
		inset: 0;
		mix-blend-mode: multiply;
		opacity: 0.1;
		background-image: linear-gradient(115deg, #000, #fff);
	}
</style>
