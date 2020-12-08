<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!-- descript -->
      <com-title title="BaidiUi for Vue"></com-title>
      <p>Baidiui 作为一套基于Vue开发的UI框架，拥有完整、样式统一的UI风格，开箱即用的Vue组件以及高自由度的调用方式。适用于网站、系统后台以及各类web应用。</p>
      <!-- descript -->
      <!-- version -->
      <com-title title="版本"></com-title>
      <!-- version -->
      <p>
        当前版本为
        <bui-badge size="24">v1.0.0</bui-badge>
        ，更多功能还在不断的完善（抄袭）中...
      </p>
      <!-- begin -->
      <com-title title="安装及使用"></com-title>
      <div>
        <bui-code>
          <pre>
# npm 安装
npm install @baidi008/baidiui</pre
          >
        </bui-code>
      </div>
      <div>
        <bui-code language="js">
          <pre>
import baidiui from '@baidi008/baidiui'
Vue.use(baidiui)</pre
          >
        </bui-code>
      </div>
      <!-- begin -->
      <!-- menu -->
      <com-title title="教程及案例"></com-title>
      <!-- menu -->
      <div>
        <div class="bui_avg_3 bui_row_p_24">
          <template v-for="menu in menus">
            <div>
              <div class="bui_bds_1 bui_p_24"><com-tree :data="menu"></com-tree></div>
            </div>
          </template>
        </div>
      </div>
    </div>
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
    this.menus = this.$router.options.routes.filter(res => res.name !== 'index')
    console.log(this.menus)
  }
}
</script>

<style></style>
