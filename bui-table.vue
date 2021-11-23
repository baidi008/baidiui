<template>
  <div :class="['bui_flex_column', !border ? 'bui_bds_1_t bui_bds_1_b' : 'bui_bds_1']" :style="{ height: height ? height : 'auto', overflow: 'hidden' }">
    <div class="bui_flex_column_m">
      <div :class="['bui_flex_row']" style="height: 100%">
        <!-- left -->
        <div
          :class="['bui_flex_row_l', !!border ? 'bui_bds_1_r' : '', elWidth <= minWidth ? 'bui_shadow' : '']"
          @mouseover="mouseHover = 'l'"
          @touchmove="mouseHover = 'l'"
          @mouseleave="mouseHover = ''"
          style="position: relative"
          v-if="$isArray(columnData['left'], true) || !!chooseType"
        >
          <div :class="['bui_flex_column']" :style="{ overflow: 'hidden', 'max-height': !!height ? height : 'auto' }">
            <!-- header -->
            <div class="bui_flex_column_t" style="overflow: hidden">
              <table :class="['bui-table', !border ? 'bui-table-noline' : '']" :width="sumWidths('left')">
                <colgroup>
                  <!-- selection -->
                  <col width="48" v-if="!!chooseType" />
                  <!-- selection -->
                  <template v-for="(item, index) in widths(columnData['left'])">
                    <col :key="index" :width="item" />
                  </template>
                </colgroup>
                <thead>
                  <tr :class="[`uid_${_uid}`]">
                    <!-- selection -->
                    <th v-if="!!chooseType" :style="{}">
                      <div>
                        <bui-checkbox
                          v-if="chooseType === 'checkbox'"
                          class="bui_fl"
                          size="16"
                          :status="selected.length === 0 ? 0 : selected.length < dataFlatten.length ? 1 : 2"
                          @click="selectAll"
                        ></bui-checkbox>
                      </div>
                    </th>
                    <!-- selection -->
                    <template v-for="(column, columnIndex) in columnData['left']">
                      <th :key="columnIndex" @click="headerClick(column)" class="bui_cursor_p">
                        <div class="bui_flex_row bui_vm">
                          <div class="bui_flex_row_l"></div>
                          <div class="bui_flex_row_c">
                            <div class="bui_line_clamp_1">{{ column.label }}</div>
                          </div>
                          <div class="bui_flex_row_r">
                            <template v-if="column.sort">
                              <div style="position: relative; width: 12px; height: 12px" class="bui_fs_12">
                                <bui-fa-icon icon="sort" style="opacity: 0.24; position: absolute; left: 0; top: 0"></bui-fa-icon>
                                <bui-fa-icon
                                  icon="sort-up"
                                  style="opacity: 1; position: absolute; left: 0; top: 0"
                                  v-if="sorts.key === column.key && sorts.type === 'asc'"
                                ></bui-fa-icon>
                                <bui-fa-icon
                                  icon="sort-down"
                                  style="opacity: 1; position: absolute; left: 0; top: 0"
                                  v-if="sorts.key === column.key && sorts.type === 'desc'"
                                ></bui-fa-icon>
                              </div>
                            </template>
                          </div>
                        </div>
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
              :style="{
                'overflow-y': 'auto',
                'overflow-x': 'hidden',
                height: !!realHeight ? realHeight + 'px' : 'none',
                'margin-bottom': '-1px',
                'margin-right': !!height && $isArray(columnData['center'], true) ? '-17px' : '0px',
                'padding-bottom': elWidth <= minWidth - 17 ? '17px' : '0px'
              }"
              @scroll="syncScroll($event, 'l')"
            >
              <table :class="['bui-table', !border ? 'bui-table-noline' : '']">
                <colgroup>
                  <!-- selection -->
                  <col width="48" v-if="!!chooseType" />
                  <!-- selection -->
                  <template v-for="(item, index) in widths(columnData['left'])">
                    <col :key="index" :width="item" />
                  </template>
                </colgroup>
                <tbody>
                  <bui-table-row
                    :uid="_uid"
                    :childrenName="childrenName"
                    :data="data"
                    :expand="expand"
                    :expandRows="expandRows"
                    :fixedWidth="sumWidths('left')"
                    v-if="!!data && data.length !== 0"
                    position="left"
                  >
                    <template slot="expandRow" slot-scope="res">
                      <slot name="expandRow" :row="res.row" :parent="res.parent" :index="res.index" :rank="res.rank" :treeKey="res.treeKey"
                    /></template>
                    <template slot-scope="res">
                      <td :class="[`uid_${_uid}`]" v-if="!!chooseType" :style="{ width: '48px', overflow: 'hidden' }">
                        <div>
                          <bui-checkbox
                            v-if="chooseType === 'checkbox'"
                            class="bui_fl"
                            size="16"
                            v-model="selected"
                            :value="checkboxValue(res.row)"
                            @checked="selectionChange"
                            @unchecked="selectionChange"
                          ></bui-checkbox>
                          <bui-radio
                            v-if="chooseType === 'radio'"
                            :status="JSON.stringify(selected[0]) === JSON.stringify(checkboxValue(res.row)) ? 1 : 2"
                            @click="$emit('select', [checkboxValue(res.row)])"
                          ></bui-radio>
                        </div>
                      </td>
                      <template v-for="(column, columnIndex) in columnData['left']">
                        <td
                          :class="[`uid_${_uid}`]"
                          :key="columnIndex"
                          @click="rowClick({ ...res, column: column, props: $props })"
                          :style="{ width: widths(columnData['left'])[columnIndex] + 'px', overflow: 'hidden' }"
                        >
                          <div>
                            <template v-if="$scopedSlots[column.key]">
                              <slot :name="column.key" :row="res.row" :index="res.index" :parent="res.parent" :treeKey="res.treeKey"></slot>
                            </template>
                            <template v-else>
                              {{ $getKey(res.row, column.key) }}
                            </template>
                          </div>
                        </td>
                      </template>
                    </template>
                  </bui-table-row>
                </tbody>
              </table>
            </div>
            <!-- body -->
          </div>
        </div>
        <!-- left -->
        <!-- right -->
        <div
          :class="['bui_flex_row_r', !!border ? 'bui_bds_1_l' : '', elWidth <= minWidth ? 'bui_shadow' : '']"
          @mouseover="mouseHover = 'r'"
          @touchmove="mouseHover = 'r'"
          @mouseleave="mouseHover = ''"
          style="position: relative"
          v-if="$isArray(columnData['right'], true)"
        >
          <div :class="['bui_flex_column']" :style="{ overflow: 'hidden', 'max-height': !!height ? height : 'auto' }">
            <!-- header -->
            <div class="bui_flex_column_t" style="overflow: hidden">
              <table :class="['bui-table', !border ? 'bui-table-noline' : '']" :width="sumWidths('right')">
                <colgroup>
                  <template v-for="(item, index) in widths(columnData['right'])">
                    <col :key="index" :width="item" />
                  </template>
                </colgroup>
                <thead>
                  <tr :class="[`uid_${_uid}`]">
                    <template v-for="(column, columnIndex) in columnData['right']">
                      <th :key="columnIndex" @click="headerClick(column)" class="bui_cursor_p">
                        <div class="bui_flex_row bui_vm">
                          <div class="bui_flex_row_l"></div>
                          <div class="bui_flex_row_c">
                            <div class="bui_line_clamp_1">{{ column.label }}</div>
                          </div>
                          <div class="bui_flex_row_r">
                            <template v-if="column.sort">
                              <div style="position: relative; width: 12px; height: 12px" class="bui_fs_12">
                                <bui-fa-icon icon="sort" style="opacity: 0.24; position: absolute; left: 0; top: 0"></bui-fa-icon>
                                <bui-fa-icon
                                  icon="sort-up"
                                  style="opacity: 1; position: absolute; left: 0; top: 0"
                                  v-if="sorts.key === column.key && sorts.type === 'asc'"
                                ></bui-fa-icon>
                                <bui-fa-icon
                                  icon="sort-down"
                                  style="opacity: 1; position: absolute; left: 0; top: 0"
                                  v-if="sorts.key === column.key && sorts.type === 'desc'"
                                ></bui-fa-icon>
                              </div>
                            </template>
                          </div>
                        </div>
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
              :style="{
                overflow: 'auto',
                'overflow-x': 'hidden',
                height: !!realHeight ? realHeight + 'px' : 'none',
                'margin-bottom': '-1px',
                'padding-bottom': elWidth <= minWidth - 17 ? '17px' : '0px'
              }"
              @scroll="syncScroll($event, 'r')"
            >
              <table :class="['bui-table', !border ? 'bui-table-noline' : '']">
                <colgroup>
                  <template v-for="(item, index) in widths(columnData['right'])">
                    <col :key="index" :width="item" />
                  </template>
                </colgroup>
                <tbody>
                  <bui-table-row
                    :uid="_uid"
                    :childrenName="childrenName"
                    :data="data"
                    :expand="expand"
                    :expandRows="expandRows"
                    :fixedWidth="sumWidths('right')"
                    v-if="!!data && data.length !== 0"
                    position="right"
                  >
                    <template slot="expandRow" slot-scope="res">
                      <slot name="expandRow" :row="res.row" :parent="res.parent" :index="res.index" :rank="res.rank" :treeKey="res.treeKey"
                    /></template>
                    <template slot-scope="res">
                      <template v-for="(column, columnIndex) in columnData['right']">
                        <td
                          :class="[`uid_${_uid}`]"
                          :key="columnIndex"
                          @click="rowClick({ ...res, column: column, props: $props })"
                          :style="{ width: widths(columnData['right'])[columnIndex] + 'px', overflow: 'hidden' }"
                        >
                          <div>
                            <template v-if="$scopedSlots[column.key]">
                              <slot :name="column.key" :row="res.row" :index="res.index" :parent="res.parent" :treeKey="res.treeKey"></slot>
                            </template>
                            <template v-else>
                              {{ $getKey(res.row, column.key) }}
                            </template>
                          </div>
                        </td>
                      </template>
                    </template>
                  </bui-table-row>
                </tbody>
              </table>
            </div>
            <!-- body -->
          </div>
        </div>
        <!-- right -->
        <!-- center -->
        <div :class="['bui_flex_row_c', `uid_${_uid}`]" style="overflow: hidden" @mouseover="mouseHover = 'c'" @touchmove="mouseHover = 'c'" @mouseleave="mouseHover = ''">
          <div :class="['bui_flex_column']" :style="{ overflow: 'hidden', 'max-height': !!height ? height : 'auto' }">
            <!-- header -->
            <div class="bui_flex_column_t" :style="{ overflow: 'hidden' }">
              <table :class="['bui-table', !border ? 'bui-table-noline' : '']" :id="'buiTabelColumn-' + _uid" :style="{ width: `100%`, 'min-width': minWidth + 'px' }">
                <colgroup>
                  <template v-for="(item, index) in widths(columnData['center'], true, 'c')">
                    <col :key="index" :width="item" />
                  </template>
                  <col width="17" />
                </colgroup>
                <thead>
                  <tr :class="[`uid_${_uid}`]">
                    <template v-for="(column, columnIndex) in columnData['center']">
                      <th :key="columnIndex" @click="headerClick(column)" class="bui_cursor_p">
                        <div class="bui_flex_row bui_vm">
                          <div class="bui_flex_row_l">
                            <template v-if="tree && columnIndex === 0">
                              <div @click="expandAll()">
                                <bui-icon
                                  :icon="expand.length === 0 ? 'add' : 'remove'"
                                  class="bui_m_6_r bui_cursor_p bui_bds_1 bui_fs_12 bui_bgc_white bui_bgc_silver_l_h"
                                ></bui-icon>
                              </div>
                            </template>
                          </div>
                          <div class="bui_flex_row_c">
                            <div class="bui_line_clamp_1">{{ column.label }}</div>
                          </div>
                          <div class="bui_flex_row_r">
                            <template v-if="column.sort">
                              <div style="position: relative; width: 12px; height: 12px" class="bui_fs_12">
                                <bui-fa-icon icon="sort" style="opacity: 0.24; position: absolute; left: 0; top: 0"></bui-fa-icon>
                                <bui-fa-icon
                                  icon="sort-up"
                                  style="opacity: 1; position: absolute; left: 0; top: 0"
                                  v-if="sorts.key === column.key && sorts.type === 'asc'"
                                ></bui-fa-icon>
                                <bui-fa-icon
                                  icon="sort-down"
                                  style="opacity: 1; position: absolute; left: 0; top: 0"
                                  v-if="sorts.key === column.key && sorts.type === 'desc'"
                                ></bui-fa-icon>
                              </div>
                            </template>
                          </div>
                        </div>
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
              :style="{
                'overflow-y': 'auto',
                'overflow-x': elWidth <= minWidth ? 'auto' : 'hidden',
                height: !!realHeight ? realHeight + 'px' : 'none',
                'margin-bottom': '-1px',
                'margin-right': $isArray(columnData['right'], true) && (!isScroll($el).x || isScroll($el).y) ? '-17px' : '0px'
              }"
              @scroll="syncScroll($event, 'c')"
            >
              <template v-if="!data">
                <div class="bui_m_24 bui_fs_16 bui_inline bui_row_p_12 bui_fc_silver_d bui_unselect">
                  <div><i class="fa fa-circle-o-notch fa-spin"></i></div>
                  <p>loading...</p>
                </div>
              </template>
              <template v-else>
                <template v-if="!!data && data.length === 0">
                  <div class="bui_m_24 bui_fs_16 bui_inline bui_row_p_12 bui_fc_silver_d bui_unselect">
                    <div><i class="fa fa-frown-o"></i></div>
                    <p>No Data</p>
                  </div>
                </template>
                <template v-else>
                  <table :class="['bui-table', !border ? 'bui-table-noline' : '']" :id="'buiTabelRow-' + _uid" :style="{ width: `${elWidth}px`, 'min-width': minWidth + 'px' }">
                    <colgroup>
                      <template v-for="(item, index) in widths(columnData['center'], true, 'c')">
                        <col :key="index" :width="item" />
                      </template>
                    </colgroup>
                    <tbody>
                      <bui-table-row
                        :uid="_uid"
                        :childrenName="childrenName"
                        :elWidth="elWidth"
                        :minWidth="minWidth"
                        :data="data"
                        :expand="expand"
                        :expandRows="expandRows"
                        v-if="!!data && data.length !== 0"
                        position="center"
                      >
                        <template slot="expandRow" slot-scope="res">
                          <slot name="expandRow" :row="res.row" :parent="res.parent" :index="res.index" :rank="res.rank" :treeKey="res.treeKey" />
                        </template>

                        <template slot-scope="res">
                          <template v-for="(column, columnIndex) in columnData['center']">
                            <td
                              :class="[`uid_${_uid}`]"
                              :key="columnIndex"
                              @click="rowClick({ ...res, column: column, props: $props })"
                              :style="{ width: widths(columnData['center'], true, 'c')[columnIndex] ? widths(columnData['center'], true, 'c')[columnIndex] + 'px' : 'auto' }"
                            >
                              <div class="bui_vm bui_flex_row" style="width: 100%">
                                <template v-if="columnIndex === 0 && tree">
                                  <div class="bui_flex_row_l">
                                    <div
                                      @click="!!res.row.children && res.row.children.length !== 0 ? expandRow(res.treeKey) : null"
                                      :style="{ 'padding-left': res.rank * 1 + 'rem' }"
                                      class="bui_fl"
                                    >
                                      <bui-icon
                                        :icon="expand.findIndex((expand) => expand === res['treeKey']) !== -1 ? 'remove' : 'add'"
                                        class="bui_m_6_r bui_cursor_p bui_bds_1 bui_fs_12 bui_bgc_white bui_bgc_silver_l_h"
                                        :style="{ opacity: !$isArray(res.row[childrenName], true) ? 0.32 : 1 }"
                                      ></bui-icon>
                                    </div>
                                  </div>
                                </template>
                                <template v-if="$scopedSlots[column.key]">
                                  <div class="bui_flex_row_c bui_vm bui_breakall">
                                    <slot :name="column.key" :row="res.row" :index="res.index" :parent="res.parent" :treeKey="res.treeKey"></slot>
                                  </div>
                                </template>
                                <template v-else>
                                  <div class="bui_flex_row_c bui_vm bui_breakall">{{ $getKey(res.row, column.key) }}</div>
                                </template>
                              </div>
                            </td>
                          </template>
                        </template>
                      </bui-table-row>
                    </tbody>
                  </table>
                </template>
              </template>
            </div>
            <!-- body -->
          </div>
        </div>
        <!-- center -->
      </div>
    </div>
    <!-- footer -->
    <div class="bui_flex_column_b bui_bds_1_t" v-if="$scopedSlots['footer']"><slot name="footer"></slot></div>
    <!-- footer -->
  </div>
</template>

<script>
export default {
  name: 'bui-table',
  data() {
    return {
      a: 0,
      elWidth: 0,
      heights: [],
      loop: null,
      activeTrIndex: -1,
      mouseHover: '',
      expand: [],
      expandRows: [],
      rowCount: 0,
      realHeight: 0,
      sorts: { key: '', type: '' }
    }
  },
  props: {
    data: {
      default() {
        return null
      }
    },
    columns: {
      default() {
        return []
      }
    },
    width: { default: null },
    height: { default: null },
    border: { type: Boolean, default: false },
    zebra: { type: Boolean, default: true },
    selected: { type: Array, default: null },
    tree: { type: Boolean, default: false },
    keyname: { type: String, default: null },
    filterKey: { default: null },
    childrenName: { type: String, default: 'children' },
    scrollback: { type: Boolean, default: true },
    chooseType: { type: String, default: null }, // 选择器类型 单选 radio | 多选 checkbox | 禁用 null
    sort: {
      type: Object,
      default() {
        return { key: '', type: '' }
      }
    }
  },
  computed: {
    isScroll() {
      return function (el) {
        let result = { x: false, y: false }
        if (el) {
          const wrap = el.querySelector(`.bui_flex_row_c.uid_${this._uid}`).querySelector('.bui_flex_column_m')
          const inner = wrap.children[0]
          if (inner.clientHeight > wrap.clientHeight) {
            result.y = true
          }
          if (inner.clientWidth > wrap.clientWidth) {
            result.x = true
          }
        }
        return result
      }
    },
    checkboxValue() {
      return function (object) {
        let result = object
        if (Array.isArray(this.filterKey) && this.filterKey.length !== 0) {
          result = this.$filterKey(object, this.filterKey)
        } else {
          if (this.keyname) {
            result = object[this.keyname]
          }
        }
        return result
      }
    },
    columnData() {
      let result = { left: [], center: [], right: [] }
      result['left'] = this.columns.filter((res) => res.fixed === 'left')
      result['center'] = this.columns.filter((res) => !res.fixed)
      result['right'] = this.columns.filter((res) => res.fixed === 'right')
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
        array.forEach((res) => {
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
      return (position) => {
        let result = 0
        this.widths(this.columnData[position]).forEach((res) => {
          result = result + res
        })
        if (position === 'left' && !!this.chooseType) {
          result = result + 48
        }
        return result
      }
    },
    sumHeights() {
      let result = 0
      this.heights.forEach((res) => {
        result = result + res
      })
      return result
    },
    dataFlatten() {
      var result = []
      const loop = (array) => {
        array.forEach((res) => {
          result.push(res)
          if (Array.isArray(res[this.childrenName]) && res[this.childrenName].length !== 0) {
            loop(res[this.childrenName])
          }
        })
      }
      loop(this.data)
      return result
    }
  },
  mounted() {
    this.loop = self.setInterval(() => {
      // 获取主表格实时宽度
      this.elWidth = Number($(this.$el).find(`.bui_flex_row_c.uid_${this._uid}`).width())
      // 获取实时高度
      if (this.height) {
        this.realHeight =
          $(this.$el).height() -
          $(this.$el).children('.bui_flex_column_m').children('.bui_flex_row').find('.bui_flex_column_t:first').outerHeight() -
          ($(this.$el).children('.bui_flex_column_b').length !== 0 ? $(this.$el).children('.bui_flex_column_b').height() : 0)
      }
      // 鼠标经过tr
      var _t = this
      $(_t.$el)
        .find('tbody > div > div')
        .unbind()
        .bind({
          mouseover() {
            let index = $(this).index()
            $.map($(_t.$el).find('tbody'), function (res) {
              $(res).children('div').children('div').children(`tr.uid_${_t._uid}`).removeClass('active')
              $(res).children('div').children(`div:eq(${index})`).children(`tr.uid_${_t._uid}`).addClass('active')
            })
          }
        })
    })
  },
  destroyed() {
    clearInterval(this.loop)
  },
  model: {
    prop: 'selected',
    event: 'select'
  },
  methods: {
    /**
     * 同步高度
     */
    syncScroll(e, mouseHover) {
      if (e && mouseHover === this.mouseHover) {
        const target = $(e.target)
        const thisBox = target.parents('.bui_flex_column').eq(0).parent()
        const otherBox = thisBox.siblings()
        thisBox.find('.bui_flex_column_t').scrollLeft(target.scrollLeft())
        otherBox.find('.bui_flex_column_m').scrollTop(target.scrollTop())
      }
    },
    /**
     * 选中回调
     */
    selectionChange() {
      this.$nextTick(() => {
        this.$emit('selectionChange', this.selected)
      })
    },
    /**
     * 全选
     */
    selectAll() {
      let result = []
      if (this.selected.length < this.dataFlatten.length) {
        this.dataFlatten.forEach((res) => {
          result.push(this.checkboxValue(res))
        })
      }
      this.$emit('select', result)
      this.selectionChange()
    },
    /**
     * 表头点击
     */
    headerClick(e) {
      this.$emit('headerClick', e)
      // 触发排序
      if (e.sort) {
        if (e.key !== this.sorts.key) {
          this.$set(this, 'sorts', {
            key: e.key,
            type: 'desc'
          })
        } else {
          if (this.sorts.type === 'desc') {
            this.$set(this.sorts, 'type', 'asc')
          } else {
            this.$set(this, 'sorts', {
              key: '',
              type: ''
            })
          }
        }
        this.$emit('sort', this.sorts)
      }
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
    widths(columns, custom, position) {
      var _t = this
      var _result = []
      var atWidth = 0
      if (custom) {
        columns.forEach((res) => {
          if (res.width) {
            atWidth = atWidth + res.width
          }
        })
        columns.forEach((res, index) => {
          if (res.width) {
            _result[index] = Number(res.width.toFixed(0))
          } else {
            _result[index] =
              Number(((_t.elWidth - atWidth) / columns.filter((item) => !item.width).length).toFixed(0)) > 0
                ? Number(((_t.elWidth - atWidth) / columns.filter((item) => !item.width).length).toFixed(0))
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
      // 自适应
      if (position === 'c') {
        const total = this.$getArrayTotal(_result)
        if (total < this.elWidth) {
          const temp = _result.map((res) => this.elWidth * (res / total))
          _result = temp
        }
      }
      return _result
    },
    // 鼠标移动到行上
    handlerTrHover(index) {
      this.$set(this, 'activeTrIndex', index)
    },
    // 展开单个子级
    expandRow(treeKey, type) {
      const expand = JSON.parse(JSON.stringify(this.expand))
      const index = expand.findIndex((res) => res === treeKey)
      if (type) {
        if (index === -1) {
          expand.push(treeKey)
        }
      } else {
        if (index === -1) {
          expand.push(treeKey)
        } else {
          expand.splice(index, 1)
        }
      }
      this.expand = expand
    },
    // 展开全部
    expandAll(type) {
      if (type === 'clear') {
        this.expand = []
      } else {
        if (this.expand.length === 0) {
          this.expand = []
          let tmpExpand = []
          const expandArray = (array, treeKey) => {
            array.forEach((res, index) => {
              tmpExpand.push(treeKey + '-' + index)
              if (!!res.children && res.children.length !== 0) {
                expandArray(res.children, treeKey + '-' + index)
              }
            })
          }
          expandArray(this.data, '0')

          setTimeout(() => {
            this.expand = tmpExpand
          })
        } else {
          this.expand = []
        }
      }
    },
    // 展开单行拓展内容
    rowExpand(key, closeOther) {
      let result = JSON.parse(JSON.stringify(this.expandRows))
      const index = result.findIndex((res) => res === key)
      if (key) {
        if (closeOther) {
          if (index === -1) {
            result = [key]
          } else {
            result = []
          }
        } else {
          if (index === -1) {
            result.push(key)
          } else {
            result.splice(index, 1)
          }
        }
      }
      this.$nextTick(() => {
        this.$set(this, 'expandRows', result)
      })
    },
    // 展开全部拓展内容
    rowExpandAll(clear) {
      let result = JSON.parse(JSON.stringify(this.expandRows))
      if (clear) {
        result = []
      } else {
        if (this.$isArray(result, true)) {
          result = []
        } else {
          this.data.forEach((res, index) => {
            result.push(`0-${index}`)
          })
        }
      }
      this.$nextTick(() => {
        this.$set(this, 'expandRows', result)
      })
    },
    // 重新渲染
    reRender() {
      // 实时处理样式
      const el = $(this.$el).children('.bui_flex_column_m').children('.bui_flex_row')
      el.find('.bui_flex_column_m').find('td').css({ 'border-bottom-width': '1px' })
      this.$nextTick(() => {
        if (this.zebra) {
          el.find('tbody').find(`tr.uid_${this._uid}:odd`).addClass('bui-table-zebra')
          el.find('tbody').find(`tr.uid_${this._uid}:even`).removeClass('bui-table-zebra')
        }
      })

      // 获取主表格每行高度数组
      el.children('*').find(`tr.uid_${this._uid}`).height('auto')
      let heights = [
        el
          .find(`.bui_flex_row_l tr.uid_${this._uid}`)
          .toArray()
          .map((res) => $(res).outerHeight()),
        el
          .find(`.bui_flex_row_c tr.uid_${this._uid}`)
          .toArray()
          .map((res) => $(res).outerHeight()),
        el
          .find(`.bui_flex_row_r tr.uid_${this._uid}`)
          .toArray()
          .map((res) => $(res).outerHeight())
      ]

      let heightsComput = []
      for (var i = 0; i < heights[1].length; i++) {
        let tmp = [heights[0][i], heights[1][i], heights[2][i]]
        tmp = tmp.sort((a, b) => {
          return b - a
        })
        heightsComput.push(tmp[0])
      }
      heightsComput.forEach((res, index) => {
        el.children('*').find(`tr.uid_${this._uid}:eq(${index})`).height(res)
      })

      // 同步滚动
      $(this.$el)
        .find('.bui_flex_column_m')
        .scrollTop(Number($(this.$el).find('.bui_flex_row_c').find('.bui_flex_column_m').scrollTop()))

      // 写入当前行数
      this.rowCount = Number(el.children('.bui_flex_row_c').find('.bui_flex_column_m').find('tr').length)
    },
    // 滚动到顶部
    scrollTop(top = 0) {
      $(this.$el).find(`.bui_flex_row_c.uid_${this._uid} .bui_flex_column_m`).scrollTop(top)
    }
  },
  updated() {
    this.reRender()
  },
  watch: {
    expandRows: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          setTimeout(() => {
            this.reRender()
          })
        })
      }
    },
    height: {
      immediate: true,
      handler(nv) {}
    },
    data: {
      immediate: true,
      deep: true,
      handler(nv) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.reRender()
          })
        })
      }
    },
    sort: {
      immediate: true,
      deep: true,
      handler(nv) {
        this.$set(this, 'sorts', nv)
      }
    }
  }
}
</script>

<style lang="scss">
.bui-table {
  text-align: left;
  table-layout: fixed;
  border-spacing: 0;

  & .bui-table-zebra {
    background-color: #fafafa !important;
  }

  & tr {
    &.active {
      background-color: #f6f6f6 !important;
    }
    & > td,
    & > th {
      vertical-align: middle;
      border-width: 0px 1px 0px 0px;
      border-color: #d3d3d3;
      border-style: solid;
      padding: 0.5rem 1rem;
      &:nth-last-child(1) {
        border-right-width: 0px;
      }
    }
    &:nth-last-of-type(3) {
      & > td,
      & > th {
        border-bottom-width: 0px;
      }
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
