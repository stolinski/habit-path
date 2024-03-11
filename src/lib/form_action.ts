import { applyAction } from '$app/forms';
import toast from 'svelte-french-toast';
import type { ActionResult } from '@sveltejs/kit';

type FormActionMessage = {
	message?: string;
};

export const form_action = (
	opts?: FormActionMessage,
	pre?: (data?: any | unknown) => any,
	callback?: (data?: any | unknown) => any,
) => {
	return function form_enhance() {
		if (pre) pre();

		return async ({ result, update }: { result: ActionResult<{ message: string }> }) => {
			if (result.type === 'success') {
				toast.success(result?.data?.message);
			} else if (result.type === 'error') {
				toast.error(`Major bummer: ${result.error.message}`);
			} else {
				toast.error(`Something went wrong. I'm sorry.`);
			}
			await applyAction(result);
			update();
			if (callback && 'data' in result && result?.data) callback(result.data);
		};
	};
};
