<script lang="ts">
	import { enhance } from '$app/forms';
	import Cookie from 'js-cookie';
	const { data } = $props();
	let loading = $state(false);
	let active_theme = $state(Cookie.get('theme'));
	let button_theme = $state(Cookie.get('button_theme'));

	const themes = ['System', 'Light', 'Dark', 'OLED'];
	const button_themes = ['Path', 'Cyber', 'Soft'];

	function change_theme(this: HTMLButtonElement, e: Event) {
		// 1. set to theme state, for instant ui responsiveness
		const theme_name = this.innerText.toLocaleLowerCase();
		const theme_wrapper = document.querySelector('.theme_wrapper');
		if (theme_wrapper) theme_wrapper.className = `theme_wrapper ${theme_name}`;
		Cookie.set('theme', theme_name);
		active_theme = theme_name;
	}

	function change_button_theme(this: HTMLButtonElement, e: Event) {
		// 1. set to theme state, for instant ui responsiveness
		const theme_name = this.innerText.toLocaleLowerCase();
		const theme_wrapper = document.querySelector('.button_theme_wrapper');
		if (theme_wrapper) theme_wrapper.className = `button_theme_wrapper ${theme_name}`;
		Cookie.set('button_theme', theme_name);
		button_theme = theme_name;
	}
</script>

<div class="readable content">
	<div class="content">
		<h3>UI Theme</h3>

		<div class="flex">
			{#each themes as theme}
				<button
					class="ghost button"
					class:active={theme.toLowerCase() === active_theme}
					on:click={change_theme}
				>
					<span>{theme}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="content">
		<h3>Button Theme</h3>

		<div class="flex">
			{#each button_themes as theme}
				<button
					class="ghost button theme_button"
					class:active={theme.toLowerCase() === button_theme}
					on:click={change_button_theme}
				>
					<div class="button-{theme.toLowerCase()} button_theme_selector_colors">
						<div class="circle" />
						<div class="circle" />
						<div class="circle" />
						<div class="circle" />
						<div class="circle" />
						<div class="circle" />
					</div>
					<span>{theme}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="content" style="margin-top: 4rem">
		<h1 class="h4">User Settings</h1>
		<h2 class="h6">{data?.user?.email}</h2>

		<form
			action="?/logout"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					update();
				};
			}}
			method="POST"
		>
			<p>
				<button class="button close" type="submit" disabled={loading}>
					{#if loading}Logging out...{:else}
						Logout
					{/if}
				</button>
			</p>
		</form>
	</div>
</div>

<style>
	h3 {
		margin-bottom: 2rem;
	}

	.circle {
		display: block;
		height: 15px;
		width: 70px;
	}

	.button_theme_selector_colors {
		position: relative;
		top: -3px;
	}

	.theme_button {
		padding: 0;
		overflow: hidden;
		transition: 0.2s ease translate;
	}

	.theme_button.active {
		translate: 0 -10px;
	}

	.button_theme_selector_colors .circle:nth-child(1) {
		background-color: var(--button_1);
	}
	.button_theme_selector_colors .circle:nth-child(2) {
		background-color: var(--button_2);
	}
	.button_theme_selector_colors .circle:nth-child(3) {
		background-color: var(--button_3);
	}
	.button_theme_selector_colors .circle:nth-child(4) {
		background-color: var(--button_4);
	}
	.button_theme_selector_colors .circle:nth-child(5) {
		background-color: var(--button_5);
	}
	.button_theme_selector_colors .circle:nth-child(6) {
		background-color: var(--button_6);
	}
</style>
