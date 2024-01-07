<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<input type="text" name="pin" id="pin" />
	<button>Submit Pin</button>
</form>
