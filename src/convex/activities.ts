import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createActivity = mutation({
	args: {
		name: v.string(),
		icon: v.optional(v.string()),
		category: v.string()
	},
	handler: async (ctx, args) => {
		const existingMood = await ctx.db
			.query('activities')
			.filter((q) => q.eq(q.field('name'), args.name))
			.unique();

		if (existingMood) {
			await ctx.db.patch(existingMood._id, args);
		} else {
			await ctx.db.insert('activities', args);
		}
	}
});

export const getActivities = query({
	args: {},
	handler: async (ctx, args) => {
		const moods = await ctx.db.query('activities').take(5);

		return moods;
	}
});
