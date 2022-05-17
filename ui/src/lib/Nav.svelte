<script>
  import Logo from './Logo.svelte';
  import NavLinks from './NavLinks.svelte';
</script>

<nav class="nav">
  <div class="logo-box">
    <Logo />
  </div>
  <div class="links-box">
    <NavLinks />
  </div>
  <ul>

  </ul>
</nav>

<style>
  .nav {
    display: flex;
    height: 100%;
  }

  .logo-box {
    flex-basis: 20rem;
    height: 100%;
  }

  .links-box {
    flex: 1;
    display: flex;
    justify-content: end;
    height: 100%;
  }
</style>