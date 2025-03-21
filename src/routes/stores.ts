import { writable } from 'svelte/store';

export interface ITask {
	id: number;
	text: string;
	done: boolean;
}

export const tasks = writable<ITask[]>([]);
