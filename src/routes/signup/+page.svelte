<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="email">Email</label>
	<input name="email" id="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<label for="code">Code</label>
	<input name="code" id="code" /><br />
	<button class="button" type="submit">Sign Up</button>
</form>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
<a href="/login">Sign in</a>
