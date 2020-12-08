<template>
  <div class="bui_inline_block">
    <div
      class="bui_flex_row bui_vm bui_block"
      :style="{ 'font-size': realSize / 16 + 'rem', height: '1em', 'line-height': '1em', cursor: 'pointer', opacity: disabled ? 0.48 : 1, transition: 'font-size 0.3s' }"
      @click="check()"
      @mouseover="!disabled && !readonly ? (hover = true) : null"
      @mouseleave="hover = false"
    >
      <div class="bui_flex_row_l bui_vm">
        <div :style="{ width: '1em', height: '1em', overflow: 'hidden' }">
          <i
            :class="['bui_block', size >= 24 ? 'bui_radius' : '']"
            :style="{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              height: '100%'
            }"
          >
            <div
              :style="{
                position: 'absolute',
                width: '1em',
                height: '1em',
                transition: 'background 0.3s,transform 0.3s,border 0.3s',
                'border-width': 0.125 + 'em',
                'border-style': 'solid',
                'border-color': hover || iconStatus !== 0 ? realColor : $setColor('silver'),
                'background-color': iconStatus !== 0 ? realColor : null
              }"
            ></div>
            <div
              :class="['bui_block', 'bui_fc_white', 'fa fa-minus fa-fw']"
              :style="{
                position: 'absolute',
                left: 0,
                top: 0,
                'font-size': '1em',
                'line-height': '1em',
                transition: 'background 0.3s,transform 0.3s',
                width: '1em',
                height: '1em',
                opacity: iconStatus == 1 ? 1 : 0,
                transform: iconStatus == 1 ? 'scale(0.64)' : 'scale(0)'
              }"
            ></div>
            <div
              :class="['bui_block', 'bui_fc_white', 'fa fa-check fa-fw']"
              :style="{
                position: 'absolute',
                left: 0,
                top: 0,
                'font-size': '1em',
                'line-height': '1em',
                transition: 'background 0.3s,transform 0.3s',
                width: '1em',
                height: '1em',
                opacity: iconStatus == 2 ? 1 : 0,
                transform: iconStatus == 2 ? 'scale(0.64)' : 'scale(0)'
              }"
            ></div>
          </i>
        </div>
      </div>
      <div class="bui_flex_row_c" v-if="!!$slots.default">
        <p :style="{ 'font-size': '1em', padding: '0 0.64em 0 0.32em' }"><slot name="default"></slot></p>
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
    modelValue: {
      default: null
    },
    value: {
      default: ''
    },
    color: {
      default: false
    },
    colorname: {
      default: 'turquoise'
    },
    disabled: {
      default: false
    },
    readonly: {
      default: false
    },
    bindkey: {
      default: 'id'
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
      if (!!_t.modelValue && typeof _t.modelValue == 'object') {
        var _value = _t.value
        if (typeof _value == 'object' && _t.bindkey) {
          var length = 0
          $.map(_t.modelValue, function(data) {
            if (data[_t.bindkey] == _t.value[_t.bindkey]) {
              length++
            }
          })
          if (length > 0) {
            _result = 2
          } else {
            _result = 0
          }
        } else {
          if (_t.modelValue.indexOf(_value) != -1) {
            _result = 2
          } else {
            _result = 0
          }
        }
      }
      // 独立操作
      else {
        _result = _t.status
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
  mounted() {
    var _t = this
    typeof _t.modelValue != 'object' ? _t.$emit('model', []) : null
  },
  methods: {
    check: function() {
      var _t = this
      var _length = 0,
        _index = -1,
        _value = _t.value
      // 绑定数据处理
      if (!!_t.modelValue && typeof _t.modelValue === 'object' && !_t.disabled && !_t.readonly) {
        $.map(_t.modelValue, function(data, index) {
          if (_t.bindkey && typeof _value == 'object') {
            if (data[_t.bindkey] == _value[_t.bindkey]) {
              _index = index
              _length++
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
      handler: function(nv, ov) {
        var _t = this
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style></style>
