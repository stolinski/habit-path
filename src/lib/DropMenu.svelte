<script lang="ts">
	// Polyfill for Popover. Remove once Firefox supports it. https://caniuse.com/?search=popover
	import { browser } from '$app/environment';
	import { apply, isSupported } from '@oddbird/popover-polyfill/fn';
	import Archive from './Archive.svelte';
	import Dots from './Dots.svelte';
	import Edit from './Edit.svelte';
	import Eye from './Eye.svelte';
	import Trash from './Trash.svelte';

	if (!isSupported() && browser) {
		apply();
	}
	const { id } = $props();
	let active = $state();
	// let searchParams = new URLSearchParams(window.location.search);

	// TODO: remove  this when typescirpt dom ships HTMLPopoverElement
	interface HTMLPopoverElement extends HTMLElement {
		showPopover: () => void;
		hidePopover: () => void;
		togglePopover: () => void;
		popover: 'auto' | 'manual';
	}

	function closePopoverWhenSelected(node: HTMLPopoverElement) {
		function handlePopoverSelection(event) {
			if (event.target instanceof HTMLAnchorElement) {
				node.hidePopover();
			}
		}
		node.addEventListener('click', handlePopoverSelection);
		return {
			destroy() {
				node.removeEventListener('click', handlePopoverSelection);
			},
		};
	}

	function onclick() {
		active = !active;
	}
</script>

<div style="position: relative; z-index: 20;">
	<button class="menu_button" {onclick}>
		<Dots />
	</button>
	{#if active}
		<div class="select-menu-menu-wrapper">
			<button class="ghost"><Edit />Edit</button>
			<button class="ghost"><Eye />Hide</button>
			<button class="ghost"><Archive />Archive</button>
			<button class="ghost"><Trash />Delete</button>
		</div>
	{/if}
</div>

<style>
	.menu_button {
		padding: 0 10px;
		background: transparent;
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
		top: 10px;
		z-index: 10;
		right: 0;
	}

	.select-menu-menu-wrapper button {
		text-align: left;
	}

	.ghost {
		display: flex;
		gap: 10px;
		padding: 5px;
		border-radius: var(--brad);
	}
</style>
