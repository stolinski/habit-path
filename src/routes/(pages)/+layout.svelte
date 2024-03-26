<script lang="ts">
	import { app } from '$lib/state.svelte';
	import { fly } from 'svelte/transition';
	import '../../style.css';
</script>

<div class="button_theme_wrapper">
	<div id="theme-wrapper">
		<div class="app-rap {app.mode}">
			<main>
				<slot><!-- optional fallback --></slot>
			</main>
		</div>
	</div>
</div>

<footer transition:fly={{ opacity: 0, y: '100%' }}>
	<nav>
		<ul>
			<li><a href="/landing">Home</a></li>
			<li><a href="/">My Habits</a></li>
			<li><a href="/roadmap">Road Map</a></li>
		</ul>
	</nav>
</footer>

<style>
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

	.app-rap {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Mobile */
	@media (width < 700px) {
		h1 {
			display: none;
		}
	}
</style>
