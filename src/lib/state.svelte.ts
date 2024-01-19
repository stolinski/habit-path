import { getDaysInMonth } from 'date-fns';

function createDates() {
	const today = new Date();
	let active_date = $state(today);

	function next_month() {
		active_date = new Date(active_date.setMonth(active_date.getMonth() + 1));
	}
	function prev_month() {
		active_date = new Date(active_date.setMonth(active_date.getMonth() - 1));
	}

	return {
		// I get it (get it), but these are kind of annoying
		get active_date() {
			return active_date;
		},
		get days_in_active_month() {
			return getDaysInMonth(active_date);
		},
		next_month,
		prev_month,
	};
}

// Example of global state
// You need to create an instance and export that

export const datez = createDates();
