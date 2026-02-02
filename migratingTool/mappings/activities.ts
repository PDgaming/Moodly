import { Mapping } from '../lib/types';

type Tag = {
	id: number;
	name: string;
	order: number;
	id_tag_group: number;
};

export type ActivityStaging = {
	migrationId: number;
	name: string;
	order: number;
	migrationCategoryId: number;
};

export const activitiesMapping: Mapping<Tag, ActivityStaging> = {
	source: 'tags',
	map: {
		migrationId: (t) => t.id,
		name: 'name',
		order: 'order',
		migrationCategoryId: (t) => t.id_tag_group
	}
};
