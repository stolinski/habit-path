export function createUTCDate(
	...args:
		| [string]
		| [number]
		| [Date]
		| [number, number, number?, number?, number?, number?, number?]
): Date | null {
	let date: Date;

	if (args.length === 1 && typeof args[0] === 'string') {
		// If the input is a single string, treat it as a UTC date by appending 'Z'
		date = new Date(args[0] + 'Z');
	} else if (args.length > 1) {
		// If multiple arguments are provided, assume they are individual date components
		// and create a UTC date using Date.UTC()
		date = new Date(
			Date.UTC(
				args[0],
				args[1],
				args[2] || 1,
				args[3] || 0,
				args[4] || 0,
				args[5] || 0,
				args[6] || 0
			)
		);
	} else {
		// If it's a single argument that is not a string (e.g., a timestamp), create a date directly
		date = new Date(args[0]);
	}

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		console.error('Invalid date');
		return null;
	}

	return date;
}

export const get_circular_array_item = (array: unknown[], index: number) => {
	// Ensure the index is a positive number then get the modulus with the array length
	const valid_index = Math.abs(index) % array.length;
	return array[valid_index];
};
