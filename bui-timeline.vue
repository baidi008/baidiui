<template>
  <div class="bui-timeline" :style="{ fontSize: `${realSize / 16}rem` }">
    <template v-for="(i, index) in computedData">
      <div class="bui-timeline-item" :key="`item-${index}`">
        <div class="bui-timeline-icon bui_bgc_silver_l" :style="{ backgroundColor: $getRGBA(i.color) }">
          <div v-if="i.icon" :class="['bi', `bi-${i.icon}`, 'bui_fc_white']"></div>
        </div>
        <div class="bui-timeline-bar bui_bgc_silver_l" v-if="index < computedData.length - 1"></div>
        <div class="bui-timeline-body">
          <template v-if="!!$scopedSlots.default">
            <div style="padding-top: 0.25em"><slot :row="i" :list="computedData" :index="index" :size="size" :sort="sort"></slot></div>
          </template>
          <template v-else>
            <div class="bui-timeline-body-time">
              <p>{{ $moment(i.time).format(format) }}</p>
            </div>
            <div class="bui-timeline-body-label">
              {{ i.label }}
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'bui-timeline',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    format: { default: 'YYYY-MM-DD HH:mm:ss' },
    sort: { default: 'desc' },
    size: { default: 16 }
  },
  mounted() {},
  computed: {
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
    }
  }
}
</script>

<style lang="scss" scope>
  .bui-timeline {
    display: block;
    overflow: hidden;
  }
  .bui-timeline-item {
    position: relative;
    padding-bottom: 1.5em;
    & .bui-timeline-icon {
      text-align: center;
      position: relative;
      z-index: 1;
      float: left;
      width: 1em;
      height: 1em;
      line-height: 1em;
      border-radius: 1em;
      margin: 0.5em;
      & .bi {
        font-size: 0.8em;
      }
    }
    & .bui-timeline-bar {
      z-index: 0;
      position: absolute;
      left: 0.9em;
      top: 0.8em;
      height: 100%;
      width: 0.2em;
    }
  }

  .bui-timeline-body {
    padding-left: 2.5em;
    & .bui-timeline-body-time {
      line-height: 2em;
      overflow: hidden;
      & > p {
        font-size: 0.75em;
        color: rgba(0, 0, 0, 0.48);
      }
    }
    & .bui-timeline-body-label {
      font-size: 0.875em;
    }
  }
</style>