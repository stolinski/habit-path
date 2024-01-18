<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	const { form } = $props();
	let loading = $state(false);
</script>

<h1>Forgot Password</h1>
{#if form?.success}
	<p transition:fade>Password recovery email sent.</p>
{:else}
	<form
		class="form"
		method="post"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				loading = false;
				update();
			};
		}}
	>
		<div class="row">
			<label for="password">Password</label>
			<input name="password" id="password" type="password" autocomplete="new-password" /><br />
		</div>
		<div class="row">
			<label for="confirm-password">Confirm Password</label>
			<input
				name="confirm-password"
				id="confirm-password"
				type="password"
				autocomplete="new-password"
			/><br />
		</div>
		<button class="button" type="submit" disabled={loading}
			>{#if loading}Setting Password...{:else}
				Set New Password
			{/if}</button
		>
	</form>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}
{/if}
