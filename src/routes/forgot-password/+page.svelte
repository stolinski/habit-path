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
			<label for="email">Email</label>
			<input name="email" id="email" /><br />
		</div>
		<button class="button" type="submit" disabled={loading}
			>{#if loading}Sending Email...{:else}
				Send Recovery Email
			{/if}</button
		>
	</form>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}
{/if}

<a href="/login">Sign in</a>
<a href="/signup">Sign up</a>
