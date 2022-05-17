<script>
  export let to = '', text = '';
  import { Link } from 'svelte-routing';

  const getProps = ({location: {pathname}, href, isPartiallyCurrent, isCurrent}) => {
    const isActive = href === pathname ? isCurrent : isPartiallyCurrent || isCurrent;
    return isActive ? {class: 'active link'} : {class: 'link'};
  }
</script>

<Link {to} {getProps}>
  {text[0].toUpperCase() + text.slice(1)}
</Link>

<style>
  :global(.link) {
    letter-spacing: .1rem;
    padding: .5rem 2.5rem;
    transition: opacity .15s ease;
  }

  :global(.link:hover:not(.active)) {
    opacity: .5;
  }

  :global(.active) {
    font-weight: 900;
  }
</style>