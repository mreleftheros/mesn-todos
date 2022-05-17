<script>
  import { Link } from 'svelte-routing';
  import NavLink from './NavLink.svelte';
</script>

<h2 class="logo">
  <NavLink to='/' text='Todos'  />
</h2>

<style>
  .logo {
    color: midnightblue;
    font-family: cursive;
    letter-spacing: .1rem;
    font-size: 4rem;
    padding: .5rem 1rem;
    text-align: center;
    transition: opacity .15s ease;
  }

  .logo:hover {
    opacity: .75;
  }
</style>