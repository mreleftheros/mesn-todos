<script>
  import Button from './Button.svelte';
  import { todos } from '../stores/todos';

  let text = '';
  let isLoading = false;
  let error = '';

  const setTodo = async () => {
    console.log('set');
    try {
      error = '';
      isLoading = true;
      const data = await todos.set(text);

      if (data.textError) {
        error = data.textError;
      } else if (data.error) {
        error = data.error;
      }
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
      text = '';
    }
  }

  const handleKeyDown = ({key}) => (isLoading || key !== 'Enter' || !text) ? null : setTodo();
</script>

<div class="box">
  <input class="input" type="text" bind:value={text} placeholder="Enter new todo" on:keydown={handleKeyDown}>
  <Button text={isLoading ? 'Loading...' : 'Enter'} bg='#111' color='#fff' disabled={!text || isLoading} onClick={setTodo} />
  <div class="error">{error}</div>
</div>

<style>
  .box {
    display: flex;
    flex-direction: column;
    max-width: 60rem;
    margin: 1rem auto 4rem;
  }

  .input {
    display: block;
    width: 100%;
    border: 0;
    border-bottom: solid .1rem #111;
    text-align: center;
    font-size: 2.5rem;
    padding: .5rem;
    outline: 0;
    margin: 1rem 0;
  }

  .error {
    color: crimson;
    font-size: 2rem;
    text-align: center;
    min-height: 3rem;
  }
</style>