<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--时间日期选择器-->
      <com-title title="时间日期选择器" info="datetime"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-datetime</bui-badge>
        构建一个时间选择器
      </p>
      <div><bui-datetime v-model="value"></bui-datetime></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  <div>
    <bui-datetime v-model="value"></bui-datetime>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '2020-01-01 00:00:00'
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!--时间日期选择器-->
      <!--范围选择-->
      <com-title title="范围选择" info="range"></com-title>
      <p>
        使用参数
        <bui-badge size="24">range="day"</bui-badge>
        ，
        <bui-badge size="24">range="month"</bui-badge>
        ，
        <bui-badge size="24">range="year"</bui-badge>
        定义组件为时间范围选择器，请注意设置该参数时，请保证v-model绑定数据为数组
      </p>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">范围精确到日</p>
        <bui-datetime v-model="valueArray" range="day"></bui-datetime>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">范围精确到月</p>
        <bui-datetime v-model="valueArray" range="month"></bui-datetime>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">范围精确到年</p>
        <bui-datetime v-model="valueArray" range="year"></bui-datetime>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-datetime v-model="valueArray" range="day"></bui-datetime>
<bui-datetime v-model="valueArray" range="month"></bui-datetime>
<bui-datetime v-model="valueArray" range="year"></bui-datetime></textarea
        >
      </bui-code>
      <!--范围选择-->
      <!--自定义精度-->
      <com-title title="自定义精度" info="deep"></com-title>
      <p>
        使用参数
        <bui-badge size="24">start</bui-badge>
        和
        <bui-badge size="24">end</bui-badge>
        可定义日期选择器的起始面板和终止面板，选择后返回相应时间精度
      </p>
      <p>可选精度值为 1(年份)|2(月份)|3(日)|4(时)|5(分)|6(秒)，如start=1,end=4，则从年面板开始选择，精确到小时面板关闭，并返回精确到小时的数据</p>
      <p>
        当设置时间范围选择参数
        <bui-badge size="24">range</bui-badge>
        时，将严格按照范围选择器精度执行，自定义精度参数无效
      </p>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">从年到秒</p>
        <bui-datetime v-model="value" start="1" end="6"></bui-datetime>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">从月到小时</p>
        <bui-datetime v-model="value" start="2" end="4"></bui-datetime>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">从日到分钟</p>
        <bui-datetime v-model="value" start="3" end="5"></bui-datetime>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-datetime v-model="value" start="1" end="6"><bui-btn>从年选到秒</bui-btn></bui-datetime>
<bui-datetime v-model="value" start="2" end="4"><bui-btn>从月到小时</bui-btn></bui-datetime> 
<bui-datetime v-model="value" start="3" end="5"><bui-btn>从日到分钟</bui-btn></bui-datetime></textarea
        >
      </bui-code>
      <!--自定义精度-->
      <!--主题样式-->
      <com-title title="主题样式" info="color"></com-title>
      <p>
        使用参数
        <bui-badge size="24">effect</bui-badge>
        ，
        <bui-badge size="24">colorname</bui-badge>
        ，
        <bui-badge size="24">size</bui-badge>
        ，
        <bui-badge size="24">width</bui-badge>
        ，
        <bui-badge size="24">radius</bui-badge>
        定义组件的主题样式、颜色和尺寸
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>主题样式：</span>
            <bui-btn-group v-model="effect" size="24">
              <option v-for="i in ['default', 'line']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>主题颜色：</span>
            <bui-btn-group v-model="colorname" size="24">
              <option v-for="i in $colorArray.filter(res => res !== 'white')" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>边角样式：</span>
            <bui-btn-group v-model="radius" size="24">
              <option v-for="i in ['default', 'fillet', 'pill']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>组件尺寸：</span>
            <bui-btn-group v-model="size" size="24">
              <option v-for="i in [12, 24, 32, 40, 48, 64, 72]" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>组件宽度：</span>
            <bui-btn-group v-model="width" size="24">
              <option v-for="i in ['auto', '20rem', '50%', '100%']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-datetime v-model="value" :effect="effect" :colorname="colorname" :size="size" :width="width" :radius="radius"></bui-datetime></div>
      <div><bui-datetime range="day" v-model="valueArray" :effect="effect" :colorname="colorname" :size="size" :width="width" :radius="radius"></bui-datetime></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 时间选择器 -->
<bui-datetime v-model="value" :effect="effect" :colorname="colorname" :size="size" :width="width"></bui-datetime>

<!-- 时间范围选择器 -->
<bui-datetime  v-model="valueArray" :effect="effect" :colorname="colorname" :size="size" :width="width" range="day"></bui-datetime></textarea
        >
      </bui-code>
      <!--主题样式-->
      <!-- 自定义内容 -->
      <com-title title="自定义内容" info="custom"></com-title>
      <p>
        可用参数
        <bui-badge size="24">custom</bui-badge>
        定义组件为自定义插槽模式，该模式将改为显示插槽的内容，可高度定制想要的效果
      </p>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">内容可以是一个按钮</p>
        <bui-datetime v-model="value" custom><bui-btn>我是一个 button</bui-btn></bui-datetime>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">也可以是一张图片</p>
        <bui-datetime v-model="value" custom><bui-img src="https://baidiui.com/demo/pic/pic001.jpg"></bui-img></bui-datetime>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">可以是随意的元素</p>
        <bui-datetime v-model="value" custom>
          <dl>
            <dt>我是标题</dt>
            <dd>内容内容内容内容内容内容</dd>
          </dl>
        </bui-datetime>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-datetime v-model="value" custom><bui-btn>我是一个按钮</bui-btn></bui-datetime></textarea></bui-code>
      <!-- 自定义内容 -->

      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'v-model', type: ['String', 'Number'], default: '无', info: '组件绑定数据' },
            { name: 'range', type: ['String'], default: 'null', info: '将组件设置未时间范围选择器，可选day(日)|month(月)|year(年)' },
            { name: 'start', type: ['String', 'Number'], default: '3', info: '组件起始面板精度' },
            { name: 'end', type: ['String', 'Number'], default: '3', info: '组件终止面板精度' },
            { name: 'effect', type: ['String'], default: 'default', info: '组件主题样式' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' },
            { name: 'size', type: ['Number'], default: '32', info: '组件高度，该值响应内部元素' },
            { name: 'width', type: ['String'], default: 'auto', info: '组件宽度' },
            { name: 'radius', type: ['String'], default: 'radius', info: '组件边角，可选 default(直角) | fillet(圆角) | pill(胶囊)' },
            { name: '@change', type: ['Function'], default: '()=>{}', info: '绑定数据发生变化时回调' }
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
      valueNull: null,
      value: '2020-12-31 15:30:45',
      valueArray: ['2020-01-01 00:00:00', '2020-12-31 23:59:59'],
      effect: 'default',
      colorname: 'red',
      radius: 'pill',
      size: 48,
      width: 'auto'
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style></style>
