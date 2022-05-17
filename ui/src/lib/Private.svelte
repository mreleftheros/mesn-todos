<script>
  import { getContext, onMount } from "svelte";
  import { navigate } from 'svelte-routing';

  const auth = getContext('auth');

  onMount(() => {
    if (!$auth) {
      navigate('/login', { replace: true });
    }})
</script>

<slot />