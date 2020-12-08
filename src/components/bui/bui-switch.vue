<template>
  <div
    :class="['bui_inline_block']"
    :style="{
      'font-size': realSize / 16 + 'rem',
      width: '2em',
      height: '1em',
      cursor: 'pointer',
      transition: 'all 0.3s',
      position: 'relative',
      'box-shadow': shadow ? 'inset 0 0 0.24em rgba(0,0,0,0.48)' : 'none',
      opacity: disabled ? 0.48 : 1,
      overflow: 'hidden',
      'border-radius': radius == 'fillet' ? '0.125em' : radius == 'pill' ? '0.5em' : 0,
      'background-color': isCheck ? realColor : $setColor('silver')
    }"
    @click="!disabled && !readonly ? checked() : null"
  >
    <div
      :style="{
        width: '1em',
        height: '1em',
        padding: '0.125em',
        transition: 'left 0.3s,box-shadow 0.3s,border-radius 0.3s',
        position: 'absolute',
        left: isCheck ? '50%' : 0,
        'box-shadow': shadow ? '0 0 0.24em rgba(0,0,0,0.48)' : 'none',
        'border-radius': radius == 'fillet' ? '0.125em' : radius == 'pill' ? '0.5em' : 0,
        'background-color': '#ffffff',
        transform: 'scale(0.72)'
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
      var _t = this
      var _result = ''
      if (!_t.color) {
        _result = _t.$setColor(_t.colorname)
      } else {
        _result = _t.color
      }
      return _result
    }
  },
  model: {
    prop: 'modelValue',
    event: 'model'
  },
  methods: {
    checked: function() {
      var _t = this
      if (_t.modelValue == _t.valueTrue) {
        _t.$emit('uncheck')
        _t.$emit('model', _t.valueFalse)
      } else {
        _t.$emit('check')
        _t.$emit('model', _t.valueTrue)
      }
      _t.$emit('change', _t.modelValue)
    }
  },
  watch: {
    modelValue: {
      handler: function(nv, ov) {
        var _t = this
        if (nv == _t.valueTrue) {
          _t.$set(_t, 'isCheck', true)
        } else {
          _t.$set(_t, 'isCheck', false)
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style></style>
