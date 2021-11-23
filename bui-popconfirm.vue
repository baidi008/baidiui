<template>
  <bui-drop :position="position" :ref="`drop-${_uid}`" :trigger="trigger">
    <slot></slot>
    <template slot="drop">
      <div class="bui_flex_row bui_vt bui_p_12" style="max-width: 16rem">
        <div class="bui_flex_row_l">
          <bui-icon :icon="icon" :colorname="iconColorname" class="bui_fs_24"></bui-icon>
        </div>
        <div class="bui_flex_row_c bui_p_12_l">
          <p class="bui_fs_12" v-html="title"></p>
          <div class="bui_m_6_t bui_ta_r">
            <bui-btn class="bui_m_6_l" :size="24" @click="$emit('cancel'), $refs[`drop-${_uid}`].close()">{{ cancelText }}</bui-btn>
            <bui-btn class="bui_m_6_l" :size="24" @click="$emit('confirm'), $refs[`drop-${_uid}`].close()" mode="dark" :colorname="colorname">{{ confirmText }}</bui-btn>
          </div>
        </div>
      </div>
    </template>
  </bui-drop>
</template>
<script>
export default {
  name: 'bui-popconfirm',
  props: {
    title: { type: String, default: '' },
    icon: { type: String, default: 'info' },
    iconColorname: { type: String, default: 'yellow' },
    position: { type: String, default: 'top' },
    trigger: { type: String, default: 'click' },
    colorname: { default: 'turquoise' },
    cancelText: { type: String, default: '否' },
    confirmText: { type: String, default: '是' }
  }
}
</script>
<style lang="scss" scoped>
</style>