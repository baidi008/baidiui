<template>
  <bui-drop :style="{ width: width }" :ref="'drop-' + _uid" @open="handlerOpen" @close="handlerClose" :disabled="disabled" :readonly="readonly" v-if="ready">
    <bui-input
      width="100%"
      :value="returnValue"
      :placeholder="placeholder"
      :title="title"
      :size="size"
      :colorname="colorname"
      :disabled="disabled"
      :radius="radius"
      readonly
      :icon-r="status === 'open' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'"
    ></bui-input>
    <template slot="drop">
      <div class="bui_flex_column">
        <!-- header -->
        <div class="bui_flex_column_t" v-if="search">
          <bui-input
            v-model="keyword"
            :size="size * 1"
            :colorname="colorname"
            width="100%"
            effect="line"
            placeholder="请输入关键词"
            icon-r="bi bi-search"
            :clearable="false"
          ></bui-input>
        </div>
        <!-- header -->
        <!-- body -->
        <div class="bui_flex_column_m bui_scrollbar" :style="{ 'max-height': (size / 16) * 5 + 'rem', 'font-size': fontSize, position: 'relative' }">
          <template v-if="!optionsDataFilter || optionsDataFilter.length == 0">
            <bui-undefined :size="size / 2"></bui-undefined>
          </template>
          <template v-for="(option, optionIndex) in optionsDataFilter">
            <div
              :key="optionIndex"
              :class="['bui_flex_row', 'bui_vm', 'bui_cursor_p', 'bui_bgc_silver_l_h', !!isActive(option) ? 'bui-select-active' : '']"
              :style="{ height: size / 16 + 'rem', 'line-height': size / 16 + 'rem' }"
              @click="handlerClick(option)"
            >
              <div class="bui_flex_row_l bui_vm" :style="{ 'padding-left': (size / 16) * 0.32 + 'rem' }">
                <template v-if="type === 'radio'">
                  <bui-radio :size="size * 0.5" :colorname="colorname" :status="isActive(option) ? 1 : 0"></bui-radio>
                </template>
                <template v-if="type === 'checkbox'">
                  <bui-checkbox :size="size * 0.5" :colorname="colorname" :status="isActive(option) ? 2 : 0"></bui-checkbox>
                </template>
              </div>
              <div class="bui_flex_row_c bui_vm" :style="{ padding: '0 ' + (size / 16) * 0.32 + 'rem', color: isActive(option) ? realColor : $setColor('black,l') }">
                {{ option.label }}
              </div>
            </div>
          </template>
        </div>
        <!-- body -->
        <!-- footer -->
        <div class="bui_flex_column_b" v-if="type === 'checkbox'">
          <div
            class="bui_flex_row bui_vm bui_cursor_p bui_bgc_silver_l_h bui_bds_1_t bui_bdc_silver_l"
            :style="{ height: size / 16 + 'rem', 'line-height': size / 16 + 'rem' }"
            @click="handlerChooseAll"
          >
            <div class="bui_flex_row_l bui_vm" :style="{ 'padding-left': (size / 16) * 0.32 + 'rem' }">
              <bui-checkbox :size="size * 0.5" :colorname="colorname" :status="this.value.length === 0 ? 0 : this.value.length === optionsData.length ? 2 : 1"></bui-checkbox>
            </div>
            <div class="bui_flex_row_c bui_vm" :style="{ padding: '0 ' + (size / 16) * 0.32 + 'rem' }">
              {{ this.value.length === 0 ? '全选' : this.value.length === optionsData.length ? '取消' : '全选' }}
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
    value: { default: '' },
    title: { default: null },
    type: { type: String, default: 'radio' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: { default: '请选择' },
    width: { default: '12rem' },
    size: { type: Number, default: 32 },
    colorname: { type: String, default: 'turquoise' },
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
      if (this.type === 'radio') {
        this.$emit('model', option.value)
        this.$refs['drop-' + this._uid].close()
      } else if (this.type === 'checkbox') {
        var _values = JSON.parse(JSON.stringify(this.value))
        if (_values.findIndex(res => res == option.value) != -1) {
          _values.splice(_values.findIndex(res => res == option.value), 1)
        } else {
          _values.push(option.value)
        }
        this.$emit('model', _values)
      }
      this.$emit('change', this.value)
    },
    // 点击全选按钮回调
    handlerChooseAll() {
      if (this.value.length === this.optionsData.length) {
        this.$emit('model', [])
      } else {
        this.$emit('model', [])
        var _values = []
        this.optionsData.forEach(res => {
          _values.push(res.value)
        })
        this.$emit('model', _values)
      }
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
              scrollTop: $(this.$el)
                .find('.bui-select-active:first')
                .position().top
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
    optionsData() {
      var _result = []
      if (!!this.options && this.options.length !== 0) {
        _result = this.options
      } else {
        if (this.$slots.default && this.$slots.default.filter(res => res.tag === 'option').length !== 0) {
          this.$slots.default
            .filter(res => res.tag === 'option')
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
        _result = this.optionsData.filter(res => res.label.indexOf(this.keyword) != -1)
      }
      return _result
    },
    returnValue() {
      var _t = this
      var _result = ''
      if (this.type === 'radio') {
        if (!!_t.optionsData.filter(res => res.value === this.value)[0]) {
          _result = _t.optionsData.filter(res => res.value === this.value)[0].label
        }
      } else if (this.type === 'checkbox') {
        _result = []
        if (this.value && typeof this.value === 'object' && this.value.length !== 0) {
          this.optionsData.forEach(res => {
            if (this.value.findIndex(value => value === res.value) !== -1) {
              _result.push(res.label)
            }
          })
          _result = _result.join(',')
        }
      }

      return _result
    },
    isActive() {
      return option => {
        var _result = false
        if (this.type === 'radio') {
          if (this.value === option.value) {
            _result = true
          }
        } else if (this.type === 'checkbox') {
          _result = this.value.findIndex(res => res === option.value) !== -1 ? true : false
        }
        return _result
      }
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
    },
    fontSize() {
      var _t = this
      var _result = ''
      if ((this.size / 16) * 0.32 > 0.75) {
        _result = (this.size / 16) * 0.32 + 'rem'
      } else {
        _result = 0.75 + 'rem'
      }
      return _result
    }
  },
  mounted() {
    if (this.type === 'checkbox' && typeof this.value !== 'object') {
      this.$emit('model', [])
    }
    setTimeout(() => {
      this.$set(this, 'ready', true)
    })
  }
}
</script>
<style lang="scss" scoped="scoped"></style>
