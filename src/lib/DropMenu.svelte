<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import type { TransformedHabits } from '../routes/+page.server';
	import Backdrop from './Backdrop.svelte';
	import Dots from './Dots.svelte';
	import Eye from './Eye.svelte';
	import Modal from './Modal.svelte';
	import Trash from './Trash.svelte';
	import { click_outside } from './click_outside';
	import { app } from './state.svelte';

	const { habit } = $props<{ habit: TransformedHabits }>();
	let active = $state(false);
	let hiding = $state(false);
	let delete_modal = $state(false);
	const { id } = habit;

	function open() {
		active = true;
	}

	function openDelete() {
		delete_modal = true;
	}

	function close(fn: any) {
		if (typeof fn === 'function') {
			return function (event) {
				active = false;
				fn.call(this, event);
			};
		}
		active = false;
		return;
	}
</script>

<div style="position: relative;">
	<button class="menu_button" onclick={open}>
		<Dots />
	</button>
	{#if active}
		<div
			transition:fly={{ opacity: 0, y: 10 }}
			class="select-menu-menu-wrapper"
			use:click_outside
			on:click-outside={close}
		>
			<button class="ghost" onclick={close(app.reorder)}>
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M11.78 11.16a.75.75 0 0 0-1.06 0l-1.97 1.97V2.87l1.97 1.97a.75.75 0 1 0 1.06-1.06L8.53.53 8 0l-.53.53-3.25 3.25a.75.75 0 0 0 1.06 1.06l1.97-1.97v10.26l-1.97-1.97a.75.75 0 0 0-1.06 1.06l3.25 3.25L8 16l.53-.53 3.25-3.25a.75.75 0 0 0 0-1.06Z"
						fill="var(--fg);"
					/></svg
				>
				Reorder</button
			>
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

	{#if active}
		<Backdrop onclick={close} />
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
		z-index: 10;
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
