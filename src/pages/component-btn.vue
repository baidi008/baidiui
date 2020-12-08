<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--按钮-->
      <com-title title="按钮" info="button type"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-btn</bui-badge>
        构造一个按钮，使用参数
        <bui-badge size="24">type</bui-badge>
        指定几种常用状态
      </p>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div v-for="i in ['default', 'success', 'info', 'waring', 'error']" :key="i">
            <bui-btn :type="i">{{ i }}</bui-btn>
          </div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-btn>default</bui-btn>
<bui-btn type="success">success</bui-btn>
<bui-btn type="info">info</bui-btn>
<bui-btn type="waring">waring</bui-btn>
<bui-btn type="error">error</bui-btn></textarea
        >
      </bui-code>
      <!--按钮-->
      <!--颜色-->
      <com-title title="颜色" info="mode & color"></com-title>
      <p>
        使用参数
        <bui-badge size="24">mode</bui-badge>
        指定按钮配色类型，参数
        <bui-badge size="24">colorname</bui-badge>
        指定按钮的预设颜色
      </p>

      <p class="bui_fc_red">(注意，当设置有效的 type 参数时，mode 参数和 colorname 参数将全部失效)</p>
      <div class="bui_vm">
        <span>配色方案：</span>
        <bui-btn-group v-model="mode" size="24">
          <option v-for="i in ['default', 'light', 'dark', 'link']" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <p class="bui_fs_12 bui_fc_silver_d bui_p_6_b">配色方案：{{ mode }} {{ mode === 'default' ? '鼠标放上来试试' : '' }}</p>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div v-for="i in $colorArray.filter(res => res !== 'white')" :key="i">
            <bui-btn :colorname="i" :mode="mode">{{ i }}</bui-btn>
          </div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-btn colorname="green">default</bui-btn>
<bui-btn mode="light" colorname="green">default</bui-btn>
<bui-btn mode="dark" colorname="green">default</bui-btn></textarea
        >
      </bui-code>
      <!--颜色-->
      <!--尺寸-->
      <com-title title="尺寸" info="size"></com-title>
      <p>
        使用参数
        <bui-badge size="24">size</bui-badge>
        设置按钮的高度（内部元素响应该值），参数
        <bui-badge size="24">width</bui-badge>
        设置按钮的宽度，需填入px，em，rem，%等有效的html尺寸单位
      </p>
      <p>值范围区间在24-64之间，不足或超过将取最小值或最大值</p>
      <div class="bui_vm">
        <span>设置高度：</span>
        <bui-btn-group v-model="size" size="24">
          <option v-for="i in [24, 32, 40, 48, 64, 72, 96]" :key="i" :value="i">{{ i + 'px' }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div v-for="i in ['default', 'success', 'info', 'waring', 'error']" :key="i">
            <bui-btn :type="i" :size="size">{{ i }}</bui-btn>
          </div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-btn :size="32">default</bui-btn></textarea></bui-code>
      <!--尺寸-->
      <!--圆角-->
      <com-title title="圆角" info="size"></com-title>
      <p>
        使用参数
        <bui-badge size="24">radius</bui-badge>
        设置按钮的边角样式
      </p>
      <div class="bui_vm">
        <span>设置边角：</span>
        <bui-btn-group v-model="radius" size="24">
          <option v-for="i in ['default', 'fillet', 'pill']" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div v-for="i in ['default', 'success', 'info', 'waring', 'error']" :key="i">
            <bui-btn :type="i" :radius="radius">{{ i }}</bui-btn>
          </div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-btn :radius="round">胶囊</bui-btn></textarea></bui-code>
      <!--圆角-->
      <!--状态-->
      <com-title title="状态" info="size"></com-title>
      <p>
        使用参数
        <bui-badge size="24">disabled</bui-badge>
        定义按钮为禁用状态，参数
        <bui-badge size="24">loading</bui-badge>
        定义按钮为加载中状态；这两种状态按钮均不响应任何交互以及事件
      </p>
      <div class="bui_vm">
        <span>disabled：</span>
        <bui-switch v-model="disabled" size="24"></bui-switch>
      </div>
      <div class="bui_vm">
        <span>loading：</span>
        <bui-switch v-model="loading" size="24"></bui-switch>
      </div>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div v-for="i in ['default', 'success', 'info', 'waring', 'error']" :key="i">
            <bui-btn :type="i" :disabled="disabled" :loading="loading">{{ i }}</bui-btn>
          </div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-btn :size="32">default</bui-btn></textarea></bui-code>
      <!--状态-->
      <!--事件监听-->
      <com-title title="事件监听" info="event"></com-title>
      <p>
        设置参数
        <bui-badge size="24">@click</bui-badge>
        定义组件点击后回调函数
      </p>
      <div><bui-btn @click="$message({ content: '已点击' })">click</bui-btn></div>
      <div>
        <bui-code><textarea><bui-btn @click="$alert({content:'已点击'})">click</bui-btn></textarea></bui-code>
      </div>
      <!--事件监听-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'type', type: ['String'], default: 'default', info: '组件常态 可选 default | success | info | waring | error' },
            { name: 'disabled', type: ['Boolean'], default: 'false', info: '是否禁用组件' },
            { name: 'loading', type: ['Boolean'], default: 'false', info: '组件是否为加载中状态' },
            { name: 'mode', type: ['String'], default: 'default', info: '组件配色方案，可选default | light | dark' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' },
            { name: 'size', type: ['Number'], default: 32, info: '组件高度（响应内部元素尺寸）' },
            { name: 'width', type: ['String'], default: 'auto', info: '组件宽度（支持px,%,em,rem,rpx,具体请参考css尺寸值）' },
            { name: 'radius', type: ['String'], default: 'default', info: '组件边角，可选 default(直角) | fillet(圆角) | pill(胶囊)' },
            { name: '@click', type: ['Function'], default: '()=>{}', info: '组件点击后回调' }
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
      mode: 'dark',
      size: 48,
      disabled: false,
      loading: false,
      colorname: 'turquoise',
      radius: 'pill'
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style></style>
