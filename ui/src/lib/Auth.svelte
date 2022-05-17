<script>
  import { onMount, setContext } from "svelte";
  import { navigate } from "svelte-routing";
  import { auth } from '../stores/auth';

  $: if ($auth === null) {
    navigate('/login', { replace: true });
  } else {
    navigate('/', { replace: true });
  }
  setContext('auth', auth);

  onMount(() => {
    auth.getUser();
  })
</script>

<slot />