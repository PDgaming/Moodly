import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const defaultCategories: { name: string; order: number }[] = [
	{
		name: 'Emotions',
		order: 1
	},
	{
		name: 'Hobbies',
		order: 2
	},
	{
		name: 'Social',
		order: 3
	},
	{
		name: 'Better Me',
		order: 4
	},
	{
		name: 'Productivity',
		order: 5
	},
	{
		name: 'Chores',
		order: 6
	},
	{
		name: 'School',
		order: 7
	},
	{
		name: 'Sleep',
		order: 8
	},
	{
		name: 'Health',
		order: 9
	}
];

const defaultActivities: {
	name: string;
	icon: string | undefined;
	color: string;
	category: string;
}[] = [
	{
		name: 'happy',
		icon: undefined,
		color: '',
		category: 'Emotions'
	}
];

export const populateDefaultActivityCategories = mutation({
	args: {},
	handler: async (ctx, args) => {
		defaultCategories.forEach(async (category) => {
			const existingCategory = await ctx.db
				.query('defaultActivityCategories')
				.filter((q) => q.eq(q.field('name'), category.name))
				.unique();

			if (existingCategory) {
				await ctx.db.patch(existingCategory._id, category);
			} else {
				await ctx.db.insert('defaultActivityCategories', category);
			}
		});
	}
});

export const populateDefaultActivities = mutation({
	args: {},
	handler: async (ctx, args) => {
		defaultActivities.forEach(async (activity) => {
			// Returns the id of the category
			const categoryId = await ctx.db
				.query('defaultActivityCategories')
				.filter((q) => q.eq(q.field('name'), activity.category))
				.unique();

			// TODO: Add a new category to the categories table and return that id
			if (!categoryId) {
				throw new Error('Category not found');
			}

			const existingActivity = await ctx.db
				.query('defaultActivities')
				.filter((q) => q.eq(q.field('name'), activity.name))
				.unique();

			if (existingActivity) {
				activity.category = categoryId._id;
				await ctx.db.patch(existingActivity._id, {
					...activity,
					category: categoryId._id
				});
			} else {
				activity.category = categoryId._id;
				await ctx.db.insert('defaultActivities', {
					...activity,
					order: categoryId.order,
					category: categoryId._id
				});
			}
		});
	}
});
