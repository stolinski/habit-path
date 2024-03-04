<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
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
	import Portal from './Portal.svelte';
	import Drawer from './Drawer.svelte';
	import type { TransformedHabits } from '../server/data_utils';

	const { form, habit } = $props<{
		form: ActionData;
		habit: TransformedHabits;
	}>();

	let menu_status = $state<'HIDDEN' | 'VISIBLE' | 'REORDER' | 'DELETE' | 'EDIT'>('HIDDEN');
	let thinking = $state(false);

	const { id } = habit;

	$inspect(menu_status);

	function open() {
		console.log('open');
		menu_status = 'VISIBLE';
	}

	function delete_habit() {
		menu_status = 'DELETE';
	}

	function edit() {
		menu_status = 'EDIT';
	}

	function close(fn?: any) {
		menu_status = 'HIDDEN';
		if (fn && typeof fn === 'function') {
			return function (event) {
				fn.call(this, event);
			};
		}
		return;
	}
</script>

<div style="position: relative;">
	<button class="menu_button" onclick={open}>
		<Dots />
	</button>
	{#if menu_status === 'VISIBLE'}
		<div
			transition:fly={{ opacity: 0, y: 10 }}
			class="select-menu-menu-wrapper"
			use:click_outside
			on:click-outside={close}
		>
			<button class="ghost" onclick={() => close(app.reorder)}>
				<Reorder />
				Reorder</button
			>
			<button class="ghost" onclick={edit}>
				<Edit />
				Edit</button
			>
			<!-- TODO Add Archive -->
			{#if habit.status === 'VISIBLE'}
				<form
					action="?/hide_habit"
					method="POST"
					use:enhance={() => {
						thinking = true;
						return async ({ update }) => {
							thinking = false;
							update();
						};
					}}
				>
					<input type="hidden" value={id} name="habit_id" />
					<button class="ghost" disabled={thinking}
						><Eye />{#if thinking}Hiding...{:else}
							Hide
						{/if}</button
					>
				</form>
			{:else}
				<form
					action="?/show_habit"
					method="POST"
					use:enhance={() => {
						thinking = true;
						return async ({ update }) => {
							thinking = false;
							update();
						};
					}}
				>
					<input type="hidden" value={id} name="habit_id" />
					<button class="ghost" disabled={thinking}
						><Eye />{#if thinking}Showing...{:else}
							Show
						{/if}</button
					>
				</form>
			{/if}
			<!-- <button class="ghost"><Archive />Archive</button> -->
			<button class="ghost" onclick={delete_habit}><Trash />Delete</button>
		</div>
	{/if}

	{#if menu_status === 'VISIBLE'}
		<Backdrop onclick={close} />
	{/if}
</div>

<Modal active={menu_status === 'DELETE'}>
	<div class="card">
		<h4>Delete Habit?</h4>
		<p>This cannot be undone</p>
		<div class="buttons">
			<form
				action="?/delete_habit"
				method="POST"
				use:enhance={() => {
					thinking = true;
					return async ({ update }) => {
						thinking = false;
						update();
						close();
					};
				}}
			>
				<input type="hidden" value={id} name="habit_id" />
				<button class="close button" disabled={thinking}
					>{#if thinking}Deleting...{:else}
						Delete
					{/if}</button
				>
			</form>
			<button class="button ghost" on:click={close}> Cancel </button>
		</div>
	</div>
</Modal>

<Portal target="body">
	<Drawer active={menu_status === 'EDIT'} {close}>
		<HabitForm {habit} mobile={true} {form} onfinish={close} />
	</Drawer>
</Portal>

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
		transition: 0.3s ease box-shadow;
	}
	button:hover {
		box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
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
