<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.name">
        <template v-if="item.name">
          <a :class="{'is-active':index === (levelList.length-1)}">{{ generateTitle(item.name) }}</a>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/util/i18n'
import { reduceMatch2Array } from '@/util'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapState({
      navList: state => state.auth.navList
    })
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    reduceMatch2Array,
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => {
        if (item.meta.name) {
          return true
        }
      })
      const activeRoute_name = matched[0].meta.name
      this.levelList = this.reduceMatch2Array(this.navList, activeRoute_name)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
