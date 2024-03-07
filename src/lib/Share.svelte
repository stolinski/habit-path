<script lang="ts">
	import type { TransformedHabits } from '../server/data_utils';
	import Modal from './Modal.svelte';
	import Share from '$lib/icons/Share.svelte';
	import toast from 'svelte-french-toast';

	import { format_month_year, is_in_future, iso_to_plain_date } from './utils';
	const { habit, active_date } = $props<{
		habit: TransformedHabits;
		active_date: string;
	}>();

	let active = $state<boolean>(false);

	function onclick() {
		active = !active;
	}

	// Make this easily sharable
	// Not being use currently, but will be fun to have soon after bugs are fixed
	let social_string = $state('');

	$inspect(social_string);
	$effect(() => {
		social_string =
			habit.checks.reduce((accumulator, currentValue, index) => {
				const emoji = currentValue.is_checked
					? '✅'
					: is_in_future(currentValue.checked_at)
						? '🔘'
						: '❌';

				accumulator += emoji;

				if ((index + 1) % 7 === 0) {
					accumulator += '\n';
				}

				return accumulator;
			}, '\n') + '\nBuild your habits at HabitPath.io';
	});

	function copy() {
		navigator.clipboard.writeText(social_string);
		toast.success('Copied to clipboard', { position: 'bottom-center' });
	}
</script>

<button {onclick}><Share /></button>

<Modal bind:active>
	<h2 class="h5">Share</h2>
	<textarea name="" id="" cols="30" rows="7"
		>{format_month_year(iso_to_plain_date(active_date))} - {habit.name}{social_string}</textarea
	>
	<br />
	<button class="button" onclick={copy}>Copy</button>
</Modal>

<style>
	button {
		border: none;
		background: transparent;
		border: none;
		transition: 0.3s ease box-shadow;
	}
	button:hover {
		box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
	}
	textarea {
		width: 100%;
	}
</style>
