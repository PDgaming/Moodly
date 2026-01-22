<script lang="ts">
	import { getClient } from '$lib/convex.js';
	import { signIn } from '@auth/sveltekit/client';
	import { api } from '../convex/_generated/api.js';
	import { useQuery } from 'convex-svelte';

	const { data } = $props();
	let userImage = $state('');

	const moods = useQuery(api.moods.getMoods, {});
	let activities = $state(useQuery(api.activities.getActivities, {}));

	$effect(() => {
		if (data.session?.user?.image) {
			userImage = data.session?.user.image;
		}
		if (data.session?.user?.email) {
			activities = useQuery(api.activities.getActivities, { email: data.session?.user.email });
		} else {
			activities = useQuery(api.activities.getActivities, {});
		}

		const client = getClient();
		if (client) {
			const updateActivities = client.mutation(api.defaults.populateDefaultActivities, {});
		}
	});
</script>

<nav>
	{#if !data.session}
		<div class="signin">
			<button
				onclick={() => {
					signIn('google');
				}}>Signin</button
			>
		</div>
	{:else}
		<img src={userImage} alt="User Avatar" />
	{/if}
	<h1 class="text-5xl">Moodio</h1>
	<p>A mood tracker for your moods</p>
</nav>

<section class="add-entry flex flex-col items-center">
	<!-- List Moods -->
	<div class="moods">
		{#each moods.data as mood}
			<div class="mood">
				<div class="mood-name">{mood.name}</div>
			</div>
		{/each}
	</div>
	<!-- List Activities -->
	<div class="activities">
		{#each activities.data as activity}
			<div class="activity">
				<div class="activity-name">{activity.name}</div>
			</div>
		{/each}
	</div>
</section>

<footer></footer>
