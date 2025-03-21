<script lang="ts">
	import '../app.css';
	import { tasks, type ITask } from './stores';
	import TaskForm from './TaskForm.svelte';
	import TaskList from './TaskList.svelte';

	let errorMessage: string | null = null;

	function handleAddTask(event: CustomEvent<{ task: ITask }>) {
		if (event.detail.task.text.trim() === '') {
			return (errorMessage = 'La tâche ne peut pas être vide');
		}
		errorMessage = null;
		tasks.update((current) => [...current, event.detail.task]);
	}
</script>

<!-- Fond général -->
<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8"
>
	<!-- Conteneur central -->
	<div
		class="w-full max-w-2xl transform rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100 transition-all"
	>
		<h1 class="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
			Gestionnaire de Tâches
		</h1>

		<!-- Formulaire -->
		<div class="mb-6">
			<TaskForm on:add={handleAddTask} />
		</div>

		<!-- Message d'erreur si présent -->
		{#if errorMessage}
			<div
				role="alert"
				class="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/50 p-4 text-red-900 shadow-sm transition-all duration-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 shrink-0 text-red-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span class="text-sm font-medium">{errorMessage}</span>
			</div>
		{/if}

		<!-- Liste des tâches -->
		<TaskList />
	</div>
</div>
