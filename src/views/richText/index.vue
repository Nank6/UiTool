<template>
  <div class="sys-page">
    <editor :text.sync="text" :content="description" :upload.sync="upload"/>
  </div>
</template>

<script>
import Editor from '@/components/Editor'

export default {
  name: 'RichText',
  components: { Editor },
  data() {
    return {
      description: '<p>默认</p>',
      upload: [],
      text: ''
    }
  },
  methods: {
    catchData(val) {
      console.log(this.text)
      console.log(this.upload)
    }
  }

}
</script>

