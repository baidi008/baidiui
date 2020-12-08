<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--开关-->
      <com-title title="开关" info="switch"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-switch</bui-badge>
        构造一个开关，绑定v-mode即可进行数据操作，可使用参数
        <bui-badge size="24">disabled</bui-badge>
        或
        <bui-badge size="24">readonly</bui-badge>
        定义该单选框状态为禁用活只读
      </p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <div v-for="i in ['default', 'disabled', 'readonly']" :key="i">
            <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">{{ i }}</p>
            <bui-switch v-model="value" class="bui_m_6_r" :disabled="i === 'disabled'" :readonly="i === 'readonly'"></bui-switch>
          </div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  <div>
    <bui-switch v-model="value"></bui-switch> <!-- 默认 -->
    <bui-switch v-model="value" disabled></bui-switch> <!-- 禁用 -->
    <bui-switch v-model="value" readonly></bui-switch> <!-- 只读 -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!--开关-->
      <!--样式-->
      <com-title title="样式" info="style"></com-title>
      <p>
        组件提供多个参数定义控制样式效果， 尺寸：
        <bui-badge size="24">size</bui-badge>
        ， 颜色：
        <bui-badge size="24">colorname</bui-badge>
        ， 阴影：
        <bui-badge size="24">shadow</bui-badge>
        ， 圆角：
        <bui-badge size="24">radius</bui-badge>
        ，
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>尺寸：</span>
            <bui-btn-group v-model="size" size="24">
              <option v-for="data in [12, 24, 32, 48, 96]" :key="data" :value="data">{{ data + 'px' }}</option>
            </bui-btn-group>
            <span>允许范围12-96，超过区间会自动获取最小值或最大值</span>
          </div>
          <div class="bui_vm">
            <span>颜色：</span>
            <bui-btn-group v-model="colorname" size="24">
              <option v-for="data in $colorArray" :value="data" v-if="data != 'white'">{{ data }}</option>
            </bui-btn-group>
            <span>请参考</span>
            <router-link to="/methods/methods-setColor" class="bui_fc_turquoise">预设颜色</router-link>
          </div>
          <div class="bui_vm">
            <span>阴影：</span>
            <bui-btn-group v-model="shadow" size="24">
              <option v-for="data in [true, false]" :value="data">{{ data ? 'shadow on' : 'shadow off' }}</option>
            </bui-btn-group>
            <span>可选值 true(开启) | false(关闭)</span>
          </div>
          <div class="bui_vm">
            <span>圆角：</span>
            <bui-btn-group v-model="radius" size="24">
              <option v-for="data in [false, 'fillet', 'pill']" :key="data" :value="data">{{ data || 'false' }}</option>
            </bui-btn-group>
            <span>可选值 'default'(直角) | 'fillet'(圆角) | 'pill'(胶囊)</span>
          </div>
        </div>
      </div>
      <div><bui-switch v-model="value" :size="size" :colorname="colorname" :radius="radius" :shadow="shadow"></bui-switch></div>
      <div>
        <bui-code><textarea><bui-switch v-model="value" size="32" colorname="red" round="round" :shadow="false"></bui-switch></textarea></bui-code>
      </div>
      <!--样式-->

      <!--绑定值-->
      <com-title title="绑定值" info="bind value"></com-title>
      <p>
        可用参数
        <bui-badge size="24">value-true</bui-badge>
        和
        <bui-badge size="24">value-false</bui-badge>
        定组件的选中和非选中值，类型可为 Boolean | String | Number
      </p>
      <div>
        <div class="bui_row_p_48 bui_inline">
          <template v-for="(i, index) in [[true, false], [3, 4], ['男', '女']]">
            <div :key="index">
              <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">{{ i }}</p>

              <bui-switch v-model="value" :value-true="i[0]" :value-false="i[1]"></bui-switch>
            </div>
          </template>
        </div>
      </div>
      <div>
        <div class="bui_row_p_12">
          <p>外部操作绑定值也能响应</p>
          <div>
            <template v-for="(i, index) in [true, 3, '男']">
              <bui-btn :key="index" @click="value = i" size="24" class="bui_m_6_r">{{ i }}</bui-btn>
            </template>
          </div>
        </div>
      </div>
      <div><bui-code :model="value"></bui-code></div>
      <div>
        <bui-code>
          <textarea>
<bui-switch v-model="数据路径" :value-true="true" :value-false="false"></bui-switch>
<bui-switch v-model="数据路径" :value-true="3" :value-false="4"></bui-switch>
<bui-switch v-model="数据路径" :value-true="'男'" :value-false="'女'"></bui-switch></textarea
          >
        </bui-code>
      </div>
      <!--绑定值-->
      <!--事件监听-->
      <com-title title="事件监听" info="event"></com-title>
      <p>
        可使用参数
        <bui-badge size="24">@change</bui-badge>
        ,
        <bui-badge size="24">@check</bui-badge>
        ,
        <bui-badge size="24">@uncheck</bui-badge>
        定义组件数据变化、选中、非选中事件
      </p>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div>
            <bui-switch
              v-model="value"
              @check="$msg({ content: '已选中', type: 'success' })"
              @uncheck="$msg({ content: '已取消', type: 'error' })"
              @change="$msg({ content: '绑定数据变更为' + $event })"
            ></bui-switch>
          </div>
        </div>
      </div>

      <div>
        <bui-code>
          <textarea>
<bui-switch
  v-model="value"
  @check="$msg({ content: '已选中', type: 'success' })"
  @uncheck="$msg({ content: '已取消', type: 'error' })"
  @change="$msg({ content: '绑定数据变更为' + $event })"
></bui-switch></textarea
          >
        </bui-code>
      </div>
      <!--事件监听-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'v-model', type: ['String', 'Number'], default: '', info: '组件绑定数据' },
            { name: 'disabled', type: ['Boolean'], default: 'false', info: '禁用组件' },
            { name: 'readonly', type: ['Boolean'], default: 'false', info: '将组件设为只读' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件高亮边框颜色' },
            { name: 'size', type: ['Number'], default: 32, info: '组件高度（响应内部元素尺寸）' },
            { name: 'radius', type: ['String'], default: 'default', info: '组件边角，可选 default(直角) | fillet(圆角) | pill(胶囊)' },
            { name: 'shadow', type: ['Boolean'], default: 'false', info: '组件阴影，可选 true(有阴影) | false(扁平化)' },
            { name: '@change', type: ['Function'], default: '()=>{}', info: '绑定数据变化时回调' },
            { name: '@check', type: ['Function'], default: '()=>{}', info: '打开开关时回调' },
            { name: '@uncheck', type: ['Function'], default: '()=>{}', info: '关闭开关时回调' }
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
      value: true,
      colorname: 'turquoise',
      size: 48,
      radius: 'pill',
      shadow: true,
      disabled: true
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
