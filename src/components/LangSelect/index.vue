<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <i class="iconfont international-icon">&#xe609;</i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zhCN'" command="zhCN">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">Español</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      language: state => state.lang
    })
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('loadLang', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>

