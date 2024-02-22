<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	let { habit_id, i, day, today } = $props<{
		habit_id: number;
		i: number;
		day: {
			checked_at: string;
			is_checked: boolean;
		};
		today: Temporal.PlainDate;
	}>();

	// This function rn only run refetch of data if it's not a success
	async function optimistic_rerender_checks({
		update,
		result,
	}: {
		result: ActionResult;
		update: (options?: { reset?: boolean; invalidateAll?: boolean }) => Promise<void>;
	}) {
		if (result.type !== 'success') {
			update();
		}
	}

	function formatDate(iso_date: string) {
		const date = Temporal.PlainDate.from(iso_date);
		const dayAbbr = date.toLocaleString('en-US', { weekday: 'short' }); // e.g., "Fri"
		const dayOfMonth = date.day.toString().padStart(2, '0');
		return `${dayAbbr}<br />${dayOfMonth}`;
	}
</script>

{#if day.is_checked}
	<form
		action="?/remove_check"
		method="POST"
		use:enhance={() => {
			day.is_checked = false;
			return optimistic_rerender_checks;
		}}
	>
		{@render inputs()}
	</form>
{:else}
	<form
		action="?/add_check"
		method="POST"
		use:enhance={() => {
			day.is_checked = true;
			return optimistic_rerender_checks;
		}}
	>
		{@render inputs()}
	</form>
{/if}

{#snippet inputs()}
	<input type="hidden" value={habit_id} name="habit_id" id={'habit_id_' + i} />
	<input type="hidden" value={day.checked_at} name="checked_at" id={'checked_at_' + i} />
	<button
		data-today={today.toString() === day.checked_at}
		class:complete={day.is_checked}
		type="submit"
		class="daily_button"
	>
		{@html formatDate(day.checked_at)}
	</button>
{/snippet}

<style>
	.daily_button {
		border: 0;
		height: 60px;
		width: 80px;
		color: #999;
		font-weight: 400;
		flex: 1;
		transition: 0.2s ease-in-out all;
		position: relative;
		background-color: var(--shade);
		text-shadow: 0.4px 0.4px 0 rgba(0, 0, 0, 0.1);
		border-radius: 2px;
		translate: 0 -1px 0;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		border-left: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow:
			1px 1px 2px rgba(0, 0, 0, 0.1),
			0px 0.5px 2px rgba(0, 0, 0, 0.1);
	}

	.daily_button::after {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0.05;
		mix-blend-mode: multiply;
		background-image: radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5));
		transition: 0.2s ease-in-out all;
	}

	.complete {
		background-color: var(--habit_color);
		border: none;
		color: var(--habit_fg);
		border: solid 0.5px var(--tint);
		translate: 0 0 0;
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
		opacity: 0.08;
		background-image: linear-gradient(115deg, #000, #fff);
		--lines: 0.0001px;
	}

	[data-today='true'] {
		outline: solid 2px rgba(255, 255, 255, 0.6);
	}
</style>
