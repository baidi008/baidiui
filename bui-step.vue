<template>
  <div :class="['bui-step', `bui-step-${direction}`]" :style="{ 'font-size': realSize / 16 + 'rem' }">
    <template v-for="(i, index) in computedData">
      <div :class="['bui-step-item', index >= computedData.length - 1 ? 'bui-step-item-last' : '']" :key="`item-${index}`">
        <div class="bui-step-line" :style="computedStyle(index).line"></div>
        <div class="bui_flex_row bui_vm bui_bgc_white">
          <div class="bui_flex_row_l">
            <div class="bui-step-icon" :style="computedStyle(index).icon">
              <bui-icon icon="check" v-if="index < current"></bui-icon>
              <template v-else>
                <div class="bui-step-num">{{ index + 1 }}</div>
              </template>
            </div>
          </div>
          <div class="bui_flex_row_c bui_ta_l">
            <p class="bui-step-title">{{ i.title }}</p>
            <p class="bui-step-info">{{ i.info }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'bui-step',
  data() {
    return {}
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    color: { default: null },
    colorname: { default: 'turquoise' },
    sort: { default: 'desc' },
    size: { default: 16 },
    current: { default: 1 },
    direction: { default: 'h' }
  },
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    realSize() {
      let result = 16
      if (!isNaN(this.size)) {
        if (this.size < 16) {
          result = 16
        } else if (this.size > 48) {
          result = 48
        } else {
          result = this.size
        }
      }
      return result
    },
    computedData() {
      let result = []
      if (this.$isArray(this.data, true)) {
        result = JSON.parse(JSON.stringify(this.data))
      }

      if (this.sort === 'desc') {
        result = result.sort((a, b) => {
          return this.$moment(b.time) - this.$moment(a.time)
        })
      } else {
        result = result.sort((a, b) => {
          return this.$moment(a.time) - this.$moment(b.time)
        })
      }
      return result
    },
    computedStyle() {
      return function (index) {
        let result = { icon: { borderColor: this.$getRGBA('white', 'd', 50), color: this.$getRGBA('white', 'd', 50) }, line: { backgroundColor: this.$getRGBA('white', 'd', 50) } }
        if (this.current === index) {
          result.icon = {
            borderColor: this.realColor,
            color: this.realColor
          }
        } else if (this.current > index) {
          result.icon = {
            borderColor: this.realColor,
            backgroundColor: this.realColor,
            color: 'white'
          }
          result.line = {
            backgroundColor: this.realColor
          }
        }
        return result
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scope>
  .bui-step {
    display: block;
    overflow: hidden;
    & .bui-step-item {
      & .bui_flex_row_l {
        padding-right: 0.5em;
      }
      & .bui-step-icon {
        float: left;
        border-width: 0.1em;
        width: 2em;
        height: 2em;
        line-height: 1.8em;
        overflow: hidden;
        position: relative;
        border-style: solid;
        border-radius: 100%;
        & .bi,
        & .bui-step-num {
          text-align: center;
          font-size: 1em !important;
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          line-height: inherit !important;
        }
      }

      & .bui-step-title {
        font-size: 1em;
      }
      & .bui-step-info {
        font-size: 0.75em;
        opacity: 0.64;
      }
    }
    // 横向
    &.bui-step-h {
      text-align: center;
      white-space: nowrap;
      & .bui-step-item {
        position: relative;
        display: inline-block;
        padding-right: 3em;
        &.bui-step-item-last {
          padding-right: 0;
          & .bui-step-line {
            display: none;
          }
        }
        & .bui_flex_row {
          position: relative;
          z-index: 1;
          padding: 0 1em;
        }
        & .bui-step-line {
          z-index: 1;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 0.05em;
          min-height: 1px;
        }
      }
    }
    // 纵向
    &.bui-step-v {
      & .bui-step-item {
        position: relative;
        padding-bottom: 4em;
        &.bui-step-item-last {
          padding-bottom: 0;
          & .bui-step-line {
            display: none;
          }
        }
        & .bui_flex_row {
          position: relative;
          z-index: 1;
          padding: 0 0;
        }
        & .bui-step-line {
          z-index: 1;
          position: absolute;
          left: 1em;
          top: 0;
          transform: translateX(-50%);
          width: 0.05em;
          min-width: 1px;
          height: 100%;
        }
      }
    }
  }
</style>