<template>
  <div class="sys-page">
    <el-upload action="http://localhost:9000/ms/upload" list-type="picture-card" :on-remove="handleRemove" :on-start="handleStart" :on-preview="handlePictureCardPreview" :limit="3" :on-exceed="handleExceed" :before-upload="beforeAvatarUpload">
      <i slot="default" class="el-icon-plus"/>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url">
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"/>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"/>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Upload',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  mounted() {
  },
  methods: {
    handleStart(rawFile) {
      console.log(rawFile)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件`)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload(file) {
      console.log(11111)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传文件只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
