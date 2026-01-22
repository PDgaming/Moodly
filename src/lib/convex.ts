import { browser } from '$app/environment';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { ConvexClient, ConvexHttpClient } from 'convex/browser';

let clientInstance: ConvexClient;

export function getClient() {
	if (!browser) return null;
	if (!clientInstance) {
		clientInstance = new ConvexClient(PUBLIC_CONVEX_URL);
	}
	return clientInstance;
}

export const convexHttpClient = new ConvexHttpClient(PUBLIC_CONVEX_URL);
