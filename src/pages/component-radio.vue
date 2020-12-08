<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--单选框-->
      <com-title title="单选框" info="radio"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-radio</bui-badge>
        构造一个单选框，绑定v-mode即可进行数据操作，可使用参数
        <bui-badge size="24">disabled=true</bui-badge>
        定义该单选框为禁用
      </p>
      <div>
        <template v-for="data in items">
          <bui-radio :key="data.id" v-model="value" :value="data.name" :disabled="data.disabled">{{ data.name }}</bui-radio>
        </template>
      </div>
      <p>具体使用方式请参考下方代码</p>
      <bui-code>
        <textarea>
<template>
   <div>
     <bui-radio v-model="value" value="北京">北京</bui-radio>
     <bui-radio v-model="value" value="上海">上海</bui-radio>
     <bui-radio v-model="value" value="广州" :disabled="true">广州</bui-radio>
     <bui-radio v-model="value" value="深圳">深圳</bui-radio>
     <bui-radio v-model="value" value="杭州">杭州</bui-radio>
   </div>
 </template>
 
 <script>
   export default {
     data() {
       return { value: '深圳' }
     }
   }
 </script></textarea
        >
      </bui-code>
      <!--单选框-->
      <!-- 颜色&尺寸 -->
      <com-title title="颜色&尺寸" info="color & size"></com-title>
      <p>
        使用
        <bui-badge size="24" class="bui_m_6_r">colorname</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">size</bui-badge>
        参数定义组件的颜色和尺寸
      </p>
      <div>
        <div class="bui_row_p_12">
          <div>
            颜色：
            <bui-btn-group v-model="colorname" size="24">
              <option v-for="i in $colorArray.filter(res => res !== 'white' && res !== 'silver')" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div>
            尺寸：
            <bui-btn-group v-model="size" size="24">
              <option v-for="i in [8, 12, 16, 24, 32, 48, 64]" :key="i" :value="i">{{ i }}px {{ i < 12 || i > 48 ? '无效尺寸' : '' }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div>
        <template v-for="item in items">
          <bui-radio v-model="value" :value="item.name" :colorname="colorname" :size="size">{{ item.name }}</bui-radio>
        </template>
      </div>
      <p>
        颜色配置具体参考
        <router-link to="/methods/methods-setColor" class="bui_fc_turquoise">预设颜色</router-link>
        ，直接输入参数，例如：'green'、'red,f,24'
      </p>
      <p>尺寸类型为Number，允许值在12-48之间，小于或超过区间值，将会取最小数或最大数</p>
      <p>具体使用方式请参考下方代码</p>
      <bui-code><textarea><bui-radio v-model="value" value="北京" :size="24" colorname="red">北京</bui-radio></textarea></bui-code>
      <!-- 颜色&尺寸 -->
      <!--外部操作-->
      <com-title title="外部操作状态" info="status"></com-title>
      <p>
        使用参数
        <bui-badge size="24">status</bui-badge>
        控制组件的状态，可选项为 0(非激活) | 1(激活)，该功能常用于外部元素操作单选框的活动状态，要使得该参数生效，请不要绑定输入v-model，也不要设置value
      </p>
      <div>
        <bui-btn-group v-model="status" size="24">
          <option v-for="i in [0, 1]" :key="i" :value="i">{{ 'status=' + i }}</option>
        </bui-btn-group>
      </div>
      <div><bui-radio :status="status"></bui-radio></div>

      <div>
        <bui-code>
          <textarea>
<template>
  <div>
    <!-- 操作 -->
    <bui-radio v-model="status" :value="0">非激活</bui-radio>
    <bui-radio v-model="status" :value="1">激活</bui-radio>
    <!-- 操作 -->

    <!-- 响应单选框 -->
    <bui-radio :status="status"></bui-radio>
    <!-- 响应单选框 -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        status: 0
      }
    }
  }
</script></textarea
          >
        </bui-code>
      </div>
      <!--外部操作-->
      <!--传入对象-->
      <com-title title="传入对象" info="value is Object"></com-title>
      <p>
        当value为对象时，可使用参数
        <bui-badge size="24">bindkey</bui-badge>
        指定关联的key，绑定值v-model只需对应上value内指定的key值，即可判断为选中。该参数默认值为"id"
      </p>
      <div><bui-btn @click="valueObject = { id: 1 }">点击将结果设置为"{id:1}"</bui-btn></div>
      <div>
        <template v-for="data in items">
          <bui-radio :key="data.id" v-model="valueObject" :value="data" bindkey="id">{{ data.name }}</bui-radio>
        </template>
      </div>
      <div><bui-code :model="valueObject"></bui-code></div>
      <div>
        <bui-code><textarea v-pre><bui-radio v-model="数据路径" :value="{ id: 1, name: '北京', code: 'Beijing' }" bindkey="id">显示文本</bui-radio></textarea></bui-code>
      </div>
      <!--传入对象-->
      <!--监听操作-->
      <com-title title="监听操作" info="event"></com-title>
      <p>
        使用参数
        <bui-badge size="24">@change</bui-badge>
        定义绑定值值变化时回调函数，返回当前值
      </p>
      <div>
        <div class="bui_row_p_12">
          <div>
            <template v-for="data in items">
              <bui-radio :key="data.id" v-model="value" :value="data.name" @change="$msg({ content: '已选中' + $event })">{{ data.name }}</bui-radio>
            </template>
          </div>
        </div>
      </div>
      <div>
        <bui-code><textarea v-pre><bui-radio v-model="value" @change="$msg({ content: '已选中' + $event })">上海</bui-radio></textarea></bui-code>
      </div>
      <!--监听操作-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'v-model', type: ['String', 'Number', 'Object'], default: '', info: '组件绑定数据' },
            { name: 'disabled', type: ['Boolean'], default: 'false', info: '是否禁用组件' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' },
            { name: 'size', type: ['Number'], default: 32, info: '组件高度（响应内部元素尺寸）' },
            { name: '@change', type: ['Function'], default: '(e)=>{}', info: '组件绑定数据变化时回掉，返回当前绑定数据' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" :key="type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- public props -->
      <!-- slots -->
      <com-title title="插槽" info="slots"></com-title>
      <div>
        <bui-table :columns="$columnsSlots" :data="[{ name: 'default', default: '无', info: '单选框后显示文本' }]" class="bui_fs_12">
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" :key="type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- slots -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorname: 'red',
      size: 24,
      status: 0,
      value: '深圳',
      valueObject: { id: 3 },
      items: [
        {
          id: 1,
          name: '北京',
          code: 'Beijing'
        },
        {
          id: 2,
          name: '上海',
          code: 'Shanghai'
        },
        {
          id: 3,
          name: '广州',
          code: 'Guangzhou',
          disabled: true
        },
        {
          id: 4,
          name: '深圳',
          code: 'Shenzhen'
        },
        {
          id: 5,
          name: '杭州',
          code: 'Hangzhou'
        }
      ]
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
