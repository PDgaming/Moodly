import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createMood = mutation({
	args: {
		name: v.string(),
		value: v.number(),
		color: v.string(),
		icon: v.optional(v.string()),
		order: v.number(),
		migrationId: v.number()
	},
	handler: async (ctx, args) => {
		const existingMood = await ctx.db
			.query('moods')
			.filter((q) => q.eq(q.field('name'), args.name))
			.unique();

		if (existingMood) {
			await ctx.db.patch(existingMood._id, args);
		} else {
			await ctx.db.insert('moods', args);
		}
	}
});

export const getMoods = query({
	args: {},
	handler: async (ctx, args) => {
		const moods = await ctx.db.query('moods').collect();

		return moods;
	}
});
