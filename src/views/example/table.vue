<template>
  <div class="sys-page">
    <v-title title="表格综合"/>
    <v-notes>本页实际路径: src/views/example/table.vue   table根组件为ElementUI。table配置请查看官方文档，table分页请查看“系统组件-功能类-表格分页”</v-notes>
    <!-- 搜索 -->
    <v-search v-hasPermission="'query'">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-date-picker v-model="searchForm.time" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.type" placeholder="下拉选择">
            <el-option label="选项一" value="选项一"/>
            <el-option label="选项二" value="选项二"/>
            <el-option label="选项三" value="选项三"/>
            <el-option label="选项四" value="选项四"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.text" placeholder="请输入查询条件"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </v-search>
    <!-- 工具条 -->
    <v-toolbar>
      <el-button type="primary" v-hasPermission="'add'">新增</el-button>
      <el-button type="primary" v-hasPermission="'edit'">修改</el-button>
    </v-toolbar>
    <!-- 表格体 -->
    <v-table-mixin pagination pagination-align="center">
      <el-table v-loading="tableData.loading" :data="tableData.body" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column type="index" label="序号" width="64" align="center"/>
        <el-table-column v-for="(item,index) in tableData.head" :prop="item.key" :label="item.name" sortable :key="index"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.operation.indexOf('edit') >= 0" type="text" size="small">查看</el-button>
            <el-button v-if="scope.row.operation.indexOf('delete') >= 0" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </v-table-mixin>

    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="电话号码"
        prop="mobile"
        :rules="[
          { required: true, validator: $valid.mobile(true), trigger: 'change' },
          { type: 'number', message: '电话号码必须为数字值', trigger: 'change'}
        ]"
      >
        <el-input v-model.number="numberValidateForm.mobile" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item
        label="名称"
        prop="name"
        :rules="[
          { required: true, message: $valid.message('请输入名称'), trigger: 'change' }
        ]"
      >
        <el-input v-model="numberValidateForm.name" :maxlength="$valid.lengthRule('name')" placeholder="" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      searchForm: {
        time: '',
        type: '',
        text: ''
      },
      tableData: {
        loading: true,
        head: [],
        body: []
      },
      numberValidateForm: {
        mobile: '',
        name: ''
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取table数据
    getTableData() {
      this.request('post', '/tableData', {}).then((res) => {
        this.tableData.loading = false
        this.tableData.head = res.data.head
        this.tableData.body = res.data.body
      })
    },
    search() {
      console.log(`欲提交的数据   日期:${this.searchForm.time}  下拉条件:${this.searchForm.type}  文本: ${this.searchForm.text}`)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
