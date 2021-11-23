<template>
  <div
    @mousemove="isHover = true"
    @mouseleave="isHover = false"
    :class="['bui-slider-box', direction === 'v' ? 'bui-slider-box-v' : 'bui-slider-box-h']"
    :style="{ ...computedStyle.box }"
  >
    <!-- 进度条 -->
    <div class="bui-slider-wrap bui_unselect bui_cursor_p" @mousedown="mousedown" @mouseup="mouseup($event)">
      <!-- 进度条背景 -->
      <div class="bui-slider-bg bui_round">
        <div class="bui-slider-bar bui_round" :style="{ ...computedStyle.bar }"></div>
      </div>
      <!-- 进度条背景 -->
      <!-- 标记控件 -->
      <div class="bui-slider-item bui_round bui_shadow bui_bgc_white" :style="{ ...computedStyle.item }">
        <bui-drop class="bui_block" style="width: 100%; height: 100%" trigger="" :visible="tipsVisible" position="top" :color="$setColor('black,l,48')">
          <template slot="drop">
            <p
              class="bui_ta_c bui_fc_white"
              :style="{
                padding: `0 ${(realSize / 16) * 0.5 > 0.75 ? (realSize / 16) * 0.5 : 0.752}rem`,
                fontSize: `${(realSize / 16) * 0.5 > 0.75 ? (realSize / 16) * 0.5 : 0.752}rem`
              }"
            >
              {{ value }}
            </p>
          </template>
        </bui-drop>
      </div>
      <!-- 标记控件 -->
      <!-- 刻度标记 -->
      <template>
        <template v-for="(i, index) in computedMark.filter((res, index) => res.value !== min && res.value !== max)">
          <div :key="`step-${index}`" class="bui-slider-step bui_round bui_bgc_white" :style="{ ...computedMarkStyle(i).step }"></div>
        </template>
      </template>
      <template v-for="(i, index) in computedMark">
        <div
          class="bui-slider-mark bui_cursor_p bui_fc_silver_d bui_fc_silver_l"
          :class="[i.value === value ? 'bui_strong' : '']"
          :key="`mark-${index}`"
          :style="{ ...computedMarkStyle(i).mark }"
          @click="$emit('model', i.value)"
        >
          {{ i.label }}
        </div>
      </template>
      <!-- 刻度标记 -->
    </div>
    <!-- 进度条 -->
  </div>
</template>

<script>
export default {
  name: 'bui-slider',
  data() {
    return {
      isHover: false,
      isAction: false
    }
  },
  props: {
    direction: { default: 'h' },
    block: { type: Boolean, default: false },
    width: { default: '' },
    height: { default: '' },
    size: { default: 16 },
    value: { default: 0 },
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    type: { default: '' },
    mark: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
    },
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
    arrays() {
      let result = []
      const range = Number(this.max) - Number(this.min)
      for (let i = 0; i < range / Number(this.step); i++) {
        result.push({ value: i * Number(this.step) + Number(this.min), percent: this.getPercent(i * Number(this.step) + Number(this.min)) })
      }
      return result
    },
    tipsVisible() {
      let result = false
      if (this.isAction) {
        result = true
      } else {
        if (this.isHover) {
          result = true
        } else {
          result = false
        }
      }
      return result
    },
    computedMark() {
      let result = []
      if (this.$isArray(this.mark, true)) {
        result = this.mark.map((res) =>
          JSON.parse(
            JSON.stringify({
              label: !!res.label ? res.label : res,
              value: !isNaN(res.value) ? res.value : res,
              color: !!res.color ? res.color : null,
              percent: !!res.value ? this.getPercent(Number(res.value)) : this.getPercent(res)
            })
          )
        )
        result = result.filter((res) => res.value >= this.min && res.value <= this.max)
      }
      return result
    },
    computedStyle() {
      let result = { box: { fontSize: `${this.realSize / 16 / 2}rem` }, bar: { backgroundColor: this.realColor }, item: { 'border-color': this.realColor } }
      if (this.direction === 'h') {
        result = {
          box: {
            ...result.box,
            width: this.block ? '100%' : this.width ? this.width : (this.realSize / 16) * 8 + 'rem'
          },

          bar: { ...result.bar, width: `${this.getPercent(this.value)}%` },
          item: { ...result.item, left: `${this.getPercent(this.value)}%` }
        }
      } else if (this.direction === 'v') {
        result = {
          box: {
            ...result.box,
            width: 'auto',
            height: this.height ? this.height : (this.realSize / 16) * 8 + 'rem'
          },
          bg: {
            width: '0.4em',
            height: '100%'
          },
          bar: { ...result.bar, height: `${this.getPercent(this.value)}%` },
          item: { ...result.item, top: 'auto', bottom: `${this.getPercent(this.value)}%` }
        }
      }
      return result
    },
    computedMarkStyle() {
      return function (res) {
        let result = {
          step: {},
          mark: {
            'font-size': `${(this.realSize / 16) * 0.5}rem`,
            color: res.color ? `${res.color} !important` : res.value === this.value ? this.realColor + ' !important' : ''
          }
        }
        if (this.direction === 'h') {
          result = {
            step: { left: `${res.percent}%` },
            mark: {
              ...result.mark,
              left: `${res.percent}%`
            }
          }
        } else if (this.direction === 'v') {
          result = {
            step: { bottom: `${res.percent}%` },
            mark: {
              ...result.mark,
              bottom: `${res.percent}%`
            }
          }
        }
        return result
      }
    }
  },
  model: {
    prop: 'value',
    event: 'model'
  },
  mounted() {
    $('html').bind({
      mousemove: (e) => {
        if (this.isAction) {
          this.setPercent(this.direction === 'h' ? e.pageX : this.direction === 'v' ? e.pageY : 0)
        }
      },
      mouseup: () => {
        this.$set(this, 'isAction', false)
      }
    })
  },
  methods: {
    getPercent(value) {
      let result = 0
      if (typeof value === 'number') {
        const range = Number(this.max) - Number(this.min)
        result = ((Number(value) - Number(this.min)) / range) * 100
      }
      return result
    },
    mousedown() {
      this.$set(this, 'isAction', true)
    },
    mouseup(e) {
      this.setPercent(this.direction === 'h' ? e.pageX : this.direction === 'v' ? e.pageY : 0)
    },
    setPercent(xy) {
      const el = $(this.$el).find('.bui-slider-wrap')
      let mousePrecent = 0
      if (this.direction === 'h') {
        mousePrecent = ((xy - el.offset().left) / el.width()) * 100
      } else if (this.direction === 'v') {
        mousePrecent = ((el.offset().top + el.height() - xy) / el.height()) * 100
      }
      let current = this.arrays.filter((res) => res.percent > mousePrecent)[0]
      if (current) {
        this.$emit('model', Number(current.value))
      } else {
        this.$emit('model', Number(this.max))
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(nv) {
        if (isNaN(nv) || nv < Number(this.min)) {
          this.$emit('model', Number(this.min))
        } else if (nv > Number(this.max)) {
          this.$emit('model', Number(this.max))
        }
        this.$emit('change', this.value)
      }
    },
    max: {
      handler(nv) {
        if (this.value > nv) {
          this.$emit('model', Number(this.max))
        }
      }
    },
    min: {
      handler(nv) {
        if (this.value < nv) {
          this.$emit('model', Number(this.min))
        }
      }
    }
  }
}
</script>

<style lang="scss" scope>
  .bui-slider-box {
    display: inline-block;
    vertical-align: middle;
    &.bui-slider-box-h {
      .bui-slider-wrap {
        padding: 0.8em 0;
      }
      .bui-slider-bg {
        width: 100%;
        height: 0.4em;
      }
      .bui-slider-bar {
        height: 100%;
        left: 0;
        top: 0;
      }
      .bui-slider-item {
        margin: 0.5em 0 0 -0.5em;
      }
      .bui-slider-step {
        top: 0.8em;
        right: auto;
        transform: translateX(-50%);
      }
      .bui-slider-mark {
        top: 1.2em;
        transform: translateX(-50%);
      }
    }
    &.bui-slider-box-v {
      .bui-slider-wrap {
        padding: 0 0.8em;
      }
      .bui-slider-bg {
        height: 100%;
        width: 0.4em;
      }
      .bui-slider-bar {
        left: 0;
        bottom: 0;
        width: 100%;
      }
      .bui-slider-item {
        margin: 0 0 -0.5em 0.5em;
      }
      .bui-slider-step {
        left: 0.8em;
        top: auto;
        transform: translateY(50%);
      }
      .bui-slider-mark {
        top: auto;
        left: 1.8em;
        transform: translateY(50%);
      }
    }
  }
  .bui-slider-wrap {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    & .bui-slider-bg {
      position: relative;
      background-color: rgba(0, 0, 0, 0.06);
    }
    & .bui-slider-bar {
      position: absolute;
      height: 0.4em;
    }
    & .bui-slider-item {
      left: 0;
      top: 0;
      display: block;
      position: absolute;
      z-index: 1;
      width: 1em;
      height: 1em;
      border-style: solid;
      border-width: 0.2em;
    }
    & .bui-slider-step {
      position: absolute;
      width: 0.4em;
      height: 0.4em;
    }
  }
  .bui-slider-mark {
    position: absolute;
  }
</style>