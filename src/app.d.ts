// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			form_data: Record<string, unknown>;
			user: {
				email: string;
				id: number;
				verified: boolean;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
