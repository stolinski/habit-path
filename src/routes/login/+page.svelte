<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<h1>Login</h1>
<form class="form" method="post" use:enhance>
	<div class="row">
		<label for="email">Email</label>
		<input name="email" id="email" /><br />
	</div>
	<div class="row">
		<label for="password">Password</label>
		<input type="password" name="password" id="password" /><br />
	</div>
	<button class="button" type="submit">Login</button>
</form>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
<a href="/signup">Sign Up</a>
