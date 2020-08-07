<template>
  <div class="tag-nav">
    <scroll-bar ref="scrollBar">
      <!-- eslint-disable-next-line -->
      <router-link v-for="(item, index) in tagNavList" ref="tag" :key="index" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''" :to="item.path" @click.middle.native="closeTheTag(item,index)" @contextmenu.prevent.native="openMenu(item,index,$event)">
        {{ generateTitle(item.title) }}
        <span class="el-icon-close" @click.prevent.stop="closeTheTag(item, index)" />
      </router-link>
    </scroll-bar>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li @click="closeTheTag(selectedTag, selectedIndex)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>

<script>
import ScrollBar from 'sysComponents/ScrollBar'
import { generateTitle } from '@/util/i18n'

export default {
  components: { ScrollBar },
  data() {
    return {
      defaultPage: '/home',
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      selectedIndex: 0
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.tagNav.openedPageList
    }
  },
  watch: {
    $route() {
      this.addTagNav()
      this.scrollToCurTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    // 首次加载时将默认页面加入缓存
    this.addTagNav()
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    addTagNav() {
      // 如果需要缓存则必须使用组件自身的name，而不是router的name
      this.$store.commit('tagNav/addTagNav', {
        name: this.$router.getMatchedComponents()[1].name,
        path: this.$route.path,
        title: this.$route.meta.name
      })
    },
    isActive(item) {
      return item.path === this.$route.path
    },
    closeTheTag(item, index) {
      // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
      // 如果没有前一个Tag，则加载默认页面
      this.$store.commit('tagNav/removeTagNav', item)
      if (this.$route.path === item.path) {
        if (index) {
          this.$router.push(this.tagNavList[index - 1].path)
        } else {
          this.$router.push(this.defaultPage)
          if (this.$route.path === '/home') {
            this.addTagNav()
          }
        }
      }
    },
    refreshSelectedTag(item) {
      this.$store.commit('tagNav/setFresh', true)
      this.$store.commit('tagNav/delCachedView', item)
      const { path } = item
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + path
        })
      })
    },
    closeOthersTags() {
      const path = this.selectedTag.path
      this.$router.push(path)
      this.$store.commit('tagNav/delOthersTagNav', this.selectedTag)
      this.scrollToCurTag()
    },
    closeAllTags() {
      this.$store.commit('tagNav/delAllTagNav')
      this.$router.push(this.defaultPage)
      if (!this.selectedIndex) {
        if (this.$route.path === '/home') {
          this.addTagNav()
        }
      }
    },
    scrollToCurTag() {
      this.$nextTick(() => {
        for (const item of this.$refs.tag) {
          if (item.to === this.$route.path) {
            this.$refs.scrollBar.scrollToCurTag(item.$el)
            break
          }
        }
      })
    },
    openMenu(tag, index, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = (e.clientY - 60)
      console.log(tag)
      this.visible = true
      this.selectedTag = tag
      this.selectedIndex = index
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-nav {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 30px;
  padding: 5px 4px 0px 4px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  z-index: 9;
}
.tag-nav-item {
  text-decoration: none;
  display: inline-block;
  position: relative;
  cursor: pointer;
  z-index: 400;
  margin: 0px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #323232;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  span {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    line-height: 16px;
    text-align: center;
    transition: all 0.3s ease;
    transform-origin: 100% 50%;
    &:before {
      transform: scale(0.4);
      display: inline-block;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
  &.cur {
    background-color: #409eff;
    color: #ffffff;
    &::before {
      content: "";
      background: #ffffff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 400;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>

