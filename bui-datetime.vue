<template>
  <div class="bui-datetime bui_unselect" :style="{ display: `${block ? 'block' : 'inline-block'}`, width: `${block ? '100%' : width ? width : (realSize / 16) * 8 + 'rem'}` }">
    <bui-drop class="bui_cursor_p bui_block" :ref="`datetimeDrop-${_uid}`" :color="realColor" :trigger="mode === 'drop' ? 'click' : 'none'">
      <div @click="open()" v-if="!!$slots.default"><slot></slot></div>
      <template v-else>
        <template v-if="!!range">
          <div :style="{ width: '100%' }" class="bui_flex_row bui_vm" @click="open()">
            <div class="bui_flex_row_l bui_row_p_0" style="width: 100%">
              <bui-input
                :effect="effect"
                :size="Number(size)"
                :color="realColor"
                width="100%"
                :radius="radius"
                :value="currentPreview[0]"
                icon-r="date-range"
                placeholder="开始时间"
                readonly
              ></bui-input>
            </div>
            <div class="bui_flex_row_c bui_p_12_lr bui_row_p_0">到</div>
            <div class="bui_flex_row_r bui_row_p_0" style="width: 100%">
              <bui-input
                :effect="effect"
                :size="Number(size)"
                :color="realColor"
                width="100%"
                :radius="radius"
                :value="currentPreview[1]"
                icon-r="date-range"
                placeholder="结束时间"
                readonly
              ></bui-input>
            </div>
          </div>
        </template>
        <template v-else>
          <div :style="{ display: 'block', width: '100%' }" @click="open()">
            <bui-input
              class="bui_block"
              :effect="effect"
              :size="Number(size)"
              :color="realColor"
              width="100%"
              :radius="radius"
              :value="currentPreview"
              icon-r="date-range"
              placeholder="请选择时间"
              readonly
            ></bui-input>
          </div>
        </template>
      </template>
      <template slot="drop">
        <bui-datetime-pannel
          :output="output"
          :start="start"
          :end="end"
          :pannelWidth="pannelWidth"
          :modelValue="modelValue"
          :color="realColor"
          :range="range"
          :mode="mode"
          :currentUnix="currentUnix"
          @change="$emit('model', $event), $emit('change', $event), $refs[`datetimeDrop-${_uid}`].close()"
        ></bui-datetime-pannel>
      </template>
    </bui-drop>

    <bui-modal :ref="`datetimeModal-${_uid}`" :header="false" :width="pannelWidth * (!!range ? 2 : 1)" v-if="mode === 'modal'">
      <bui-datetime-pannel
        :output="output"
        :start="start"
        :end="end"
        :pannelWidth="pannelWidth"
        :modelValue="modelValue"
        :color="realColor"
        :range="range"
        :mode="mode"
        :currentUnix="currentUnix"
        @change="$emit('model', $event), $emit('change', $event), $refs[`datetimeModal-${_uid}`].close()"
      ></bui-datetime-pannel>
    </bui-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pannelDate: [],
      choose: []
    }
  },
  props: {
    block: { type: Boolean, default: false },
    mode: { default: 'modal' },
    effect: { default: 'default' },
    size: { default: 32 },
    width: { default: '' },
    radius: { default: 'fillet' },
    pannelWidth: { default: 400 },
    modelValue: { default: '' },
    colorname: { default: 'turquoise' },
    color: { default: '' },
    start: { default: 3 },
    end: { default: 3 },
    output: { default: null },
    range: { default: false }
  },
  computed: {
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
    },
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    // 当前时间戳
    currentUnix() {
      const getNumber = (value) => {
        typeof value === 'number' && String(value).length != 4 ? null : (value = String(value))
        if (!!this.$moment(value).isValid()) {
          return Number(this.$moment(value).format('x'))
        } else {
          return null
        }
      }
      let result = null
      // 当时间为数组
      if (Array.isArray(this.modelValue) && this.modelValue.length === 2) {
        result = [getNumber(this.modelValue[0]), getNumber(this.modelValue[1])]
      } else {
        result = getNumber(this.modelValue)
      }
      return result
    },
    // 当前时间预览（根据格式显示）
    currentPreview() {
      let result = ''
      if (!!this.currentUnix) {
        if (Array.isArray(this.currentUnix) && this.currentUnix.length === 2) {
          result = [this.$moment(this.currentUnix[0]).format(this.viewFormat), this.$moment(this.currentUnix[1]).format(this.viewFormat)]
        } else {
          result = this.$moment(this.currentUnix).format(this.viewFormat)
        }
      }
      return result
    },

    // 显示格式
    viewFormat() {
      let result = 'YYYY-MM-DD'

      if (this.range) {
        if (this.range === 'year') {
          result = 'YYYY'
        } else if (this.range === 'month') {
          result = 'YYYY-MM'
        }
      } else {
        if (this.end === 1) {
          result = 'YYYY'
        } else if (this.end === 2) {
          result = 'YYYY-MM'
        } else if (this.end === 3) {
          result = 'YYYY-MM-DD'
        } else if (this.end > 3) {
          result = 'YYYY-MM-DD HH:mm:ss'
        }
      }
      return result
    }
  },
  components: {
    buiDatetimePannel: () => import('./bui-datetime-pannel.vue')
  },
  mounted() {},
  model: {
    prop: 'modelValue',
    event: 'model'
  },
  methods: {
    init() {},
    open() {
      this.$nextTick(() => {
        if (this.mode === 'modal') {
          this.$refs[`datetimeModal-${this._uid}`].open()
        }
      })
    },
    closed() {}
  },
  watch: {
    modelValue: {
      handler(nv) {
        if (!nv) {
          // this.$emit('model', Number(this.$moment().format('x')))
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
  .bui-datetime {
    vertical-align: middle;
  }
</style>
