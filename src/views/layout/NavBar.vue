<template>
  <el-scrollbar class="side-nav" wrap-class="scollbar" :class="isOpen === true? 'left' : 'leftClose'">
    <!-- logo -->
    <!-- <div class="logo" v-if="isOpen">
      <img src="../../assets/images/logo/logo.png" alt="">
    </div>
    <div class="mobile-logo" v-else>
      <img src="../../assets/images/logo/mobile-logo.png" alt="">
    </div> -->
    <!-- 菜单导航 -->
    <el-menu ref="navbar" router @select="clickLink" class="el-menu-vertical-demo" :collapse="!isOpen" :default-active="defActive" mode="vertical" :unique-opened="false">
      <nav-bar-item v-for="(item, n) in navList" :key="n" :item="item" :nav-index="String(n)" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapState } from 'vuex'
import NavBarItem from './NavBarItem'

export default {
  components: { NavBarItem },
  data() {
    return {
      navBgShow: false
    }
  },
  computed: {
    isOpen: {
      get: function () {
        return !(this.$store.state.collapsed)
      },
      set: function () {
        return !(this.$store.state.collapsed)
      }
    },
    ...mapState({
      navList: state => state.auth.navList
    }),
    defActive() {
      return this.$route.path
    }
  },
  watch: {

  },
  mounted() {
    // console.log(this.navList)
  },
  methods: {
    clickLink(key, keyPath) {
      this.$store.commit('tagNav/setFresh', false)
      // 如果发现当前路由与点击的路由一致就携带路由路径跳转到redirect页面
      if (this.$route.path === key) {
        this.$store.commit('tagNav/setFresh', true)
        this.$store.commit('tagNav/delCachedView_NavBar', this.$route)
        const { path } = this.$route
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + path
          })
        })
      }
    }
  }
}
</script>
