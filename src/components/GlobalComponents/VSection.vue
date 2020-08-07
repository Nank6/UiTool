<template>
  <div class="sys-section">
    <div class="title">
      <strong>{{ title }}</strong>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VSection',
  /* eslint-disable*/
  props: ['title']
}
</script>
