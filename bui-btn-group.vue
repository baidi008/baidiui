<template>
  <div
    :class="['bui_unselect', 'bui-btn-group', `${block ? 'bui_block' : 'bui_inline_block'}`]"
    :style="{
      'font-size': realSize / 16 + 'rem',
      opacity: disabled ? 0.48 : 1,
      width: block ? '100%' : width
    }"
  >
    <template v-for="(option, optionsIndex) in realOptions">
      <div
        class="bui-btn-group-item"
        :key="optionsIndex"
        @mouseover="onMouseover(optionsIndex)"
        @mouseleave="onMouseover(-1)"
        :style="{
          width: block ? `${100 / realOptions.length}%` : 'auto'
        }"
      >
        <div
          :class="['bui-btn-group-item-wrap']"
          :style="{
            'box-shadow': checkModel(option.value) ? 'inset 0 0 0.125em rgba(0,0,0,0.24)' : 'none',
            'background-color': checkModel(option.value) ? realColor : 'white',
            color: checkModel(option.value) ? 'white' : hover === optionsIndex ? realColor : $setColor('black'),
            'border-width': borderWidth(optionsIndex),
            'border-radius': borderRadius(optionsIndex),
            'border-color': checkModel(option.value) ? realColor : $setColor('black,l,160')
          }"
          @click="setModel(option.value)"
        >
          <div class="bui_block bui_line_clamp_1" :title="option.label" :style="{ 'font-size': realSize >= 32 ? '0.4em' : '0.5em' }">
            <template v-if="!!option.vnode">
              <bui-render :vnode="option.vnode"></bui-render>
            </template>
            <template v-else>{{ option.label }}</template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnStyle: {},
      isTouch: false,
      hover: -1
    }
  },
  mounted() {},
  props: {
    modelValue: { default: null },
    className: { default: '' },
    block: { type: Boolean, default: false },
    width: { default: 'auto' },
    size: { default: 32 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    disabled: { type: Boolean, default: false },
    radius: { default: 'fillet' },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    borderWidth() {
      return function (index) {
        let _result = '1px 1px 1px 0'
        if (index === 0) {
          _result = '1px'
        }
        return _result
      }
    },
    borderRadius() {
      return function (index) {
        let _result = '0'
        if (index === 0) {
          _result = this.radius === 'fillet' ? '0.125em 0 0 0.125em' : this.radius === 'pill' ? '0.5em 0 0 0.5em' : '0'
        } else if (index === this.realOptions.length - 1) {
          _result = this.radius === 'fillet' ? '0 0.125em 0.125em 0' : this.radius === 'pill' ? '0 0.5em 0.5em 0' : '0'
        }

        return _result
      }
    },
    realOptions() {
      let result = []
      if (this.options && this.options.length !== 0) {
        result = this.options
      } else {
        if (this.$slots) {
          const options = this.$slots.default.filter((res) => res.tag === 'option' || res.tag === 'item')
          result = options.map((res) => {
            return {
              value: res.data ? res.data.domProps.value : -999,
              vnode: res.children
            }
          })
        }
      }
      return result
    },
    checkModel() {
      return function (data) {
        var _return = false
        if (data == this.modelValue) {
          _return = true
        }
        return _return
      }
    },
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 64 ? 64 : Number(this.size)
    },
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    }
  },
  model: {
    prop: 'modelValue',
    event: 'model'
  },
  methods: {
    setModel(data) {
      if (!this.disabled) {
        this.$emit('model', data)
        this.$emit('change', this.realOptions.filter((res) => res.value === data)[0])
      }
    },
    onMouseover(index) {
      if (!this.disabled) {
        this.$set(this, 'hover', index)
      }
    }
  }
}
</script>

<style lang="scss" scope>
  .bui-btn-group {
    text-align: center;
    vertical-align: middle;
    height: 1em;
    line-height: 1em;
    box-sizing: border-box;
    position: relative;
    white-space: nowrap;
    & .bui-btn-group-item {
      display: inline-block;
      overflow: hidden;
      & .bui-btn-group-item-wrap {
        transition: background-color 0.3s, border-color 0.3s, color 0.3s, border-radius 0.3s;
        cursor: pointer;
        overflow: hidden;
        white-space: nowarp;
        padding: 0 0.5em;
        box-sizing: border-box;
        border-style: solid;
      }
    }
  }
</style>
