import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET } from '$env/static/private';
import { client } from '$lib/convex';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { api } from './convex/_generated/api';

export const { handle } = SvelteKitAuth({
	providers: [
		Google({
			clientId: AUTH_GOOGLE_ID,
			clientSecret: AUTH_GOOGLE_SECRET
		})
	],
	secret: AUTH_SECRET,
	trustHost: true,
	callbacks: {
		async signIn({ user, account }) {
			if (!user.email || !user.name || !user.image || !account) return false;

			try {
				await client.mutation(api.user.addUser, {
					name: user.name,
					email: user.email,
					picture: user.image
				});

				return true;
			} catch (error) {
				console.error('Failed to sync user to convex: ', error);
				return false;
			}
		}
	}
});
