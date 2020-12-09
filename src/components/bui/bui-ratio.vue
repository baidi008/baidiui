<template>
  <div :style="{ display: 'inline-block', width: width, height: realHeight + 'px' }"><slot></slot></div>
</template>

<script>
export default {
  data() {
    return {
      realHeight: null
    }
  },
  props: {
    width: { default: '100%' },
    height: { default: null },
    ratio: { default: '1:1' }
  },
  methods: {
    action() {
      var div = document.createElement('div')
      $(div).css({ height: this.height })
      if (this.height && $(div).height() !== 0) {
        this.realHeight = $(div).height()
      } else {
        if (!!this.ratio) {
          this.realHeight = ($(this.$el).width() * this.ratio.split(':')[1]) / this.ratio.split(':')[0]
        }
      }
    }
  },
  watch: {
    $props: {
      handler(nv, ov) {
        this.action()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.action()
    this.$resize($(this.$el), res => {
      
      this.$emit('change', res)
      this.action()
    })
  }
}
</script>

<style></style>
