<template>
  <div class="sys-page">
    <v-title title="引用说明"/>
    <div class="page-content">
      <v-notes>
        现在看到的就是引用说明组件
      </v-notes>
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
  name: 'ComPageNotes',
  data() {
    return {
      tableData: [
        {
          name: '<v-notes></v-notes>',
          detail: '可以插入任意节点，外层仅为有样式的<div>层',
          param: '-',
          paramDetail: '-',
          paramType: '-'
        }
      ]
    }
  }
}
</script>
