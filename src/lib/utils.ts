import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

export const get_circular_array_item = (array: string[], index: number) => {
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

export function jump_2_today() {
	const buttons = document.querySelectorAll('button[data-today="true"]');

	buttons.forEach((button) => {
		const container = document.querySelector('#visible_habits');

		if (container) {
			// Calculate the offset of the button within the container
			const buttonOffset = button.offsetLeft;

			// Calculate the center position
			const centerPosition = buttonOffset - container.offsetWidth / 2 + button.offsetWidth / 2;

			// Scroll the container
			container.scrollLeft = centerPosition;
		}
	});
}
export function toggle_values<A, B>(VAL: A | B, VAL_1: A, VAL_2: B): A | B {
	return VAL === VAL_1 ? VAL_2 : VAL_1;
}
