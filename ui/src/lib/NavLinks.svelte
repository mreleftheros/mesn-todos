<script>
  import { getContext } from 'svelte'; 
  import NavLink from './NavLink.svelte';
  import Button from './Button.svelte';

  const auth = getContext('auth');
  $: message = $auth ? `Welcome, ${$auth?.username}` : '';
  $: links = [
    {id: 0, text: 'login', path: '/login', auth: false},
    {id: 1, text: 'signup', path: '/signup', auth: false},
    {id: 2, text: message, auth: true},
    {id: 3, text: 'logout', fn: auth.logout, auth: true}
  ];
  $: authLinks = links.filter(link => $auth ? link.auth : !link.auth);

</script>

<ul class="links">
  {#each authLinks as {id, text, path, fn} (id)}
    <li class="item">
      {#if path}
        <NavLink to={path} {text} />
      {:else if fn}
        <Button {text} onClick={fn} />
      {:else}
        <p>{text}</p>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .links {
    flex-basis: 50rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .item {
    font-size: 2rem;
  }
</style>