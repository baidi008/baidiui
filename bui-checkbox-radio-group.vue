<template>
  <div class="bui_inline_block bui_inline">
    <template v-for="(i, index) in items($slots)">
      <component
        :is="componentName"
        :size="realSize"
        :color="realColor"
        :key="index"
        :value="i.value"
        :readonly="!!i.readonly"
        :disabled="!!i.disabled"
        :bindkey="bindkey"
        v-model="tempValue"
        @change="change(i.value)"
      >
        {{ i.label }}
      </component>
    </template>
  </div>
</template>

<script>
export default {
  name: 'bui-btn-group',

  data() {
    return {
      tempValue: ''
    }
  },
  props: {
    value: { default: '' },
    size: { default: 24 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    bindkey: { default: null }
  },
  computed: {
    componentName() {
      let result = ''
      const tagName = this.$vnode.componentOptions.tag
      if (tagName) {
        if (tagName === 'bui-checkbox-group') {
          result = 'bui-checkbox'
        } else if (tagName === 'bui-radio-group') {
          result = 'bui-radio'
        }
      }
      return result
    },
    realSize() {
      return Number(this.size) <= 24 ? 24 : Number(this.size) >= 48 ? 48 : Number(this.size)
    },
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    items() {
      return function (slots) {
        let result = this.options
        const match = this.$isArray(slots.default, true)
          ? slots.default.filter(
              (res) =>
                res.tag === 'option' || res.tag === 'item' || (res.componentOptions && res.componentOptions.tag === 'bui-radio') || res.componentOptions.tag === 'bui-checkbox'
            )
          : []
        if (this.$isArray(match, true)) {
          result = [
            ...result,
            ...match.map((res) => {
              let label = ''
              let value = ''
              if (this.$isArray(res.children, true)) {
                label = res.children[0].text
              }
              if (res.data) {
                if (res.data.attrs) {
                  !!res.data.attrs.label ? (label = res.data.attrs.label) : null
                  !!res.data.attrs.value ? (value = res.data.attrs.value) : null
                }
                if (res.data.domProps) {
                  !!res.data.domProps.label ? (label = res.data.domProps.label) : null
                  !!res.data.domProps.value ? (value = res.data.domProps.value) : null
                }
              }
              if (res.componentOptions) {
                if (this.$isArray(res.componentOptions.children, true)) {
                  label = res.componentOptions.children[0].text
                }

                if (res.componentOptions.propsData) {
                  !!res.componentOptions.propsData.label ? (label = res.componentOptions.propsData.label) : null
                  !!res.componentOptions.propsData.value ? (value = res.componentOptions.propsData.value) : null
                }
                if (res.data.attrs) {
                  !!res.data.attrs.label ? (label = res.data.attrs.label) : null
                }
              }
              return {
                label: label,
                value: value
              }
            })
          ]
        }
        return result
      }
    }
  },
  model: {
    prop: 'value',
    event: 'model'
  },
  methods: {
    change(object) {
      this.$emit('change', object)
      this.$emit('model', object)
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(nv) {
        this.$set(this, 'tempValue', nv)
      }
    }
  }
}
</script>

<style>
</style>