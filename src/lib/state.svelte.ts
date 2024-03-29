import Sortable from 'sortablejs';
import { tick } from 'svelte';

// This is a prototype (not js prototype) ora global store that can power the state of the app.
function create_app_state() {
	let mode = $state<'NORMAL' | 'EDIT' | 'REORDER'>('NORMAL');
	let window_mode = $state<'NORMAL' | 'FOCUS' | 'MODALED'>('NORMAL');
	let is_loading = $state<boolean>(false);
	let sortable_instance;

	function reorder() {
		mode = 'REORDER';
		window_mode = 'FOCUS';
		tick();
		const node = document.querySelector('#reorder_habits');
		sortable_instance = Sortable.create(node, {
			ghostClass: 'ghost_row',
			animation: 150,
		});
	}

	function loading() {
		is_loading = true;
	}

	function normal() {
		mode = 'NORMAL';
		window_mode = 'NORMAL';
		sortable_instance.destroy();
		sortable_instance = null;
	}

	return {
		get mode() {
			return mode;
		},
		get window_mode() {
			return window_mode;
		},
		get is_loading() {
			return is_loading;
		},
		reorder,
		loading,
		normal,
	};
}

export const app = create_app_state();

// TODO Whimsical toast alert system
