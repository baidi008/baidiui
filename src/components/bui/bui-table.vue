<template>
  <div :class="['bui_flex_row', !border ? 'bui_bds_1_t bui_bds_1_b' : 'bui_bds_1']">
    <!-- left -->
    <div
      :class="['bui_flex_row_l', !!border ? 'bui_bds_1_r' : '', elWidth <= minWidth ? 'bui_shadow' : '']"
      style="position: relative;"
      v-if="(!!columnData['left'] && columnData['left'].length !== 0) || selected"
    >
      <div :class="['bui_flex_column']">
        <!-- header -->
        <div class="bui_flex_column_t" style="overflow: hidden;">
          <table :class="['bui-table', !border ? 'bui-table-noline' : '']" :width="sumWidths('left')">
            <colgroup>
              <!-- selection -->
              <col width="48" v-if="selected" />
              <!-- selection -->
              <template v-for="(item, index) in widths(columnData['left'])">
                <col :key="index" :width="item" />
              </template>
            </colgroup>
            <thead>
              <tr>
                <!-- selection -->
                <th v-if="selected" :style="{ height: heights[0] + 'px' }">
                  <div><bui-checkbox class="bui_fl" size="16" :status="selected.length === 0 ? 0 : selected.length < data.length ? 1 : 2" @click="selectAll"></bui-checkbox></div>
                </th>
                <!-- selection -->
                <template v-for="(column, columnIndex) in columnData['left']">
                  <th :key="columnIndex" @click="headerClick(column)" :style="{ height: heights[0] + 'px' }">
                    <div class="bui_line_clamp_1">{{ column.label }}</div>
                  </th>
                </template>
              </tr>
            </thead>
          </table>
        </div>
        <!-- header -->
        <!-- body -->
        <div class="bui_flex_column_m bui_bds_1_t" :style="{ overflow: 'hidden', 'max-height': !!height ? Number(height) + 'px' : 'none' }">
          <table :class="['bui-table', !border ? 'bui-table-noline' : '', zebra ? 'bui-table-zebra' : '']">
            <colgroup>
              <!-- selection -->
              <col width="48" v-if="selected" />
              <!-- selection -->
              <template v-for="(item, index) in widths(columnData['left'])">
                <col :key="index" :width="item" />
              </template>
            </colgroup>
            <tbody>
              <template v-for="(row, rowIndex) in data">
                <tr :key="rowIndex" @mouseover="handlerTrHover(rowIndex)" @mouseleave="handlerTrHover(-1)" :class="activeTrIndex === rowIndex ? 'active' : ''">
                  <!-- selection -->
                  <td v-if="selected" :style="{ height: heights[rowIndex + 1] + 'px', overflow: 'hidden' }">
                    <div>
                      <bui-checkbox
                        class="bui_fl"
                        size="16"
                        v-model="selected"
                        :value="!!selectionKey ? row[selectionKey] : row"
                        @checked="selectionChange"
                        @unchecked="selectionChange"
                      ></bui-checkbox>
                    </div>
                  </td>
                  <!-- selection -->
                  <template v-for="(column, columnIndex) in columnData['left']">
                    <td :key="columnIndex" @click="rowClick(row)" :style="{ height: heights[rowIndex + 1] + 'px', overflow: 'hidden' }">
                      <div>
                        <template v-if="$scopedSlots[column.key]">
                          <slot :name="column.key" :row="row"></slot>
                        </template>
                        <template v-else>
                          {{ row[column.key] }}
                        </template>
                      </div>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="bui_p_64_tb" v-if="!!height && sumHeights > Number(height)"></div>
        </div>
        <!-- body -->
      </div>
    </div>
    <!-- left -->
    <!-- right -->
    <div
      :class="['bui_flex_row_r', !!border ? 'bui_bds_1_l' : '', elWidth <= minWidth ? 'bui_shadow' : '']"
      style="position: relative;"
      v-if="!!columnData['right'] && columnData['right'].length !== 0"
    >
      <div :class="['bui_flex_column']">
        <!-- header -->
        <div class="bui_flex_column_t" style="overflow: hidden;">
          <table :class="['bui-table', !border ? 'bui-table-noline' : '']" :width="sumWidths('right')">
            <colgroup>
              <template v-for="(item, index) in widths(columnData['right'])">
                <col :key="index" :width="item" />
              </template>
            </colgroup>
            <thead>
              <tr>
                <template v-for="(column, columnIndex) in columnData['right']" :style="{ height: heights[0] + 'px' }">
                  <th :key="columnIndex" @click="headerClick(column)">
                    <div class="bui_line_clamp_1">{{ column.label }}</div>
                  </th>
                </template>
              </tr>
            </thead>
          </table>
        </div>
        <!-- header -->
        <!-- body -->
        <div class="bui_flex_column_m bui_bds_1_t" :style="{ overflow: 'hidden', 'max-height': !!height ? Number(height) + 'px' : 'none' }">
          <table :class="['bui-table', !border ? 'bui-table-noline' : '', zebra ? 'bui-table-zebra' : '']">
            <colgroup>
              <template v-for="(item, index) in widths(columnData['right'])">
                <col :key="index" :width="item" />
              </template>
            </colgroup>
            <tbody>
              <template v-for="(row, rowIndex) in data">
                <tr :key="rowIndex" @mouseover="handlerTrHover(rowIndex)" @mouseleave="handlerTrHover(-1)" :class="activeTrIndex === rowIndex ? 'active' : ''">
                  <template v-for="(column, columnIndex) in columnData['right']">
                    <td :key="columnIndex" @click="rowClick(row)" :style="{ height: heights[rowIndex + 1] + 'px', overflow: 'hidden' }">
                      <div>
                        <template v-if="$scopedSlots[column.key]">
                          <slot :name="column.key" :row="row"></slot>
                        </template>
                        <template v-else>
                          {{ row[column.key] }}
                        </template>
                      </div>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="bui_p_64_tb" v-if="!!height && sumHeights > Number(height)"></div>
        </div>
        <!-- body -->
      </div>
    </div>
    <!-- right -->
    <!-- center -->
    <div class="bui_flex_row_c" style="max-width: 100%;overflow: hidden;">
      <div :class="['bui_flex_column']">
        <!-- header -->
        <div class="bui_flex_column_t" style="overflow: hidden;">
          <table :class="['bui-table', !border ? 'bui-table-noline' : '']" :id="'buiTabelColumn-' + _uid" :style="{ width: elWidth + 'px', 'min-width': minWidth + 'px' }">
            <colgroup>
              <template v-for="(item, index) in widths(columnData['center'], true)">
                <col :key="index" :width="item" />
              </template>
            </colgroup>
            <thead>
              <tr>
                <template v-for="(column, columnIndex) in columnData['center']">
                  <th :key="columnIndex" @click="headerClick(column)" :style="{ height: heights[0] + 'px' }">
                    <div class="bui_line_clamp_1">{{ column.label }}</div>
                  </th>
                </template>
              </tr>
            </thead>
          </table>
        </div>
        <!-- header -->
        <!-- body -->
        <div
          class="bui_flex_column_m bui_bds_1_t"
          :style="{ 'overflow-x': elWidth <= minWidth ? 'auto' : 'hidden', 'max-height': !!height ? Number(height) + 'px' : 'none' }"
          @scroll="scroll"
        >
          <table
            :class="['bui-table', !border ? 'bui-table-noline' : '', zebra ? 'bui-table-zebra' : '']"
            :id="'buiTabelRow-' + _uid"
            :style="{ width: elWidth + 'px', 'min-width': minWidth + 'px' }"
          >
            <colgroup>
              <template v-for="(item, index) in widths(columnData['center'], true)">
                <col :key="index" :width="item" />
              </template>
            </colgroup>
            <tbody>
              <template v-for="(row, rowIndex) in data">
                <tr :key="rowIndex" @mouseover="handlerTrHover(rowIndex)" @mouseleave="handlerTrHover(-1)" :class="activeTrIndex === rowIndex ? 'active' : ''">
                  <template v-for="(column, columnIndex) in columnData['center']">
                    <td :key="columnIndex" @click="rowClick(row)" :style="{ height: heights[rowIndex + 1] + 'px' }">
                      <div>
                        <template v-if="$scopedSlots[column.key]">
                          <slot :name="column.key" :row="row"></slot>
                        </template>
                        <template v-else>
                          {{ row[column.key] }}
                        </template>
                      </div>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- body -->
        <!-- footer -->
        <div
          class="bui_flex_column_b"
          :style="{
            'border-top-width': '1px',
            'border-style': 'solid',
            'border-color': '#d3d3d3'
          }"
          v-if="$scopedSlots['footer']"
        >
          <slot name="footer"></slot>
        </div>
        <!-- footer -->
      </div>
    </div>
    <!-- center -->
  </div>
</template>

<script>
export default {
  name: 'bui-table',
  data() {
    return { a: 0, elWidth: 0, heights: [], loop: null, activeTrIndex: -1 }
  },
  props: {
    data: { default: [] },
    columns: { default: [] },
    width: { default: null },
    height: { default: null },
    border: { type: Boolean, default: false },
    zebra: { type: Boolean, default: true },
    selected: { type: Array, default: null },
    selectionKey: { type: String, default: null }
  },
  computed: {
    columnData() {
      let result = { left: [], center: [], right: [] }
      result['left'] = this.columns.filter(res => res.fixed === 'left')
      result['center'] = this.columns.filter(res => !res.fixed)
      result['right'] = this.columns.filter(res => res.fixed === 'right')
      return result
    },
    minWidth() {
      var _t = this
      var _result = 0
      if (_t.width) {
        _result = Number(_t.width)
      } else {
        _result = sum(_t.columnData['center'])
      }
      function sum(array) {
        var _result = 0
        array.forEach(res => {
          if (res.width) {
            _result = _result + Number(res.width)
          } else {
            _result = _result + 64
          }
        })
        return _result
      }

      return _result
    },
    sumWidths() {
      return position => {
        let result = 0
        this.widths(this.columnData[position]).forEach(res => {
          result = result + res
        })
        if (position === 'left' && this.selected) {
          result = result + 48
        }
        return result
      }
    },
    sumHeights() {
      let result = 0
      this.heights.forEach(res => {
        result = result + res
      })
      return result
    }
  },
  mounted() {
    var _t = this
    clearInterval(this.loop)
    this.loop = self.setInterval(() => {
      // 获取主表格实时宽度
      this.$set(
        this,
        'elWidth',
        Number(
          $(this.$el)
            .find('.bui_flex_row_c')
            .width()
        )
      )

      // 获取主表格每行高度数组
      let heights = [[], [], []]
      $.map($(this.$el).find('.bui_flex_row_l tr'), res => {
        !!$(res).outerHeight() ? heights[0].push($(res).outerHeight()) : null
      })
      $.map($(this.$el).find('.bui_flex_row_c tr'), res => {
        !!$(res).outerHeight() ? heights[1].push($(res).outerHeight()) : null
      })
      $.map($(this.$el).find('.bui_flex_row_r tr'), res => {
        !!$(res).outerHeight() ? heights[2].push($(res).outerHeight()) : null
      })

      let heightsComput = []
      for (var i = 0; i < heights[0].length; i++) {
        let tmp = [heights[0][i], heights[1][i], heights[2][i]]
        tmp = tmp.sort((a, b) => {
          return b - a
        })
        heightsComput.push(tmp[0])
      }
      this.heights = heightsComput
    })
  },
  model: {
    prop: 'selected',
    event: 'select'
  },
  methods: {
    scroll(e) {
      var _t = this
      $(_t.$el)
        .find('.bui_flex_row_c .bui_flex_column_t')
        .scrollLeft($(e.target).scrollLeft())
      $(_t.$el)
        .find('.bui_flex_row_l .bui_flex_column_m,.bui_flex_row_r .bui_flex_column_m')
        .scrollTop($(e.target).scrollTop())
    },
    /**
     * 选中回调
     */
    selectionChange() {
      setTimeout(() => {
        this.$emit('selectionChange', this.selected)
      })
    },
    /**
     * 全选
     */
    selectAll() {
      let _result = []
      if (this.selected.length < this.data.length) {
        this.data.forEach(res => {
          _result.push(this.selectionKey ? res[this.selectionKey] : res)
        })
      }
      this.$emit('select', _result)
      this.selectionChange()
    },
    /**
     * 表头点击
     */
    headerClick(e) {
      this.$emit('headerClick', e)
    },
    /**
     * 格子点击
     */
    rowClick(e) {
      this.$emit('rowClick', e)
    },
    /**
     * 获取列宽度数组
     */
    widths(columns, custom) {
      var _t = this
      var _result = []
      var atWidth = 0
      if (!!custom) {
        columns.forEach((res, index) => {
          if (!!res.width) {
            atWidth = atWidth + res.width
          }
        })
        columns.forEach((res, index) => {
          if (!!res.width) {
            _result[index] = Number(res.width.toFixed(0))
          } else {
            _result[index] =
              Number(((_t.elWidth - atWidth) / columns.filter(item => !item.width).length).toFixed(0)) > 0
                ? Number(((_t.elWidth - atWidth) / columns.filter(item => !item.width).length).toFixed(0))
                : 0
          }
        })
        _result.forEach((res, index) => {
          if (res < 64) {
            _result[index] = 64
          }
        })
      } else {
        columns.forEach((res, index) => {
          if (!!res.width && res.width > 64) {
            _result[index] = res.width
          } else {
            _result[index] = 64
          }
        })
      }
      return _result
    },
    // 鼠标移动到行上
    handlerTrHover(index) {
      this.$set(this, 'activeTrIndex', index)
    }
  }
}
</script>

<style lang="scss">
.bui-table {
  text-align: left;
  table-layout: fixed;
  border-spacing: 0;

  & tr {
    &.active {
      background-color: #f6f6f6 !important;
    }
    & > td,
    & > th {
      border-width: 0px 1px 1px 0px;
      border-color: #d3d3d3;
      border-style: solid;
      padding: 0.5rem 1rem;
      &:nth-last-child(1) {
        border-right-width: 0px;
      }
    }
    &:nth-last-child(1) {
      & > td,
      & > th {
        border-bottom-width: 0px;
      }
    }
  }

  &.bui-table-zebra {
    & tr:nth-child(2n) {
      background-color: #fafafa;
    }
  }

  &.bui-table-noline {
    & tr > td,
    & tr > th {
      border-right-width: 0px;
    }
  }
}
</style>
