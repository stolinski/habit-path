<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Portal from './Portal.svelte';
	let { active } = $props<{ active: boolean }>();

	function closeModal() {
		active = !active;
	}
</script>

{#if active}
	<Portal target="body">
		<div transition:fly={{ opacity: 0, y: 100 }} class="modal-wrapper">
			<button class="button close" on:click={closeModal} aria-label="Close Modal Box">×</button>
			<slot />
		</div>
		<div on:click={closeModal} transition:fade class="background" />
	</Portal>
{/if}

<style>
	.modal-wrapper {
		inset: 100px 0 auto;
		margin: 0 auto;
		max-width: 530px;
		min-width: 320px;
		position: fixed;
		width: 100%;
		z-index: 1001;
		background: var(--bg);
		border: solid 1px var(--tint);
		padding: 20px;
		border-radius: var(--brad);
		height: auto;
	}

	@media screen and (max-height: 700px) {
		.modal-wrapper {
			inset: 0;
		}
	}

	.close {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.background {
		background: var(--black);
		cursor: pointer;
		inset: 0;
		opacity: 0.9;
		position: fixed;
		z-index: 1000;
	}
</style>
