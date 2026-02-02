import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	users: defineTable({
		email: v.string(),
		name: v.optional(v.string()),
		picture: v.optional(v.string()),
		createdAt: v.string(),
		updatedAt: v.string(),

		migrationId: v.optional(v.number())
	}),

	moods: defineTable({
		name: v.string(),
		value: v.number(),
		color: v.string(),
		icon: v.optional(v.string()),
		order: v.number(),

		migrationId: v.optional(v.number())
	}),

	defaultActivityCategories: defineTable({
		name: v.string(),
		order: v.number(),

		migrationId: v.optional(v.number())
	}),
	defaultActivities: defineTable({
		name: v.string(),
		icon: v.optional(v.string()),
		color: v.string(),
		order: v.number(),
		category: v.id('defaultActivityCategories'),

		migrationId: v.optional(v.number()),
		categoryMigrationId: v.optional(v.number())
	}),

	categories: defineTable({
		name: v.string(),
		order: v.number(),
		sourceId: v.optional(v.id('defaultActivityCategories')),
		isDeleted: v.boolean(),

		migrationId: v.optional(v.number())
	}),
	activities: defineTable({
		userId: v.id('users'),
		name: v.string(),
		icon: v.optional(v.string()),
		order: v.number(),
		color: v.optional(v.string()),
		category: v.union(v.id('categories'), v.id('defaultActivityCategories')),
		createdAt: v.string(),
		updatedAt: v.string(),
		sourceId: v.optional(v.id('defaultActivities')),
		isDeleted: v.boolean(),

		migrationId: v.number(),
		migrationCategoryId: v.number()
	}).index('by_user', ['userId']),

	entries: defineTable({
		minute: v.number(),
		hour: v.number(),
		day: v.number(),
		month: v.number(),
		year: v.number(),
		userId: v.id('users'),
		moodId: v.id('moods'),
		activityIds: v.array(v.id('activities')),
		note: v.optional(v.string()),
		createdAt: v.string(),
		updatedAt: v.string()
	})
});
