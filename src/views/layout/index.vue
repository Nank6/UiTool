<template>
  <div class="wrapper">
    <template>
      <NavBar />
    </template>
    <div class="sys-content" :class="[isOpen == true? 'leftOpen' : 'leftClose','left']">
      <!-- <header-bar v-once/> -->
      <tag-nav />
      <keep-alive :include="tagNavList">
        <!-- eslint-disable-next-line -->
        <router-view :key="$route.fullPath" />
      </keep-alive>
      <back-top :right="50" :bottom="50" :font-size="34" />
    </div>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop'
import HeaderBar from './HeaderBar'
import NavBar from './NavBar'
import TagNav from './TagNav'

export default {
  components: {
    HeaderBar,
    NavBar,
    BackTop,
    TagNav
  },
  computed: {
    tagNavList() {
      // return this.$store.state.tagNav.cachedPageName
      return []
    },
    isOpen() {
      return !(this.$store.state.collapsed)
    }
  }
}
</script>
