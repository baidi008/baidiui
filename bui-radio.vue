<template>
  <div class="bui-radio bui_inline_block" :style="{ 'font-size': realSize / 16 + 'rem' }">
    <div
      class="bui-radio-wrap bui_flex_row bui_vm bui_block"
      :style="{ opacity: disabled ? 0.48 : 1 }"
      @click="checked"
      @mouseover="!disabled && !readonly ? (hover = true) : null"
      @mouseleave="hover = false"
    >
      <div class="bui_flex_row_l bui_vm">
        <div class="bui-radio-badge">
          <i
            :style="{
              'border-width': 0.125 + 'em',
              'border-style': 'solid',
              'border-color': hover || iconStatus === 1 ? realColor : $setColor('silver')
            }"
          ></i>
          <i
            :style="{
              transform: iconStatus === 1 ? 'scale(0.48)' : 'scale(0)',
              'background-color': realColor
            }"
          ></i>
        </div>
      </div>
      <div class="bui_flex_row_c bui_vm" v-if="!!$slots.default">
        <div class="bui-radio-label">
          <slot name="default"></slot>
        </div>
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
    name: { default: '' },
    modelValue: null,
    value: null,
    color: { default: null },
    colorname: { default: 'turquoise' },
    bindkey: { default: 'id' },
    disabled: { default: false },
    readonly: { default: false },
    size: { default: 24 },
    status: { default: 0 }
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
      return this.size <= 24 ? 24 : this.size >= 48 ? 48 : this.size
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
    checked() {
      if (!this.disabled && !this.readonly) {
        let object = { value: this.value }
        if (this.$isArray(this.$slots.default, true) && this.$slots.default[0].text) {
          object.label = this.$slots.default[0].text
        }
        this.$emit('change', object)
        this.$emit('model', object.value)
      }
    }
  }
}
</script>

<style lang="scss" scope>
  .bui-radio {
    display: inline-block;
    vertical-align: middle;
    & .bui-radio-wrap {
      height: 1em;
      height: 1em;
      line-height: 1em;
      cursor: pointer;
    }
    & .bui-radio-badge {
      width: 0.75em;
      height: 0.75em;
      position: relative;
      & > i {
        display: block;
        border-radius: 1em;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: border-color 0.3s, transform 0.3s;
      }
    }
    & .bui-radio-label {
      padding: 0 1.28em 0 0.48em;
      line-height: 2em;
      font-size: 0.5em;
    }
  }
</style>
