<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--选择框-->
      <com-title title="选择框" info="select"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-select</bui-badge>
        构造一个下拉选择器，选项可通过参数
        <bui-badge size="24">options</bui-badge>
        或插槽
        <bui-badge size="24">option</bui-badge>
        设置
      </p>
      <div class="bui_col_6_md"><bui-select v-model="value" :options="options"></bui-select></div>
      <p>具体使用方法请见下方代码</p>
      <div>
        <bui-code>
          <textarea>
<template>
  <div>
      <!-- 传参设置选项 -->
      <bui-select v-model="value" :options="options"></bui-select>
      
      <!-- 插槽设置选项 -->
      <bui-select v-model="value">
        <option :value="1">options-1</option>
        <option :value="2">options-2</option>
        <option :value="3">options-3</option>
        <option :value="4">options-4</option>
        <option :value="5">options-5</option>
      </bui-select>
      
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          { label: 'options-1', value: 1 },
          { label: 'options-2', value: 2 },
          { label: 'options-3', value: 3 },
          { label: 'options-4', value: 4 },
          { label: 'options-5', value: 5 }
        ]
      }
    }
  }
</script></textarea
          >
        </bui-code>
      </div>
      <!--选择框-->
      <!--复选-->
      <com-title title="复选" info="select"></com-title>
      <p>
        使用参数
        <bui-badge size="24">type=checkbox</bui-badge>
        将选择器定义为复选，使用复选选择器时，要将v-model绑定值设为数组Array，否则可能报错
      </p>
      <div><bui-select v-model="valueArray" :options="options" type="checkbox"></bui-select></div>
      <p>具体使用方法请见下方代码</p>
      <bui-code><textarea><bui-select v-model="绑定数据" :options="options" type="checkbox"></bui-select></textarea></bui-code>
      <!--复选-->
      <!--快速筛选-->
      <com-title title="快速筛选" info="search"></com-title>
      <p>
        当选项过多时，可使用参数
        <bui-badge size="24">search</bui-badge>
        开启选择器筛选输入框。
      </p>
      <div class="bui_col_6_md"><bui-select v-model="value" :options="options" search width="100%"></bui-select></div>
      <div class="bui_col_6_md"><bui-select v-model="valueArray" :options="options" type="checkbox" search width="100%"></bui-select></div>
      <p>具体使用方法请见下方代码</p>
      <bui-code><textarea><bui-select v-model="绑定数据" :options="options" search></bui-select></textarea></bui-code>
      <!--快速筛选-->
      <!-- 状态 -->
      <com-title title="状态" info="status"></com-title>
      <p>
        使用参数
        <bui-badge size="24">readonly</bui-badge>
        或
        <bui-badge size="24">disabled</bui-badge>
        可定义选择器的只读或禁用状态
      </p>
      <template v-for="i in ['default', 'readonly', 'disabled']">
        <div :key="i" class="bui_col_4_md">
          <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">{{ i }} select</p>
          <bui-select v-model="value" :options="options" :readonly="i === 'readonly'" :disabled="i === 'disabled'" width="100%"></bui-select>
        </div>
      </template>
      <p>具体使用方法请见下方代码</p>
      <bui-code>
        <textarea>
<bui-select v-model="value" :options="options"></bui-select> // 默认
<bui-select v-model="value" :options="options" :readonly="true"></bui-select> // 只读
<bui-select v-model="value" :options="options" :disabled="true"></bui-select> // 禁用</textarea
        >
      </bui-code>
      <!-- 状态 -->
      <!--颜色应用-->
      <com-title title="颜色应用" info="color"></com-title>
      <p>
        使用参数
        <bui-badge size="24">colorname</bui-badge>
        可设置选择器的高亮边框颜色
      </p>
      <template v-for="i in $colorArray.filter(res => res !== 'white')">
        <div :key="i" class="bui_col_3_md">
          <p class="bui_fs_12 bui_p_6_b" :class="'bui_fc_' + i">{{ i }}</p>
          <bui-select v-model="value" :options="options" width="100%" :colorname="i"></bui-select>
        </div>
      </template>
      <p>具体使用方法请见下方代码</p>
      <bui-code><textarea><bui-select v-model="value" :options="options" :colorname="'red'"></bui-select></textarea></bui-code>
      <!--颜色应用-->
      <!--尺寸-->
      <com-title title="尺寸" info="size"></com-title>
      <p>
        使用参数
        <bui-badge size="24">size</bui-badge>
        可设置选择器的高度（该值响应内部元素尺寸）；使用参数
        <bui-badge size="24">width</bui-badge>
        设置选择器宽度
      </p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <div>
            <bui-btn-group v-model="size" size="24">
              <template v-for="i in [24, 32, 48]">
                <option :key="i" :value="i">size="{{ i }}"</option>
              </template>
            </bui-btn-group>
          </div>
          <div>
            <bui-btn-group v-model="width" size="24">
              <template v-for="i in ['auto', '20rem', '400px', '100%']">
                <option :key="i" :value="i">width="{{ i }}"</option>
              </template>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-select v-model="value" :options="options" :size="size" :width="width"></bui-select></div>
      <p>具体使用方法请见下方代码</p>
      <bui-code><textarea><bui-select v-model="value" :options="options" :size="32" width="12rem"></bui-select></textarea></bui-code>
      <!--尺寸-->
      <!--圆角-->
      <com-title title="圆角" info="radius"></com-title>
      <p>
        使用参数
        <bui-badge size="24" class="bui_m_6_r">radius</bui-badge>
        来定义边框样式，可选值为 default(直角) | fillet(圆角) | pill(圆形)
      </p>
      <div>
        <bui-btn-group v-model="radius" size="24">
          <option v-for="i in ['default', 'fillet', 'pill']" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div class="bui_col_4_md"><bui-select v-model="value" :options="options" :radius="radius"></bui-select></div>
      <div>
        <bui-code language="xml"><textarea><bui-input v-model="绑定数据" radius="radius"></bui-input></textarea></bui-code>
      </div>
      <!--圆角-->
      <!--标题-->
      <com-title title="标题" info="title"></com-title>
      <p>
        使用参数
        <bui-badge size="24">title</bui-badge>
        可设置选择器的标题
      </p>
      <div><bui-select v-model="value" :options="options" title="选择器标题"></bui-select></div>
      <p>具体使用方法请见下方代码</p>
      <bui-code><textarea><bui-select v-model="value" :options="options" title="选择器标题"></bui-select></textarea></bui-code>
      <!--标题-->
      <!--事件-->
      <com-title title="事件" info="event"></com-title>
      <p>
        使用事件
        <bui-badge size="24" class="bui_m_6_r">@open</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">@close</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">@change</bui-badge>
        可定义选择器 打开、关闭、改变值的时间回调
      </p>
      <div class="bui_col_6_md">
        <bui-select v-model="value" type="radio" :options="options" @open="eventOpen" @close="eventClose" @change="eventChange" width="100%"></bui-select>
      </div>
      <div class="bui_col_6_md">
        <bui-select v-model="valueArray" type="checkbox" :options="options" @open="eventOpen" @close="eventClose" @change="eventChange" width="100%"></bui-select>
      </div>

      <p>具体使用方法请见下方代码</p>

      <bui-code>
        <textarea>
<template>
  <bui-select v-model="value" :options="options" @open="open" @close="close" @change="change"></bui-select>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          { label: 'options-1', value: 1 },
          { label: 'options-2', value: 2 },
          { label: 'options-3', value: 3 },
          { label: 'options-4', value: 4 },
          { label: 'options-5', value: 5 }
        ]
      }
    },
    methods: {
      open(res) {
        // 打开选择器回调
        console.log(res)
      },
      close(res) {
        // 关闭选择器回调
        console.log(res)
      },
      change(res) {
        // 值发生变化回调
        console.log(res)
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!--事件-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'v-model', type: ['String', 'Number'], default: '', info: '选择器绑定数据' },
            { name: 'placeholder', type: ['String'], default: '', info: '选择器为空时提示文本' },
            { name: 'type', type: ['String'], default: 'radio', info: '选择器类型，可选 radio(单选) | checkbox(复选)' },
            { name: 'disabled', type: ['Boolean'], default: 'false', info: '禁用选择器' },
            { name: 'readonly', type: ['Boolean'], default: 'false', info: '将选择器设为只读' },
            { name: 'title', type: ['String'], default: 'null', info: '选择器标题' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '选择器高亮边框颜色' },
            { name: 'size', type: ['Number'], default: 32, info: '选择器高度（响应内部元素尺寸）' },
            { name: 'width', type: ['String'], default: '12rem', info: '选择器宽度（支持px,%,em,rem,rpx,具体请参考css尺寸值）' },
            { name: 'radius', type: ['String'], default: 'radius', info: '选择器边角，可选 default(无弧度) | fillet(圆角) | pill(圆形)' },
            { name: 'search', type: ['Boolean'], default: 'true', info: '是否开启简单筛选功能' },
            { name: '@open', type: ['Function'], default: '()=>{}', info: '打开选择器回调' },
            { name: '@close', type: ['Function'], default: '()=>{}', info: '关闭选择器回调' },
            { name: '@change', type: ['Function'], default: '()=>{}', info: '值发生变化时回掉' }
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
      value: 9,
      valueArray: [1, 2, 3],
      options: [],
      colorname: 'turquoise',
      size: 48,
      width: 'auto',
      radius: 'pill'
    }
  },
  methods: {
    eventOpen(res) {
      this.$msg({ content: '选择器已打开', type: 'info' })
    },
    eventClose(res) {
      this.$msg({ content: '选择器已关闭', type: 'warning' })
    },
    eventChange(res) {
      this.$msg({ content: '数据发生变化，当前值为' + res, type: 'success' })
    }
  },
  mounted() {
    for (var i = 1; i < 10; i++) {
      this.options.push({ label: 'options-' + i, value: i })
    }
  }
}
</script>

<style></style>
