<template>
  <div :style="boxStyle">
    <template v-for="(row, rowIndex) in data">
      <div :key="rowIndex">
        <tr :class="`uid_${uid}`">
          <slot :row="row" :parent="data" :index="rowIndex" :rank="rank" :treeKey="treeKey + '-' + rowIndex"></slot>
        </tr>
        <!-- 拓展内容 -->
        <template v-if="!!$parent.$scopedSlots['expandRow'] && expandRows.findIndex((res) => res === `0-${rowIndex}`) !== -1">
          <tr :class="`uid_${uid}`">
            <td :class="`uid_${uid}`" :colspan="$parent.columnData['center'].length" :style="{ padding: '0px 0px', overflow: 'hidden', 'max-width': `${elWidth}px` }">
              <slot name="expandRow" :row="row" :parent="data" :index="rowIndex" :rank="rank" :treeKey="treeKey + '-' + rowIndex" v-if="position === 'center'"></slot>
            </td>
          </tr>
        </template>
        <!-- 拓展内容 -->
        <!-- 树形递归 -->
        <template v-if="!!row[childrenName] && row[childrenName].length !== 0 && expand.findIndex((res) => res === treeKey + '-' + rowIndex) !== -1">
          <bui-table-row
            :uid="uid"
            :elWidth="elWidth"
            :minWidth="minWidth"
            :fixedWidth="fixedWidth"
            :data="row[childrenName]"
            :expand="expand"
            :expandRows="expandRows"
            :rank="rank + 1"
            :treeKey="treeKey + '-' + rowIndex"
          >
            <template slot-scope="res">
              <slot :row="res.row" :parent="res.parent" :index="res.index" :rank="res.rank" :treeKey="res.treeKey"></slot>
            </template>
          </bui-table-row>
        </template>
        <!-- 树形递归 -->
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'bui-table-row',
  data() {
    return {}
  },
  props: {
    uid: { default: null },
    treeKey: { default: 0 },
    rank: { default: 0 },
    fixedWidth: { default: null },
    elWidth: { default: 0 },
    minWidth: { default: 0 },
    position: { default: '' },
    expand: {
      type: Array,
      default: () => {
        return []
      }
    },
    expandRows: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      default: () => {
        return []
      }
    },
    childrenName: { type: String, default: 'children' }
  },
  computed: {
    boxStyle() {
      let result = {}
      if (!this.fixedWidth) {
        result = {
          display: 'block',
          overflow: 'hidden',
          width: this.elWidth + 'px',
          'min-width': this.minWidth + 'px'
        }
      } else {
        result = {
          display: 'block',
          width: this.fixedWidth + 'px'
        }
      }
      return result
    }
  },
  mounted() {
    // $(this.$el)
    //   .find('tr')
    //   .unwrap()
    // this.$nextTick(() => {
    //   $(this.$el)
    //     .find('tr')
    //     .unwrap()
    // })
  },
  methods: {
    getIndex: () => {
      console.log(this)
    }
  },
  watch: {}
}
</script>

<style></style>
