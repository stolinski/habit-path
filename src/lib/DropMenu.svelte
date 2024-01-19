<script lang="ts">
	import { enhance } from '$app/forms';
	import Dots from './Dots.svelte';
	import Eye from './Eye.svelte';

	const { habit } = $props();
	let active = $state(false);
	let hiding = $state(false);
	const { id } = habit;

	function onclick() {
		active = !active;
	}
</script>

<div style="position: relative;">
	<button class="menu_button" {onclick}>
		<Dots />
	</button>
	{#if active}
		<div class="select-menu-menu-wrapper">
			<!-- TODO Add Edit mode -->
			<!-- TODO Add Archive -->
			<!-- TODO Add Double Confirm Delete -->
			<!-- <button class="ghost"><Edit />Edit</button>  -->
			{#if habit.status === 'VISIBLE'}
				<form
					action="?/hide_habit"
					method="POST"
					use:enhance={() => {
						hiding = true;
						return async ({ update }) => {
							hiding = false;
							update();
						};
					}}
				>
					<input type="hidden" value={id} name="habit_id" />
					<button class="ghost" disabled={hiding}
						><Eye />{#if hiding}Hiding...{:else}
							Hide
						{/if}</button
					>
				</form>
			{:else}
				<form
					action="?/show_habit"
					method="POST"
					use:enhance={() => {
						hiding = true;
						return async ({ update }) => {
							hiding = false;
							update();
						};
					}}
				>
					<input type="hidden" value={id} name="habit_id" />
					<button class="ghost" disabled={hiding}
						><Eye />{#if hiding}Showing...{:else}
							Show
						{/if}</button
					>
				</form>
			{/if}
			<!-- <button class="ghost"><Archive />Archive</button> -->
			<!-- <button class="ghost"><Trash />Delete</button> -->
		</div>
	{/if}
</div>

<style>
	.menu_button {
		padding: 0 20px 0 10px;
		background: transparent;
		--fg: var(--tint);
	}

	form {
		display: block;
	}

	button {
		border: none;
	}

	.select-menu-menu-wrapper {
		background: var(--bg);
		box-shadow: var(--level_4);
		border-radius: var(--brad);
		padding: 10px;
		flex-direction: column;
		gap: 10px;
		display: flex;
		position: absolute;
		top: -10px;
		right: 40px;
		width: 150px;
	}

	.select-menu-menu-wrapper button {
		text-align: left;
	}

	.ghost {
		display: flex;
		gap: 10px;
		width: 100%;
		padding: 5px;
		align-items: center;
		border-radius: var(--brad);
	}

	.ghost :global(svg) {
		flex-shrink: 0;
	}
</style>
