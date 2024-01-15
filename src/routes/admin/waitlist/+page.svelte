<script lang="ts">
	import { enhance } from '$app/forms';

	const { data } = $props();
</script>

<section>
	<p>Total users: {data.users.length}</p>
	<p>Total waitlist: {data.waitlist.length}</p>
	<p>Ratio: {((data.users.length / data.waitlist.length) * 100).toFixed(2)}%</p>
</section>

<table>
	<thead>
		<tr>
			<th>Email</th>
			<th>Sent</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each data.waitlist as waitlist_person}
			<tr>
				<td>
					{waitlist_person.email}
				</td>
				<td>
					{waitlist_person?.invited?.toString()}
				</td>
				<td>
					<form use:enhance method="POST">
						<input type="hidden" value={waitlist_person.email} name="email" />
						<button type="submit">Invite</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
