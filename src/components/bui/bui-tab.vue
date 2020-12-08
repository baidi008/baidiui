<template>
  <dl :class="layout.dlClass">
    <dt
      :class="[layout.dtClass, 'bui_scrollbar']"
      :style="{
        position: 'relative',
        'white-space': 'nowrap',
        position: 'relative',
        'text-align': 'left'
      }"
    >
      <div class="bui-tab-dt-wrap" style="white-space: nowrap;">
        <template v-for="(data, index) in tabs">
          <div
            v-bind:key="index"
            :class="['bui_cursor_p', active != index ? 'bui_fc_black_f_h' : 'bui_strong bui-tab-active', positions === 'top' || positions === 'bottom' ? 'bui_inline_block' : '']"
            @click="active = index"
            :style="{
              position: 'relative',
              'font-size': (size / 16) * 0.48 + 'rem',
              padding: (size / 16) * 0.25 + 'rem ' + (size / 16) * 0.5 + 'rem',
              color: index == active ? realColor : null
            }"
          >
            <div
              :style="{
                height: (size / 16) * 0.0625 + 'rem',
                position: 'absolute',
                'background-color': realColor,
                width: active == index ? '100%' : 0,
                bottom: positions == 'bottom' ? 'auto' : 0,
                top: positions == 'bottom' ? 0 : 'auto',
                left: active == index ? 0 : '50%',
                opacity: active == index ? 1 : 0,
                transition: 'all 0.3s'
              }"
            ></div>
            {{ data.label }}
          </div>
        </template>
      </div>
    </dt>
    <dd :class="[layout.ddClass, 'bui-tab-dd']"><slot></slot></dd>
  </dl>
</template>

<script>
export default {
  data() {
    return {
      nav: [],
      active: null,
      itemClass: []
    }
  },
  props: {
    size: {
      default: 32
    },
    color: {
      default: null
    },
    colorname: {
      default: 'turquoise'
    },
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
    tabs() {
      let result = []
      this.$slots.default.forEach(res => {
        result.push({ label: res.data.attrs.name, vnode: res.children })
      })
      return result
    }, //处理方向
    layout() {
      let result = { dlClass: '', dtClass: '', ddClass: '' }
      if (this.positions == 'top') {
        result = {
          dlClass: 'bui_flex_column',
          dtClass: 'bui_flex_column_t',
          ddClass: 'bui_flex_column_m'
        }
      } else if (this.positions == 'bottom') {
        result = {
          dlClass: 'bui_flex_column',
          dtClass: 'bui_flex_column_b',
          ddClass: 'bui_flex_column_m'
        }
      } else if (this.positions == 'left') {
        result = {
          dlClass: 'bui_flex_row',
          dtClass: 'bui_flex_row_l',
          ddClass: 'bui_flex_row_c'
        }
      } else if (this.positions == 'right') {
        result = {
          dlClass: 'bui_flex_row',
          dtClass: 'bui_flex_row_r',
          ddClass: 'bui_flex_row_c'
        }
      }
      return result
    },
    realColor() {
      var _t = this
      var _result = ''
      if (!_t.color) {
        _result = _t.$setColor(_t.colorname)
      } else {
        _result = _t.color
      }
      return _result
    }
  },
  methods: {
    init() {
      var _t = this
      // 初始页
      _t.$set(_t, 'active', _t.index)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    active: {
      immediate: true,
      handler(nv, ov) {
        this.$nextTick(() => {
          const dt = $(this.$el).find('dt')
          const active = dt
            .find('.bui-tab-active')
            .prev()
            .position()
          if (active) {
            dt.animate({ scrollLeft: active.left + dt.scrollLeft() }, 300)
          } else {
            dt.animate({ scrollLeft: 0 }, 300)
          }

          // item状态

          $(this.$el)
            .find('.bui-tab-dd > *')
            .css({ display: 'none' })

          $(this.$el)
            .find('.bui-tab-dd > *:eq(' + nv + ')')
            .css({ display: 'block' })
        })
      }
    }
  }
}
</script>

<style>
.bui-tab-dd > * {
  display: none;
}
</style>
