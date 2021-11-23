<template>
  <div class="bui-drop-wrap" :id="'bui-drop-' + _uid" @click="click" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="bui-drop-slot" @contextmenu.prevent="rightClick"><slot></slot></div>
    <template v-if="status === 'open'">
      <div class="bui-drop" :style="{ ...dropStyle.style }">
        <div :class="['', 'bui-drop-inner', dropStyle.position]">
          <div class="bui-drop-arrow bui_shadow" :style="{ 'background-color': realColor, zIndex: 0 }"></div>
          <div class="bui-drop-bg bui_radius bui_shadow"></div>
          <div class="bui-drop-body bui_radius" :style="{ 'background-color': realColor }"><slot name="drop"></slot></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'buiDrop',
  data() {
    return {
      status: 'close',
      isAnimate: false,
      el: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        width: 0,
        pageX: 0,
        pageY: 0
      },
      isVisible: false,
      loop: null,
      amClassName: {
        top: ['moveUpIn', 'moveUpOut'],
        bottom: ['moveDownIn', 'moveDownOut'],
        left: ['moveLeftIn', 'moveLeftOut'],
        right: ['moveRightIn', 'moveRightOut'],
        mouse: ['moveDownIn', 'moveDownOut']
      }
    }
  },
  props: {
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    position: { type: String, default: 'bottom' },
    scroll: { type: String, default: 'body' },
    trigger: { type: String, default: 'click' },
    colorname: { default: 'white' },
    color: { default: null },
    visible: { type: Boolean, default: false }
  },
  mounted() {},
  methods: {
    isChildren() {
      let result = false
      $(this.$el)
        .parents()
        .toArray()
        .forEach((res) => {
          if ($(res).attr('id') && $(res).attr('id').indexOf('bui-drop') !== -1) {
            result = true
          }
        })

      return result
    },
    // 不间断获取当前位置
    setEl(action) {
      if (action === 'open') {
        this.loop = self.setInterval(() => {
          const elPosition = this.isChildren() ? $(this.$el).position() : $(this.$el).offset()
          this.$set(this, 'el', {
            ...this.el,
            top: elPosition.top,
            bottom: elPosition.top + $(this.$el).height(),
            left: elPosition.left,
            right: elPosition.left + $(this.$el).width(),
            height: $(this.$el).children('.bui-drop-slot').height(),
            width: $(this.$el).children('.bui-drop-slot').width(),
            dropWidth: $(this.$el).children('.bui-drop').width(),
            dropHeight: $(this.$el).children('.bui-drop').height()
          })
        })
      } else if (action === 'close') {
        clearInterval(this.loop)
      }
    },
    // 打开弹出菜单
    open() {
      this.isVisible = true
      this.$emit('update:visible', true)
    },
    // 关闭
    close() {
      this.isVisible = false
      this.$emit('update:visible', false)
    },
    // 事件
    click() {
      if (this.trigger === 'click' && this.status === 'close' && this.position !== 'mouse') {
        this.open()
      }
    },
    rightClick() {
      this.$set(this, 'el', { ...this.el, pageX: event.pageX, pageY: event.pageY })

      if (this.status === 'close' && this.position === 'mouse') {
        this.open()
      }
    },
    mouseover() {
      if (this.trigger === 'hover' && this.status === 'close' && this.position !== 'mouse') {
        this.open()
      }
    },
    mouseleave() {
      if (this.trigger === 'hover' && this.status === 'open' && this.position !== 'mouse') {
        this.close()
      }
    }
  },
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    dropStyle() {
      let result = {
        position: '',
        style: {}
      }
      if (this.status === 'open') {
        if (this.position === 'top') {
          result.position = this.el.top < this.el.dropHeight ? 'bottom' : 'top'
          result.style = {
            top: (this.el.top < this.el.dropHeight ? this.el.bottom : this.el.top - this.el.dropHeight) + 'px',
            bottom: 'auto',
            left: this.el.left - this.el.dropWidth / 2 + this.el.width / 2 + 'px'
          }
        } else if (this.position === 'bottom') {
          result.position = this.el.bottom + this.el.dropHeight > $(window).height() ? 'top' : 'bottom'
          result.style = {
            top: (this.el.bottom + this.el.dropHeight > $(window).height() ? this.el.top - this.el.dropHeight : this.el.bottom) + 'px',
            bottom: 'auto',
            left: this.el.left - this.el.dropWidth / 2 + this.el.width / 2 + 'px'
          }
        } else if (this.position === 'left') {
          result.position = this.el.top + this.el.dropHeight > $(window).height() ? 'left-top' : 'left-bottom'
          result.style = {
            top: (this.el.top + this.el.dropHeight > $(window).height() ? this.el.bottom - this.el.dropHeight : this.el.top) + 'px',
            bottom: 'auto',
            left: this.el.left - this.el.dropWidth + 'px'
          }
        } else if (this.position === 'right') {
          result.position = this.el.top + this.el.dropHeight > $(window).height() ? 'right-top' : 'right-bottom'
          result.style = {
            top: (this.el.top + this.el.dropHeight > $(window).height() ? this.el.bottom - this.el.dropHeight : this.el.top) + 'px',
            bottom: 'auto',
            left: this.el.right + 'px'
          }
        } else if (this.position === 'mouse') {
          result.style = {
            top: this.el.pageY + 'px',
            bottom: 'auto',
            left: (this.el.pageX + this.el.dropWidth > $(window).width() ? this.el.pageX - this.el.dropWidth : this.el.pageX) + 'px'
          }
        }
      } else {
        result.position = 'hide'
        result.style = {
          top: '-99999px',
          left: '-99999px'
        }
      }

      return result
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(nv) {
        this.$set(this, 'isVisible', nv)
      }
    },
    isVisible: {
      immediate: false,
      handler(nv) {
        if (nv) {
          if (!!this.$slots['drop'] && !this.disabled && !this.readonly && !this.isAnimate) {
            this.$set(this, 'isAnimate', true)
            this.$set(this, 'status', 'open')
            setTimeout(() => {
              this.setEl('open') // 不间断获取当前位置
              $(this.$el).children('.bui-drop').css({ display: 'block' })
              $(this.$el)
                .children('.bui-drop')
                .addClass('bui_am_' + this.amClassName[this.position][0])
                .removeClass('bui_am_' + this.amClassName[this.position][1])
              setTimeout(() => {
                if (this.trigger === 'click') {
                  $(this.$root.$el).bind({
                    click: (e) => {
                      if ($(e.target).parents('#bui-drop-' + this._uid).length === 0) {
                        this.close()
                      }
                    },
                    contextmenu: (e) => {
                      if ($(e.target).parents('#bui-drop-' + this._uid).length === 0) {
                        this.close()
                      }
                    }
                  })
                }
              }, 300)
              this.$emit('open')
              this.$set(this, 'isAnimate', false)
            })
          }
        } else {
          let loop = self.setInterval(() => {
            if ($('.bui-drop').length === 0) {
              clearInterval(loop)
              $(this.$root.$el).unbind('click')
            }
          }, 300)

          this.setEl('close')
          if (!this.isAnimate) {
            this.$set(this, 'isAnimate', true)
            $(this.$el)
              .children('.bui-drop')
              .addClass('bui_am_' + this.amClassName[this.position][1])
              .removeClass('bui_am_' + this.amClassName[this.position][0])
            setTimeout(() => {
              $(this.$el).children('.bui-drop').css({ display: 'none' })
              this.$set(this, 'status', 'close')
              this.$emit('close')
              this.$set(this, 'isAnimate', false)
            }, 300)
          }
        }
      }
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
      display: 'none';
      opacity: 0;
      left: -99999px;
      top: -99999px;
      position: fixed;

      & > .bui-drop-inner {
        position: relative;
        margin: 0 0.64rem !important;
        & > .bui-drop-body {
          min-width: 2rem;
          position: relative;
          z-index: 2;
        }
        & > .bui-drop-bg {
          min-width: 2rem;
          position: absolute;
          width: 100%;
          height: 100%;
          display: block;
          z-index: -1;
        }
        & > .bui-drop-arrow {
          display: block;
          width: 0.64rem;
          height: 0.64rem;
          position: absolute;
          background-color: white;
          z-index: 1;
        }

        &.top,
        &.bottom {
          margin: 0.64rem 0 !important;
        }
        &.top > .bui-drop-arrow {
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          bottom: -0.32rem;
        }
        &.bottom > .bui-drop-arrow {
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          top: -0.32rem;
        }
        &.left-bottom > .bui-drop-arrow,
        &.left-top > .bui-drop-arrow {
          right: -0.64rem;
          transform: translateX(-50%) rotate(45deg);
        }
        &.right-bottom > .bui-drop-arrow,
        &.right-top > .bui-drop-arrow {
          left: 0rem;
          transform: translateX(-50%) rotate(45deg);
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
