<template>
  <div>
    <el-autocomplete
      v-model="newValue"
      :fetch-suggestions="remoteMethod"
      v-bind="$attrs"
      v-on="$listeners"
      :debounce="500"
      @focus="inputFocus"
      @blur="inputBlur"
      @select="inputSelect"
    >
      <i
        class="el-icon-search el-input__icon"
        slot="suffix"
      />
      <template slot-scope="props">
        <slot v-bind="bindArr(props.item)" />
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
const BasicsType = {
  // 货主选择
  supplier: {
    url: 'autoComplete/test',
    keyList: [
      'supplierName',
      'supplierId',
      'linkman',
      'address',
      'phone'
    ]
  }
}

export default {
  name: 'VAutoComplete',
  props: {
    // v-model默认传入属性值
    value: {
      type: String,
      default() {
        return ''
      }
    },
    // 默认类型
    type: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      saveValue: '',
      currentType: BasicsType[this.type]
    }
  },
  computed: {
    newValue: {
      get: function() {
        return this.value
      },
      set: function(value) {
        this.$emit('input', value)
        if (value === undefined || value == null || value === '') {
          this.saveValue = ''
          this.$emit('change', '')
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    // 插槽
    bindArr(item) {
      const obj = {}
      for (const key in item) {
        obj[key] = item[key]
      }
      return obj
    },
    // 获得焦点
    inputFocus() {
      if (this.newValue !== '' && this.newValue != null && this.newValue !== undefined) {
        this.saveValue = this.newValue
      } else {
        this.saveValue = ''
      }
    },
    // 失去焦点
    inputBlur() {
      this.newValue = this.saveValue
    },
    inputSelect(item) {
      this.newValue = item.value
      this.saveValue = item.value
      this.$emit('change', item)
    },
    // 远程搜索
    remoteMethod(query, cb) {
      let list = []
      if (query) {
        this.request('get', this.currentType.url, '').then((res) => {
          if (res.data) {
            list = res.data.map(item => {
              const obj = {}
              for (const [index, elem] of this.currentType.keyList.entries()) {
                if (index === 0) {
                  obj.value = item[elem]
                }
                obj[elem] = item[elem]
              }
              return obj
            })
            cb(list)
          }
        })
      } else {
        list = []
        cb(list)
      }
    }

  }
}

</script>

<style lang="scss" >

</style>

