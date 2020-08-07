<template>
  <transition name="fade">
    <div class="backTop" :style="{ right: right + 'px', bottom: bottom + 'px' }" v-if="showBackTop" @click="backTop">
      <svg width="16" height="16" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="Icon Icon--backToTopArrow" aria-hidden="true" style="height:16px;width:16px" :style="{ fontSize: fontSize + 'px'}"><path d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z" /></svg>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackTop',
  props: {
    right: {
      type: Number,
      default: 50
    },
    bottom: {
      type: Number,
      default: 50
    },
    fontSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      targetDom: null, // 当前滚动对象
      showBackTop: false, // 是否显示回到顶部标识
      scrollY: 0 // 滚动距离
    }
  },
  mounted() {
    // 监听页面滚动
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      this.scrollY = e.target.scrollTop
      this.showBackTop = e.target.scrollTop > 100 // 页面滚动距离大于100的时候显示回到top的标识
      this.targetDom = e
    },
    // 滑动到顶部
    backTop() {
      const _this = this
      let timer = requestAnimationFrame(function fn() {
        const currentTop = _this.targetDom.target.scrollTop
        if (currentTop > 0) {
          // 平滑滚动
          const scrollSpeed = currentTop + ((0 - currentTop) / 6)
          _this.targetDom.target.scrollTop = scrollSpeed
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.backTop {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.backTop:hover {
  background: #d5dbe7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.backTop .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
