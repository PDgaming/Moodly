import { mutation } from '../_generated/server';
import activities from '../../../migratingTool/activities.staging.json';
import { v } from 'convex/values';
import * as readline from 'readline';

export default mutation(async (ctx) => {
	for (const activity of activities.activities) {
		const existing = await ctx.db
			.query('activities')
			.filter((q) => q.eq(q.field('migrationId'), activity.migrationId))
			.first();

		if (existing) {
			continue;
		}

		let category: any;

		category = await ctx.db
			.query('defaultActivityCategories')
			.filter((q) => q.eq(q.field('migrationId'), activity.migrationCategoryId))
			.unique();

		if (category == null) {
			category = await ctx.db
				.query('categories')
				.filter((q) => q.eq(q.field('migrationId'), activity.migrationCategoryId))
				.unique();

			if (!category) {
				console.error('Category not found');
				throw new Error();
			}
		}
		// console.log(category.name);

		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('email'), 'produnyadehingia12345@gmail.com'))
			.first();

		if (!user) {
			console.error('User not found');
			throw new Error();
		}

		// console.log(user.name);

		const inserted = ctx.db.insert('activities', {
			name: activity.name,

			order: activity.order,
			category: category._id,

			createdAt: String(Date.now()),
			updatedAt: String(Date.now()),
			isDeleted: false,

			userId: user._id,

			migrationId: activity.migrationId,
			migrationCategoryId: activity.migrationCategoryId
		});

		if (!inserted) {
			console.error('Failed to insert activity');
			throw new Error();
		}
	}
});
