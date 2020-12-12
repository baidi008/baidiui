<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!-- 加载中 -->
      <com-title title="加载中" info="loading"></com-title>
      <p>
        使用自定义指令
        <bui-badge size="24">v-loading</bui-badge>
        开启容器loading状态，适应绝大部分容器，值可选true(开启) | false(关闭)，可用于切换状态
      </p>
      <div class="bui_vm">
        <span>状态：</span>
        <bui-btn-group v-model="loading" size="24">
          <option v-for="(i, index) in [false, true]" :key="index" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div class="bui_col_4_md"><bui-ratio ratio="16:9" class="bui_bgc_silver" v-loading="loading"></bui-ratio></div>
      <div class="bui_col_4_md"><bui-img src="https://baidiui.com/demo/pic/pic001.jpg" width="100%" ratio="16:9" class="bui_bgc_silver" v-loading="loading"></bui-img></div>
      <div class="bui_col_4_md"><bui-chart ratio="16:9" :data="chartData" v-loading="loading"></bui-chart></div>
      <div><bui-table class="bui_fs_12" :columns="columns" :data="data" v-loading="loading"></bui-table></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 开启loading -->
<div v-loading="true">...</div>
<!-- 关闭loading -->
<div v-loading="false">...</div></textarea
        >
      </bui-code>
      <!-- 加载中 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      chartData: [],
      columns: [{ label: '姓名', key: 'name' }, { label: '性别', key: 'gender' }, { label: '年龄', key: 'age' }],
      data: [{ name: '刘德华', gender: '男', age: 24 }, { name: '郭富城', gender: '男', age: 21 }, { name: '王菲', gender: '女', age: 32 }]
    }
  },
  methods: {},
  mounted() {
    let chartData = []
    for (var index = 0; index < 3; index++) {
      let values = []
      for (var i = 1; i <= 6; i++) {
        values.push({ label: i + '月', value: this.$random(50000, 1000000) })
      }
      chartData.push({ label: 'item-' + index, value: values })
    }

    this.chartData = chartData
  }
}
</script>

<style></style>
