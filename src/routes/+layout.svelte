<script lang="ts">
	import { format } from 'date-fns';
	import '../style.css';
	import { datez } from '$lib/state.svelte';
	let { data } = $props();
</script>

<header>
	<h1><a href="/">H</a></h1>
	<h2>
		<button>«</button>
		{format(datez.today, 'MMMM yyyy')}
		<button>»</button>
	</h2>
	<button>{data.user?.email[0]}</button>
</header>

<main>
	<slot />
</main>

<style>
	header {
		display: flex;
		justify-content: center;
	}
	h1 {
		position: absolute;
		font-weight: 100;
		left: 2.5vw;
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
