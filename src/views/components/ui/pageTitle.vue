<template>
  <div class="sys-page">
    <v-title title="页面标题"/>
    <div class="page-content">
      <div class="article">
        本页面最上方的“页面标题”即为该组件样式
      </div>
      <v-section title="组件说明">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="组件使用"/>
          <el-table-column prop="detail" label="功能描述"/>
          <el-table-column prop="param" label="参数"/>
          <el-table-column prop="paramDetail" label="参数描述"/>
          <el-table-column prop="paramType" label="参数类型"/>
        </el-table>
      </v-section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComPageTitle',
  data() {
    return {
      tableData: [
        {
          name: '<v-title></v-title>',
          detail: '该区域为每页标题',
          param: 'title',
          paramDetail: '定义标题内容',
          paramType: 'String'
        }
      ]
    }
  }
}
</script>
