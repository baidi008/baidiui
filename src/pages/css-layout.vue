<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <com-title title="布局" info="layout"></com-title>
      <p>快速构造一个三栏结构的盒子，常用于整体页面布局或列表面板</p>
      <com-title title="水平分布" info="Horizontal layout"></com-title>
      <div>
        <div class="bui_flex_row bui_fs_12 bui_fc_white" style="height: 12rem;">
          <div class="bui_flex_row_l bui_bgc_silver_d"><p class="bui_p_12">left box</p></div>
          <div class="bui_flex_row_c bui_bgc_silver"><p class="bui_p_12">center box</p></div>
          <div class="bui_flex_row_r bui_bgc_silver_d"><p class="bui_p_12">right box</p></div>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <bui-code>
        <textarea v-pre>
<div class="bui_flex_row">
    <div class="bui_flex_row_l">left box</div>
    <div class="bui_flex_row_c">center box</div>
    <div class="bui_flex_row_r">right box</div> 
</div></textarea
        >
      </bui-code>
      <com-title title="垂直分布" info="Vertical layout"></com-title>
      <div>
        <div class="bui_flex_column bui_fs_12 bui_fc_white" style="height: 12rem;">
          <div class="bui_flex_column_t bui_bgc_silver_d"><p class="bui_p_12">top box</p></div>
          <div class="bui_flex_column_m bui_bgc_silver"><p class="bui_p_12">middle box</p></div>
          <div class="bui_flex_column_b bui_bgc_silver_d"><p class="bui_p_12">bottom box</p></div>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <bui-code>
        <textarea v-pre>
<div class="bui_flex_column">
    <div class="bui_flex_column_t">top box</div>
    <div class="bui_flex_column_m">middle box</div>
    <div class="bui_flex_column_b">bottom box</div>
</div></textarea
        >
      </bui-code>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
