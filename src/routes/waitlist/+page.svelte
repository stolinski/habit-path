<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import screen from './Desktop-dark.png';
	import mobile_screen from './Mobile-dark.png';

	const { form } = $props();
	$inspect(form);
	let loading = $state(false);
</script>

<div class="container">
	<div class="logo">
		<svg width="50" viewBox="0 0 74 69" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M38 69L50.1 0H55.1L43 69H38ZM0 69L12.1 0H17.1L5 69H0ZM9.1 35.9V31.3H72.4L71.5 35.9H9.1Z"
				fill="var(--fg)"
			/>
			<path d="M71 41L74 26H69.5L66.5 41H71Z" fill="var(--fg)" />
		</svg>
	</div>

	<div class="screenshots">
		<img src={screen} alt="Mobile Screenshot" />
		<img src={mobile_screen} alt="Mobile Screenshot" />
	</div>

	<div class="readable">
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
</div>

<hr />

<section class="faq readable">
	<h2>FAQ</h2>
	<h3 class="h5">What is Habit Path?</h3>
	<p>
		Habit Path is a free (all core features forever) habit tracking app for people who hate
		complexity and clutter. Put your habits in front of you without making you jump through hoops or
		pay $8/ month for a subscription.
	</p>

	<h3 class="h5">Is it an app?</h3>
	<p>
		Currently Habit Path is a "web app". This means it runs in the browser however it can still be
		installed onto your home screen like a normal app, <a href="/pwa">see how!</a>.
	</p>
</section>

<style>
	.logo {
		margin: 0 auto;
		display: block;
		margin: 10vh 0 2rem;
		display: flex;
		justify-content: center;
	}

	.container {
		max-width: 900px;
	}

	h1 {
		font-style: italic;
		font-weight: 100;
	}

	label {
		display: block;
	}

	hr {
		margin: 2rem 0 4rem;
		width: 100%;
		border-top: 5px solid var(--tint-or-shade);
	}

	.screenshots {
		display: flex;
		gap: 10px;
		overflow: auto;
		flex: 0 / 0;
	}

	.screenshots img {
		border: solid 5px var(--tint-or-shade);
		border-radius: 26px;
		height: 400px;
		flex-shrink: 0;
	}
</style>
