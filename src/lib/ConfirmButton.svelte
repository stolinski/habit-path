<script lang="ts">
	import Modal from './Modal.svelte';

	let {
		action = (() => void),
		title = '',
		description = '',
		cancelText = 'Cancel',
		acceptText = 'Accept',
		buttonText = 'Upgrade',
		disabled = false,
		isConfirmActive = false,
	} = $props();

</script>

<button
	class="button"
	on:click={() => {
		isConfirmActive = true;
	}}
	{disabled}
>
	{buttonText}
</button>
<Modal bind:isModalOpen={isConfirmActive}>
	<div class="card">
		{#if title}
			<h2>{title}</h2>
		{/if}
		<p>{description}</p>
		<button
			class="button"
			on:click={() => {
				action();
				isConfirmActive = false;
			}}
		>
			{acceptText}
		</button>
		<button
			class="button"
			color="cancel"
			on:click={() => {
				isConfirmActive = false;
			}}
		>
			{cancelText}
		</button>
	</div>
</Modal>
