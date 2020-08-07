<template>
  <div class="sys-page">
    <div class="filter-container">
      <el-input placeholder="接口名称" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button @click="deleteall()">清空全部</el-button>
      <el-button @click="deleteBat()">批量删除</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row @selection-change="handleSelectionChange" style="width:100%;margin-top:10px;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="URL" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.urlString }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="serialNo" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.serialNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接口" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.interFace }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求参数" width="400" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.requestStandard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button @click="handleModifyStatus(scope.row,'draft')">编辑
          </el-button>
          <el-button @click="deleteHandler(scope.row,'delete')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" label-width="80px">
        <el-form-item label="序号">
          <el-input v-model="dialogForm.serialNo" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="接口">
          <el-input v-model="dialogForm.interFace" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-input type="textarea" v-model="dialogForm.requestStandard" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyHandler()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import request from '@/util/axios-wth'
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'standardList',
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      multipleSelection: [],
      selectIds: [],
      dialogForm: {
        urlString: '',
        serialNo: '',
        interFace: '',
        requestStandard: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // save() {
    //   request({
    //     url: '/saveToDatabase',
    //     method: 'post',
    //     data: {
    //       ids: this.selectIds.join(',')
    //     }
    //   }).then(res => {
    //     console.log(res)
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // },

    // compare() {

    // },
    // 拾取复选框数据
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
      this.selectIds = this.multipleSelection.map((item) => {
        return {
          "urlString": item.urlString,
          "interFace": item.interFace
        }
      })
      console.log(this.selectIds)
    },
    // 批量删除
    deleteBat() {
      let promiseArr = []
      this.selectIds.forEach((item) => {
        let eleFun = this.deleteHandler(item)
        promiseArr.push(eleFun)
      })

      Promise.all(promiseArr).then(([res]) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getList() {
      this.listLoading = true
      request({
        url: '/StandardController/getStandardList',
        method: 'post',
        data: {
          'interFace': this.listQuery.title
        }
      }).then((res) => {
        console.log(res)
        this.list = res.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.dialogFormVisible = true
      let { urlString, serialNo, interFace, requestStandard } = row
      this.dialogForm = {
        urlString: urlString,
        serialNo: serialNo,
        interFace: interFace,
        requestStandard: requestStandard
      }
    },
    modifyHandler() {
      request({
        url: '/StandardController/modifyStandard',
        method: 'post',
        data: {
          "urlString": this.dialogForm.urlString,
          "serialNo": this.dialogForm.serialNo,
          "interfaces": this.dialogForm.interFace,
          "requestStandard": this.dialogForm.requestStandard
        }
      }).then((res) => {
        this.dialogFormVisible = false
        this.getList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },

    deleteall() {
      request({
        url: '/StandardController/deleteAll',
        method: 'post',
        data: {}
      }).then(() => {
        this.getList()
      })
    },


    deleteHandler(row) {
      console.log(row)
      request({
        url: '/StandardController/deleteStandard',
        method: 'post',
        data: {
          "urlString": row.urlString,
          "interfaces": row.interFace,
        }
      }).then((res) => {
        this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
