import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const addUser = mutation({
	args: {
		email: v.string(),
		name: v.optional(v.string()),
		picture: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const existingUser = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('email'), args.email))
			.unique();

		if (existingUser) {
			const updatedAt = new Date().toISOString();

			await ctx.db.patch(existingUser._id, {
				...args,
				updatedAt
			});
		} else {
			const createdAt = new Date().toISOString();
			const updatedAt = new Date().toISOString();

			await ctx.db.insert('users', {
				...args,
				createdAt,
				updatedAt
			});
		}
	}
});
