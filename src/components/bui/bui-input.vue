<template>
  <div :style="{ display: 'inline-block', width: width, position: 'relative', 'font-size': realSize / 16 + 'rem' }" @mouseover="isHover = true" @mouseleave="isHover = false">
    <!-- title -->
    <div
      v-if="title && (type === 'text' || type === 'textarea') && realSize >= 32"
      :style="{
        position: 'absolute',
        top: 0,
        left: '0.24em',
        padding: '0 0.24em',
        transform: 'translateY(-50%)',
        'background-color': $setColor('white'),
        color: isFocus ? realColor : $setColor('silver,d'),
        transition: 'color 0.3s'
      }"
    >
      <p :style="{ 'font-size': fontSize, transform: 'scale(0.8)' }">{{ title }}</p>
    </div>
    <!-- title -->
    <div
      :style="{
        overflow: 'hidden',
        'border-width': effect == 'line' ? '0 0 1px 0' : '1px',
        'border-color': isFocus ? realColor : isHover ? $setColor('silver,d') : $setColor('silver'),
        transition: 'border-color 0.3s',
        'border-style': 'solid',
        opacity: disabled ? 0.48 : 1,
        'border-radius': effect !== 'line' ? (radius == 'fillet' ? '0.125em' : radius == 'pill' ? '0.5em' : 0) : 0
      }"
    >
      <div :class="['bui_flex_row', 'bui_vm']">
        <div class="bui_flex_row_l bui_vm bui_inline bui-nowrap bui_row_p_0">
          <!-- text -->
          <template v-if="type === 'text'">
            <template v-if="textL">
              <div :class="['bui-input-text bui_fc_black_l', effect !== 'line' ? 'bui_bgc_silver_l bui_bds_1_r' : 'bui-input-text-line']">
                <p :style="{ 'font-size': fontSize }">{{ textL }}</p>
              </div>
            </template>
            <template v-if="iconL">
              <i
                :class="['bi', 'bi-' + iconL, 'bui-input-icon', 'bui-input-icon-l', 'bui_ta_c']"
                :style="{ 'font-size': '0.5em', color: isFocus ? realColor : isHover ? $setColor('silver,d') : $setColor('silver') }"
              ></i>
            </template>
            <slot v-else name="left"></slot>
          </template>
          <!-- text -->
          <!-- number -->
          <template v-if="type === 'number'">
            <div
              :class="['bui-input-number-btn bui_ta_c bui_cursor_p', effect !== 'line' ? 'bui_bgc_silver_l bui_bds_1_r' : '']"
              @mouseover="focus"
              @mouseleave="blur"
              @click="numberChange('subtract')"
            >
              <p :style="{ 'font-size': fontSize }"><bui-icon icon="remove"></bui-icon></p>
            </div>
          </template>
          <!-- number -->
        </div>
        <div class="bui_flex_row_c bui_vm">
          <!-- text -->
          <input
            class="bui_block bui_fc_black"
            v-if="type == 'text'"
            type="text"
            :value="value"
            :maxlength="maxlength"
            @input="input($event.target.value)"
            @focus="focus()"
            @blur="blur()"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :style="{
              height: realSize / 16 + 'rem',
              padding: (realSize / 16) * 0.32 + 'rem',
              'font-size': fontSize,
              cursor: 'pointer'
            }"
          />
          <!-- text -->
          <!-- textarea -->
          <textarea
            class="bui_block bui_fc_black"
            v-if="type == 'textarea'"
            autosize="autosize"
            :value="value"
            @input="input($event.target.value)"
            @focus="focus()"
            @blur="blur()"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :style="{
              resize: resize ? 'vertical' : 'none',
              width: '100%',
              padding: (realSize / 16) * 0.32 + 'rem',
              'font-size': fontSize,
              'min-height': realSize / 16 + 'rem',
              'line-height': '1.5em'
            }"
            rows="4"
          ></textarea>
          <!-- textarea -->
          <!-- number -->
          <input
            class="bui_block bui_fc_black"
            v-if="type == 'number'"
            type="text"
            :value="value"
            :maxlength="maxlength"
            @keyup="keyup($event.target.value)"
            @input="input($event.target.value)"
            @focus="focus()"
            @blur="blur()"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :style="{
              height: size / 16 + 'rem',
              padding: (size / 16) * 0.32 + 'rem',
              'font-size': fontSize,
              cursor: 'pointer'
            }"
          />
          <!-- number -->
        </div>
        <div class="bui_flex_row_r bui_inline bui-nowrap bui_vm bui_row_p_0">
          <!-- text -->
          <template v-if="type === 'text'">
            <!-- 关闭按钮 -->
            <template v-if="clearable && !!value && !!isHover && !disabled && !readonly">
              <i
                :class="['bi', 'bi-highlight-off', 'bui-input-icon', 'bui-input-icon-r', 'bui_ta_c', 'bui_fc_silver', 'bui_fc_silver_d_h', 'bui_cursor_p']"
                :style="{ 'font-size': '0.5em' }"
                @click="clear"
              ></i>
            </template>
            <!-- 关闭按钮 -->
            <!-- 字数统计 -->
            <template v-if="!!maxlength && !!showlength">
              <div :style="{ height: '1em', 'line-height': '1em', 'margin-right': '0.32em' }">
                <p
                  :style="{
                    'font-size': fontSize,
                    color: $setColor('silver,d')
                  }"
                >
                  {{ value.toString().length + '/' + maxlength }}
                </p>
              </div>
            </template>
            <!-- 字数统计 -->
            <template v-if="iconR">
              <i
                :class="['bi', 'bi-' + iconR, 'bui-input-icon', 'bui-input-icon-r', 'bui_ta_c']"
                :style="{ 'font-size': '0.5em', color: isFocus ? realColor : isHover ? $setColor('silver,d') : $setColor('silver') }"
              ></i>
            </template>
            <template v-if="textR">
              <div :class="['bui-input-text bui_fc_black_l', effect !== 'line' ? 'bui_bgc_silver_l bui_bds_1_l' : 'bui-input-text-line']">
                <p :style="{ 'font-size': fontSize }">{{ textR }}</p>
              </div>
            </template>
            <slot v-else name="right"></slot>
          </template>
          <!-- text -->
          <!-- number -->
          <template v-if="type === 'number'">
            <div
              :class="['bui-input-number-btn bui_ta_c bui_cursor_p', effect !== 'line' ? 'bui_bgc_silver_l bui_bds_1_l' : '']"
              @mouseover="focus"
              @mouseleave="blur"
              @click="numberChange('plus')"
            >
              <p :style="{ 'font-size': fontSize }"><bui-icon icon="add"></bui-icon></p>
            </div>
          </template>
          <!-- number -->
        </div>
      </div>
      <div
        v-if="effect == 'line'"
        :style="{
          'background-color': realColor,
          height: size / 16 / 12 + 'rem',
          width: '100%',
          bottom: 0,
          left: 0,
          position: 'absolute',
          transition: 'all 0.3s',
          transform: isFocus ? 'scaleX(1)' : 'scaleX(0)'
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocus: false,
      isHover: false
    }
  },
  props: {
    title: { default: '' },
    width: { default: '12rem' },
    size: { default: 32 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    placeholder: { default: '' },
    value: { default: null },
    type: { default: 'text' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    effect: { default: 'default' },
    radius: { default: 'fillet' },
    iconL: { default: null },
    iconR: { default: null },
    textL: { default: null },
    textR: { default: null },
    clearable: { default: true },
    maxlength: { default: null },
    showlength: { default: true },
    resize: { default: true },
    step: { default: 1 },
    tofixed: { default: 2 },
    min: { default: null },
    max: { default: null }
  },
  computed: {
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
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
      return this.realSize < 32 ? '0.5em' : '0.4375em'
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    keyup(value) {
      var _t = this
      if (_t.type === 'number') {
        if (value.lastIndexOf('-') !== -1 && value.lastIndexOf('-') !== 0) {
          value = value.substring(0, value.lastIndexOf('-'))
        }

        if (value.split('.').length >= 3) {
          value = Number(value.split('.')[0] + '.' + value.split('.')[1])
        }

        if (!Number(value)) {
          value = value.replace(/[^0-9\-\.]/gi, '')
        }
      }
      _t.$emit('change', value)
      _t.$emit('keyup')
    },
    input(value) {
      var _t = this
      _t.$emit('change', value)
      _t.$emit('input')
    },
    focus() {
      var _t = this
      if (_t.type === 'number') {
        _t.$emit('change', _t.numberFormat(_t.value))
      }
      _t.$set(_t, 'isFocus', true)
      _t.$emit('focus')
    },
    blur() {
      var _t = this
      if (_t.type === 'number') {
        _t.$emit('change', _t.numberFormat(_t.value))
      }
      _t.$set(_t, 'isFocus', false)
      _t.$emit('blur')
    },
    // 处理数字
    numberFormat(value) {
      var _t = this
      var _result = 0
      if (!isNaN(value)) {
        _result = Number(value)
        // 处理小数点
        if (!!_result.toString().split('.')[1]) {
          if (_result.toString().split('.')[1].length > _t.tofixed) {
            _result = _result.toFixed(_t.tofixed)
          }
        }
      }
      // 处理最大最小值
      !!_t.min && Number(_result) < Number(_t.min) ? (_result = _t.min) : null
      !!_t.max && Number(_result) > Number(_t.max) ? (_result = _t.max) : null
      return Number(_result)
    },
    // 清空数据
    clear() {
      var _t = this
      _t.$emit('change', '')
      _t.$emit('cleared')
    },
    // 数字加减按钮
    numberChange(action) {
      var _t = this
      if (action === 'subtract') {
        _t.$emit('change', _t.numberFormat(Number(_t.value) - Number(_t.step)))
      } else if (action === 'plus') {
        _t.$emit('change', _t.numberFormat(Number(_t.value) + Number(_t.step)))
      }
    }
  },
  watch: {}
}
</script>

<style lang="scss">
.bui-nowrap {
  white-space: nowrap !important;
  flex-flow: nowrap !important;
}
.bui-input-text {
  height: 1em !important;
  line-height: 1em;
  padding: 0 0.32em;
  &.bui-input-text-line {
    opacity: 0.64;
  }
}
.bui-input-number-btn {
  width: 1em !important;
  height: 1em;
  line-height: 1em;
  &:hover {
    opacity: 0.64;
  }
}
.bui-input-icon {
  width: auto !important;
  height: 2em;
  line-height: 2em;
  &.bui-input-icon-r {
    margin-right: 0.64em;
  }
  &.bui-input-icon-l {
    margin-left: 0.64em;
  }
}
</style>
