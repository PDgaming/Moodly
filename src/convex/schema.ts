import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	moods: defineTable({
		name: v.string(),
		value: v.number(),
		color: v.string(),
		icon: v.optional(v.string()),
		order: v.number()
	}),
	activities: defineTable({
		userId: v.string(),
		name: v.string(),
		icon: v.optional(v.string()),
		color: v.string(),
		category: v.string(),
		createdAt: v.string(),
		updatedAt: v.string()
	}),
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
