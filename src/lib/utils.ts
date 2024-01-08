import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

export const get_circular_array_item = (array: unknown[], index: number) => {
	// Ensure the index is a positive number then get the modulus with the array length
	const valid_index = Math.abs(index) % array.length;
	return array[valid_index];
};

export function getDaysInEachMonth(year: number) {
	const months = [];
	for (let month = 0; month < 12; month++) {
		const startDate = startOfMonth(new Date(year, month));
		const endDate = endOfMonth(new Date(year, month));
		const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate }).length;
		months.push(daysInMonth);
	}
	return months;
}

export function string_2_bool(val: string | undefined) {
	return val === 'true';
}
