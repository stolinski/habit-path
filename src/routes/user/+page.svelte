<script lang="ts">
	import { enhance } from '$app/forms';
	import Cookie from 'js-cookie';
	const { data } = $props();
	let loading = $state(false);
	let active_theme = $state(Cookie.get('theme'));

	const themes = ['System', 'Light', 'Dark', 'OLED'];
	const button_themes = ['System'];

	function change_theme(this: HTMLButtonElement, e: Event) {
		// 1. set to theme state, for instant ui responsiveness
		const theme_name = this.innerText.toLocaleLowerCase();
		const theme_wrapper = document.querySelector('.theme_wrapper');
		if (theme_wrapper) theme_wrapper.className = `theme_wrapper ${theme_name}`;
		Cookie.set('theme', theme_name);
		active_theme = theme_name;
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

	<!-- <h3>Button Theme</h3> -->
	<!-- TODO button themes -->

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
				<button class="button close" type="submit" disabled={loading}
					>{#if loading}Logging out...{:else}
						Logout
					{/if}</button
				>
			</p>
		</form>
	</div>
</div>
