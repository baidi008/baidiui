<template>
  <form :class="['bui-form', `bui-form-${mode}`, ...computedClass.box]" @submit="submit" @reset="reset" :style="computedStyle().box">
    <template v-for="(i, index) in computedItems($slots)">
      <div :class="['bui-form-item-wrap', i.class]" :key="`item-${index}`" :style="computedStyle(i).wrap">
        <div class="bui-form-item">
          <div class="bui-form-label" v-if="mode !== 'box'">
            <div :style="computedStyle(i).label" class="bui_line_clamp_1">{{ i.label ? `${i.label}:` : '' }}</div>
          </div>
          <div class="bui-form-body">
            <div class="bui-form-label-box bui_line_clamp_1" v-if="mode === 'box'" :style="computedStyle().labelBox">{{ i.label ? `${i.label}:` : '' }}</div>
            <template v-if="i.vnode">
              <bui-render class="bui-form-body-wrap" :vnode="i.vnode"></bui-render>
            </template>
            <template v-else>
              <!-- 动态组件 -->
              <template v-if="i.componentName">
                <component :is="i.componentName" v-bind="i" v-model="form[i.model]"></component>
              </template>
              <!-- 动态组件 -->
              <!-- 其他 -->
              <!-- radio -->
              <template v-if="i.type === 'radio'">
                <template v-for="(option, optionIndex) in i.options">
                  <bui-radio v-bind="i" :key="optionIndex" :value="option.value" v-model="form[i.model]">{{ option.label }}</bui-radio>
                </template>
              </template>
              <!-- radio -->
              <!-- checkbox -->
              <template v-if="i.type === 'checkbox'">
                <template v-for="(option, optionIndex) in i.options">
                  <bui-checkbox v-bind="i" :key="optionIndex" :value="option.value" v-model="form[i.model]">{{ option.label }}</bui-checkbox>
                </template>
              </template>
              <!-- checkbox -->
              <!-- 其他 -->
            </template>
          </div>
        </div>
      </div>
    </template>
  </form>
</template>

<script>
export default {
  name: 'bui-form',
  data() {
    return {
      lineHeight: 'auto'
    }
  },
  props: {
    form: {
      default() {
        return {}
      }
    },
    block: { type: Boolean, default: false },
    size: { default: 32 },
    labelWidth: { default: '8rem' },
    mode: { default: 'default' },
    color: { default: '' },
    colorname: { default: 'turquoise' },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  model: {
    prop: 'form',
    event: 'model'
  },
  computed: {
    realSize() {
      let result = Number(this.size) < 24 ? 24 : Number(this.size) > 48 ? 48 : Number(this.size)
      return result
    },
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    computedItems() {
      return function (slots) {
        let result = []
        if (slots.default) {
          result = slots.default
            .filter((res) => res.tag === 'item' || res.tag === 'bui-form-item')
            .map((res) => {
              let result = { vnode: res.children }
              result.vnode.forEach((res) => {
                if (res.componentOptions && res.componentOptions.propsData) {
                  // 全局设置block
                  if (this.block && String(res.componentOptions.propsData.block) !== 'false') {
                    res.componentOptions.propsData = { ...res.componentOptions.propsData, block: true }
                  }
                  // 全局设置控件尺寸
                  if (!res.componentOptions.propsData.size) {
                    res.componentOptions.propsData = { ...res.componentOptions.propsData, size: Number(this.realSize) }
                  }
                  // 全局设置控件颜色
                  if (!res.componentOptions.propsData.color) {
                    res.componentOptions.propsData = { ...res.componentOptions.propsData, color: this.realColor }
                  }
                  // 盒子模式下自动给盒子添加block属性
                  if (this.mode === 'box' && !res.componentOptions.propsData.block) {
                    res.componentOptions.propsData = { ...res.componentOptions.propsData, block: true }
                  }
                }
              })

              return { ...result, label: res.data.attrs ? res.data.attrs.label : '', class: res.data ? res.data.staticClass : '' }
            })
        }

        if (this.$isArray(this.items, true)) {
          const components = [
            { type: ['text', 'number', 'textarea'], value: 'bui-input' },
            { type: ['select'], value: 'bui-select' },
            { type: ['btnGroup', 'btn-group'], value: 'bui-btn-group' },
            { type: ['slider'], value: 'bui-slider' },
            { type: ['date', 'date-picker', 'datetime'], value: 'bui-datetime' },
            { type: ['switch'], value: 'bui-switch' }
          ]
          result = [
            ...this.items.map((res) => {
              let componentConfig = components.filter((i) => i.type.findIndex((index) => index === res.type) !== -1)[0]
              return {
                ...res,
                componentName: componentConfig ? componentConfig.value : null,
                placeholder: res.placeholder || `请输入${res.label}`,
                block: this.mode === 'box' ? true : String(res.block) === 'false' ? false : !!res.block ? res.block : this.block,
                size: res.size >= 24 && res.size <= 48 ? res.size : this.realSize,
                class: res.class,
                color: this.realColor
              }
            }),
            ...result
          ]
        }

        return result
      }
    },
    computedStyle() {
      return function () {
        let result = {
          box: { margin: -((this.realSize / 16) * 0.5) * 0.5 + 'rem' },
          wrap: { padding: (this.realSize / 16) * 0.5 * 0.5 + 'rem' },
          label: { width: this.labelWidth, 'line-height': `${this.realSize + 2}px`, 'font-size': `${(this.realSize / 16) * 0.5}rem` },
          labelBox: { fontSize: this.realSize > 32 ? this.realSize * 0.4 + 'px' : '12px', paddingBottom: this.realSize * 0.125 + 'px' }
        }
        return result
      }
    },
    computedClass() {
      let result = { box: ['bui_avg_3_md'] }
      if (this.$isArray(this.$vnode.data.class, true)) {
        if (this.$vnode.data.class.findIndex((res) => res.indexOf('bui_avg_') !== -1) !== -1) {
          result.box = []
        } else {
          result.box = ['bui_avg_3_md']
        }
      }
      return result
    }
  },
  mounted() {},
  methods: {
    submit() {
      this.$emit('submit')
    },
    reset() {
      this.$emit('reset')
    },
    changeKeyValue(keyname, value) {
      this.$emit('model', { ...this.form, ...{ [keyname]: value } })
    }
  }
}
</script>

<style lang="scss" scope>
  .bui-form {
    &.bui-form-default {
      .bui-form-item-wrap {
        width: 100%;
        display: block;
      }
    }
    &.bui-form-inline {
      .bui-form-item-wrap {
        width: auto;
        display: inline-block;
        vertical-align: top;
      }
      .bui-form-label > * {
        width: auto !important;
      }
    }
    &.bui-form-box {
      .bui-form-item-wrap {
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
      }
    }
    .bui-form-item {
      display: flex;
      flex-direction: row;
      // align-items: center;
      & .bui-form-label {
        opacity: 0.64;
        order: 0;
        & > div {
          padding: 0 1em;
          text-align: right;
        }
      }
      & .bui-form-body {
        flex-grow: 1;
        order: 1;
        & .bui-form-label-box {
          opacity: 0.64;
        }
        & .bui-form-body-wrap {
          min-height: 100%;
        }
      }
    }
  }
</style>