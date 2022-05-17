<script>
  export let text = '', type = 'button', onClick=null, disabled = false, bg = 'limegreen', color = '#111';
</script>

<button {disabled} class='btn' style={`background-color: ${bg}; color: ${color};`} class:disabled {type} on:click={onClick}>{text}</button>

<style>
  .btn {
    border: 0;
    font-size: 1.8rem;
    padding: .3rem 1.5rem;
    letter-spacing: .1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: transform .15s ease-out;
  }

  .disabled {
    cursor: auto;
    opacity: .5;
  }

  .btn:hover:not(.disabled) {
    transform: scale(0.95);
  }
</style>