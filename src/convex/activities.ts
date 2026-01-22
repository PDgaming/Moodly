import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// export const createActivity = mutation({
// 	args: {
// 		name: v.string(),
// 		value: v.number(),
// 		color: v.string(),
// 		icon: v.optional(v.string()),
// 		order: v.number()
// 	},
// 	handler: async (ctx, args) => {
// 		const ExistingActivity = await ctx.db
// 			.query('moods')
// 			.filter((q) => q.eq(q.field('name'), args.name))
// 			.unique();

// 		if (ExistingActivity) {
// 			await ctx.db.patch(ExistingActivity._id, args);
// 		} else {
// 			await ctx.db.insert('moods', args);
// 		}
// 	}
// });

export const getActivities = query({
	args: {
		email: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('email'), args.email))
			.unique();

		const defaultActivities = await ctx.db.query('defaultActivities').collect();

		if (!user) {
			return defaultActivities;
		}

		const activities = await ctx.db
			.query('activities')
			.withIndex('by_user', (q) => q.eq('userId', user._id))
			.collect();

		const overriddenDefaultIds = new Set(
			activities.filter((u) => u.sourceId !== undefined).map((u) => u.sourceId)
		);

		const visibleDefaults = defaultActivities.filter((d) => !overriddenDefaultIds.has(d._id));
		const visibleActivities = activities.filter((u) => !u.isDeleted);

		return [...visibleDefaults, ...visibleActivities];
	}
});
