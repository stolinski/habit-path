<script lang="ts">
	import { next_month, prev_month } from '../state/date.svelte';
	import { format_month_year } from './utils';

	const { start_date } = $props<{ start_date: Temporal.PlainDate }>();
</script>

<div class="date_picker">
	<h2 class="h6">
		<button on:click={() => prev_month(start_date)}>«</button>
		{format_month_year(start_date)}
		<button on:click={() => next_month(start_date)}>»</button>
	</h2>
</div>

<style>
	button {
		border: none;
	}

	h2 {
		display: flex;
		justify-content: space-between;
		align-self: end;
		width: 215px;
		font-family: var(--mono-font-family);
		font-weight: 100;
		font-style: italic;
	}
	.date_picker {
		justify-self: center;
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.date_picker button {
		background: transparent;
		color: var(--fg);
	}
</style>
