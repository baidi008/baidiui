<template>
  <div class="bui-drop-wrap" :id="'bui-drop-' + _uid" @click="click" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="bui-drop-slot"><slot></slot></div>
    <template v-if="status === 'open'">
      <div class="bui-drop" :style="Object.assign(dropStyle.style, { 'min-width': el.width + 'px' })">
        <div :class="['bui_shadow', 'bui_bgc_white', 'bui_radius', 'bui-drop-inner', dropStyle.position]">
          <div class="bui-drop-arrow"></div>
          <div style="z-index:1;position: relative;"><slot name="drop"></slot></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'buiDrop',
  data() {
    return {
      status: 'close',
      el: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        width: 0
      },
      loop: null,
      amClassName: {
        top: ['moveUpIn', 'moveUpOut'],
        bottom: ['moveDownIn', 'moveDownOut'],
        left: ['moveLeftIn', 'moveLeftOut'],
        right: ['moveRightIn', 'moveRightOut']
      }
    }
  },
  props: {
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    position: { type: String, default: 'bottom' },
    scroll: { type: String, default: 'body' },
    trigger: { type: String, default: 'click' }
  },
  mounted() {
    var _t = this
  },
  methods: {
    // 不间断获取当前位置
    setEl(action) {
      var _t = this
      if (action === 'open') {
        _t.loop = self.setInterval(() => {
          _t.$set(_t, 'el', {
            top: $(_t.$el).position().top,
            bottom: $(_t.$el).position().top + $(_t.$el).height(),
            left: $(_t.$el).position().left,
            right: $(_t.$el).position().left + $(_t.$el).width(),
            height: $(_t.$el)
              .children('.bui-drop-slot')
              .height(),
            width: $(_t.$el)
              .children('.bui-drop-slot')
              .width(),
            dropWidth: $(_t.$el)
              .children('.bui-drop')
              .width(),
            dropHeight: $(_t.$el)
              .children('.bui-drop')
              .height()
          })
        })
      } else if (action === 'close') {
        clearInterval(_t.loop)
      }
    },
    // 打开弹出菜单
    open(callback) {
      var _t = this
      if (!!_t.$slots['drop'] && !this.disabled && !this.readonly) {
        _t.$set(_t, 'status', 'open')
        setTimeout(() => {
          _t.setEl('open') // 不间断获取当前位置
          $(_t.$el)
            .children('.bui-drop')
            .css({ display: 'block' })
          $(_t.$el)
            .children('.bui-drop')
            .addClass('bui_am_' + _t.amClassName[_t.position][0])
            .removeClass('bui_am_' + _t.amClassName[_t.position][1])
          setTimeout(function() {
            if (_t.trigger === 'click') {
              $(_t.$root.$el).bind('click', e => {
                if ($(e.target).parents('#bui-drop-' + _t._uid).length === 0) {
                  _t.close()
                }
              })
            }
            typeof callback === 'function' ? callback() : null
          }, 300)
          this.$emit('open')
        })
      }
    },
    // 关闭
    close(callback) {
      var _t = this
      var _loop = self.setInterval(() => {
        if ($('.bui-drop').length === 0) {
          clearInterval(_loop)
          $(_t.$root.$el).unbind('click')
        }
      },300)

      _t.setEl('close')
      $(_t.$el)
        .children('.bui-drop')
        .addClass('bui_am_' + _t.amClassName[_t.position][1])
        .removeClass('bui_am_' + _t.amClassName[_t.position][0])
      setTimeout(() => {
        $(_t.$el)
          .children('.bui-drop')
          .css({ display: 'none' })
        _t.$set(_t, 'status', 'close')
        this.$emit('close')
      }, 300)
    },
    // 事件
    click() {
      var _t = this
      if (_t.trigger === 'click' && _t.status === 'close') {
        _t.open()
      }
    },
    mouseover() {
      var _t = this
      if (_t.trigger === 'hover' && _t.status === 'close') {
        _t.open()
      }
    },
    mouseleave() {
      var _t = this
      if (_t.trigger === 'hover' && _t.status === 'open') {
        _t.close()
      }
    }
  },
  computed: {
    dropStyle() {
      var _t = this
      var _result = {
        position: '',
        style: {}
      }
      if (_t.status === 'open') {
        if (_t.position === 'top') {
          _result.position = _t.el.top - _t.el.dropHeight < 0 ? 'bottom' : 'top'
          _result.style = {
            top: (_t.el.top - _t.el.dropHeight < 0 ? _t.el.bottom : _t.el.top - _t.el.dropHeight) + 'px',
            bottom: 'auto',
            left: _t.el.left - _t.el.dropWidth / 2 + _t.el.width / 2 + 'px'
          }
        } else if (_t.position === 'bottom') {
          _result.position = _t.el.bottom + _t.el.dropHeight > $(window).height() ? 'top' : 'bottom'
          _result.style = {
            top: (_t.el.bottom + _t.el.dropHeight > $(window).height() ? _t.el.top - _t.el.dropHeight : _t.el.bottom) + 'px',
            bottom: 'auto',
            left: _t.el.left - _t.el.dropWidth / 2 + _t.el.width / 2 + 'px'
          }
        } else if (_t.position === 'left') {
          _result.position = _t.el.top + _t.el.dropHeight > $(window).height() ? 'left-top' : 'left-bottom'
          _result.style = {
            top: (_t.el.top + _t.el.dropHeight > $(window).height() ? _t.el.bottom - _t.el.dropHeight : _t.el.top) + 'px',
            bottom: 'auto',
            left: _t.el.left - _t.el.dropWidth + 'px'
          }
        } else if (_t.position === 'right') {
          _result.position = _t.el.top + _t.el.dropHeight > $(window).height() ? 'right-top' : 'right-bottom'
          _result.style = {
            top: (_t.el.top + _t.el.dropHeight > $(window).height() ? _t.el.bottom - _t.el.dropHeight : _t.el.top) + 'px',
            bottom: 'auto',
            left: _t.el.right + 'px'
          }
        }
      } else {
        _result.position = 'hide'
        _result.style = {
          top: '-99999px',
          left: '-99999px'
        }
      }

      return _result
    }
  }
}
</script>

<style lang="scss">
.bui-drop-wrap {
  display: inline-block;
  position: relative;
  .bui-drop-slot {
    display: block;
  }
  .bui-drop {
    z-index: 1000;
    display: none;
    opacity: 0;
    left: -99999px;
    top: -99999px;
    position: fixed;
    & > .bui-drop-inner {
      position: relative;
      margin: 0 0.64rem !important;
      & > .bui-drop-arrow {
        display: block;
        width: 0.64rem;
        height: 0.64rem;
        position: absolute;
        background-color: white;
        z-index: 0;
        border-style: solid;
        border-color: #e1e1e1;
      }

      &.top,
      &.bottom {
        margin: 0.64rem 0 !important;
      }
      &.top > .bui-drop-arrow {
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        bottom: -0.32rem;
        border-width: 0 1px 1px 0;
      }
      &.bottom > .bui-drop-arrow {
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        top: -0.32rem;
        border-width: 1px 0 0 1px;
      }
      &.left-bottom > .bui-drop-arrow,
      &.left-top > .bui-drop-arrow {
        right: -0.64rem;
        transform: translateX(-50%) rotate(45deg);

        border-width: 1px 1px 0 0;
      }
      &.right-bottom > .bui-drop-arrow,
      &.right-top > .bui-drop-arrow {
        left: 0rem;
        transform: translateX(-50%) rotate(45deg);

        border-width: 0 0 1px 1px;
      }
      &.left-bottom > .bui-drop-arrow,
      &.right-bottom > .bui-drop-arrow {
        top: 0.64rem;
      }
      &.left-top > .bui-drop-arrow,
      &.right-top > .bui-drop-arrow {
        bottom: 0.64rem;
      }
    }
  }
}
</style>
