<template>
  <div class="bui_inline_block" style="position: relative">
    <input type="file" :multiple="multiple" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 1; opacity: 0" @change="handleChange" />
    <div style="pointer-events: none">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bui-choose-file',
  data() {
    return {}
  },
  props: { multiple: { type: Boolean, default: true } },
  methods: {
    handleChange(e) {
      let files = []
      e.target.files.forEach((res) => {
        files.push(res)
      })
      e.target.value = null
      this.$emit('change', files)
    }
  }
}
</script>
