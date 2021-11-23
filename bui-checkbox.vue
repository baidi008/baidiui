<template>
  <div class="bui-checkbox">
    <div
      class="bui-checkbox-wrap bui_flex_row bui_vm"
      :style="{ 'font-size': realSize / 16 + 'rem', opacity: disabled ? 0.48 : 1 }"
      @click="check()"
      @mouseover="!disabled && !readonly ? (hover = true) : null"
      @mouseleave="hover = false"
    >
      <div class="bui_flex_row_l bui_vm">
        <i
          :class="['bui-checkbox-badge']"
          :style="{
            'background-color': iconStatus !== 0 ? realColor : hover ? $setColor('black,f,84') : $setColor('black,f,90')
          }"
        >
          <div
            :class="['bui-checkbox-icon', 'bui_block', 'bui_fc_white', 'bi bi-remove']"
            :style="{
              opacity: iconStatus == 1 ? 1 : 0,
              transform: iconStatus == 1 ? 'scale(0.64)' : 'scale(0)'
            }"
          ></div>
          <div
            :class="['bui-checkbox-icon', 'bui_block', 'bui_fc_white', 'bi bi-check']"
            :style="{
              opacity: iconStatus == 2 ? 1 : 0,
              transform: iconStatus == 2 ? 'scale(0.64)' : 'scale(0)'
            }"
          ></div>
        </i>
      </div>
      <div class="bui_flex_row_c" v-if="!!$slots.default">
        <div class="bui-checkbox-label"><slot name="default"></slot></div>
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
    modelValue: { default: null },
    value: { default: '' },
    color: { default: false },
    colorname: { default: 'turquoise' },
    disabled: { default: false },
    readonly: { default: false },
    bindkey: { default: null },
    size: { default: 16 },
    status: { default: 0 }
  },
  computed: {
    iconStatus() {
      let result = 0
      // 绑定数组操作
      if (Array.isArray(this.modelValue)) {
        if (typeof this.value == 'object') {
          if (this.bindkey) {
            if (this.modelValue.findIndex((res) => res[this.bindkey] === this.value[this.bindkey]) !== -1) {
              result = 2
            } else {
              result = 0
            }
          } else {
            if (this.modelValue.findIndex((res) => JSON.stringify(res) === JSON.stringify(this.value)) !== -1) {
              result = 2
            } else {
              result = 0
            }
          }
        } else {
          if (this.modelValue.findIndex((res) => res === this.value) !== -1) {
            result = 2
          } else {
            result = 0
          }
        }
      }
      // 独立操作
      else {
        result = this.status
      }
      return result
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
  mounted() {},
  methods: {
    check: function () {
      var _t = this
      var _length = 0,
        _index = -1,
        _value = _t.value
      // 绑定数据处理
      if (!!_t.modelValue && typeof _t.modelValue === 'object' && !_t.disabled && !_t.readonly) {
        $.map(_t.modelValue, function (data, index) {
          if (typeof _value == 'object') {
            if (_t.bindkey) {
              if (data[_t.bindkey] == _value[_t.bindkey]) {
                _index = index
                _length++
              }
            } else {
              if (JSON.stringify(data) == JSON.stringify(_value)) {
                _index = index
                _length++
              }
            }
          } else {
            if (data == _value) {
              _index = index
              _length++
            }
          }
        })
        _t.$emit('model', _t.modelValue)
        if (_length == 0) {
          _t.modelValue.push(_value)
          _t.$emit('check', _value)
        } else {
          _t.modelValue.splice(_index, 1)
          _t.$emit('uncheck', _value)
        }
      } else {
        _t.$emit('click')
      }
    }
  },
  watch: {
    modelValue: {
      handler: function (nv) {
        if (!nv || !this.$isArray(nv)) {
          this.$emit('model', [])
          this.$emit('chagae', [])
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scope>
  .bui-checkbox {
    display: inline-block;
    vertical-align: middle;
    & .bui-checkbox-wrap {
      height: 1em;
      line-height: 1em;
      cursor: pointer;
      & .bui-checkbox-badge,
      & .bui-checkbox-icon {
        transition: background 0.3s, transform 0.3s;
      }
      & .bui-checkbox-badge {
        width: 0.75em;
        height: 0.75em;
        display: block;
        border-radius: 0.25em;
        position: relative;
      }
      & .bui-checkbox-icon {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        font-size: 0.75em;
        line-height: 1;
      }
      & .bui-checkbox-label {
        padding: 0 1.28em 0 0.48em;
        line-height: 2em;
        font-size: 0.5em;
      }
    }
  }
</style>
