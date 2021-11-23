<template>
  <div
    class="bui_bgc_silver_l bui_ta_c bui_fc_white"
    :style="{
      overflow: 'hidden',
      position: 'relative',
      display: 'inline-block',
      width: realSize.width,
      height: realSize.height,
      'line-height': realSize.height,
      'border-radius': realRadius
    }"
    @click="onClick"
  >
    <img
      v-if="status === 1"
      :src="realUrl"
      :style="{
        position: 'absolute',
        opacity: 0,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        'object-fit': fit,
        'z-index': 1
      }"
    />
    <bui-fa-icon
      :icon="[status === 0 ? 'circle-o-notch' : status === 2 ? 'unlink' : '']"
      color="white"
      :size="realSize.widthPx >= realSize.heightPx ? realSize.heightPx * 0.4 : realSize.widthPx * 0.4"
      :spin="status == 0"
    ></bui-fa-icon>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 0,
      natural: {
        height: 0,
        width: 0
      },
      getWidth: 0,
      getHeight: 0,
      realUrl: null
    }
  },
  props: {
    src: {
      defalut: null
    },
    width: {
      default: '6rem'
    },
    ratio: {
      default: '1:1'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    radius: {
      default: 'default'
    },
    fit: {
      default: 'cover'
    },
    effect: {
      default: 'fade'
    }
  },
  computed: {
    realRadius() {
      let result = 0
      if (this.realSize.widthPx >= this.realSize.heightPx) {
        result = (this.radius === 'fillet' ? this.realSize.heightPx * 0.125 : this.radius === 'pill' ? this.realSize.heightPx * 0.5 : 0) + 'px'
      } else {
        result = (this.radius === 'fillet' ? this.realSize.widthPx * 0.125 : this.radius === 'pill' ? this.realSize.widthPx * 0.5 : 0) + 'px'
      }
      return result
    },
    realSize() {
      let result = { width: 0, height: 0, widthPx: 0, heightPx: 0 }
      if (!this.width) {
        result = { width: this.natural.width + 'px', height: this.natural.height + 'px', widthPx: this.natural.width, heightPx: this.natural.height }
      } else {
        const height = (this.getWidth * this.ratio.split(':')[1]) / this.ratio.split(':')[0]
        result = { width: this.width, height: height + 'px', widthPx: this.getWidth, heightPx: height }
      }
      return result
    },
    realEffect() {
      let result = 'bui-img-show'
      if (this.effect === 'fade') {
        result = 'bui_am_fadeIn'
      } else if (this.effect === 'zoom') {
        result = 'bui_am_zoomIn'
      } else if (this.effect === 'slide') {
        result = 'bui_am_moveDownIn'
      }
      return result
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    setImg() {
      let image = new Image()
      $(this.$el).find('img').removeClass(this.realEffect)

      image.src = this.src
      image.onerror = () => {
        this.$set(this, 'status', 2)
      }
      image.onload = () => {
        this.$set(this, 'natural', { width: image.naturalWidth, height: image.naturalHeight })
        this.$set(this, 'status', 1)
        this.$set(this, 'realUrl', this.src)
        setTimeout(() => {
          $(this.$el).find('img').addClass(this.realEffect)
        })
      }
    },
    setHeight() {
      this.$set(this, 'getWidth', $(this.$el).width())
    }
  },
  mounted() {
    if (this.width) {
      this.setHeight()
      this.$resize(this.$el, () => {
        this.setHeight()
      })
    }
  },
  watch: {
    src: {
      handler(nv) {
        if (!!nv) {
          this.$set(this, 'status', 0)
          if (this.lazy) {
            var chk = self.setInterval(() => {
              if ($(this.$el).offset().top < $(window).height() && $(this.$el).offset().top < $(window).width()) {
                self.clearInterval(chk)
                this.setImg()
              }
            }, 300)
          } else {
            this.setImg()
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .bui-img-show {
    opacity: 1 !important;
  }
</style>
