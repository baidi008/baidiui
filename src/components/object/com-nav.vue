<template>
  <div :style="{ height: '100%' }">
    <!-- mobile -->
    <template v-if="$root.win.dev == 'mobile'">
      <div class="bui_bds_1_b bui_flex_row bui_vm">
        <div class="bui_flex_row_c bui_p_12_lr bui_vm">
          <span class="bui_fc_turquoise"><bui-fa-icon icon="rocket" size="48" :color="$setColor('turquoise')"></bui-fa-icon></span>
          <span class="bui_fs_16">BaidiUI</span>
          <bui-badge colorname="red" class="bui_p_6_lr">1.0.2</bui-badge>
        </div>
        <div class="bui_flex_row_r">
          <div class="bui_cursor_p bui_p_12" @click="$refs['menu'].open()"><bui-fa-icon icon="bars" size="32"></bui-fa-icon></div>

          <bui-modal ref="menu" positions="side,right" width="80%" noscroll>
            <bui-menu
              :data="menus"
              :changeKey="{ title: 'meta.title', info: 'meta.info', key: 'name', icon: 'meta.icon' }"
              :active="$route.name"
              width="100%"
              gotoPath
              @click="$refs['menu'].close()"
            ></bui-menu>
          </bui-modal>
        </div>
      </div>
    </template>
    <!-- mobile -->

    <!-- pc -->
    <template v-else>
      <div style="height:100%;" class="bui_shadow bui_flex_column">
        <div class="bui_flex_column_t bui_at_noline">
          <router-link to="/" class="bui_p_12 bui_vm bui_block bui_fc_black bui_bgc_silver_l_h">
            <span class="bui_fc_turquoise"><bui-fa-icon icon="rocket" size="48" :color="$setColor('turquoise')"></bui-fa-icon></span>
            <span class="bui_fs_24">BaidiUI</span>
            <bui-badge colorname="red" class="bui_p_6_lr">1.0.2</bui-badge>
          </router-link>
        </div>
        <div class="bui_flex_column_m" style="overflow: hidden;">
          <bui-menu :data="menus" :changeKey="{ title: 'meta.title', info: 'meta.info', key: 'name', icon: 'meta.icon' }" :active="$route.name" gotoPath class="bui_p_96_b"></bui-menu>
        </div>
      </div>
    </template>
    <!-- pc -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    }
  },
  mounted() {
    this.menus = this.$router.options.routes
  },
  methods: {}
}
</script>

<style></style>
