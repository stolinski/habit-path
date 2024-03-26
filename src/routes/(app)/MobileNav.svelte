<nav class="mobile_nav">
	<a href="/">
		<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.5 2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm11.5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-1.25 7a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.25 4.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM2.25 9.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm7-1.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM8 15a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 8 15ZM9.25 2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM2.25 15a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
				fill="var(--fg)"
			/></svg
		>
		<br />
		Habits
	</a>
	<a href="/stats">
		<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.75 1a.75.75 0 0 1 .75.75v9.75h9.75a.75.75 0 0 1 0 1.5H4.5v1.25a.75.75 0 0 1-1.5 0V13H1.75a.75.75 0 0 1 0-1.5H3V1.75A.75.75 0 0 1 3.75 1Zm9.75 4.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5ZM9.75 3a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 9.75 3ZM7.5 7.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z"
				fill="var(--fg)"
			/></svg
		>
		<br />
		Stats
	</a>
	<a href="/user">
		<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M10.5 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm.514 2.63a4 4 0 1 0-6.028 0A4.002 4.002 0 0 0 2 11.5V13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.5a4.002 4.002 0 0 0-2.986-3.87ZM8 9H6a2.5 2.5 0 0 0-2.5 2.5V13a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.5A2.5 2.5 0 0 0 10 9H8Z"
				fill="var(--fg)"
			/></svg
		>
		<br />
		User
	</a>
</nav>

<style>
	.mobile_nav {
		background: var(--bg);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10px 40px 20px;
		display: flex;
		justify-content: space-between;
		z-index: 20;
	}

	svg {
		display: inline-block;
	}

	a {
		color: var(--fg);
		text-align: center;
		font-size: 10px;
		text-decoration: none;
	}

	/* Desktop */
	@media (width > 700px) {
		.mobile_nav {
			display: none;
		}
	}
</style>
