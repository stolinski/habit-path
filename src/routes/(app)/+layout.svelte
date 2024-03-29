<script lang="ts">
	import DatePicker from '$lib/DatePicker.svelte';
	import { app } from '$lib/state.svelte';
	import { fly } from 'svelte/transition';
	import '../../style.css';
	import MobileNav from './MobileNav.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Verify from '$lib/Verify.svelte';

	let { data } = $props();
</script>

{#if data.user && !data.user.verified}
	<Verify />
{/if}

<div class="button_theme_wrapper button-{data.user_button_theme}">
	<div id="theme-wrapper" class="theme_wrapper {data.user_theme}">
		<div class="app-rap {app.mode}">
			{#if !data.url.includes('landing') && app.mode !== 'REORDER'}
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

					<DatePicker start_date={Temporal.PlainDate.from(data.active_date)} />
					<a href="/user" class="user_menu">{data.user?.email[0]}</a>
				</header>
			{/if}

			<main>
				<slot />
			</main>
		</div>

		{#if !data.url.includes('landing') && app.window_mode !== 'FOCUS'}
			<MobileNav />
		{/if}
	</div>
</div>

<Toaster />

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
