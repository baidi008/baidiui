<template>
  <div
    :style="{
      display: 'inline-block',
      'font-size': realSize / 16 + 'rem',
      'white-space': 'nowrap',
      height: realSize / 16 + 'rem',
      'line-height': realSize / 16 + 'rem',
      padding: '0 0.32em',
      'border-radius': radius == 'round' ? (size / 16) * 0.5 + 'rem' : (size / 16) * 0.25 + 'rem',
      'background-color': realColor,
      color: '#fff'
    }"
  >
    <p class="" :style="{ 'white-space': 'nowrap', 'font-size': realSize >= 32 ? '0.4em' : '12px' }">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      realColor: null
    }
  },
  props: {
    value: { default: 'undefined' },
    color: {
      default: false
    },
    colorname: {
      default: 'turquoise'
    },
    size: { default: 16 },
    radius: { default: 'radius' }
  },
  computed: {
    realSize() {
      return Number(this.size) <= 16 ? 16 : Number(this.size) >= 64 ? 64 : Number(this.size)
    }
  },
  mounted() {},
  watch: {
    $props: {
      handler(nv, ov) {
        var _t = this
        if (!_t.color) {
          _t.$set(_t, 'realColor', _t.$setColor(_t.colorname))
        } else {
          _t.$set(_t, 'realColor', _t.color)
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style></style>
