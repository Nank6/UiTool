<template>
  <el-submenu v-if="item.child && item.child.length" :index="navIndex">
    <!-- 创建父级菜单 -->
    <template slot="title">
      <!-- <i v-if="item.icon" :class="item.icon" /> -->
      <svg-icon v-if="item.icon" :icon-class="item.icon" class="svgItem"/>
      <span slot="title">
        {{ generateTitle(item.name) }}
      </span>
    </template>
    <!-- 创建子菜单 -->
    <nav-bar-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :nav-index="navIndex+'-'+i" :item="subItem" />
  </el-submenu>

  <el-menu-item v-else :index="item.path" :route="{path: item.path}">
    <!-- <i v-if="item.icon" :class="item.icon" /> -->
    <svg-icon v-if="item.icon" :icon-class="item.icon" class="svgItem"/>
    <span slot="title">
      {{ generateTitle(item.name) }}
    </span>
  </el-menu-item>
</template>

<script>
import { generateTitle } from '@/util/i18n'
export default {
  name: 'NavBarItem',
  /* eslint-disable*/
  props: ['item', 'navIndex'],
  methods: {
    generateTitle // generateTitle by vue-i18n
  }
}
</script>

<style scoped>
.svgItem{
  margin-top: -2px;
  margin-right: 12px;
}
</style>