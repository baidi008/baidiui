<template>
  <bui-ratio
    ratio="1:1"
    :style="{
      width: typeof width == 'number' ? width + 'px' : width,
      display: 'inline-block',
      position: 'relative'
    }"
    @change="returnheight = $event.height"
  >
    <div
      v-if="returnheight >= 48"
      class="bui_ta_c"
      :style="{
        position: 'absolute',
        width: '100%',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      }"
    >
      <template v-if="$isArray($slots['default'], true)">
        <slot name="default"></slot>
      </template>
      <template v-else>
        <div class="bui_line_clamp_1 bui_inline bui_vm">
          <span v-text="parseInt(value * 100)" :style="{ 'font-size': (returnheight / 16) * 0.24 + 'rem', color: realColor }"></span>
          <span :style="{ 'font-size': (returnheight / 16) * 0.16 + 'rem', color: realColor }">%</span>
        </div>
      </template>
    </div>
    <svg viewBox="0 0 100 100">
      <path
        :d="computedD"
        stroke="#e7e7e7"
        :stroke-width="weight"
        fill="none"
        class="el-progress-circle__track"
        style="stroke-dasharray: 295.31px, 295.31px; stroke-dashoffset: 0px"
      ></path>
      <path
        :d="computedD"
        :stroke="realColor"
        fill="none"
        stroke-linecap="round"
        :stroke-width="weight"
        class="el-progress-circle__path"
        :style="{
          'stroke-dasharray': 295.31 * value + 'px, 295.31px',
          'stroke-dashoffset': '0px',
          transition: 'stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s'
        }"
      ></path>
    </svg>
  </bui-ratio>
</template>

<script>
export default {
  data() {
    return {
      barWidth: 0,
      returnheight: 0
    }
  },
  props: {
    value: { default: 0 },
    weight: { default: 8 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    fixed: { default: 1 },
    width: { default: '8rem' }
  },
  mounted() {},
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    computedD() {
      let result = `M 50 50 m 0 -${50 - this.weight / 2} a ${50 - this.weight / 2} ${50 - this.weight / 2} 0 1 1 0 ${100 - this.weight} a ${50 - this.weight / 2} ${
        50 - this.weight / 2
      } 0 1 1 0 -${100 - this.weight}`

      return result
    }
  }
}
</script>

<style></style>
