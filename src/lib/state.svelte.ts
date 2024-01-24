import { getDaysInMonth } from 'date-fns';
import Sortable from 'sortablejs';
import { tick } from 'svelte';

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

// This is a prototype (not js prototype) ora global store that can power the state of the app.
function create_app_state() {

	let mode = $state<'NORMAL' | 'EDIT' | 'REORDER' | 'MODALED'>('NORMAL');
	let is_loading = $state<boolean>(false);

	function reorder() {
		mode = 'REORDER';
		tick();
		const node = document.querySelector('#visible_habits');
		Sortable.create(node, {
			ghostClass: 'ghost_row',
			animation: 150,
			handle: '.handle',
		});
	}

	function loading() {
		is_loading = true
	}

	function normal() {
		mode = 'NORMAL'
	}

	return {
		get mode() {
			return mode;
		},
		get is_loading() {
			return is_loading;
		},
		reorder,
		loading,
		normal
	}
}

export const app = create_app_state();