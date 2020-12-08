<template>
  <div>
    <a
      href="javascript:;"
      :class="['bui_block', 'bui_fc_black_l', 'bui_fc_turquoise_l_h', 'bui_inline', rank === 0 ? 'bui_fs_20 bui_p_12_b' : 'bui_fs_14', 'bui_line_clamp_1']"
      @click="click(data)"
    >
      <i :style="{ width: rank + 'rem' }"></i>
      <span class="bui_p_12_lr">{{ data.meta.title }}</span>
      <span style="opacity: 0.64;">{{ data.meta.info }}</span>
    </a>
    <template v-for="menu in data.children">
      <com-tree :data="menu" :rank="rank + 1"></com-tree>
    </template>
  </div>
</template>

<script>
export default {
  name: 'com-tree',
  props: { data: { default: [] }, rank: { default: 0 } },
  methods: {
    click(e) {
      this.$router.history.push(e.path)
    }
  }
}
</script>

<style></style>
