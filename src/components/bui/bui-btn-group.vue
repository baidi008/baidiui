<template>
  <div
    class="bui_unselect"
    :style="{
      'font-size': realSize / 16 + 'rem',
      display: 'inline-block',
      transition: 'all 0.3s',
      'text-align': 'center',
      'vertical-align': 'middle',
      height: '1em',
      'line-height': '1em',
      opacity: disabled ? 0.48 : 1,
      width: width,
      'box-sizing': 'border-box',
      position: 'relative',
      'white-space': 'nowrap'
    }"
  >
    <template v-for="(option, optionsIndex) in realOptions">
      <div
        :key="optionsIndex"
        @mouseover="onMouseover(optionsIndex)"
        @mouseleave="onMouseover(-1)"
        :style="{
          overflow: 'hidden',
          display: 'inline-block'
        }"
      >
        <div
          :style="{
            transition: 'background-color 0.3s,border-color 0.3s,color 0.3s,border-radius 0.3s',
            cursor: 'pointer',
            overflow: 'hidden',
            'white-space': 'nowarp',
            padding: '0 0.5em',
            'box-shadow': checkModel(option.value) ? 'inset 0 0 0.125em rgba(0,0,0,0.12)' : 'none',
            'background-color': checkModel(option.value) ? realColor : 'white',
            color: checkModel(option.value) ? 'white' : hover === optionsIndex ? realColor : $setColor('black'),
            'box-sizing': 'border-box',
            'border-style': 'solid',
            'border-width': borderWidth(optionsIndex),
            'border-radius': borderRadius(optionsIndex),
            'border-color': checkModel(option.value) ? realColor : $setColor('black,l,160')
          }"
          @click="setModel(option.value)"
        >
          <p :style="{ 'font-size': realSize >= 32 ? '0.4em' : '0.5em' }">{{ option.label }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnStyle: {},
      isTouch: false,
      hover: -1
    }
  },
  mounted() {},
  props: {
    modelValue: { default: null },
    className: { default: '' },
    block: { default: false },
    width: { default: 'auto' },
    size: { default: 32 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    disabled: { type: Boolean, default: false },
    radius: { default: 'fillet' },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    borderWidth() {
      return function(index) {
        let _result = '1px 1px 1px 0'
        if (index === 0) {
          _result = '1px'
        }
        return _result
      }
    },
    borderRadius() {
      return function(index) {
        let _result = '0'
        if (index === 0) {
          _result = this.radius === 'fillet' ? '0.125em 0 0 0.125em' : this.radius === 'pill' ? '0.5em 0 0 0.5em' : '0'
        } else if (index === this.realOptions.length - 1) {
          _result = this.radius === 'fillet' ? '0 0.125em 0.125em 0' : this.radius === 'pill' ? '0 0.5em 0.5em 0' : '0'
        }

        return _result
      }
    },
    realOptions() {
      let result = []
      if (this.options && this.options.length !== 0) {
        result = this.options
      } else {
        if (this.$slots) {
          const options = this.$slots.default.filter(res => res.tag === 'option')
          options.forEach(res => {
            result.push({ label: res.children[0].text, value: res.data.domProps && res.data.domProps.value ? res.data.domProps.value : false })
          })
        }
      }
      return result
    },
    checkModel() {
      return function(data) {
        var _return = false
        if (data == this.modelValue) {
          _return = true
        }
        return _return
      }
    },
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
    },
    realColor() {
      var _result = ''
      if (!this.color) {
        _result = this.$setColor(this.colorname)
      } else {
        _result = this.color
      }
      return _result
    }
  },
  model: {
    prop: 'modelValue',
    event: 'model'
  },
  methods: {
    setModel(data) {
      if (!this.disabled) {
        this.$emit('model', data)
        this.$emit('change', this.realOptions.filter(res => res.value === data)[0])
      }
    },
    onMouseover(index) {
      if (!this.disabled) {
        this.$set(this, 'hover', index)
      }
    }
  }
}
</script>

<style></style>
