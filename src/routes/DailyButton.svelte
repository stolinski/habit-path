<script lang="ts">
	import { enhance } from '$app/forms';
	import { datez } from '$lib/state.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { format } from 'date-fns';

	let { habit_id, i, checks } = $props<{
		habit_id: number;
		i: number;
		checks: string[];
	}>();
	let today = format(new Date(), 'yyyy-MM-dd');

	// TODO rethink how i'm doing this whole, ischecked or not biz
	let day_of_checked = $derived(new Date(datez.active_date.getTime()).setDate(i + 1));
	let day_formatted_of_checked = $derived(format(day_of_checked, 'E'));
	let date_formatted_of_checked = $derived(format(day_of_checked, 'dd'));

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
</script>

{#if checks.includes(format(day_of_checked, 'yyyy-MM-dd'))}
	<form
		action="?/remove_check"
		method="POST"
		use:enhance={({ formElement }) => {
			const day = formElement.elements['checked_at'].value;
			const index = checks.indexOf(day);
			// Check if the element is in the array
			if (index !== -1) {
				// Remove the element using splice
				checks.splice(index, 1);
			}
			return optimistic_rerender_checks;
		}}
	>
		{@render inputs()}
	</form>
{:else}
	<form
		action="?/add_check"
		method="POST"
		use:enhance={({ formElement }) => {
			const day = formElement.elements['checked_at'].value;
			checks.push(day);
			return optimistic_rerender_checks;
		}}
	>
		{@render inputs()}
	</form>
{/if}

{#snippet inputs()}
	<input type="hidden" value={habit_id} name="habit_id" id={'habit_id_' + i} />
	<input
		type="hidden"
		value={format(day_of_checked, 'yyyy-MM-dd')}
		name="checked_at"
		id={'checked_at_' + i}
	/>
	<button
		data-today={today === format(day_of_checked, 'yyyy-MM-dd')}
		class:complete={checks.includes(format(day_of_checked, 'yyyy-MM-dd'))}
		class:today={i === datez.active_date.getDay() - 1}
		type="submit"
		class="daily_button"
	>
		{day_formatted_of_checked}
		<br />
		{date_formatted_of_checked}
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

		mask: repeating-radial-gradient(
			circle at center,
			#000,
			var(--lines),
			#000,
			0,
			/* transition hints make code easier to manage */ #0000,
			calc(var(--lines) * 2),
			#0000 0 /* trailing 0 is part of the hard stop logic */
		);
	}
	[data-today='true'] {
		outline: solid 2px rgba(255, 255, 255, 0.6);
	}

	/* .today {
		position: absolute;
		background: red;
		top: 100px;
		inset: 0;
	} */
</style>
