<template>
  <bui-drop
    :style="{ width: `${block ? '100%' : width ? width : (realSize / 16) * 8 + 'rem'}`, 'font-size': (realSize / 16) * 0.5 + 'rem' }"
    :ref="'drop-' + _uid"
    @open="handlerOpen"
    @close="handlerClose"
    :disabled="disabled"
    :readonly="readonly"
    v-if="ready"
  >
    <bui-input
      width="100%"
      :value="returnValue"
      :placeholder="placeholder"
      :title="title"
      :size="Number(size)"
      :color="realColor"
      :disabled="disabled"
      :radius="radius"
      readonly
      :icon-r="status === 'open' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'"
    ></bui-input>
    <template slot="drop">
      <div class="bui_flex_column" :style="{ width: computedWidth($el) + 'px' }">
        <!-- header -->
        <div class="bui_flex_column_t" v-if="search">
          <bui-input
            :id="`search-${_uid}`"
            v-model="keyword"
            :size="realSize"
            :color="realColor"
            width="100%"
            effect="line"
            placeholder="please enter keyword"
            icon-r="bi bi-search"
            :clearable="false"
          ></bui-input>
        </div>
        <!-- header -->
        <!-- body -->
        <div class="bui-select-scroll bui_flex_column_m bui_scrollbar">
          <template v-if="!optionsDataFilter || optionsDataFilter.length == 0">
            <bui-undefined :size="Number(size) / 2"></bui-undefined>
          </template>
          <template v-for="(option, optionIndex) in optionsDataFilter">
            <div :key="optionIndex" class="bui-select-item bui_flex_row bui_vm bui_bgc_silver_l_h" @click="handlerClick(option)">
              <div class="bui_flex_row_l bui_vm">
                <template v-if="multiple || type === 'checkbox'">
                  <bui-checkbox :size="realSize * 0.5" :color="realColor" :status="isActive(option) ? 2 : 0"></bui-checkbox>
                </template>
                <template v-else>
                  <bui-radio :size="realSize * 0.5" :color="realColor" :status="isActive(option) ? 1 : 0"></bui-radio>
                </template>
              </div>
              <div class="bui_flex_row_c bui_vm bui_line_clamp_1" :style="{ color: isActive(option) ? realColor : $setColor('black,l') }">
                <span class="bui-select-label">{{ option.label }}</span>
              </div>
            </div>
          </template>
        </div>
        <!-- body -->
        <!-- footer -->
        <div class="bui_flex_column_b bui_bds_1_t bui_bdc_silver_l" v-if="multiple || type === 'checkbox'">
          <div class="bui-select-item bui_flex_row bui_vm bui_bgc_silver_l_h" @click="handlerChooseAll(computedCheckAll)">
            <div class="bui_flex_row_l bui_vm">
              <bui-checkbox :size="realSize * 0.5" :color="realColor" :status="computedCheckAll"></bui-checkbox>
            </div>
            <div class="bui_flex_row_c bui_vm bui_line_clamp_1">
              <span class="bui-select-label">{{ $code(computedCheckAll, '0:全选', '取消全选') }}</span>
            </div>
          </div>
        </div>
        <!-- footer -->
      </div>
    </template>
  </bui-drop>
</template>
<script>
export default {
  name: 'bui-select',
  data() {
    return {
      ready: false,
      status: 'close',
      keyword: ''
    }
  },
  props: {
    block: { type: Boolean, default: false },
    value: { default: '' },
    title: { default: null },
    type: { type: String, default: 'radio' },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: { default: '请选择' },
    width: { default: '' },
    size: { default: 32 },
    colorname: { default: 'turquoise' },
    color: { default: '' },
    radius: { type: String, default: 'fillet' },
    search: { type: Boolean, default: false },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  model: {
    prop: 'value',
    event: 'model'
  },
  methods: {
    // 点击option选项
    handlerClick(option) {
      let value = JSON.parse(JSON.stringify(this.value))
      if (this.multiple || this.type === 'checkbox') {
        if (value.findIndex((res) => res == option.value) != -1) {
          value.splice(
            value.findIndex((res) => res == option.value),
            1
          )
        } else {
          value.push(option.value)
        }
        this.$emit('model', value)
        this.$emit('change', value)
      } else {
        this.$emit('model', option.value)
        this.$emit('change', option.value)
        this.$refs['drop-' + this._uid].close()
      }
    },
    // 点击全选按钮回调
    handlerChooseAll(status) {
      let result = []
      if (status === 2) {
        result = []
      } else {
        result = this.optionsData.map((res) => res.value)
      }
      this.$emit('model', result)
      this.$emit('change', result)
    },
    // 下拉菜单开启回调
    handlerOpen() {
      this.status = 'open'
      this.keyword = ''
      this.$emit('open', this.value)
      setTimeout(() => {
        if ($(this.$el).find('.bui-select-active').length !== 0) {
          $(this.$el)
            .find('.bui_scrollbar')
            .animate({
              scrollTop: $(this.$el).find('.bui-select-active:first').position().top
            })
        }
      }, 300)
    },
    // 下拉菜单关闭回调
    handlerClose() {
      this.status = 'close'
      this.$emit('close', this.value)
    }
  },
  computed: {
    computedCheckAll() {
      let result = 0
      let count = 0
      this.optionsData.forEach((options) => {
        if (this.$isArray(this.value)) {
          if (this.value.findIndex((value) => value === options.value) !== -1) {
            count++
          }
        }
      })
      if (count === 0) {
        result = 0
      } else if (count >= this.optionsData.length) {
        result = 2
      } else {
        result = 1
      }
      return result
    },
    computedWidth() {
      return function (el) {
        let result = el.clientWidth || 0
        return result
      }
    },
    optionsData() {
      var _result = []
      if (!!this.options && this.options.length !== 0) {
        _result = this.options
      } else {
        if (this.$slots.default && this.$slots.default.filter((res) => res.tag === 'option').length !== 0) {
          this.$slots.default
            .filter((res) => res.tag === 'option')
            .forEach((res, index) => {
              _result.push({
                value: res.data.domProps['value'],
                label: res.children[0].text
              })
            })
        }
      }
      return _result
    },
    optionsDataFilter() {
      var _result = []
      if (!this.keyword) {
        _result = this.optionsData
      } else {
        _result = this.optionsData.filter((res) => res.label.indexOf(this.keyword) != -1)
      }
      return _result
    },
    returnValue() {
      var _t = this
      var _result = ''
      if (this.multiple || this.type === 'checkbox') {
        _result = []
        if (this.value && typeof this.value === 'object' && this.value.length !== 0) {
          this.optionsData.forEach((res) => {
            if (this.value.findIndex((value) => value === res.value) !== -1) {
              _result.push(res.label)
            }
          })
          _result = _result.join(',')
        }
      } else {
        if (_t.optionsData.filter((res) => res.value === this.value)[0]) {
          _result = _t.optionsData.filter((res) => res.value === this.value)[0].label
        }
      }

      return _result
    },
    isActive() {
      return (option) => {
        let result = false
        if ((this.multiple || this.type === 'checkbox') && this.$isArray(this.value)) {
          result = this.value.findIndex((res) => res === option.value) !== -1 ? true : false
        } else {
          if (this.value === option.value) {
            result = true
          }
        }
        return result
      }
    },
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
    },
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    }
  },
  mounted() {
    setTimeout(() => {
      this.$set(this, 'ready', true)
    })
  },
  watch: {
    status: {
      deep: true,
      immediate: true,
      handler() {
        if (this.multiple || this.type === 'checkbox') {
          if (!this.$isArray(this.value) || !this.value) {
            this.$emit('model', [])
            this.$emit('change', [])
          }
        }

        this.$nextTick(() => {
          $(`#search-${this._uid} input`).trigger('focus')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped="scoped">
  .bui-select-scroll {
    max-height: 15em;
    position: relative;
  }
  .bui-select-item {
    cursor: pointer;
    height: 2.5em;
    line-height: 2.5em;
    padding: 0 1em;
    .bui_flex_row_c {
      padding-left: 0.5em;
    }
  }
  .bui-select-label {
    font-size: 1em;
  }
</style>
