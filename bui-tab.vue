<template>
  <dl :class="layout.boxDl" style="overflow: hidden">
    <div :class="[layout.boxDt]">
      <div :class="[layout.navBox, 'bui_flex_row bui_vm bui_unselect']" style="height: 100%">
        <div :class="[layout.prev, 'bui_cursor_p', 'bui_bgc_silver_l_h', 'bui_p_6']" v-if="showArrow" @click="handleArrowClick('prev')">
          <bui-icon :icon="`keyboard-arrow-${direction === 'h' ? 'left' : 'up'}`"></bui-icon>
        </div>
        <div :class="[layout.navNext, 'bui_cursor_p', 'bui_bgc_silver_l_h', 'bui_p_6']" v-if="showArrow" @click="handleArrowClick('next')">
          <bui-icon :icon="`keyboard-arrow-${direction === 'h' ? 'right' : 'down'}`"></bui-icon>
        </div>
        <div :class="[layout.navBody]" style="overflow: hidden">
          <div :class="['bui-tab-dt', direction === 'h' ? 'bui_inline' : '']" style="height: 100%">
            <template v-for="(data, index) in tabs($slots)">
              <div :key="index">
                <div
                  :draggable="true"
                  @dragstart="handleDragStart(index)"
                  @dragenter="handleDragEnter(index)"
                  @dragend="handleDragEnd(index)"
                  :class="['bui_cursor_p', active != index ? 'bui_fc_black_f_h' : 'bui-tab-active', direction === 'h' ? 'bui_inline_block' : '', 'bui_ta_c']"
                  @click=";(active = index), $emit('change', index)"
                  :style="computedStyle(index).item"
                >
                  {{ data.label }}
                  <div :style="computedStyle(index).itemBar"></div>
                </div>

                <div :class="[direction === 'h' ? 'bui_inline_block' : '']" :style="computedStyle(index).itemDrag"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div :class="[layout.boxDD, 'bui-tab-dd', 'bui_scrollbar']">
      <div class="bui-tab-body">
        <template v-for="(item, index) in tabs($slots)">
          <div :key="index" v-if="index === active"><bui-render :vnode="item.vnode"></bui-render></div>
        </template>
      </div>
    </div>
  </dl>
</template>

<script>
export default {
  data() {
    return { nav: [], active: null, showArrow: false, overflowWidth: 0, drag: { width: 0, height: 0, from: null, to: null }, bodySize: { w: 0, h: 0 } }
  },
  props: {
    size: { default: 32 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    index: {
      default() {
        return 0
      }
    },
    positions: {
      default: 'top'
    },
    edit: {
      default: false
    }
  },
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    tabs() {
      return function (slots) {
        let result = []
        slots.default.forEach((res) => {
          if (!res.data.attrs.hidden) {
            result.push({ label: res.data.attrs.name, vnode: res.children })
          }
        })
        return result
      }
    },
    direction() {
      let result = ''
      if (this.positions === 'top' || this.positions === 'bottom') {
        result = 'h'
      } else if (this.positions === 'left' || this.positions === 'right') {
        result = 'v'
      }
      return result
    },
    //处理方向
    layout() {
      let result = { boxDl: '', boxDt: '', boxDD: '', navBox: '', navPrev: '', navBody: '', navNext: '' }
      if (this.positions == 'top') {
        result = {
          boxDl: 'bui_flex_column',
          boxDt: 'bui_flex_column_t',
          boxDD: 'bui_flex_column_m',
          navBox: 'bui_flex_row',
          navPrev: 'bui_flex_row_l',
          navBody: 'bui_flex_row_c',
          navNext: 'bui_flex_row_r'
        }
      } else if (this.positions == 'bottom') {
        result = {
          boxDl: 'bui_flex_column',
          boxDt: 'bui_flex_column_b',
          boxDD: 'bui_flex_column_m',
          navBox: 'bui_flex_row',
          navPrev: 'bui_flex_row_l',
          navBody: 'bui_flex_row_c',
          navNext: 'bui_flex_row_r'
        }
      } else if (this.positions == 'left') {
        result = {
          boxDl: 'bui_flex_row',
          boxDt: 'bui_flex_row_l',
          boxDD: 'bui_flex_row_c',
          navBox: 'bui_flex_column',
          navPrev: 'bui_flex_column_t',
          navBody: 'bui_flex_column_m',
          navNext: 'bui_flex_column_b'
        }
      } else if (this.positions == 'right') {
        result = {
          boxDl: 'bui_flex_row',
          boxDt: 'bui_flex_row_r',
          boxDD: 'bui_flex_row_c',
          navBox: 'bui_flex_column',
          navPrev: 'bui_flex_column_t',
          navBody: 'bui_flex_column_m',
          navNext: 'bui_flex_column_b'
        }
      }
      return result
    },
    computedStyle(index) {
      return function (index) {
        let result = {
          item: {
            position: 'relative',
            'font-size': (this.size / 16) * 0.48 + 'rem',
            padding: (this.size / 16) * 0.25 + 'rem ' + (this.size / 16) * 0.5 + 'rem',
            color: index == this.active ? this.realColor : null
          },
          itemBar: {
            height: (this.size / 16) * 0.0625 + 'rem',
            position: 'absolute',
            'background-color': this.realColor,
            width: this.active == index ? '100%' : 0,
            bottom: this.positions == 'bottom' ? 'auto' : 0,
            top: this.positions == 'bottom' ? 0 : 'auto',
            left: this.active == index ? 0 : '50%',
            opacity: this.active == index ? 1 : 0,
            transition: 'all 0.3s'
          },
          itemDrag: {
            width: this.direction === 'h' ? (this.drag.from !== this.drag.to && this.drag.to === index ? this.drag.width + 'px' : '0') : '0',
            height: this.direction === 'v' ? (this.drag.from !== this.drag.to && this.drag.to === index ? this.drag.height + 'px' : '0') : '0',
            transition: 'width 0.3s,height 0.3s'
          }
        }
        return result
      }
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 不间断监听
      setInterval(() => {
        // 是否显示箭头
        const scrollBox = $(this.$el).find('.bui-tab-dt')
        const items = scrollBox.children().toArray()
        if (this.direction === 'h') {
          if (scrollBox.width() < this.$getArrayTotal(items, 'clientWidth')) {
            this.showArrow = true
          } else {
            this.showArrow = false
          }
        } else if (this.direction === 'v') {
          if (scrollBox.height() < this.$getArrayTotal(items, 'clientHeight')) {
            this.showArrow = true
          } else {
            this.showArrow = true
          }
        }
        // 获取主显示区域尺寸
        const body = $(this.$el).find('.bui-tab-body')
        this.$set(this, 'bodySize', { w: body[0].clientWidth, h: body[0].clientHeight })
      })
    },

    // 点击箭头
    handleArrowClick(action) {
      const step = 5
      if (this.showArrow) {
        if (action === 'prev') {
          this.active = this.active - step <= 0 ? 0 : this.active - step
        } else if (action === 'next') {
          this.active = this.active + step >= this.tabs(this.$slots).length - 1 ? this.tabs(this.$slots).length - 1 : this.active + step
        }
      }
    },
    // 拖动
    handleDragStart(index) {
      this.drag.from = index
      const dom = $(this.$el).find('.bui-tab-dt').children().eq(index)
      this.drag.width = dom.width() + Number(dom.css('padding-left').replace('px', '') * 2)
      this.drag.height = dom.height() + Number(dom.css('padding-top').replace('px', '') * 2)
    },
    handleDragEnter(index) {
      this.drag.to = index
    },
    handleDragEnd(index) {
      if (this.drag.from !== this.drag.to) {
        const current = this.$slots.default[index]
        this.$slots.default = this.$slots.default.filter((res) => res.data.attrs.name !== current.data.attrs.name)

        const endIndex = this.drag.from > this.drag.to ? this.drag.to + 1 : this.drag.to

        this.$slots.default.splice(endIndex, 0, current)
        this.active = null
        this.active = endIndex
      }
      this.drag = { from: null, to: null, width: 0 }
    }
  },
  watch: {
    index: {
      immediate: true,
      handler(nv) {
        this.$set(this, 'active', nv)
      }
    },
    active: {
      immediate: true,
      handler(nv) {
        this.$emit('update:index', nv)
        const box = $(this.$el).find('.bui-tab-dt')
        this.$nextTick(() => {
          const item = box.children('div').eq(nv - 1 < 0 ? 0 : nv - 1)
          // 滚动
          if (item.length !== 0) {
            let obj = {}
            if (this.direction === 'h') {
              obj = {
                boxL: Number(box.scrollLeft()),
                boxW: Number(box.width()),
                itemL: Number(item.position().left),
                itemW: Number(item.width()) + Number(item.css('padding-left').replace('px', '')) * 2
              }

              box.animate({ scrollLeft: obj.itemL + obj.boxL })
            } else if (this.direction === 'v') {
              obj = {
                boxT: Number(box.scrollTop()),
                boxH: Number(box.height()),
                itemT: Number(item.position().top),
                itemH: Number(item.height()) + Number(item.css('padding-top').replace('px', '')) * 2
              }
              box.animate({ scrollTop: obj.itemT + obj.boxT })
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bui-tab-dt {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>