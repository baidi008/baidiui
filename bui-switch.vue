<template>
  <div
    :class="['bui_inline_block bui-switch']"
    :style="{
      'font-size': realSize / 16 + 'rem',
      'box-shadow': shadow ? 'inset 0 0 0.24em rgba(0,0,0,0.48)' : 'none',
      opacity: disabled ? 0.48 : 1,
      'border-radius': radius == 'fillet' ? '0.125em' : radius == 'pill' ? '0.5em' : 0,
      'background-color': isCheck ? realColor : $setColor('silver')
    }"
    @click="!disabled && !readonly ? checked() : null"
  >
    <div
      class="bui-switch-item"
      :style="{
        left: isCheck ? '50%' : 0,
        'box-shadow': shadow ? '0 0 0.24em rgba(0,0,0,0.48)' : 'none',
        'border-radius': radius == 'fillet' ? '0.125em' : radius == 'pill' ? '0.5em' : 0
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: false,
      isCheck: false
    }
  },
  props: {
    radius: {
      default: 'fillet'
    },
    shadow: {
      default: false
    },
    modelValue: {
      default: null
    },
    'value-true': {
      default: true
    },
    'value-false': {
      default: false
    },
    size: {
      default: 24
    },
    color: {},
    colorname: {
      default: 'turquoise'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    realSize() {
      return this.size <= 12 ? 12 : this.size >= 96 ? 96 : this.size
    },
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    }
  },
  model: {
    prop: 'modelValue',
    event: 'model'
  },
  methods: {
    checked: function () {
      if (this.modelValue == this.valueTrue) {
        this.$emit('uncheck')
        this.$emit('model', this.valueFalse)
      } else {
        this.$emit('check')
        this.$emit('model', this.valueTrue)
      }
      this.$emit('change', this.modelValue)
    }
  },
  watch: {
    modelValue: {
      handler: function (nv, ov) {
        if (nv == this.valueTrue) {
          this.$set(this, 'isCheck', true)
        } else {
          this.$set(this, 'isCheck', false)
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lange="scss" scope>
  .bui-switch {
    width: 2em;
    height: 1em;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s, border-radius 0.3s;
    position: relative;
    overflow: hidden;
  }
  .bui-switch-item {
    width: 1em;
    height: 1em;
    padding: 0.125em;
    transition: left 0.3s, box-shadow 0.3s, border-radius 0.3s;
    position: absolute;
    background-color: #ffffff;
    transform: scale(0.72);
  }
</style>
