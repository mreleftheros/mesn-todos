<script>
  export let _id = null, text = '', isDone = false;
  import { tick } from 'svelte';
  import { todos } from '../stores/todos';
  import Button from './Button.svelte';

  const icons = {
    undone: '🗸',
    done: '✗',
    trash: '🗑'
  };
  let edit = false;
  let inputRef;
  let isLoading = false;
  let error = '';

  const handleDblClick = async () => {
    edit = {text};
    await tick();
    inputRef.select();
  };

  const update = async (isText) => {
    isLoading = true;
    error = '';
    if (isText) {
      try {
        const data = await todos.update(_id, {text: edit.text});
        if (data.error) {
          error = data.textError || data.error || '';
        }
      } catch (err) {
        error = err.message;
      } finally {
        isLoading = false;
        edit = null;
      }
    } else {
      try {
          const data = await todos.update(_id, {isDone: !isDone});

          if (data.error) {
            return error = data.isDoneError || data.error || '';
          } else {
            isDone = data.isDone;
          }
        } catch (err) {
          error = err.message;
        } finally {
          isLoading = false;
        }
    }
  };

  const handleDelete = async () => {
    try {
      isLoading = true;
      const data = await todos.remove(_id);
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  };

  const handleKeyDown = async ({key}) => (isLoading || key !== 'Enter' || !text) ? null : update(true);

  const cancelUpdate = () => edit = null;
</script>

<li class={`item ${isDone && 'done'}`}>
  <div class="todo">
    {#if edit}
      <input type="text" class="text-input" bind:value={edit.text} bind:this={inputRef} on:keydown={handleKeyDown} />
    {:else}
      <h3 class="text" on:dblclick={handleDblClick}>
        {text}
      </h3>
    {/if}
  </div>
  <div class="tools">
    {#if edit}
      <Button text='Save' disabled={!text} bg='rgba(17, 17, 17, .3)' color='#fff' onClick={update} />
      <Button text='Cancel' bg='#eee' color='#333' onClick={cancelUpdate} />
    {:else}
      <Button text={isDone ? icons.done : icons.undone} bg={isDone ? '#fff' : 'limegreen'} color={isDone ? 'crimson' : '#fff'} onClick={update.bind(null, false)} />
      <Button text={icons.trash} bg='transparent' color='#000' onClick={handleDelete} />
    {/if}
  </div>
</li>
<div class="error">{error}</div>

<style>
  .item {
    display: flex;
    align-items: center;
    border-radius: 1.5rem;
    margin: 1rem 0;
    background-color: rgba(17, 17, 17, .1);
    font-size: 2rem;
  }

  .done {
    background-color: rgba(50, 205, 50, .5);
  }

  .todo {
    flex: 1;
  }

  .text {
    padding-left: 1rem;
    user-select: none;
    cursor: pointer;
  }

  .text-input {
    border: 0;
    background: transparent;
    padding-left: 1rem;
    font-size: 2rem;
    outline: none;
  }

  .tools {
    flex-basis: 20rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: .5rem;
  }

  .error {
    color: crimson;
    text-align: center;
    padding: .3rem;
    min-height: 1rem;
  }
</style>