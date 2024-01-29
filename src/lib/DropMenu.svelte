<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import type { TransformedHabits } from '../routes/+page.server';
	import Backdrop from './Backdrop.svelte';
	import Dots from './Dots.svelte';
	import Edit from './Edit.svelte';
	import Eye from './Eye.svelte';
	import Modal from './Modal.svelte';
	import Reorder from './Reorder.svelte';
	import Trash from './Trash.svelte';
	import { click_outside } from './click_outside';
	import { app } from './state.svelte';
	import HabitForm from '../routes/HabitForm.svelte';
	import type { ActionData } from '../../.svelte-kit/types/src/routes/$types';

	const { form, habit } = $props<{
		form: ActionData;
		habit: TransformedHabits;
	}>();
	let active = $state(false);
	let hiding = $state(false);
	let delete_modal = $state(false);
	let edit_drawer = $state(false);
	const { id } = habit;

	function open() {
		active = true;
	}

	function openDelete() {
		delete_modal = true;
	}

	function openEdit() {
		edit_drawer = true;
	}

	function finishEdit() {
		edit_drawer = false;
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
				<Reorder />
				Reorder</button
			>
			<button class="ghost" onclick={close(openEdit)}>
				<Edit />
				Edit</button
			>
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

{#if edit_drawer}
	<div class="form_drawer" transition:fly={{ opacity: 0, y: '100%' }}>
		<div class="form_drawer_container">
			<button class="ghost button" on:click={finishEdit}>Cancel</button>
			<HabitForm {habit} mobile={true} {form} onfinish={finishEdit} />
		</div>
	</div>
{/if}

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
  .form_drawer :global(h3) {
		text-align: center;
  }
  .form_drawer_container .ghost {
		position: absolute;
		top: 15px;
		left: 15px;
  }
  .buttons {
		display: flex;
		justify-content: space-between;
	}
  .form_drawer {
		background: var(--bg);
		border-radius: 15px;
		position: fixed;
		inset: 40px 0 0 0;
		box-shadow: var(--shadow-upwards);
		z-index: 200;
  }
  .form_drawer_container {
		margin: 0 auto;
		max-width: 700px;
  }
</style>
