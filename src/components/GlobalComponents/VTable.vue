<template>
  <div class="page-table">
    <el-table style="width: 100%" v-bind="$attrs" v-on="$listeners" v-loading="tableData.loading" :header-cell-style="()=>{return { 'background': '#FAFAFA', 'color': '#606266' }}" :data="tableData.body" :max-height="tableData.autoHeight">
      <slot/>
    </el-table>
    <div class="page-table-pagination" v-if="pagination">
      <el-pagination background :class="align" :layout="pageLayout" :total="tableData.paginationTotal" :current-page.sync="tableData.currentPage" :page-size="tableData.pageSize" :page-sizes="pageSizes" @size-change="sizeChange" @current-change="pageChange"/>
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VTable',
  props: {
    pagination: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    paginationAlign: {
      type: String,
      default: function() {
        return 'right'
      }
    },
    tableData: {
      type: Object,
      default: function() {
        return null
      }
    },
    pageSize: {
      type: Number,
      default: function() {
        return 15
      }
    },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 15, 30, 60, 100]
      }
    },
    paginationTotal: {
      type: Number,
      default: function() {
        return 0
      }
    },
    pageLayout: {
      type: String,
      default: function() {
        return 'total, sizes, prev, pager, next, jumper'
      }
    },
    title: {
      type: String,
      default: function() {
        return ''
      }
    },
    text: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  computed: {
    align() {
      let res
      switch (this.paginationAlign) {
        case 'right':
          res = 'textR'
          break
        case 'center':
          res = 'textC'
          break
        default:
          res = ''
      }
      return res
    }
  },
  mounted() {
    this.setTableHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.hander)
  },
  methods: {
    sizeChange(val) {
      this.$emit('getTableData', val, 'pageSize')
    },
    pageChange(val) {
      this.$emit('getTableData', val, 'page')
    },
    hander(value = 240) {
      const clientHeight = document.body.clientHeight
      this.tableData.autoHeight = clientHeight - value
    },
    setTableHeight(value) {
      this.hander(value)
      window.addEventListener('resize', this.hander(value))
    }
  }
}
</script>

<style lang="scss" scoped>
    .page-table{
      padding:0 0 10px 0;
      background:#fff;
    }
    .page-table-pagination{
        position:relative;
        margin-top: 10px;
        text-align: right;
        .text{
            position:absolute;
            left:10px;
            bottom:8px;
            color:#098FFF;
            font-size:14px;
            font-weight:700;
            text-align:left;
        }
    }
</style>
