import { goto } from '$app/navigation';
import { date_without_timezone, get_param_date } from '$lib/utils';

function change_month(active_date: Date, delta: number) {
	const new_active_date = date_without_timezone(new Date(active_date));
	new_active_date.setMonth(active_date.getMonth() + delta);

	const new_data_params = get_param_date(new_active_date);

	const new_params = new URLSearchParams();
	new_params.set('date', new_data_params);

	goto(`?${new_params.toString()}`, { replaceState: true });
}

export function next_month(date: Date) {
	change_month(date, 1);
}

export function prev_month(date: Date) {
	change_month(date, -1);
}
