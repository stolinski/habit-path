<script lang="ts">
	import FormButton from '$lib/FormButton.svelte';
</script>

<div>
	<p>
		Please verify your email <FormButton
			action_path="/user?/verify"
			text="Send Verification Email"
			thinking_text="Sending..."
		/>
	</p>
</div>

<style>
	div {
		text-align: center;
		border-bottom: solid 1px white;
		background: var(--white);
		margin: 0;
		padding: 10px;
	}
	p {
		margin: 0;
		font-size: var(--font-size-sm);
	}
</style>
