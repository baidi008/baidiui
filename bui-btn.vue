<template>
  <button
    :class="[
      'bui-btn',
      'bui_unselect',
      sq ? 'bui-btn-sq' : '',
      block ? 'bui_block' : 'bui_inline_block',
      disabled || loading ? 'bui-btn-disabled' : '',
      Number(status) === 2 ? 'bui-btn-active' : '',
      `bui_radius_${radius}`,
      `bui-btn-${mode}`
    ]"
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
      class="bui-btn-wrap bui_inline bui_vm"
      :style="{
        fontSize: realSize >= 32 ? '0.4em' : '12px'
      }"
    >
      <bui-icon icon="autorenew" spin :style="{ opacity: 0.64 }" v-if="loading"></bui-icon>
      <template v-if="!!icon">
        <bui-icon :icon="icon"></bui-icon>
      </template>
      <template v-if="!!faIcon">
        {{ sq }}
        <bui-fa-icon :icon="faIcon"></bui-fa-icon>
      </template>
      <template v-if="!sq"> <slot></slot></template>
      <template v-else>
        <slot v-if="!loading"></slot>
      </template>
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
    icon: { default: false },
    faIcon: { default: false },
    href: { default: 'javascript:;' },
    target: { default: null },
    radius: { default: 'fillet' },
    sq: { type: Boolean, default: false },
    block: { type: Boolean, default: false }
  },
  computed: {
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
    },
    realColor() {
      let result = this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
      if (this.type === 'success') {
        result = this.$setColor('green')
      } else if (this.type === 'info') {
        result = this.$setColor('blue')
      } else if (this.type === 'waring') {
        result = this.$setColor('orange')
      } else if (this.type === 'error') {
        result = this.$setColor('red')
      }
      return result
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
        fontSize: this.realSize / 16 + 'rem',
        'border-color': this.status === 1 || this.status === 2 ? this.realColor : this.$setColor('black,l,160'),
        'background-color': 'none',
        color: this.status === 1 || this.status === 2 ? this.realColor : this.$setColor('black')
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
      if (!this.disabled && !this.loading) {
        this.$emit('click')
      }
    },
    onTouchstart(e) {
      if (!this.disabled && !this.loading) {
        this.status = 2
        this.$emit('touchstart')
      }
    },
    onTouchend(e) {
      if (!this.disabled && !this.loading) {
        this.status = 0
        this.$emit('touchend')
      }
    },
    onMouseOver(e) {
      if (!this.disabled && !this.loading) {
        this.status = 1
      }
    },
    onMousedown(e) {
      if (!this.disabled && !this.loading) {
        this.status = 2
      }
    },
    onMouseup(e) {
      if (!this.disabled && !this.loading) {
        this.status = 1
      }
    },
    onMouseLeave(e) {
      if (!this.disabled && !this.loading) {
        this.status = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  .bui-btn {
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s;
    height: 1em;
    line-height: 1em;
    box-sizing: border-box;
    border-style: solid;
    border-width: 1px;
    position: relative;
    padding: 0 0.5em;
    &.bui-btn-disabled {
      opacity: 0.48;
    }
    &.bui-btn-sq {
      padding: 0;
      width: 1em !important;
    }
    &.bui-btn-active {
      box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.24);
      &.bui-btn-link {
        box-shadow: none;
      }
    }
    .bui-btn-wrap {
      margin-top: -1px;
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      left: 0;
      top: 0;
      z-index: 1;
      white-space: nowrap;
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
  }
</style>
