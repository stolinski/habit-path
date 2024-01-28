import { goto } from '$app/navigation';
import { format } from 'date-fns';

export function next_month(active_date: Date) {
	const newParams = new URLSearchParams();
	let new_active_date = new Date(active_date.setMonth(active_date.getMonth() + 1));
	newParams.set('date', format(new_active_date, 'yyyy-MM-dd'));
	goto(`?${newParams.toString()}`, { replaceState: true });
}

export function prev_month(active_date: Date) {
	const newParams = new URLSearchParams();
	let new_active_date = new Date(active_date.setMonth(active_date.getMonth() - 1));

	newParams.set('date', format(new_active_date, 'yyyy-MM-dd'));
	goto(`?${newParams.toString()}`, { replaceState: true });
}
