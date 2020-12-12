<template>
  <bui-ratio
    ratio="1:1"
    :style="{
      width: typeof width == 'number' ? width + 'px' : width,
      display: 'inline-block',
      position: 'relative'
    }"
    @change="returnheight = $event.height"
  >
    <div
      v-if="returnheight >= 48"
      class="bui_ta_c bui_line_clamp_1 bui_inline bui_vm"
      :style="{
        position: 'absolute',
        width: '100%',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        color: realColor,
        'font-size': (returnheight / 16) * 0.24 + 'rem'
      }"
    >
      <span v-text="parseInt(value * 100)"></span>
      <span :style="{ 'font-size': (returnheight / 16) * 0.16 + 'rem' }">%</span>
    </div>
    <svg viewBox="0 0 100 100">
      <path
        d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94"
        stroke="#e7e7e7"
        stroke-width="6"
        fill="none"
        class="el-progress-circle__track"
        style="stroke-dasharray: 295.31px, 295.31px; stroke-dashoffset: 0px;"
      ></path>
      <path
        d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94"
        :stroke="realColor"
        fill="none"
        stroke-linecap="round"
        stroke-width="6"
        class="el-progress-circle__path"
        :style="{
          'stroke-dasharray': 295.31 * value + 'px, 295.31px',
          'stroke-dashoffset': '0px',
          transition: 'stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s'
        }"
      ></path>
    </svg>
  </bui-ratio>
</template>

<script>
export default {
  data() {
    return {
      barWidth: 0,
      returnheight: 0
    }
  },
  props: {
    value: { default: 0 },
    color: { default: null },
    colorname: { default: 'turquoise' },
    fixed: { default: 1 },
    width: { default: '8rem' }
  },
  computed: {
    realColor() {
      var _t = this
      var _result = ''
      if (!_t.color) {
        _result = _t.$setColor(_t.colorname)
      } else {
        _result = _t.color
      }
      return _result
    }
  }
}
</script>

<style></style>
