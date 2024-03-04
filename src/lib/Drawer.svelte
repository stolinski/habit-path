<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { draggable } from '@neodrag/svelte';
	import { tweened } from 'svelte/motion';

	const { children, active, close } = $props<{
		children: Snippet;
		active: boolean;
		close: () => void;
	}>();

	let returnToPositionTransitionVal = tweened(
		{
			x: 0,
			y: 0,
		},
		{ duration: 200 },
	);
</script>

{#if active}
	<div
		class="form_drawer"
		transition:fly={{ opacity: 0, y: '100%' }}
		use:draggable={{
			axis: 'y',
			position: $returnToPositionTransitionVal,
			handle: '.handle',
			onDrag: (data) => {
				returnToPositionTransitionVal.set({ x: data.offsetX, y: data.offsetY }, { duration: 0 });
			},
			onDragEnd: (data) => {
				if (data.offsetY > 300) {
					close();
				}
				tick();
				returnToPositionTransitionVal.set({ x: 0, y: 0 });
			},
		}}
	>
		<div class="handle"></div>
		<div class="form_drawer_container">
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.handle {
		background: var(--tint-or-shade);
		height: 10px;
		border-radius: 10px;
		width: 30%;
		margin: 1rem auto 0;
	}

	.form_drawer :global(input) {
		width: 100%;
	}

	.form_drawer :global(input[type='number']) {
		width: 80px;
	}
	.form_drawer :global(h3) {
		text-align: center;
	}

	.form_drawer_container .ghost {
		position: absolute;
		top: 15px;
		left: 15px;
	}
	.form_drawer {
		background: var(--bg);
		border-radius: 15px;
		position: fixed;
		inset: 40px 0 0 0;
		box-shadow: var(--shadow-upwards);
		z-index: 200;
		padding-bottom: 800px;
	}
	.form_drawer_container {
		margin: 0 auto;
		max-width: 700px;
	}
</style>
