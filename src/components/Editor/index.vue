<template>
  <div id="wangeditor">
    <div ref="editorElem" class="upload" style="text-align:left" />
    <el-upload action="" v-if="!uploadhide" :limit="limit" list-type="picture-card" :http-request="request" :on-exceed="exceed" :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-remove="remove">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'EditorElem',
  /* eslint-disable*/
  props: {
    limit: {
      type: Number,
      default: 3
    },
    text: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    upload: {
      type: Array,
      default: []
    },
    uploadhide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: '',
      editorContent: '',
      dialogVisible: false,
      dialogImageUrl:"",
      fileList: this.upload,
    }
  },
  mounted() {
    //创建富文本
    this.editorCreate()
    //默认上传文件数
    this.limit = 3

  },
  methods: {
    //自定义
    request(data) {
      this.fileList.push(data)
      this.$emit('update:upload', this.fileList)
    },
    //超出钩子
    exceed() {
    },
    //移除钩子
    remove(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList
      } else {
        this.fileList = []
      }
      this.$emit('update:upload', this.fileList)
    },
//验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //点击图片
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    // 创建富文本
    editorCreate() {
      this.editor = new E(this.$refs.editorElem)
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('update:text', html) // 把这个html通过catchData的方法传入父组件
      }
      this.editor.customConfig.menus = [ // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        // 'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]

      this.editor.create() // 创建富文本实例
      if (!this.content) {
        this.editor.txt.html('请编辑内容1')
      } else {
        this.editor.txt.html(this.content)
      }
    }
  }

}
</script>
<style lang="scss" rel="stylesheet/scss">
#wangeditor {
  width: 50rem;
}
.upload>div{
z-index:100 !important
}
.upload>div>div{
z-index:101 !important
}
</style>
