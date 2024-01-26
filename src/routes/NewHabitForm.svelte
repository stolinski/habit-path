<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	const { form, mobile = false, onfinish = () => {} } = $props<{
		form: ActionData | null;
		mobile?: boolean;
		onfinish?: () => any;
	}>();
	let loading = $state(false);

	function close_form() {
		if (form?.message) {
			onfinish();
		}
	}
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
				close_form();
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

	{#if form?.message}
		<p class="error">{form.message}</p>
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
