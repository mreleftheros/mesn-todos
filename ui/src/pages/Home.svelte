<script>
  import NewTodo from '../lib/NewTodo.svelte';
  import Todos from '../lib/Todos.svelte';
  import { getContext, onMount } from 'svelte';
  import { todos } from '../stores/todos';

  const auth = getContext('auth');
	let isLoading = false;
	let error = '';

  onMount(() => {
    if ($todos.length > 0 || !$auth) return;

    isLoading = true;
    todos.getAll()
      .then(() => {
        isLoading = false;
      })
      .catch(err => {
        isLoading = false;
        error = err.message;
      });
  })
</script>

<section class="home">
  {#if isLoading}
    <p class="loading">Loading...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <h2 class="title">{$auth?.username}'s todos</h2>
    <NewTodo />
    <Todos />
  {/if}
</section>

<style>
  .home {
    padding: 1rem;
  }

  .loading {
    text-align: center;
    font-size: 2.5rem;
  }

  .error {
    color: crimson;
    text-align: center;
    font-size: 2.5rem;
  }

  .title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 4rem;
  }
</style>