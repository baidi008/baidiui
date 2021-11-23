<template>
  <div class="bui-progress bui_block bui_radius" :style="{ height: size / 16 + 'rem' }">
    <div
      :class="['bui-progress-item', 'bui_fc_white', 'bui_radius', animation ? 'animation' : '']"
      :style="{
        width: barWidth * 100 + '%',
        height: size / 16 + 'rem',
        'line-height': size / 16 + 'rem',
        'font-size': size / 16 / 2.4 + 'rem',
        'background-color': realColor
      }"
    >
      <template v-if="size >= 24">
        <span v-text="parseInt(value * 100)"></span>
        <span>%</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    animation: { type: Boolean, default: false },
    value: { default: 0 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    size: { default: 24 },
    fixed: { default: 2 }
  },
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    barWidth() {
      let result = 0.05
      if (this.value >= 1) {
        result = 1
      } else if (this.value > 0.05 && this.value < 1) {
        result = this.value
      } else {
        result = 0.05
      }
      return result
    }
  },
  methods: {}
}
</script>

<style lang="scss" scope>
  .bui-progress {
    overflow: hidden;
    position: relative;
    background-color: rgba(0, 0, 0, 0.12) !important;
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.24);
    transition: all 0.3s;

    & .bui-progress-item {
      position: relative;
      transition: all 0.3s;
      display: block;
      font-style: normal;
      text-align: center;
      height: 1rem * 24/16;
      line-height: 1rem * 24/16;
      box-shadow: inset 0 0 1rem * 6/16 rgba(0, 0, 0, 0.48);
      position: relative;
      overflow: hidden;
      position: relative;
      overflow: hidden;
      &:before {
        content: '';
        translate: all;
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-image: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0rem, rgba(255, 255, 255, 0.12) 1rem, rgba(255, 255, 255, 0) 1rem, rgba(255, 255, 255, 0) 2rem);
      }
      &.animation::before {
        animation: bg 1s infinite linear normal;
      }
    }
  }
  @keyframes bg {
    0% {
      left: -2.8rem;
    }
    100% {
      left: 0%;
    }
  }
</style>
