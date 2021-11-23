<template>
  <div class="bui-sup-wrap">
    <div class="bui-sup-item bui_unselect" :style="{ ...itemStyle }" v-if="!hide">
      <template v-if="mode !== 'dot'">
        <template v-if="icon">
          <bui-icon :icon="icon" style="margin-top: -6px; margin-left: -2.73px; margin-right: -2.73px; height: 1em; width: 1em; overflow: hidden"></bui-icon>
        </template>
        <template v-if="label">
          <span> {{ label }}</span>
        </template>
      </template>
    </div>
    <slot name="default"></slot>
  </div>
</template>
<script>
export default {
  name: 'bui-sup',
  props: {
    label: { default: null },
    type: { default: null },
    size: { default: 20 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    icon: { default: '' },
    mode: { default: '' },
    hide: { default: false },
    radius: { default: 'fillet' }
  },
  computed: {
    realColor() {
      let result = ''
      if (this.type !== 'success' && this.type !== 'info' && this.type !== 'waring' && this.type !== 'error') {
        result = this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
      } else if (this.type === 'success') {
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
    itemStyle() {
      let result = {
        borderRadius: this.radius === 'fillet' ? '0.5em' : this.radius === 'pill' ? '1em' : 0,
        backgroundColor: this.realColor,
        color: 'white'
      }
      // 角标or徽章
      if (this.$isArray(this.$slots.default, true)) {
        result = { ...result, position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%) scale(' + Number(this.size) / 20 + ')', zIndex: 1 }
      } else {
        result = { ...result, transform: 'scale(' + Number(this.size) / 20 + ')' }
      }
      // 是否dot模式
      if (this.mode === 'dot' || (!this.label && !this.icon)) {
        result = { ...result, width: '1em', height: '1em' }
      } else {
        result = { ...result, padding: '0 0.56em' }
      }

      return result
    }
  }
}
</script>
<style lang="scss" scoped>
  .bui-sup-wrap {
    overflow: visible;
    display: inline-block;
    position: relative;
  }
  .bui-sup-item {
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    white-space: nowrap;
    display: block;
    transition: all 0.3s;
  }
</style>