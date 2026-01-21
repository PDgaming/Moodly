<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';

	const { data } = $props();
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
</nav>

<section class="hero-section flex flex-col items-center">
	<h1 class="text-5xl">Moodio</h1>
	<p>A mood tracker for your moods</p>
</section>

<footer></footer>
