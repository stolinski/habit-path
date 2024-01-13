<script lang="ts">
	import { enhance } from '$app/forms';
	const { data } = $props();
	let loading = $state(false);
</script>

<h1 class="h6">{data.user.email}</h1>
<p>This is your user page, not much here right now, but more information and settings soon.</p>
<form
	action="?/logout"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	}}
	method="POST"
>
	<button class="button" type="submit" disabled={loading}
		>{#if loading}Logging out...{:else}
			Logout
		{/if}</button
	>
</form>
