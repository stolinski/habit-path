<script lang="ts">
	import { format } from 'date-fns';
	import '../style.css';
	import { today } from '$lib/state.svelte';
</script>

<header>
	<h1><a href="/">H</a></h1>
	<h2>
		<button>«</button>
		{format(today, 'MMMM yyyy')}
		<button>»</button>
	</h2>
</header>

<main>
	<slot />
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	h1 {
		font-weight: 100;
		margin: 0;
		font-style: italic;
	}
	a {
		color: initial;
		text-decoration: none;
	}

	main {
		display: grid;
		grid-template-columns: 2.5vw 95vw 2.5vw;
	}
	main > :global(*) {
		grid-column: 2/3;
	}
</style>
