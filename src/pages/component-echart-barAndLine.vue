<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!-- 图表应用 -->
      <com-title title="图表应用" info="basic"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-chart</bui-badge>
        构造一个图表容器，使用参数
        <bui-badge size="24">mode</bui-badge>
        定义图表类型，可选bar(柱图) | line(线图) | pie(饼图) | round(环状图)，使用参数
        <bui-badge size="24">data</bui-badge>
        定义图表数据。不同的mode的数据结构有所不同，请注意
      </p>
      <p>
        组件依赖百度Echart图表引擎，只做基础易用性处理，更多内容请访问
        <a href="https://echarts.apache.org" target="_blank" class="bui_fc_turquoise">Echart 官网</a>
      </p>
      <div class="bui_col_6_md"><bui-chart title="柱图展示" mode="bar" ratio="21:9" :data="data.bar"></bui-chart></div>
      <div class="bui_col_6_md"><bui-chart title="线图展示" mode="line" ratio="21:9" :data="data.bar"></bui-chart></div>
      <div class="bui_col_6_md"><bui-chart title="饼图展示" mode="pie" ratio="21:9" :data="data.pie"></bui-chart></div>
      <div class="bui_col_6_md"><bui-chart title="环图展示" mode="round" ratio="21:9" :data="data.pie"></bui-chart></div>
      <div class="bui_col_6_md">
        <p class="bui_fs_12 bui_p_12_b">bar(柱图) line(线图) 数据格式</p>
        <bui-code :model="data.bar" height="15rem"></bui-code>
      </div>
      <div class="bui_col_6_md">
        <p class="bui_fs_12 bui_p_12_b">pie(饼图) round(环图) 数据格式</p>
        <bui-code :model="data.pie" height="15rem"></bui-code>
      </div>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>宽度：</span>
            <bui-btn-group v-model="width" size="24">
              <option v-for="i in ['480px', '640px', '50%', '100%']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>高度：</span>
            <bui-btn-group v-model="height" size="24" @change="ratio = ''">
              <option v-for="i in ['', '480px', '640px', '720px']" :key="i" :value="i">{{ !!i ? i : '无' }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>比例：</span>
            <bui-btn-group v-model="ratio" size="24" @change="height = ''">
              <option v-for="i in [null, '16:9', '4:3', '1:1', '21:9']" :key="i" :value="i">{{ !!i ? i : '无' }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-chart title="柱图展示" :width="width" :height="height" :ratio="ratio" :data="data.bar"></bui-chart></div>

      <!-- 图表应用 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: '480px',
      height: '',
      ratio: '16:9',
      data: {
        bar: []
      }
    }
  },
  mounted() {
    this.setData()
    const loop = self.setInterval(() => {
      this.setData()
    }, 1500)
  },
  methods: {
    setData() {
      this.data.bar = []
      for (var index = 0; index < 3; index++) {
        this.data.bar.push({ label: 'item-' + index, value: [] })
        for (var i = 1; i <= 6; i++) {
          this.data.bar[index].value.push({ label: i + '月', value: this.$random(100, 500) })
        }
      }

      this.data.pie = []
      for (var index = 0; index < 4; index++) {
        this.data.pie.push({ label: 'item-' + index, value: this.$random(100, 500) })
      }
    }
  }
}
</script>

<style></style>
