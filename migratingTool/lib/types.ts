export type FieldMapper<Input, Output> = {
	[K in keyof Output]: keyof Input | ((row: Input) => Output[K]);
};

export type Mapping<Input, Output> = {
	source: string;
	map: FieldMapper<Input, Output>;
};
