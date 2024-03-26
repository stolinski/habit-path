<script lang="ts">
	import screen from './Desktop-dark.png';
	import mobile_screen from './Mobile-dark.png';
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
	<div class="readable">
		<h1>Habit Path is a simple and effective habit tracker to achieve your goals</h1>
	</div>

	<div class="readable">
		<a class="button signup" href="/signup">Sign up</a>
		<p>Already have an account? <a href="/login">Login</a></p>
	</div>
</div>

<div class="screenshots">
	<img src={screen} alt="Mobile Screenshot" />
	<img src={mobile_screen} alt="Mobile Screenshot" />
</div>

<hr />

<section class="faq readable">
	<h2>What is Habit Path?</h2>
	<p>
		Habit Path is a habit tracking app for people who hate complexity and clutter. Put your habits
		in front of you without making you jump through hoops or pay $8/ month for a subscription unless
		you want extras.
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

	.signup {
		font-size: var(--font-size-md);
		text-decoration: none;
	}

	.container {
		max-width: 900px;
		margin-inline: auto;
		text-align: center;
	}

	label {
		display: block;
	}
	h1 {
		margin-bottom: 2rem;
	}

	hr {
		margin: 2rem 0 4rem;
		width: 100%;
		border-top: 5px solid var(--tint-or-shade);
	}

	.screenshots {
		display: flex;
		gap: 10px;
		justify-content: center;
	}

	.screenshots img {
		border: solid 1px var(--tint-or-shade);
		border-radius: 26px;
		min-width: 0;
	}

	.input-wrapper {
		display: inline-block;
		text-align: left;
	}
</style>
