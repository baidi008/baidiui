<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--按钮组-->
      <com-title title="按钮组" info="btnGroup"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-btn-group</bui-badge>
        构成一个单选按钮组，选项可通过参数
        <bui-badge size="24">options</bui-badge>
        或插槽
        <bui-badge size="24">option</bui-badge>
        生成
      </p>
      <div><bui-btn-group v-model="value" :options="options"></bui-btn-group></div>
      <p>具体使用方法请参考以下代码</p>

      <bui-code>
        <textarea>
<template>
  <div>
    <!-- 使用参数options -->
    <bui-btn-group v-model="value" :options="options"></bui-btn-group>

    <!-- 使用插槽option -->
    <bui-btn-group v-model="value">
      <option :value="1">北京</option>
      <option :value="2">上海</option>
      <option :value="3">广州</option>
      <option :value="4">深圳</option>
      <option :value="5">杭州</option>
    </bui-btn-group>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 3,
        options: [{ label: '北京', value: 1 }, { label: '上海', value: 2 }, { label: '广州', value: 3 }, { label: '深圳', value: 4 }, { label: '杭州', value: 5 }]
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!-- 按钮组 -->
      <!-- 状态 -->
      <com-title title="状态" info="style"></com-title>
      <p>
        可通过参数
        <bui-badge size="24">disabled</bui-badge>
        定义组件的禁用状态
      </p>
      <div>
        <div class="bui_row_p_12 ">
          <div class="bui_vm">
            <span>disabled：</span>
            <bui-btn-group v-model="disabled" size="24">
              <option v-for="i in [true, false]" :value="i" :key="i">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-btn-group v-model="value" :options="options" :disabled="disabled"></bui-btn-group></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-btn-group v-model="value" :options="options" :disabled="true"></bui-btn-group></textarea></bui-code>
      <!-- 状态 -->
      <!-- 样式 -->
      <com-title title="样式" info="style"></com-title>
      <p>
        可通过参数
        <bui-badge size="24">colorname</bui-badge>
        ，
        <bui-badge size="24">size</bui-badge>
        ，
        <bui-badge size="24">radius</bui-badge>
        定义组件的主题颜色，尺寸和边角样式
      </p>
      <div>
        <div class="bui_row_p_12 ">
          <div class="bui_vm">
            <span>尺寸：</span>
            <bui-btn-group v-model="size" size="24">
              <option v-for="i in [12, 24, 32, 48, 64, 72, 96]" :value="i" :key="i">{{ i + 'px' }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>颜色：</span>
            <bui-btn-group v-model="colorname" size="24">
              <option v-for="i in $colorArray" :value="i" v-if="i != 'white'" :key="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>圆角：</span>
            <bui-btn-group v-model="radius" size="24">
              <option v-for="i in ['default', 'fillet', 'pill']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-btn-group v-model="value" :size="size" :colorname="colorname" :radius="radius" :options="options"></bui-btn-group></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-btn-group v-model="value" :size="12" :width="'100%'" :colorname="'red'" :radius="'round'" :options="options"></bui-btn-group></textarea></bui-code>
      <!-- 样式 -->
      <!-- 事件 -->
      <com-title title="事件" info="event"></com-title>
      <p>
        可通过参数
        <bui-badge size="24">@change</bui-badge>
        定义组件绑定数据变化时回调
      </p>
      <div><bui-btn-group v-model="value" :options="options" @change="$message({ content: '数据发生变化，当前选中项为：' + JSON.stringify($event) })"></bui-btn-group></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-btn-group v-model="value" :options="options" @change="$message({ content: '数据发生变化，当前选中项为：' + JSON.stringify($event) })"></bui-btn-group></textarea
        >
      </bui-code>
      <!-- 事件 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'v-model', type: ['String', 'Number'], default: '无', info: '组件绑定数据' },
            { name: 'disabled', type: ['Boolean'], default: 'false', info: '是否禁用组件' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' },
            { name: 'size', type: ['Number'], default: 32, info: '组件高度（响应内部元素尺寸）' },
            { name: 'width', type: ['String'], default: 'auto', info: '组件宽度（支持px,%,em,rem,rpx,具体请参考css尺寸值）' },
            { name: 'radius', type: ['String'], default: 'default', info: '组件边角，可选 default(直角) | fillet(圆角) | pill(胶囊)' },
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
      value: 3,
      size: 48,
      width: 'auto',
      disabled: false,
      colorname: 'red',
      radius: 'fillet',
      bright: 'light',
      options: [{ label: '北京', value: 1 }, { label: '上海', value: 2 }, { label: '广州', value: 3 }, { label: '深圳', value: 4 }, { label: '杭州', value: 5 }]
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
