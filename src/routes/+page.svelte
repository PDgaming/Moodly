<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { useQuery } from 'convex-svelte';
	import { api } from '../convex/_generated/api.js';

	const { data } = $props();

	const moods = useQuery(api.moods.getMoods, {});
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
		<img src={data.session?.user?.image ?? 'https://i.pravatar.cc/300'} alt="User Avatar" />
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
</section>

<footer></footer>
