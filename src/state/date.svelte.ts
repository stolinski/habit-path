import { goto } from '$app/navigation';

function change_month(active_date: Temporal.PlainDate, delta: number) {
	const new_active_date = active_date.add({ months: delta });
	const new_data_params = new_active_date.toString();
	const new_params = new URLSearchParams();
	new_params.set('date', new_data_params);
	goto(`?${new_params.toString()}`, { replaceState: true });
}

export function next_month(date: Temporal.PlainDate) {
	change_month(date, 1);
}

export function prev_month(date: Temporal.PlainDate) {
	change_month(date, -1);
}
