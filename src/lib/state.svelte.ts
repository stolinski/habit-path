const today = $state(new Date());

export const datez = $state({
	today,
	active_date: new Date(),
	get active_year() {
		return this.active_date.getFullYear();
	},
});

export const habits_container = $state({
	today,
	active_date: new Date(),
	get active_year() {
		return this.active_date.getFullYear();
	},
});