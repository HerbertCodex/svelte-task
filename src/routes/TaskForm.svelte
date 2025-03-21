<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let taskText: string = '';

	function addTask() {
		if (taskText.trim()) {
			dispatch('add', {
				task: {
					id: Date.now(),
					done: false,
					text: taskText.trim()
				}
			});
			taskText = '';
		}
	}
</script>

<div class="mx-auto flex max-w-md items-center justify-center gap-3">
	<input
		type="text"
		class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 placeholder-gray-400 shadow-sm transition-all duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500"
		bind:value={taskText}
		placeholder="Ajouter une nouvelle tâche"
		on:keydown={(e) => e.key === 'Enter' && addTask()}
	/>
	<button
		class="focus:ring-opacity-50 cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-all duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-400"
		on:click={addTask}
		disabled={!taskText.trim()}
	>
		Ajouter
	</button>
</div>
