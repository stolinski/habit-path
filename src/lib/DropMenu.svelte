<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import type { TransformedHabits } from '../routes/+page.server';
	import Dots from './Dots.svelte';
	import Eye from './Eye.svelte';
	import Modal from './Modal.svelte';
	import Trash from './Trash.svelte';

	const { habit } = $props<{ habit: TransformedHabits }>();
	let active = $state(false);
	let hiding = $state(false);
	let delete_modal = $state(false);
	const { id } = habit;

	function onclick() {
		active = !active;
	}

	function openDelete() {
		delete_modal = true;
	}
</script>

<div style="position: relative;">
	<button class="menu_button" {onclick}>
		<Dots />
	</button>
	{#if active}
		<div transition:fly={{ opacity: 0, y: 10 }} class="select-menu-menu-wrapper">
			<!-- TODO Add Edit mode -->
			<!-- TODO Add Archive -->
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
			<button class="ghost" onclick={openDelete}><Trash />Delete</button>
		</div>
	{/if}
</div>

<Modal bind:active={delete_modal}>
	<div class="card">
		<h4>Delete Habit?</h4>
		<p>This cannot be undone</p>
		<div class="buttons">
			<form
				action="?/delete_habit"
				method="POST"
				use:enhance={() => {
					hiding = true;
					return async ({ update }) => {
						hiding = false;
						active = false;
						update();
						delete_modal = false;
					};
				}}
			>
				<input type="hidden" value={id} name="habit_id" />
				<button class="close button" disabled={hiding}
					>{#if hiding}Deleting...{:else}
						Delete
					{/if}</button
				>
			</form>
			<button
				class="button ghost"
				on:click={() => {
					delete_modal = false;
				}}
			>
				Cancel
			</button>
		</div>
	</div>
</Modal>

<style>
	.menu_button {
		padding: 0 30px 0 10px;
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
		top: 0px;
		right: 65px;
		border: solid 1px var(--tint);
		width: 150px;
	}

	.select-menu-menu-wrapper button {
		text-align: left;
		width: 100%;
	}

	.ghost {
		display: flex;
		gap: 10px;
		padding: 5px;
		align-items: center;
		border-radius: var(--brad);
	}

	.ghost :global(svg) {
		flex-shrink: 0;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
