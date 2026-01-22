import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	users: defineTable({
		email: v.string(),
		name: v.optional(v.string()),
		picture: v.optional(v.string()),
		createdAt: v.string(),
		updatedAt: v.string()
	}),

	moods: defineTable({
		name: v.string(),
		value: v.number(),
		color: v.string(),
		icon: v.optional(v.string()),
		order: v.number()
	}),

	defaultActivityCategories: defineTable({
		name: v.string(),
		order: v.number()
	}),
	defaultActivities: defineTable({
		name: v.string(),
		icon: v.optional(v.string()),
		color: v.string(),
		category: v.id('defaultActivityCategories')
	}),

	categories: defineTable({
		name: v.string(),
		order: v.number(),
		sourceId: v.id('defaultActivityCategories'),
		isDeleted: v.boolean()
	}),
	activities: defineTable({
		userId: v.id('users'),
		name: v.string(),
		icon: v.optional(v.string()),
		color: v.string(),
		category: v.union(v.id('categories'), v.id('defaultActivityCategories')),
		createdAt: v.string(),
		updatedAt: v.string(),
		sourceId: v.optional(v.id('defaultActivities')),
		isDeleted: v.boolean()
	}).index('by_user', ['userId']),

	entries: defineTable({
		userId: v.string(),
		date: v.string(),
		time: v.string(),
		moodId: v.id('moods'),
		activityIds: v.array(v.id('activities')),
		note: v.optional(v.string()),
		createdAt: v.string(),
		updatedAt: v.string(),
		syncedAt: v.optional(v.string())
	})
});
