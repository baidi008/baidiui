<template>
  <div class="bui_scrollbar" :style="{ transition: 'none' }">
    <div class="bui-masonry" :style="{ ...boxStyle }">
      <template v-for="(i, index) in $slots['default']">
        <div :key="`item-${index}`" :class="`bui-masonry-item ${i.data.staticClass}`" :style="{ ...itemStyle }">
          <bui-render :vnode="i.children"></bui-render>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bui-masonry',
  data() {
    return {
      boxW: 0
    }
  },
  props: {
    margin: { default: '1rem' },
    columns: {
      default: () => [
        { min: 480, columns: 2 },
        { min: 768, columns: 3 },
        { min: 992, columns: 4 },
        { min: 1200, columns: 5 }
      ]
    },
    height: { default: 'auto' }
  },
  computed: {
    boxStyle() {
      let columns = 1
      if (this.$isArray(this.columns, true)) {
        let array = JSON.parse(JSON.stringify(this.columns))
        array.sort((a, b) => {
          return a.min - b.min
        })
        if (this.boxW < array[0].min) {
          columns = 1
        } else if (this.boxW > array[array.length - 1].min) {
          columns = array[array.length - 1].columns
        } else {
          let current = array.filter((res) => this.boxW > res.min)
          if (current[current.length - 1]) {
            columns = current[current.length - 1].columns
          }
        }
      } else if (!isNaN(Number(this.columns))) {
        columns = this.columns
      }
      let result = {
        columns: columns,
        columnGap: this.margin
      }
      return result
    },
    itemStyle() {
      let result = { marginBottom: this.margin }
      return result
    }
  },
  mounted() {
    this.$set(this, 'boxW', this.$el.clientWidth)
    this.$resize($(this.$el), (res) => {
      this.$set(this, 'boxW', res.width)
    })
  }
}
</script>

<style lang="scss" scope>
  .bui-masonry {
    overflow: visible !important;
    & > .bui-masonry-item {
      width: 100%;
      break-inside: avoid;
    }
  }
</style>