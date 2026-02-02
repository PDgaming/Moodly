import { Mapping } from './types';

export function transform<Input, Output>(data: any, mapping: Mapping<Input, Output>): Output[] {
	const sourceArray = data[mapping.source];

	if (!Array.isArray(sourceArray)) {
		throw new Error(`Source "${mapping.source}" is not an array`);
	}

	return sourceArray.map((row: Input) => {
		const result: any = {};

		for (const key in mapping.map) {
			const rule = mapping.map[key];
			result[key] = typeof rule === 'function' ? rule(row) : (row as any)[rule];
		}

		return result as Output;
	});
}
