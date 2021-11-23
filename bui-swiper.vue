<template>
  <div :id="'swiper-' + _uid" @mouseover="isHover = true" @mouseleave="isHover = false" class="bui_cursor_p">
    <div class="swiper-container" style="width: 100%; height: 100%">
      <div class="swiper-wrapper"><slot></slot></div>
      <!-- plug -->
      <template v-if="isnav">
        <div
          class="bui-swiper-pagination"
          :style="{
            opacity: plugin === 'default' ? 1 : isHover ? 1 : 0,
            transform: plugin === 'default' ? 'translateY(0)' : isHover ? 'translateY(0)' : 'translateY(100%)'
          }"
        >
          <template v-for="(i, iIndex) in status.total">
            <i
              @click="swiper.slideTo(iIndex + 1)"
              :key="i"
              :class="['bui-swiper-pagination-item', iIndex == status.activeIndex ? 'bui_shadow' : '']"
              :style="{
                width: iIndex == status.activeIndex ? '1.4rem' : null,
                'background-color': iIndex == status.activeIndex ? realColor : null
              }"
            ></i>
          </template>
        </div>
      </template>
      <template v-if="isbtn">
        <div
          class="bui-swiper-btn-next bui_round bui_fc_white bui_p_12"
          :style="{
            opacity: plugin === 'default' ? 1 : isHover ? 1 : 0,
            right: plugin === 'default' ? '1rem' : isHover ? '1rem' : 0
          }"
        >
          <bui-icon icon="keyboard-arrow-right" :size="24"></bui-icon>
        </div>
        <div
          class="bui-swiper-btn-prev bui_round bui_fc_white bui_p_12"
          :style="{
            opacity: plugin === 'default' ? 1 : isHover ? 1 : 0,
            left: plugin === 'default' ? '1rem' : isHover ? '1rem' : 0
          }"
        >
          <bui-icon icon="keyboard-arrow-left" :size="24"></bui-icon>
        </div>
      </template>

      <!-- plug -->
    </div>
  </div>
</template>

<script>
import './plug/swiper/5.3.6/swiper.min.css'
import swiper from './plug/swiper/5.3.6/swiper.min.js'
export default {
  data() {
    return {
      swiper: {},
      status: {},
      isHover: false
    }
  },
  props: {
    plugin: { default: 'hover' },
    ratio: null,
    effect: { default: '' }, //fade|cube|coverflow|flip
    color: { default: null },
    colorname: { default: 'turquoise' },
    isnav: { default: true },
    isbtn: { default: true },
    speed: { default: 1000 },
    autoplay: { default: 3000 },
    options: { default: null }
  },
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    }
  },
  methods: {
    render() {
      var _t = this
      _t.$set(_t, 'swiper', {})
      _t.$set(
        _t,
        'swiper',
        new Swiper(
          _t.$el.children[0],
          Object.assign(
            {
              effect: _t.effect,
              speed: _t.speed, //滑动速度
              slidesPerView: 1, //分栏
              direction: 'horizontal', //方向horizontal|vertical
              autoplay: !!_t.autoplay
                ? {
                    delay: _t.autoplay, //自动播放速度
                    disableOnInteraction: false //禁止swiper操作后停止播放
                  }
                : false,
              loop: true, //循环
              navigation: {
                nextEl: '#swiper-' + _t._uid + ' .bui-swiper-btn-next',
                prevEl: '#swiper-' + _t._uid + ' .bui-swiper-btn-prev'
              }, //左右按钮
              observer: true, //自动初始化子元素
              observeParents: true, //自动初始化父元素
              observeSlideChildren: true, //自动初始化子元素
              autoHeight: true,
              on: {
                init() {
                  _t.$set(_t, 'status', {
                    activeIndex: this.realIndex,
                    total: this.slides.length - 2
                  })
                },
                slideChange() {
                  _t.$set(_t, 'status', {
                    activeIndex: this.realIndex,
                    total: this.slides.length - 2
                  })
                }
              }
            },
            _t.options
          )
        )
      )
    }
  },
  mounted() {
    var _t = this
    if (_t.$slots.default && _t.$slots.default.length != 0) {
      _t.$slots.default.forEach((el, index) => {
        el.elm.className = 'swiper-slide'
      })
      _t.render()
    }
  }
}
</script>

<style>
  [class*='bui-swiper-btn'] {
    position: absolute;
    z-index: 1;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.32);
    transition: all 0.3s;
  }
  [class*='bui-swiper-btn']:hover {
    background-color: rgba(0, 0, 0, 0.48);
  }

  .bui-swiper-pagination {
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    padding: 0.25rem 0;
    left: 0;
    bottom: 0 !important;
    z-index: 1;
    text-align: center;
  }

  .bui-swiper-pagination-item {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    margin: 0.25rem;
    border-radius: 0.375rem;
    background-color: rgba(0, 0, 0, 0.32);
    transition: all 0.3s;
    cursor: pointer;
  }
  .bui-swiper-pagination-item:hover {
    background-color: rgba(0, 0, 0, 0.48);
  }
</style>
