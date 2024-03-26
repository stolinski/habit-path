<button class="edit_button">
	<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
		><path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M2.5 13.5v-1.879l7.28-7.28 1.88 1.879-7.28 7.28H2.5Zm10.22-8.341.805-.805a.5.5 0 0 0 0-.708l-1.171-1.171a.5.5 0 0 0-.708 0l-.805.805 1.879 1.88ZM1 13.5V11l9.586-9.586a2 2 0 0 1 2.828 0l1.172 1.172a2 2 0 0 1 0 2.828L5 15H1v-1.5Z"
			fill="#999"
		/></svg
	>
</button>

<style>
	.edit_button {
		border: 0;
		height: 60px;
		width: 50px;
		color: #999;
		font-weight: 400;
		flex-shrink: 0;
		transition: 0.2s ease-in-out all;
		position: relative;
		background: transparent;
		overflow: hidden;
		border-radius: 2px;
	}

	.edit_button svg {
		margin: 0 auto;
	}

	.complete {
		background-color: var(--habit_color);
		border: none;
		color: var(--habit_fg);
		border: solid 0.5px var(--tint);
		box-shadow:
			2px 2px 5px rgba(0, 0, 0, 0.1) inset,
			1px 1px 2px rgba(0, 0, 0, 0.3) inset;
		position: relative;
	}
	.complete::after {
		content: '';
		position: absolute;
		inset: 0;
		mix-blend-mode: multiply;
		opacity: 0.1;
		background-image: linear-gradient(115deg, #000, #fff);
	}
</style>
