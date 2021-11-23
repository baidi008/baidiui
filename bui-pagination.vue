<template>
  <form @submit.prevent="handlerClick(Number(inputValue))" class="bui_block bui_inline bui-pagination bui_vm">
    <div v-if="!!disabled" class="bui-pagination-mask" :style="{ 'background-color': $setColor('white,f') }"></div>
    <template>
      <div :class="['bui-pagination-item']" :style="itemStyle()" @click="handlerClick(pageNo - 1)" v-if="pageNo > 1"><i class="fa fa-angle-left"></i></div>
    </template>
    <template v-if="pages[0] >= 2">
      <div :class="['bui-pagination-item']" :style="itemStyle()" @click="handlerClick(1)">1</div>
      <div :class="['bui-pagination-item']" :style="itemStyle()" @click="handlerClick(pageNo - pageSize)" @mouseover="hoverPrev = true" @mouseleave="hoverPrev = false">
        <template v-if="hoverPrev">
          <i class="fa fa-angle-double-left"></i>
        </template>
        <template v-else> ... </template>
      </div>
    </template>

    <template v-for="i in pages">
      <div :key="i" :class="['bui-pagination-item', i === pageNo ? 'active' : '']" :style="itemStyle(i)" @click="handlerClick(i)">{{ i }}</div>
    </template>
    <template v-if="pages[pages.length - 1] < Number(pageTotal) - 2">
      <div :class="['bui-pagination-item']" :style="itemStyle()" @click="handlerClick(pageNo + pageSize)" @mouseover="hoverNext = true" @mouseleave="hoverNext = false">
        <template v-if="hoverNext">
          <i class="fa fa-angle-double-right"></i>
        </template>
        <template v-else> ... </template>
      </div>
      <div :class="['bui-pagination-item']" :style="itemStyle()" @click="handlerClick(pageTotal)">{{ pageTotal }}</div>
    </template>
    <template v-if="pageNo !== pageTotal">
      <div :class="['bui-pagination-item']" :style="itemStyle()" @click="handlerClick(pageNo + 1)"><i class="fa fa-angle-right"></i></div>
    </template>
    <div class="bui_m_12_l">
      <bui-input type="number" :min="1" :max="pageTotal" :size="size" width="2em" class="bui_fl bui_ta_c" v-model="inputValue" :clearable="false" :numberButton="false">
      </bui-input>
    </div>
    <div class="bui_m_6_l">
      <bui-btn htmlType="submit" mode="light" :size="size" :color="realColor" class="bui_fl">Go!</bui-btn>
    </div>
  </form>
</template>

<script>
export default {
  name: 'bui-pagination',
  data() {
    return {
      hover: false,
      hoverNext: false,
      hoverPrev: false,
      inputValue: 0
    }
  },
  props: {
    pageTotal: { default: 0 },
    size: { default: 32 },
    pageNo: { default: 0 },
    pageSize: { default: 3 },
    colorname: { default: 'turquoise' },
    color: { default: null },
    disabled: { default: false },
    mode: { default: 'light' }
  },
  computed: {
    // itemStyle
    itemStyle() {
      return function (i) {
        var _t = this
        var _result = {
          'text-align': 'center',
          'min-width': _t.size / 16 + 'rem',
          height: _t.size / 16 + 'rem',
          'line-height': _t.size / 16 + 'rem',
          margin: (_t.size / 16) * 0.12 + 'rem',
          padding: '0 ' + (_t.size / 16) * 0.24 + 'rem',
          'font-size': (_t.size / 16) * 0.5 + 'rem'
        }
        if (_t.mode === 'light') {
          if (i) {
            _result = Object.assign({}, _result, {
              'font-weight': i === _t.pageNo ? 'bold' : 'normal',
              color: i === _t.pageNo ? _t.realColor : 'black'
            })
          }
        } else if (_t.mode === 'dark') {
          _result = Object.assign({}, _result, {
            'background-color': _t.$setColor('silver,l'),
            color: _t.$setColor('black,l')
          })
          if (i === _t.pageNo) {
            _result = Object.assign({}, _result, {
              'background-color': _t.realColor,
              color: _t.$setColor('white')
            })
          }
        }
        return _result
      }
    },
    // color
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    pages() {
      var _t = this
      var _result = [Number(_t.pageNo)]

      var _prevSum = getPreNext('prev'),
        _nextSum = getPreNext('next')

      function getPreNext(type) {
        var _result = 0
        if (type === 'prev') {
          if (Number(_t.pageNo) - Number(_t.pageSize) > 0) {
            if (Number(_t.pageNo) + Number(_t.pageSize) > Number(_t.pageTotal)) {
              _result = Number(_t.pageSize) * 2 - (Number(_t.pageTotal) - Number(_t.pageNo))
            } else {
              _result = Number(_t.pageSize)
            }
          } else {
            _result = Number(_t.pageNo) - 1
          }
        } else if (type === 'next') {
          if (Number(_t.pageNo) + Number(_t.pageSize) < Number(_t.pageTotal)) {
            if (Number(_t.pageNo) <= Number(_t.pageSize)) {
              _result = Number(_t.pageSize) * 2 - getPreNext('prev')
            } else {
              _result = Number(_t.pageSize)
            }
          } else {
            _result = Number(_t.pageTotal) - Number(_t.pageNo)
          }
        }
        return Number(_result)
      }

      for (var i = 1; i <= _prevSum; i++) {
        if (Number(_t.pageNo) - i > 0) {
          _result.unshift(Number(_t.pageNo) - i)
        }
      }
      for (var i = 1; i <= _nextSum; i++) {
        if (Number(_t.pageNo) + i <= Number(_t.pageTotal)) {
          _result.push(Number(_t.pageNo) + i)
        }
      }

      return _result
    }
  },
  model: {
    prop: 'pageNo',
    event: 'change'
  },
  methods: {
    handlerClick(i) {
      if (!isNaN(i)) {
        this.$emit('change', i < 1 ? 1 : i > this.pageTotal ? this.pageTotal : i)
      }
    }
  },
  mounted() {},
  watch: {
    pageNo: {
      immediate: true,
      handler(nv) {
        this.inputValue = nv
      }
    }
  }
}
</script>

<style lang="scss">
  .bui-pagination {
    user-select: none;
    position: relative;
    &-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    & .bui-pagination-item {
      cursor: pointer;
      transition: all 0.3s;
      &.active:hover {
        opacity: 1;
      }
      &:hover {
        opacity: 0.32;
      }
    }
  }
</style>
