<template>
  <el-button :plain="$attrs.disabled" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </el-button>
</template>

<script>
export default {
  name: 'VButton'
}
</script>

<style lang="scss" scoped>

</style>
