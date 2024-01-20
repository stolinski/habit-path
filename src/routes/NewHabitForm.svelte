<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	const { mobile = false, onfinish = () => {} } = $props<{
		form: ActionData | null;
		mobile?: boolean;
		onfinish?: () => any;
	}>();
	let loading = $state(false);
</script>

<div class="form new_habit_form" class:mobile>
	<h3 class="h5">New Habit</h3>
	<form
		action="?/new_habit"
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				loading = false;
				update();
				onfinish();
			};
		}}
	>
		<div class="row">
			<label for="name">Name</label>
			<input type="text" name="name" id="name" />
		</div>
		<div class="row">
			<label for="days_per_month">Goal</label>
			<input type="number" max="31" value="31" name="days_per_month" id="days_per_month" /><br />
			<span class="note">days per month (31 max)</span>
		</div>
		<button class="button" type="submit" disabled={loading}
			>{#if loading}Adding...{:else}
				+ Add Habit
			{/if}</button
		>
	</form>
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
