<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	const { form } = $props();
	$inspect(form);
	let loading = $state(false);
</script>

<div class="container">
	<svg width="50" viewBox="0 0 74 69" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M38 69L50.1 0H55.1L43 69H38ZM0 69L12.1 0H17.1L5 69H0ZM9.1 35.9V31.3H72.4L71.5 35.9H9.1Z"
			fill="#222"
		/>
		<path d="M71 41L74 26H69.5L66.5 41H71Z" fill="#222" />
	</svg>

	<h1>Habit Path</h1>
	<p>
		Heya, I'm working hard to make this available for anyone who wants to track their habits in a
		painless way. No subscriptions, no fluff.
	</p>
	{#if form?.success}
		<p transition:fade>Thank you so much. I'll let you know when it's usable. Won't be long.</p>
	{:else}
		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					update();
				};
			}}
		>
			<label for="email">Email</label>
			<input required id="email" name="email" type="text" placeholder="ready2track@fake.com" />
			<button disabled={loading} class="button" type="submit"
				>{#if loading}Submitting...{:else}
					Sign Me Up
				{/if}</button
			>
			{#if form?.message}
				<p class="error">{form?.message}</p>
			{/if}
		</form>
	{/if}
	<p>Already have an account? <a href="/login">Login</a></p>
</div>

<!-- <hr />

<section class="faq">
	<h2>What is Habit Path?</h2>
	<div class="screenshots">
		<img src={screen} alt="Mobile Screenshot" style="max-height: 400px;" />
		<img src={desk_screen} alt="Desktop Screenshot" style="max-height: 400px;" />
	</div>
	<p>
		Habit Path is a free (all core features forever) habit tracking app for people who hate
		complexity and clutter. Put your habits in front of you without making you jump through hoops or
		pay $8/ month for a subscription.
	</p>

	<h3>Is it an app?</h3>
	<p>
		Currently Habit Path is a "web app". This means it runs in the browser however it can still be
		installed onto your home screen like a normal app, <a href="/pwa">see how!</a>.
	</p>
</section> -->

<style>
	.container {
		max-width: 900px;
	}
	svg {
		margin-top: 20vh;
	}
	h1 {
		font-style: italic;
		font-weight: 100;
	}
	label {
		display: block;
	}

	.faq {
		margin-top: 8rem;
	}

	.screenshots {
		display: flex;
		gap: 10px;
		flex: 0 / 0;
	}
	.screenshots img {
		border: solid 5px var(--bg_1);
		border-radius: 10px;
	}
</style>
