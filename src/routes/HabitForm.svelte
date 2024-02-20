<script lang="ts">
	import { enhance } from '$app/forms';
	import { habits } from '../schema';
	import type { ActionData } from './$types';
	const {
		form,
		habit,
		mobile = false,
		onfinish = () => {},
	} = $props<{
		form: ActionData | null;
		habit?: typeof habits.$inferSelect;
		mobile?: boolean;
		onfinish?: () => any;
	}>();
	let loading = $state(false);
</script>

<!-- TODO quick select from common habits, ie no alcohol, no marijuana, no smoking, workout, cardio, strength train -->
<div class="form new_habit_form" class:mobile>
	<h3 class="h5">{habit ? 'Update' : 'New'} Habit</h3>
	<form
		action={habit ? '?/update_habit' : '?/new_habit'}
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ result, update }) => {
				loading = false;
				update();
				if (result.type === 'success') {
					onfinish();
				}
			};
		}}
	>
		{#if habit}
			<input type="hidden" name="habit_id" value={habit.id} />
		{/if}
		<div class="row">
			<label for="name">Name</label>
			<input type="text" name="name" id="name" value={habit?.name ?? ''} />
		</div>
		<div class="row">
			<label for="days_per_month">Goal</label>
			<input
				type="number"
				max="31"
				value={habit?.days_per_month ?? '31'}
				name="days_per_month"
				id="days_per_month"
			/><br />data.active_date
			<span class="note">days per month (31 max)</span>
		</div>
		<button class="button" type="submit" disabled={loading}
			>{#if loading}{habit ? 'Updating' : 'Adding'}...{:else}
				{habit ? 'Update' : '+ Add'} Habit
			{/if}</button
		>
	</form>

	{#if form?.message}
		<p class="error">{form?.message}</p>
	{/if}
</div>

<style>
	input {
		font-size: var(--font-size-lg);
	}

	.mobile {
		border: none;
	}

	@media (width < 700px) {
		.new_habit_form:not(.mobile) {
			display: none;
		}
	}
</style>
