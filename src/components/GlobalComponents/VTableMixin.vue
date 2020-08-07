<template>
  <div class="sys-table">
    <slot />
    <div class="sys-table-pagination">
      <template v-if="pagination">
        <ElPagination
          :layout="pageLayout"
          :total="paginationTotal"
          :page-size="pageSize"
          :class="align"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </template>
      <template v-else>
        <slot name="pagination" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VTableMixin',
  props: {
    /* eslint-disable*/
    pagination: Boolean,
    paginationAlign: String,
    pageSize: {
      type: Number,
      default: function() {
        return 10
      }
    },
    paginationTotal: {
      type: Number,
      default: function() {
        return 10
      }
    },
    sizeChange: {
      type: Function,
      default: function() {
        return null
      }
    },
    pageChange: {
      type: Function,
      default: function() {
        return null
      }
    },
    pageLayout: {
      default: function() {
        return 'total, sizes, prev, pager, next, jumper'
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
  }
}
</script>
