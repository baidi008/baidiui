<template>
  <div class="bui_inline_block">
    <div
      class="bui_flex_row bui_vm bui_block"
      :style="{ 'font-size': realSize / 16 + 'rem', height: '1em', 'line-height': '1em', cursor: 'pointer', opacity: disabled ? 0.48 : 1, transition: 'font-size 0.3s' }"
      @click="checked"
      @mouseover="!disabled && !readonly ? (hover = true) : null"
      @mouseleave="hover = false"
    >
      <div class="bui_flex_row_l bui_vm">
        <div :style="{ width: '1em', height: '1em', position: 'relative' }">
          <i
            :class="['bui_block', 'bui_round']"
            :style="{
              position: 'absolute',
              transition: 'border 0.3s',
              width: '100%',
              height: '100%',
              'border-width': 0.125 + 'em',
              'border-style': 'solid',
              'border-color': hover || iconStatus === 1 ? realColor : $setColor('silver')
            }"
          ></i>
          <i
            :class="['bui_block', 'bui_round']"
            :style="{
              position: 'absolute',
              transition: 'background 0.3s,transform 0.3s',
              width: '100%',
              height: '100%',
              transform: iconStatus === 1 ? 'scale(0.48)' : 'scale(0)',
              'background-color': realColor
            }"
          ></i>
        </div>
      </div>
      <div class="bui_flex_row_c bui_vm" v-if="!!$slots.default">
        <p :style="{ 'line-height': '1em', padding: '0 0.64em 0 0.32em' }"><slot name="default"></slot></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    }
  },
  props: {
    name: {
      default: ''
    },
    modelValue: null,
    value: null,
    color: { default: null },
    colorname: { default: 'turquoise' },
    bindkey: {
      default: 'id'
    },
    disabled: {
      default: false
    },
    readonly: {
      default: false
    },
    size: {
      default: 16
    },
    status: {
      default: 0
    }
  },
  computed: {
    iconStatus() {
      var _t = this
      var _result = 0
      // 绑定数组操作
      if (!!_t.modelValue && !!this.value) {
        var _value = _t.value || _t.name || _t.$slots.default[0].text
        if (typeof _value == 'object' && _t.bindkey) {
          if (_t.modelValue && _value[_t.bindkey] == _t.modelValue[_t.bindkey]) {
            _result = 1
          } else {
            _result = 2
          }
        } else {
          if (_value == _t.modelValue) {
            _result = 1
          } else {
            _result = 2
          }
        }
      }
      // 独立操作
      else {
        _result = this.status
      }
      return _result
    },
    realSize() {
      return this.size <= 12 ? 12 : this.size >= 48 ? 48 : this.size
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
    checked(value) {
      if (!!this.modelValue && !!this.value && !this.disabled && !this.readonly) {
        if (this.value !== this.modelValue) {
          this.$emit('change', this.value)
        }
        this.$emit('model', this.value)
      }
    }
  }
}
</script>

<style></style>
