<script>
  import Todo from './Todo.svelte';
  import { todos } from '../stores/todos';
</script>

<ul class="list">
  {#each $todos as todo (todo._id)}
    <Todo {...todo} />
  {:else}
    <p class="msg">You have no todos...</p>
  {/each}
</ul>

<style>
  .list {
    max-width: 60rem;
    margin: 1rem auto;
  }

  .msg {
    font-size: 2.5rem;
    text-align: center;
  }
</style>