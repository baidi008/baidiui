<template>
  <button
    :class="['bui-btn', 'bui_unselect', sq ? 'bui-btn-sq' : 'bui-btn-unsq']"
    :type="htmlType"
    :style="btnStyle"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
    @click="onClick"
    @touchstart="onTouchstart"
    @touchend="onTouchend"
  >
    <div
      :style="{
        'font-size': realSize >= 32 ? '0.4em' : '0.5em',
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'relative',
        left: 0,
        top: 0,
        'z-index': 1,
        'white-space': 'nowrap'
      }"
    >
      <span class="bui-btn-icon" :style="{ width: loading ? '1em' : '0em', opacity: loading ? 1 : 0 }"><i class="fa fa-circle-o-notch fa-spin" v-if="loading"></i></span>
      <span v-if="!sq"><slot></slot></span>
      <span v-else><slot v-if="!loading"></slot></span>
    </div>
    <div class="bui-btn-bg" :style="maskStyle"></div>
  </button>
</template>

<script>
export default {
  data() {
    return {
      status: 0,
      isOver: false
    }
  },
  props: {
    width: { default: 'auto' },
    htmlType: { default: 'button' },
    size: { default: 32 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    type: {
      type: String,
      default: 'default'
    },
    mode: {
      type: String,
      default: 'default'
    },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    href: { default: 'javascript:;' },
    target: { default: null },
    radius: { default: 'fillet' },
    sq: { default: false }
  },
  computed: {
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
    },
    realColor() {
      var _result = ''
      if (this.type !== 'success' && this.type !== 'info' && this.type !== 'waring' && this.type !== 'error') {
        if (!this.color) {
          _result = this.$setColor(this.colorname)
        } else {
          _result = this.color
        }
      } else if (this.type === 'success') {
        _result = this.$setColor('green')
      } else if (this.type === 'info') {
        _result = this.$setColor('blue')
      } else if (this.type === 'waring') {
        _result = this.$setColor('orange')
      } else if (this.type === 'error') {
        _result = this.$setColor('red')
      }
      return _result
    },
    realMode() {
      var _result = ''
      if (this.type === 'success' || this.type === 'info' || this.type === 'waring' || this.type === 'error') {
        _result = 'dark'
      } else {
        _result = this.mode
      }
      return _result
    },
    btnStyle() {
      var result = {
        'font-size': this.realSize / 16 + 'rem',
        opacity: this.disabled || this.loading ? 0.48 : 1,
        width: !!this.sq ? '1em' : this.width,
        padding: !!this.sq ? '0' : '0 0.5em',
        'border-color': this.status === 1 || this.status === 2 ? this.realColor : this.$setColor('black,l,160'),
        'background-color': 'none',
        color: this.status === 1 || this.status === 2 ? this.realColor : this.$setColor('black'),
        'border-radius': this.radius == 'fillet' ? '0.125em' : this.radius == 'pill' ? '0.5em' : '',
        'box-shadow': this.status === 2 ? '0 0 0.25em rgba(0,0,0,0.24)' : 'none'
      }

      if (this.realMode === 'light' || this.realMode === 'dark') {
        Object.assign(result, {
          'border-color': this.realColor,
          color: this.realMode === 'dark' ? 'white' : this.status === 1 || this.status === 2 ? 'white' : this.realColor
        })
      } else if (this.realMode === 'link') {
        Object.assign(result, {
          color: this.realColor,
          'border-color': 'rgba(255,255,255,0)',
          'box-shadow': 0,
          'text-decoration': this.status === 1 ? 'underline' : 'none'
        })
      }

      return result
    },
    maskStyle() {
      var result = {
        opacity: this.status == 1 ? 0.12 : this.status == 2 ? 0.32 : 0,
        'background-color': this.realColor
      }

      if (this.realMode === 'light') {
        Object.assign(result, {
          opacity: this.status == 1 ? 1 : this.status == 2 ? 0.8 : 0
        })
      } else if (this.realMode === 'dark') {
        Object.assign(result, {
          opacity: this.status == 1 ? 0.8 : this.status == 2 ? 1 : 1
        })
      } else if (this.realMode === 'link') {
        Object.assign(result, {
          opacity: 0
        })
      }
      return result
    }
  },
  methods: {
    onClick(e) {
      var _t = this
      if (!_t.disabled && !_t.loading) {
        _t.$emit('click')
      }
    },
    onTouchstart(e) {
      var _t = this
      if (!_t.disabled && !_t.loading) {
        _t.status = 2
        _t.$emit('touchstart')
      }
    },
    onTouchend(e) {
      var _t = this
      if (!_t.disabled && !_t.loading) {
        _t.status = 0
        _t.$emit('touchend')
      }
    },
    onMouseOver(e) {
      var _t = this
      if (!_t.disabled && !_t.loading) {
        _t.status = 1
      }
    },
    onMousedown(e) {
      var _t = this
      if (!_t.disabled && !_t.loading) {
        _t.status = 2
      }
    },
    onMouseup(e) {
      var _t = this
      if (!_t.disabled && !_t.loading) {
        _t.status = 1
      }
    },
    onMouseLeave(e) {
      var _t = this
      if (!_t.disabled && !_t.loading) {
        _t.status = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.bui-btn {
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  height: 1em;
  line-height: 1em;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1px;
  position: relative;
}
.bui-btn-icon {
  overflow: hidden;
  display: inline-block;
  transition: width 0.3s;
  .bui-btn-unsq & {
    float: left;
    margin-right: 0.25em;
  }
  .bui-btn-sq & {
  }
}
.bui-btn-bg {
  transition: opacity 0.3s;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
