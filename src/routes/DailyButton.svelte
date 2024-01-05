<script lang="ts">
	import { enhance } from '$app/forms';
	import { today } from '$lib/state.svelte';
	import { format } from 'date-fns';

	let { habit_id, i, checks } = $props<{
		habit_id: number;
		i: number;
		checks: string[];
	}>();

	let day_of_checked = $derived(today.setDate(i + 1));
</script>

{#if checks.includes(format(day_of_checked, 'MM-dd-yy'))}
	<form action="?/remove_check" method="POST" use:enhance>
		{@render inputs()}
	</form>
{:else}
	<form action="?/add_check" method="POST" use:enhance>
		{@render inputs()}
	</form>
{/if}

{#snippet inputs()}
	<input type="hidden" value={habit_id} name="habit_id" id={'habit_id_' + i} />
	<input type="hidden" value={day_of_checked} name="checked_at" id={'checked_at_' + i} />
	<button
		class:complete={checks.includes(format(day_of_checked, 'MM-dd-yy'))}
		class:today={i === today.getDay() - 1}
		type="submit"
		class="daily_button"
	>
		{format(day_of_checked, 'E')}<br />
		{format(day_of_checked, 'dd')}
	</button>
{/snippet}

<style>
	.daily_button {
		border-radius: 0;
		border: 0;
		height: 60px;
		width: 80px;
		color: #999;
		font-weight: 900;
		flex: 1;
		transition: 0.2s ease-in-out all;
		position: relative;
		background: #ddd;
	}

	.complete {
		background-color: var(--habit_color);
		border: none;
		color: white;
	}
</style>
