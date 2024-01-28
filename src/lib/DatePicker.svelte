<script lang="ts">
	import { format } from 'date-fns';
	import { next_month, prev_month } from '../state/date.svelte';

	const { start_date } = $props<{ start_date: Date }>();
</script>

<div class="date_picker">
	<h2 class="h6">
		<button on:click={() => prev_month(start_date)}>«</button>
		{format(start_date, 'MMMM yyyy')}
		<button on:click={() => next_month(start_date)}>»</button>
	</h2>
</div>

<style>
	button {
		border: none;
	}
	.date_picker {
		display: flex;
		justify-content: center;
		align-self: end;
		justify-self: center;
	}
	.date_picker button {
		background: transparent;
		color: var(--fg);
	}
</style>
