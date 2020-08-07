<template>
  <div class="sys-page">
    <el-row>
      <el-col :span="12">
        <!-- 接口监听配置 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
          <el-card class="card-form">
            <div slot="header">
              <span>监听接口配置</span>
            </div>
            <el-form-item label="地址" prop="ip">
              <el-input v-model="ruleForm.ip" placeholder="请输入监听地址，多个以逗号分隔"></el-input>
            </el-form-item>
            <el-form-item label="监听过滤接口" prop="interFacor1">
              <el-input v-model="ruleForm.interFacor1" placeholder="请输入过滤接口，多个以逗号分隔"></el-input>
            </el-form-item>
            <el-form-item label="监听过滤字段" prop="field1">
              <el-input v-model="ruleForm.field1" placeholder="请输入过滤字段，多个以逗号分隔"></el-input>
            </el-form-item>
          </el-card>
          <!-- <el-card class="card-form">
            <div slot="header">
              <span>查询接口配置</span>
            </div>
            <el-form-item label="查询过滤接口" prop="interFacor2">
              <el-input v-model="ruleForm.interFacor2" placeholder="请输入过滤接口，多个以逗号分隔"></el-input>
            </el-form-item>
            <el-form-item label="查询过滤字段" prop="field2">
              <el-input v-model="ruleForm.field2" placeholder="请输入过滤字段，多个以逗号分隔"></el-input>
            </el-form-item>
          </el-card> -->
          <el-card class="card-form">
            <div slot="header">
              <span>对比接口配置</span>
            </div>
            <el-form-item label="对比过滤接口" prop="interFacor3">
              <el-input v-model="ruleForm.interFacor3" placeholder="请输入过滤接口，多个以逗号分隔"></el-input>
            </el-form-item>
            <el-form-item label="对比过滤字段" prop="field3">
              <el-input v-model="ruleForm.field3" placeholder="请输入过滤字段，多个以逗号分隔"></el-input>
            </el-form-item>
          </el-card>

          <el-form-item class="btn-form">
            <el-button type="primary" @click="saveHanler('ruleForm')">保存配置</el-button>
            <el-button type="primary" @click="startHanler('ruleForm')">开始监听</el-button>
            <el-button @click="closeHandler('ruleForm')">关闭监听</el-button>
            <!-- <el-button type="primary" @click="test('ruleForm')">测试链接</el-button> -->

          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '@/util/axios-wth'
export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      ruleForm: {
        ip: '',
        interFacor1: '',
        field1: '',
        interFacor2: '',
        field2: '',
        interFacor3: '',
        field3: '',
      }
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    // 单次请求方法
    singlePost(data) {
      return request({
        url: '/ConfigController/updateConfig',
        method: 'post',
        data
      })
    },
    saveHanler() {
      Promise.all([
        this.singlePost({ 'configNo': 1, 'configValue': this.ruleForm.ip }),
        this.singlePost({ 'configNo': 2, 'configValue': this.ruleForm.interFacor1 }),
        this.singlePost({ 'configNo': 3, 'configValue': this.ruleForm.field1 }),
        // this.singlePost({ 'configNo': 4, 'configValue': this.ruleForm.interFacor2 }),
        // this.singlePost({ 'configNo': 5, 'configValue': this.ruleForm.field2 }),
        this.singlePost({ 'configNo': 6, 'configValue': this.ruleForm.interFacor3 }),
        this.singlePost({ 'configNo': 7, 'configValue': this.ruleForm.field3 })
      ]).then(([res1, res2, res3, res4, res5, res6, res7]) => {
        console.log(res1)
        this.test()
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    },

    startHanler() {
      request({
        url: '/HttpMonitorController/start',
        method: 'get',
        data: {

        }
      })
      request({
        url: '/ResultController/deleteAll',
        method: 'post',
        data: {}
      }).then(() => {
        this.getList()
      })
    },
    closeHandler() {
      request({
        url: '/HttpMonitorController/stop',
        method: 'post',
        data: {
          'listenPort': 8081,
        }
      })
    },
    test() {
      request({
        url: '/ConfigController/getConfigList',
        method: 'post',
        data: {}
      }).then((res) => {
        let arr = res.data
        this.ruleForm.ip = arr[0].configValue
        this.ruleForm.interFacor1 = arr[1].configValue
        this.ruleForm.field1 = arr[2].configValue
        this.ruleForm.interFacor2 = arr[3].configValue
        this.ruleForm.field2 = arr[4].configValue
        this.ruleForm.interFacor3 = arr[5].configValue
        this.ruleForm.field3 = arr[6].configValue
      })
    },
    handleLogin() {
      this.$store.dispatch('auth/Login', this.loginForm).then((res) => { }).catch(() => {
        this.loading = false
      })
    }
  },
  created() {

  },
  mounted() {
    this.test(),
      this.handleLogin()
  }
}
</script>

<style>
.card-form {
  margin-top: 10px;
}
.btn-form {
  margin-top: 10px;
}
</style>


