<template>
  <div class="sys-toolbar" :class="align">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VToolbar',
  props: {
    align: {
      type: String,
      default: function() {
        return 'right'
      }
    }
  }
}
</script>
