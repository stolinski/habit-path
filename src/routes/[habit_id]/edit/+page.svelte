<script lang="ts">
	const { data, form } = $props();
	let loading = $state(false);
</script>

<a href={`/${data.habit.id}`}>Back</a>
<h1>{data.habit.name}</h1>

<div class="form new_habit_form">
	<h3 class="h5">Update Habit — {data.habit.name}</h3>
	<form
		action="?/update_habit"
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				loading = false;
				update();
			};
		}}
	>
		<div class="row">
			<label for="name">Name</label>
			<input type="text" name="name" id="name" value={data.habit.name} />
		</div>
		<div class="row">
			<label for="days_per_month">Goal</label>
			<input type="number" max="31" name="days_per_month" id="days_per_month" value={data.habit.days_per_month} /><br />
			<span class="note">days per month (31 max)</span>
		</div>
		<button class="button" type="submit" disabled={loading}
		>{#if loading}Updating...{:else}
			Update Habit
		{/if}</button
		>
	</form>

	{#if form?.message}
		<p class="error">{form?.message}</p>
	{/if}
</div>

<style>
</style>
