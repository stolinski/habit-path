<script lang="ts">
	import { fade } from 'svelte/transition';

	const { children } = $props();
</script>

<div style="display: grid;">
	<div
		in:fade={{ duration: 400, delay: 400 }}
		out:fade={{ duration: 400 }}
		style="grid-row: 1 / -1; grid-column: 1 / -1;"
	>
		{@render children()}
	</div>
</div>
