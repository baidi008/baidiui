<template>
  <span>{{ isRun ? numDot(parseInt(nv)) : numDot(nv) }}</span>
</template>

<script>
export default {
  name: 'bui-num',
  data() {
    return {
      nv: 0,
      ov: 0,
      isRun: false
    }
  },
  props: {
    value: { default: 0 },
    speed: { type: Number, default: 600 }
  },
  computed: {
    numDot() {
      return function (value) {
        let result = 0
        result = value.toLocaleString()
        return result
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(nv) {
        nv = Number(nv)
        this.isRun = true
        const add = (ov) => {
          const step = (nv - this.ov) / (this.speed / 10)
          this.nv = ov + step
          setTimeout(() => {
            if (this.nv < nv) {
              add(this.nv)
            } else {
              this.nv = nv
              this.ov = nv
              this.isRun = false
            }
          }, 10)
        }

        const subtract = (ov) => {
          const step = (this.ov - nv) / (this.speed / 10)
          this.nv = ov - step
          setTimeout(() => {
            if (this.nv > nv) {
              subtract(this.nv)
            } else {
              this.nv = nv
              this.ov = nv
              this.isRun = false
            }
          }, 10)
        }
        if (nv > this.ov) {
          add(this.ov)
        } else {
          subtract(this.ov)
        }
      }
    }
  }
}
</script>

<style>
</style>