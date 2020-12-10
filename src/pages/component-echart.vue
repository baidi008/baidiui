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
      <div class="bui_col_4_md"><bui-chart title="柱图展示" mode="bar" ratio="4:3" :data="data.bar"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="线图展示" mode="line" ratio="4:3" :data="data.bar"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="柱线混合" mode="bar" ratio="4:3" :data="data.mixin"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="柱图展示(堆叠)" mode="bar" ratio="4:3" stack :data="data.bar"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="线图展示(堆叠)" mode="line" ratio="4:3" stack :data="data.bar"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="柱线混合(堆叠)" mode="bar" ratio="4:3" stack :data="data.mixin"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="柱图展示(垂直)" direction="v" mode="bar" ratio="4:3" :data="data.bar.filter((res, index) => index < 2)"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="线图展示(垂直)" direction="v" mode="line" ratio="4:3" :data="data.bar.filter((res, index) => index < 2)"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="柱线混合(垂直)" direction="v" mode="bar" ratio="4:3" :data="data.mixin"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="饼图展示" mode="pie" ratio="4:3" :data="data.pie"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="环图展示" mode="round" ratio="4:3" :data="data.pie"></bui-chart></div>
      <div class="bui_col_4_md"><bui-chart title="玫瑰图" mode="pie" rose ratio="4:3" :data="data.pie"></bui-chart></div>

      <p>具体使用方法请参考以下代码，柱图、线图的数据结构和饼图、环形图有区别</p>

      <bui-code>
        <textarea>
<template>
  <div>
    <!-- 柱图 -->
    <bui-chart mode="bar" :data="lineBarData"></bui-chart>
    <!-- 线图 -->
    <bui-chart mode="line" :data="lineBarData"></bui-chart>
    <!-- 饼图 -->
    <bui-chart mode="pie" :data="pieRoundData"></bui-chart>
    <!-- 环图 -->
    <bui-chart mode="round" :data="pieRoundData"></bui-chart>
    <!-- 开启玫瑰图 -->
    <bui-chart mode="pie" :data="pieRoundData" rose></bui-chart>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 柱图，线图数据
        lineBarData: [
          {
            label: 'item-0',
            type: 'line', // 此参数可单独设置item的类型，可选 bar(柱图)|line(线图)，如不设置，则根据组件参数mode来展示，一般用来做混合图表使用
            value: [
              { label: '一月', value: 300 },
              { label: '二月', value: 400 },
              { label: '三月', value: 500 }
            ]
          },
          {
            label: 'item-2',
            value: [
              { label: '一月', value: 600 }, 
              { label: '二月', value: 700 },
              { label: '三月', value: 800 }
            ]
          }
        ],
        // 饼图，环图数据
        pieRoundData:[
          {label:'item-1',value:500},
          {label:'item-2',value:600},
          {label:'item-3',value:700}
        ]
      }
    }
  }
</script>
        </textarea>
      </bui-code>
      <!-- 图表应用 -->
      <!-- 容器尺寸 -->
      <com-title title="容器尺寸" info="size"></com-title>
      <p>
        容器默认尺寸为宽度百分百，高度根据比例16:9动态变化。可通过参数
        <bui-badge size="24">width</bui-badge>
        设置容器宽度，
        <bui-badge size="24">ratio</bui-badge>
        设置容器比例。 容器也可以通过参数
        <bui-badge size="24">height</bui-badge>
        固定高度，设定固定高度时，请不要设置
        <bui-badge size="24">ratio</bui-badge>
        ，避免冲突
      </p>
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
              <option v-for="i in ['', 480, 640, 720]" :key="i" :value="i">{{ !!i ? i + 'px' : '无' }}</option>
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
      <div class="bui_col_6_md"><bui-chart title="柱图展示" :width="width" :height="height" :ratio="ratio" :data="data.bar"></bui-chart></div>
      <div class="bui_col_6_md"><bui-chart title="饼图展示" mode="pie" :width="width" :height="height" :ratio="ratio" :data="data.pie"></bui-chart></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 比例控制高度 -->
<bui-chart :data="data" width="50%" ratio="1:1"></bui-chart>
<!-- 高度控制 -->
<bui-chart :data="data" width="50%" height="400px"></bui-chart></textarea
        >
      </bui-code>
      <!-- 容器尺寸 -->
      <!-- 主题颜色 -->
      <com-title title="主题颜色" info="size"></com-title>
      <p>
        主题颜色可用参数
        <bui-badge size="24">color</bui-badge>
        设置，数据类型为数组。色值支持名称，十六进制颜色码，RGBA颜色值。每一个item将按照该数组循环使用。
      </p>
      <template v-for="(i, index) in color">
        <div class="bui_col_6_md" :key="index">
          <div class="bui_row_p_24">
            <div><bui-chart title="柱图展示" :data="data.bar" :color="i" :height="320" :ratio="null"></bui-chart></div>
            <div><bui-chart mode="pie" title="饼图展示" :data="data.pie" :color="i" :height="320" :ratio="null"></bui-chart></div>
            <bui-code :model="!!i ? i : false"></bui-code>
          </div>
        </div>
      </template>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 默认 -->
<bui-chart :data="data"></bui-chart>
<!-- 十六进制 -->
<bui-chart :data="data" :color="['#000000', '#ff0000', '#fff000', '#666666']"></bui-chart>
<!-- 颜色名称 -->
<bui-chart :data="data" :color="['black', 'blue', 'red', 'purple']"></bui-chart>
<!-- RGBA值 -->
<bui-chart :data="data" :color="['rgba(203,12,43,1)', 'rgba(65,102,43,1)', 'rgba(165,102,43,1)', 'rgba(205,102,123,1)']"></bui-chart></textarea
        >
      </bui-code>
      <!-- 主题颜色 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'mode', type: ['String'], default: 'bar', info: '图表类型，可选bar(柱图) | line(线图) | pie(饼图) | round(环形图)' },
            { name: 'data', type: ['Array'], default: '', info: '图表数据' },
            { name: 'width', type: ['String'], default: '100%', info: '容器宽度' },
            { name: 'ratio', type: ['String'], default: '16:9', info: '容器强制比例' },
            { name: 'height', type: ['String', 'Number'], default: 'null', info: '容器强制高度，单位为px' },
            { name: 'color', type: ['Array'], default: '[]', info: '图表主题颜色列表，颜色值可为十六进制色值，RGBA色值，颜色名称' },
            { name: 'stack', type: ['Boolean'], default: 'false', info: '柱图、线图是否开启堆叠模式，该参数在mode=bar或者mode=line时有效' },
            { name: 'rose', type: ['Boolean'], default: 'false', info: '饼图、环形图是否开启玫瑰图模式，该参数在mode=pie或者mode=round时有效' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" :key="type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- public props -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: [
        ['#000000', '#ff0000', '#fff000', '#666666'],
        ['black', 'blue', 'red', 'purple'],
        ['rgba(203,12,43,1)', 'rgba(65,102,43,1)', 'rgba(165,102,43,1)', 'rgba(205,102,123,1)'],
        ['rgba(65,102,43,1)', 'rgba(65,102,43,0.6)', 'rgba(65,102,43,0.3)', 'rgba(65,102,43,0.2)']
      ],
      width: '100%',
      height: '',
      ratio: '16:9',
      data: {
        bar: []
      }
    }
  },
  mounted() {
    this.setData()
    // const loop = self.setInterval(() => {
    //   this.setData()
    // }, 1500)
  },
  methods: {
    setData() {
      this.data.bar = []
      this.data.mixin = []
      for (var index = 0; index < 4; index++) {
        this.data.bar.push({ label: 'item-' + index, value: [] })
        this.data.mixin.push({ label: 'item-' + index, type: index % 2 === 0 ? 'line' : 'bar', value: [] })
        for (var i = 1; i <= 6; i++) {
          this.data.bar[index].value.push({ label: i + '月', value: this.$random(1000, 20000) })
          this.data.mixin[index].value.push({ label: i + '月', value: this.$random(1000, 20000) })
        }
      }

      this.data.pie = []
      for (var index = 0; index < 4; index++) {
        this.data.pie.push({ label: 'item-' + index, value: this.$random(1000, 20000) })
      }
    }
  }
}
</script>

<style></style>
