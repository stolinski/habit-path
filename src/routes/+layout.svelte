<script lang="ts">
	import { format } from 'date-fns';
	import '../style.css';
	import { datez } from '$lib/state.svelte';
	let { data } = $props();
</script>

{#if !data.url.includes('waitlist')}
	<header>
		<h1>
			<a href="/">
				<svg width="30" viewBox="0 0 74 69" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M38 69L50.1 0H55.1L43 69H38ZM0 69L12.1 0H17.1L5 69H0ZM9.1 35.9V31.3H72.4L71.5 35.9H9.1Z"
						fill="var(--fg)"
					/>
					<path d="M71 41L74 26H69.5L66.5 41H71Z" fill="var(--fg)" />
				</svg>
			</a>
		</h1>
		{#if !data.url.includes('signup') && !data.url.includes('login') && !data.url.includes('roadmap')}
			<div class="date_picker">
				<h2>
					<button on:click={datez.prev_month}>«</button>
					{format(datez.active_date, 'MMMM yyyy')}
					<button on:click={datez.next_month}>»</button>
				</h2>
			</div>
			<button>{data.user?.email[0]}</button>
		{/if}
	</header>
{/if}

<main>
	<slot />
</main>

<style>
	header {
		display: grid;
		grid-template-columns: 35px 1fr 35px;
	}

	h1 {
		font-weight: 100;
		margin: 0;
		font-style: italic;
	}

	h2 {
		align-self: center;
	}

	a {
		color: initial;
		text-decoration: none;
	}
	.date_picker {
		justify-self: center;
	}

	main {
		display: grid;
		grid-template-columns: 2.5vw 95vw 2.5vw;
	}

	main > :global(*) {
		grid-column: 2/3;
	}

	button {
		border: none;
	}
</style>
