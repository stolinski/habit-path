<script lang="ts">
	import { app, datez } from '$lib/state.svelte';
	import { format } from 'date-fns';
	import '../style.css';
	import MobileNav from './MobileNav.svelte';
	let { data } = $props();
</script>

<div class="app-rap {app.mode}">
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
				<a href="/user" class="user_menu">{data.user?.email[0]}</a>
			{/if}
		</header>
	{/if}

	<main>
		<slot />
	</main>

	<footer>
		<nav>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/roadmap">Road Map</a></li>
				<li><a href="/waitlist">Waitlist</a></li>
			</ul>
		</nav>
	</footer>
</div>

{#if !data.url.includes('waitlist')}
	<MobileNav />
{/if}

<style>
	header {
		padding: 10px 20px;
		align-items: center;
		margin-bottom: 1rem;
	}

	footer {
		background: var(--shade);
		padding: 40px 40px 100px;
		margin-top: auto;
	}

	footer a {
		color: var(--fg);
	}

	footer ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	footer li {
		font-size: var(--font-size-sm);
	}

	h1 {
		font-weight: 100;
		margin: 0;
		font-style: italic;
	}

	h2 {
		align-self: center;
		margin: 0;
		font-size: 18px;
	}

	a {
		color: initial;
		text-decoration: none;
	}

	.date_picker {
		display: flex;
		justify-content: center;
		align-self: end;
		justify-self: center;
	}
	.date_picker button {
		background: transparent;
		color: var(--fg);
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

	.user_menu {
		border-radius: 50%;
		--size: 35px;
		height: var(--size);
		width: var(--size);
	}

	.app-rap {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Desktop */
	@media (width > 700px) {
		header {
			display: grid;
			grid-template-columns: 35px 1fr 35px;
		}
	}

	/* Mobile */
	@media (width < 700px) {
		h1 {
			display: none;
		}
		.user_menu {
			display: none;
		}
	}
</style>
