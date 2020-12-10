<template>
  <div
    v-if="isOpen"
    class="modalBox"
    :style="{
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      'z-index': 1000
    }"
  >
    <div
      class="modalBody bui_shadow_12"
      :style="{
        width: width,
        overflow: 'hidden',
        transition: 'transform 0.3s ease,opacity 0.3s ease',
        opacity: isAnimate ? 1 : 0,
        transform: animate(isAnimate),
        position: 'fixed',
        'z-index': 1
      }"
    >
      <form class="bui_flex_column bui_bgc_white" @submit.prevent="$emit('submit')">
        <div class="bui_flex_column_t">
          <template v-if="!!$slots['header']">
            <slot name="header"></slot>
          </template>
          <template v-else>
            <div class="bui_flex_row bui_vm" v-if="header">
              <div class="bui_flex_row_c bui_ta_l bui_p_24_lr bui_p_12 bui_fs_16">{{ title }}</div>
              <div class="bui_flex_row_r bui_p_12" v-if="!!closeble && closeble.findIndex(res => res === 'button') !== -1">
                <a href="javascript:;" class="bui_block bui_fc_black bui_fc_red_h" @click="close()"><bui-icon icon="close" size="24"></bui-icon></a>
              </div>
            </div>
          </template>
        </div>
        <div class="bui_flex_column_m bui_ta_l bui_scrollbar">
          <div :class="['bui_scrollbar_wrap', noscroll ? 'bui_scrollbar_disabled' : '']">
            <template v-if="content">
              <div v-html="content"></div>
            </template>
            <template v-else>
              <slot></slot>
            </template>
          </div>
        </div>
        <div class="bui_flex_column_b">
          <template v-if="!!$slots['footer']">
            <slot name="footer"></slot>
          </template>
          <template v-else>
            <template v-if="!!mode">
              <div class="bui_p_12 bui_ta_r">
                <div class="bui_row_p_6 bui_inline bui_inline_block">
                  <div v-if="mode == 'confirm'">
                    <bui-btn colorname="silver" @click="$emit('cancel')">{{ cancelText }}</bui-btn>
                  </div>
                  <div>
                    <bui-btn html-type="submit" mode="dark">{{ successText }}</bui-btn>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </form>
    </div>
    <div
      class="modalMask"
      :style="{
        display: isOpen ? 'block' : 'none',
        transition: 'opacity 0.3s',
        opacity: isAnimate ? 1 : 0,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        'background-color': realColor,
        'z-index': 0
      }"
      @click="!!closeble && closeble.findIndex(res => res === 'mask') !== -1 ? close() : null"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isAnimate: false,
      initWidth: null,
      initHeight: null
    }
  },
  props: {
    header: {
      default: true
    },
    content: {
      default: false
    },
    width: {
      default: '480px'
    },
    height: {
      default: 'auto'
    },
    padding: {
      default: 32
    },
    positions: {
      default: 'top'
    },
    title: {
      default: ''
    },
    mode: {
      default: false
    },
    successText: {
      default: '确定'
    },
    cancelText: {
      default: '取消'
    },
    closeble: {
      default: () => {
        return ['button', 'mask']
      }
    },
    indynamic: { default: false },
    colorname: {
      default: 'black,f,24'
    },
    noscroll: { type: Boolean, default: false }
  },
  mounted() {
    var _t = this
  },
  computed: {
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
  methods: {
    open(options) {
      var _t = this
      _t.$set(_t, 'isOpen', true)
      setTimeout(function() {
        _t.setSize()
        _t.$domChange($(_t.$el).find('.bui_scrollbar_wrap:first')[0], res => {
          _t.setSize()
        })
        setTimeout(function() {
          _t.$set(_t, 'isAnimate', true)
          _t.setSize()
          setTimeout(() => {
            _t.$emit('opened')
          }, 300)
        }, 100)
      })
    },
    close() {
      var _t = this
      _t.$set(_t, 'isAnimate', false)
      setTimeout(function() {
        _t.$set(_t, 'isOpen', false)

        //移除动态组件
        if (_t.indynamic) {
          _t.$parent.dynamics.splice(_t.$parent.dynamics.findIndex(res => res.id == _t.$attrs.id), 1)
        }
        _t.$emit('closed')
      }, 400)
    },
    setSize() {
      var _t = this
      if (_t.isOpen) {
        var _box = $(_t.$el).find('.modalBody'),
          _wrap = _box.children(),
          _wrapT = _wrap.children('.bui_flex_column_t'),
          _wrapM = _wrap.children('.bui_flex_column_m'),
          _wrapB = _wrap.children('.bui_flex_column_b'),
          _boxHeight = _wrapM.children('.bui_scrollbar_wrap').innerHeight() + _wrapT.innerHeight() + _wrapB.innerHeight(),
          _ww = $(_t.$el).width(),
          _wh = $(_t.$el).height()

        var _positionStyle = {}
        if (_t.positions.indexOf('side') != -1) {
          if (_t.positions.indexOf('bottom') != -1) {
            Object.assign(_positionStyle, {
              width: '100%',
              height: _boxHeight,
              'max-height': _wh,
              left: 0,
              top: 'auto',
              bottom: 0
            })
          } else if (_t.positions.indexOf('left') != -1) {
            Object.assign(_positionStyle, {
              width: _t.width,
              'max-width': _ww,
              height: '100%',
              left: 0,
              top: 0,
              right: 'auto'
            })
          } else if (_t.positions.indexOf('right') != -1) {
            Object.assign(_positionStyle, {
              width: _t.width,
              'max-width': _ww,
              height: '100%',
              left: 'auto',
              top: 0,
              right: 0
            })
          } else {
            Object.assign(_positionStyle, {
              width: '100%',
              height: _boxHeight,
              'max-height': _wh,
              left: 0,
              top: 0,
              bottom: 'auto'
            })
          }
        } else {
          Object.assign(_positionStyle, {
            width: _t.width,
            'max-width': _ww - _t.padding * 2 + 'px',
            height: _boxHeight,
            'max-height': _wh - _t.padding * 2 + 'px',
            left: (_ww - _box.width()) / 2 + 'px',
            right: 'auto'
          })

          if (_t.positions.indexOf('top') != -1) {
            Object.assign(_positionStyle, {
              top: _t.padding + 'px',
              bottom: 'auto'
            })
          } else if (_t.positions.indexOf('bottom') != -1) {
            Object.assign(_positionStyle, {
              top: 'auto',
              bottom: _t.padding + 'px'
            })
          } else {
            Object.assign(_positionStyle, {
              top: (_wh - _box.height()) / 2 + 'px',
              bottom: 'auto'
            })
          }
        }
        _box.css(_positionStyle)
        _wrap.css({
          width: _box.width(),
          height: _box.height()
        })
      }
    },
    // 过度动画
    animate(isAnimate) {
      var _t = this,
        _return = ''

      if (_t.positions.indexOf('side') != -1) {
        if (_t.positions.indexOf('bottom') != -1) {
          isAnimate ? (_return = 'translateY(0)') : (_return = 'translateY(50%)')
        } else if (_t.positions.indexOf('left') != -1) {
          isAnimate ? (_return = 'translateX(0)') : (_return = 'translateX(-50%)')
        } else if (_t.positions.indexOf('right') != -1) {
          isAnimate ? (_return = 'translateX(0)') : (_return = 'translateX(50%)')
        } else {
          isAnimate ? (_return = 'translateY(0)') : (_return = 'translateY(-50%)')
        }
      } else {
        if (_t.positions.indexOf('top') != -1) {
          isAnimate ? (_return = 'translateY(0)') : (_return = 'translateY(-50%)')
        } else if (_t.positions.indexOf('bottom') != -1) {
          isAnimate ? (_return = 'translateY(0)') : (_return = 'translateY(50%)')
        } else {
          isAnimate ? (_return = 'scale(1)') : (_return = 'scale(0)')
        }
      }
      return _return
    }
  },
  watch: {
    '$root.win': {
      handler(nv, ov) {
        var _t = this
        _t.setSize()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fixHeight {
  width: 0;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.bui_scrollbar_disabled {
  height: 100%;
  overflow: hidden;
}
</style>
