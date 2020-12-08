<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--环形进度条-->
      <com-title title="环形进度条" info="progress-o"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-progress-o</bui-badge>
        构建一个环形进度条容器，使用参数value定义环形进度条的百分比，范围0-1，可超过1
      </p>
      <div class="bui_vm">
        <span>百分比值：</span>
        <bui-input v-model="value" type="number" step="0.1" size="24"></bui-input>
      </div>
      <div><bui-progress-o :value="value"></bui-progress-o></div>
      <div>
        <bui-code language="xml"><textarea><bui-progress-o :value="value"></bui-progress-o></textarea></bui-code>
      </div>
      <!--环形进度条-->
      <!--主题样式-->
      <com-title title="主题样式" info="style"></com-title>
      <p>
        使用参数
        <bui-badge size="24">colorname</bui-badge>
        ，
        <bui-badge size="24">size</bui-badge>
        定义组件的颜色和尺寸，从而获得更多自由样式
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>组件尺寸：</span>
            <bui-btn-group v-model="width" size="24">
              <option v-for="i in ['12rem', '24rem', '320px', '50%', '100%']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>组件颜色：</span>
            <bui-btn-group v-model="colorname" size="24">
              <option v-for="i in $colorArray.filter(res => res !== 'white')" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-progress-o :value="value" :width="width" :colorname="colorname"></bui-progress-o></div>
      <div>
        <bui-code language="xml"><textarea><bui-progress-o :value="value" :width="width" :colorname="colorname"></bui-progress-o></textarea></bui-code>
      </div>
      <!--主题样式-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'value', type: ['Number'], default: '0', info: '组件进度数值，0-1表示0%-100%，可小于0或大于1' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' },
            { name: 'size', type: ['Number'], default: '24', info: '组件高度，此参数影响内部元素从而整体改变尺寸' }
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
    return { width: '12rem', colorname: 'purple', value: 0.5 }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
