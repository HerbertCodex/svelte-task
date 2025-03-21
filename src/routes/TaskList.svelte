<script lang="ts">
	import { tasks, type ITask } from './stores';
	let editingTask: ITask | null = null;
	let editedText: string = '';
</script>

<ul class="mt-6 space-y-4">
	{#each $tasks as task}
		<li
			class="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
		>
			<div class="flex items-center space-x-4">
				<input
					type="checkbox"
					class="h-5 w-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
					bind:checked={task.done}
				/>
				<span
					class="font-medium text-gray-900"
					class:line-through={task.done}
					class:text-gray-400={task.done}
				>
					{task.text}
				</span>
			</div>
			<div class="flex items-center space-x-2">
				<button
					class="focus:ring-opacity-50 cursor-pointer rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-300"
					on:click={() => {
						editingTask = task;
						editedText = task.text;
					}}
				>
					Modifier
				</button>
				<button
					class="focus:ring-opacity-50 cursor-pointer rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300"
					on:click={() =>
						tasks.update((ts) => ts.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)))}
				>
					{task.done ? 'Marquer non fait' : 'Marquer fait'}
				</button>
				<button
					class="focus:ring-opacity-50 cursor-pointer rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-rose-600 focus:ring-2 focus:ring-rose-300"
					on:click={() => tasks.update((ts) => ts.filter((t) => t.id !== task.id))}
				>
					Supprimer
				</button>
			</div>
		</li>
	{/each}

	{#if $tasks.length === 0}
		<li class="mt-6 rounded-xl bg-gray-50 py-4 text-center font-medium text-gray-400 italic">
			Liste vide
		</li>
	{/if}
</ul>

{#if editingTask}
	<!-- Dialog modale améliorée -->
	<div
		class="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 backdrop-blur-sm"
	>
		<div class="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
			<h2 class="mb-5 text-xl font-semibold text-gray-900">Modifier la tâche</h2>
			<input
				type="text"
				bind:value={editedText}
				class="mb-6 w-full rounded-lg border-gray-200 p-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-indigo-500"
			/>
			<div class="flex justify-end space-x-3">
				<button
					class="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-200"
					on:click={() => (editingTask = null)}
				>
					Annuler
				</button>
				<button
					class="focus:ring-opacity-50 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors duration-150 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
					on:click={() => {
						if (editingTask) {
							tasks.update((ts) =>
								ts.map((t) => (t.id === editingTask?.id ? { ...t, text: editedText } : t))
							);
						}
						editingTask = null;
					}}
				>
					Confirmer
				</button>
			</div>
		</div>
	</div>
{/if}
