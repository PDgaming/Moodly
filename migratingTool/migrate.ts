import fs from 'fs';
import path from 'path';
import { transform } from './lib/transform';
import { activitiesMapping } from './mappings/activities';
import { entriesMapping } from './mappings/entries';

const inputPath = path.join('./inputData.json');

const activitiesoutputPath = path.join(__dirname, 'activities.staging.json');
const entriesOutputPath = path.join(__dirname, 'entries.staging.json');

const raw = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(raw);

const activities = transform(data, activitiesMapping);
const entries = transform(data, entriesMapping);

fs.writeFileSync(
	activitiesoutputPath,
	JSON.stringify(
		{
			version: 1,
			activities
		},
		null,
		2
	)
);

console.log(`Migrated ${activities.length} activities.`);

fs.writeFileSync(
	entriesOutputPath,
	JSON.stringify(
		{
			version: 1,
			entries
		},
		null,
		2
	)
);

console.log(`Migrated ${entries.length} entries.`);
