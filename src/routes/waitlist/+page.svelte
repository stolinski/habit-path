<script lang="ts">
	import { enhance } from '$app/forms';
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
	<form use:enhance>
		<label for="email">Email</label>
		<input required id="email" name="email" type="text" placeholder="ready2track@fake.com" />
		<button class="button" type="submit"> Sign Me Up </button>
	</form>
</div>

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
</style>
