<template>
  <div class="sys-page">
    <!-- <p class="warn-content">
      <a href="https://panjiachen.github.io/vue-element-admin-site/#/icon" target="_blank">Add and use
      </a>
    </p> -->
    <div class="icons-container">
      <div class="icons-wrapper">
        <div v-for="(item,index) of iconsMap" :key="index" @click="handleClipboard(generateIconCode(item),$event)">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateIconCode(item) }}
            </div>
            <div class="icon-item">
              <svg-icon class-name="disabled" :icon-class="item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icons from './generate-icons-view'
import clipboard from '@/util/clipboard'

export default {
  name: 'Icons',
  data() {
    return {
      iconsMap: []
    }
  },
  mounted() {
    const iconsMap = icons.state.iconsMap.map((i) => {
      return i.default.id.split('-')[1]
    })
    this.iconsMap = iconsMap
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 10px;
    height: 50px;
    text-align: center;
    width: 50px;
    float: left;
    font-size: 15px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 12px;
    margin-top: 5px;
  }
  .disabled{
    pointer-events: none;
  }
}
</style>
