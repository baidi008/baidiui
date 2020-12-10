<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--比例容器-->
      <com-title title="比例容器" info="ratio"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-ratio</bui-badge>
        构建一个比例容器组件，使用参数
        <bui-badge size="24">ratio</bui-badge>
        定义容器的比例，默认比例为'1:1'正方形。容器监听宽度变化后根据比例设定高度。
      </p>
      <template v-for="i in ['1:1', '4:3', '16:9', '21:9']">
        <div class="bui_col_3_md" :key="i">
          <bui-ratio :ratio="i" class="bui_bgc_silver bui_fc_white">
            <div class="bui_p_12 bui_fs_24">{{ i }}</div>
          </bui-ratio>
        </div>
      </template>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-ratio :ratio="'1:1'"></bui-ratio></textarea></bui-code>
      <!--比例容器-->
      <!-- 尺寸设置 -->
      <com-title title="尺寸设置" info="size"></com-title>
      <p>
        可通过参数
        <bui-badge size="24">width</bui-badge>
        、
        <bui-badge size="24">height</bui-badge>
        设置容器的宽度和高度，当设定了
        <bui-badge size="24">height</bui-badge>
        值时，比例参数
        <bui-badge size="24">ratio</bui-badge>
        将失效，容器也会固定高度
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>宽度：</span>
            <bui-btn-group v-model="width" size="24">
              <option v-for="i in ['400px', '20rem', '50%', '100%']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>高度：</span>
            <bui-btn-group v-model="height" size="24">
              <option v-for="i in ['', 320, 480, 640]" :key="i" :value="i">{{ !!i ? i : '无' }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>宽度：</span>
            <bui-btn-group v-model="ratio" size="24">
              <option v-for="i in [null, '1:1', '4:3', '16:9', '21:9']" :key="i" :value="i">{{ !!i ? i : '无' }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div>
        <bui-ratio :width="width" :height="height" :ratio="ratio" class="bui_bgc_silver bui_fc_white">
          <p class="bui_p_12 bui_fs_12" v-text="{ width: width, height: height, ratio: ratio }"></p>
        </bui-ratio>
      </div>
      <!-- 尺寸设置 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'ratio', type: ['String'], default: '1:1', info: '容器比例' },
            { name: 'width', type: ['String'], default: '100%', info: '容器宽度，支持单位px | rem | em | %' },
            { name: 'height', type: ['Number'], default: 'null', info: '容器高度，当设置该属性时，raito无效，容器固定高度' },
            { name: '@change', type: ['Function'], default: '()=>{}', info: '容器尺寸发生变化时回掉，返回$event为尺寸信息' }
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
      width: '20rem',
      height: '',
      ratio: '16:9'
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
