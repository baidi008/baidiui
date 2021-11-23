<template>
  <div :style="{ 'font-size': size / 16 + 'rem', padding: '1em' }" class="bui_ta_c bui_inline bui_fc_silver_d">
    <bui-fa-icon icon="unlink" :style="{ 'font-size': '1em' }"></bui-fa-icon>
    <p :style="{ 'font-size': '1em', padding: '0 0.24em' }">找不到数据</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: { size: { type: Number, default: 16 } }
}
</script>

<style></style>
