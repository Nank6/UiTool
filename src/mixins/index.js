import { confirm, exportMethod, exportTransform } from '@/util/fun-project'
const mixin = {
  data() {
    return {

    }
  },
  methods: {
    // 二次确认弹框
    confirm,
    // 导出方式
    exportMethod,
    // 新导出方式
    exportTransform,
    // 时间格式化标准
    formatTime(val) {
      return val ? this.$gFun.formatDate.format(new Date(val), 'yyyy-MM-dd hh:mm:ss') : ''
    },
    // 多条件查询
    onSearch() {
      this.getTableData(1, 'page')
      this.table.currentPage = 1
    }

  },
  mounted() {
    this.onSearch()
  },
  created() {

  }
}
export default mixin
