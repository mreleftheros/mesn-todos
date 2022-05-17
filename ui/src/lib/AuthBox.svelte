<script>
  export let signupMode = false;
  import { auth } from '../stores/auth';
  import { onMount } from 'svelte';
  import Button from './Button.svelte';

  let username = '';
  let password = '';
  let isLoading = false;
  let error = '';
  let errors = {
    username: '',
    password: ''
  };
  let inputRef;

  const handleSubmit = async () => {
    if (!username || !password || isLoading) return;
    isLoading = true;
    error = '';
    errors = {
      username: '',
      password: ''
    };

    if (signupMode) {
      try {
        const data = await auth.signup(username, password);
        
        if (data.error) {
          error = data.error;
          errors.username = data.usernameError || '';
          errors.password = data.passwordError || '';
        }
      } catch (err) {
        error = err.message;
      } finally {
        isLoading = false;
        username = '';
        password = '';
      }
    } else {
      try {
        isLoading = true;
        const data = await auth.login(username, password);
        
        if (data.error) {
          error = data.error;
          errors.username = data.usernameError || '';
          errors.password = data.passwordError || '';
        }
      } catch (err) {
        error = err.message;
      } finally {
        isLoading = false;
        username = '';
        password = '';
      }
    }
  };

  onMount(() => {
    inputRef.focus();
  })
</script>

<form class="box" autocomplete="off" on:submit|preventDefault={handleSubmit}>
  <h2 class="title">
    {#if signupMode}
      Signup
    {:else}
      Login
    {/if}
  </h2>
  <div class="group">
    <label class="label" for="username">Username</label>
    <input type="text" id="username" class="input" placeholder="Enter username..." bind:this={inputRef} bind:value={username}>
    <p class="error">{errors.username}</p>
  </div>
  <div class="group">
    <label class="label" for="password">Password</label>
    <input type="password" id="password" class="input" placeholder="Enter password..." bind:value={password}>
    <p class="error">{errors.password}</p>
  </div>
  <p class="error">{error}</p>
  <Button type='submit' text={isLoading ? 'Submitting...' : 'Submit'} disabled={isLoading || !username || !password} />
</form>

<style>
  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 60rem;
    margin: 1rem auto;
    height: 100%;
    background-color: rgba(17, 17, 17, .3);
    padding: 1rem;
    border-radius: .5rem;
  }

  .title {
    font-size: 3.5rem;
    text-align: center;
  }

  .group {
    margin: 1.5rem 0;
  }

  .label {
    display: block;
    font-size: 3rem;
  }

  .input {
    display: block;
    width: 80%;
    margin: .5rem auto 0;
    outline: 0;
    border: 0;
    border-bottom: solid .1rem #111;
    background-color: transparent;
    padding: .5rem;
    font-size: 2rem;
    text-align: center;
  }

  .error {
    color: firebrick;
    font-size: 1.8rem;
    text-align: center;
    min-height: 2.5rem;
    margin: 1rem 0;
  }
</style>