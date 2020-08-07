<script>
import { Input } from 'element-ui'

export default {
  name: 'VNumber',
  extends: Input,
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    /* eslint-disable */
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      }
    }
  },
  methods: {
    handleInput(event) {
      let value = ((event.target.value).replace(/[^0-9.]/g, ''))
      if (isNaN(value)) value = 0
      if (value < this.min) value = this.min
      if (value > this.max) value = this.max
      this.setCurrentValue(value)
      this.$emit('input', value)
      if (this.isOnComposition) return
      // this.$emit('input', value)
    },
    handleChange(event) {
      let value = Number((event.target.value).replace(/[^0-9.]/g, ''))
      if (isNaN(value)) value = 0
      if (value < this.min) value = this.min
      if (value > this.max) value = this.max
      this.$emit('change', value.toFixed(this.precision))
      this.setCurrentValue(value.toFixed(this.precision))
    },
    setCurrentValue(value) {
      if (this.isOnComposition && value === this.valueBeforeComposition) return
      this.currentValue = value
      this.$refs.input.value = value
      if (this.isOnComposition) return
      this.$nextTick(_ => {
        this.resizeTextarea()
      })
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [value])
      }
    }
  }
}
</script>
