<script lang="ts">
	import DatePicker from '$lib/DatePicker.svelte';
	import { app } from '$lib/state.svelte';
	import { fly } from 'svelte/transition';
	import '../style.css';
	import MobileNav from './MobileNav.svelte';
	let { data } = $props();
</script>

<div class="button_theme_wrapper button-{data.user_button_theme}">
	<div class="theme_wrapper {data.user_theme}">
		<div class="app-rap {app.mode}">
			{#if !data.url.includes('waitlist') && app.mode !== 'REORDER'}
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
					{#if !data.url.includes('signup') && !data.url.includes('login') && !data.url.includes('roadmap') && !data.url.includes('pwa')}
						<DatePicker start_date={data.active_date} />
						<a href="/user" class="user_menu">{data.user?.email[0]}</a>
					{/if}
				</header>
			{/if}

			<main>
				<slot />
			</main>

			{#if app.window_mode !== 'FOCUS'}
				<footer transition:fly={{ opacity: 0, y: '100%' }}>
					<nav>
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="/roadmap">Road Map</a></li>
							<li><a href="/waitlist">Waitlist</a></li>
						</ul>
					</nav>
				</footer>
			{/if}
		</div>

		{#if !data.url.includes('waitlist') && app.window_mode !== 'FOCUS'}
			<MobileNav />
		{/if}
	</div>
</div>

<style>
	header {
		padding: 10px 20px;
		align-items: center;
		background: var(--shade);
		border-bottom: solid 2px var(--shade);
		box-shadow:
			0 2px 2px var(--tint),
			0 -4px 2px rgba(255, 255, 255, 0.1) inset;
	}

	@media (prefers-color-scheme: dark) {
		header {
			border-bottom: solid 2px var(--shade);
			box-shadow:
				0 2px 3px rgba(255, 255, 255, 0.1),
				0 -4px 4px rgba(255, 255, 255, 0.04) inset;
		}
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

	a {
		color: inherit;
		text-decoration: none;
	}

	main {
		display: grid;
		grid-template-columns: 2.5vw 95vw 2.5vw;
	}

	main > :global(*) {
		grid-column: 2/3;
	}

	.user_menu {
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
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
