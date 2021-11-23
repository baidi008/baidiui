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
      class="modalBody bui_shadow_12 bui_inline_block"
      :style="{
        width: width,
        overflow: 'hidden',
        transition: 'transform 0.3s ease,opacity 0.3s ease',
        opacity: isAnimate ? 1 : 0,
        transform: animate,
        position: 'fixed',
        'z-index': 1
      }"
    >
      <form class="bui_flex_column bui_bgc_white" @submit.prevent="handleBtnClick('confirm')">
        <div class="bui_flex_column_t">
          <template v-if="!!$slots['header']">
            <slot name="header"></slot>
          </template>
          <template v-else>
            <div class="bui_flex_row bui_vm" v-if="header">
              <div class="bui_flex_row_c bui_ta_l bui_p_24_lr bui_p_12 bui_fs_16">{{ title }}</div>
              <div class="bui_flex_row_r bui_p_12" v-if="!!closeble && closeble.findIndex((res) => res === 'button') !== -1">
                <a href="javascript:;" class="bui_block bui_fc_black bui_fc_red_h" @click="close()"><bui-icon icon="close" size="24"></bui-icon></a>
              </div>
            </div>
          </template>
        </div>
        <div class="bui_flex_column_m bui_ta_l bui_scrollbar">
          <div :class="['bui_scrollbar_wrap', noscroll ? 'bui_scrollbar_disabled' : '']">
            <template v-if="content">
              <div class="bui_p_24_lr bui_p_12_tb" v-html="content"></div>
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
                    <bui-btn :color="realColor" @click="handleBtnClick('cancel')">{{ cancelText }}</bui-btn>
                  </div>
                  <div>
                    <bui-btn :color="realColor" html-type="submit" mode="dark">{{ successText }}</bui-btn>
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
        'background-color': $setColor('black,f,24'),
        'z-index': 0
      }"
      @click="!!closeble && closeble.findIndex((res) => res === 'mask') !== -1 ? close() : null"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isAnimate: false,
      isFixed: false,
      loop: null
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
      default: 'turquoise'
    },
    confirmed: {
      default() {
        return () => {}
      }
    },
    cancelled: {
      default() {
        return () => {}
      }
    },
    closed: {
      default() {
        return () => {}
      }
    },
    noscroll: { type: Boolean, default: false }
  },
  mounted() {},
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    // 过度动画
    animate() {
      let result = ''
      if (!!this.isFixed) {
        if (this.positions.indexOf('side') != -1) {
          if (this.positions.indexOf('bottom') != -1) {
            this.isAnimate ? (result = 'translateY(0)') : (result = 'translateY(50%)')
          } else if (this.positions.indexOf('left') != -1) {
            this.isAnimate ? (result = 'translateX(0)') : (result = 'translateX(-50%)')
          } else if (this.positions.indexOf('right') != -1) {
            this.isAnimate ? (result = 'translateX(0)') : (result = 'translateX(50%)')
          } else {
            this.isAnimate ? (result = 'translateY(0)') : (result = 'translateY(-50%)')
          }
        } else {
          if (this.positions.indexOf('top') != -1) {
            this.isAnimate ? (result = 'translateY(0)') : (result = 'translateY(-50%)')
          } else if (this.positions.indexOf('bottom') != -1) {
            this.isAnimate ? (result = 'translateY(0)') : (result = 'translateY(50%)')
          } else {
            this.isAnimate ? (result = 'scale(1)') : (result = 'scale(0)')
          }
        }
      } else {
        result = 'none'
      }
      return result
    }
  },
  methods: {
    open() {
      this.$set(this, 'isOpen', true)
      this.$set(this, 'isFixed', true)
      setTimeout(() => {
        this.setSize()
        setTimeout(() => {
          // 动画完成后校正位置
          this.$set(this, 'isAnimate', true)
          this.setSize()
          // 监听遮罩层尺寸变化
          this.$resize($(this.$el).find('.modalMask:first'), (res) => {
            this.setSize()
          })

          // 监听滚动区域尺寸变化
          this.$resize($(this.$el).find('.bui_scrollbar_wrap:first'), (res) => {
            this.setSize()
          })
          // this.loop = self.setInterval(() => {
          //   this.setSize()
          // })
          setTimeout(() => {
            this.$set(this, 'isFixed', false)
            this.$emit('opened')
          }, 300)
        }, 100)
      })
    },
    close() {
      var _t = this
      this.$set(this, 'isFixed', true)
      _t.$set(_t, 'isAnimate', false)
      setTimeout(() => {
        _t.$set(_t, 'isOpen', false)
        //移除动态组件
        if (_t.indynamic) {
          _t.$parent.dynamics.splice(
            _t.$parent.dynamics.findIndex((res) => res.id == _t.$attrs.id),
            1
          )
        }
        self.clearInterval(this.loop)
        _t.$emit('closed')
        this.closed()
        this.$set(this, 'isFixed', false)
      }, 400)
    },
    setSize() {
      var _t = this
      if (_t.isOpen) {
        var _box = $(_t.$el).children('.modalBody'),
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
    handleBtnClick(action) {
      if (action === 'confirm') {
        this.confirmed()
        this.$emit('submit')
      } else if (action === 'cancel') {
        this.cancelled()
      }
      this.$emit(action)
    }
  },
  watch: {}
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
