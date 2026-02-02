import { Mapping } from '../lib/types';

type DayEntry = {
	id: number;
	minute: number;
	hour: number;
	day: number;
	month: number;
	year: number;
	mood: number;
	tags: number[];
};

export type EntryStaging = {
	migrationId: number;
	minute: number;
	hour: number;
	day: number;
	month: number;
	year: number;
	moodMigrationId: number;
	activityMigrationIds: number[];
};

export const entriesMapping: Mapping<DayEntry, EntryStaging> = {
	source: 'dayEntries',
	map: {
		migrationId: (e) => e.id,
		minute: 'minute',
		hour: 'hour',
		day: 'day',
		month: 'month',
		year: 'year',
		moodMigrationId: (e) => e.mood,
		activityMigrationIds: (e) => e.tags
	}
};
