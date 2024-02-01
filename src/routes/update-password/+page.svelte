<script lang="ts">
	import { enhance } from '$app/forms';
	const { form } = $props();
	let loading = $state(false);
</script>

<h1>Update Password</h1>
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
		<label for="old_password">Old Password</label>
		<input type="password" name="old_password" id="old_password" /><br />
	</div>
	<div class="row">
		<label for="new_password">New Password</label>
		<input type="password" name="new_password" id="new_password" /><br />
	</div>
	<div class="row">
		<label for="confirm_password">Confirm New Password</label>
		<input type="password" name="confirm_password" id="confirm_password" /><br />
	</div>
	<button class="button" type="submit" disabled={loading}
	>{#if loading}Updating password...{:else}
		Update Password
	{/if}</button
	>
</form>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
<a href="/user">Back to User Settings</a>
