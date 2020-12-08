<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--模态对话框-->
      <com-title title="模态对话框" info="modal"></com-title>
      <p>构建并打开一个基础网页对话框，常用于消息提示或交互对话</p>
      <div><bui-btn @click="alert()">alert 消息提示</bui-btn></div>
      <bui-code language="js">
        <pre>
// alert
this.$alert({
  title:'消息', // 标题 默认值为“消息”
  content:'内容', // 弹窗文字内容
  success:function(){
    // 点击确定按钮回调
  }
})</pre
        >
      </bui-code>

      <div class="bui_p_12_b"><bui-btn @click="confirm()">confirm 交互对话</bui-btn></div>
      <bui-code language="js">
        <pre>
// confirm
this.$confirm({
  title:'消息', // 标题 默认值为“消息”
  content:'内容', // 弹窗文字内容
  success:function(){
    // 点击确定按钮回调
  },
  cancel:function(){
    // 点击取消按钮回调
  }
})</pre
        >
      </bui-code>

      <!--模态对话框-->
      <!--位置-->
      <com-title title="位置" info="position"></com-title>
      <p>
        可用参数
        <bui-badge size="24">position</bui-badge>
        指定对话框弹出位置，目前提供上(top)、中(center)、下(bottom)三个位置展示
      </p>
      <div>
        <div class="bui_row_p_6 bui_inline">
          <template v-for="position in ['top', 'center', 'bottom']">
            <div>
              <bui-btn @click="alert({ content: '位置在' + position, positions: position })">{{ position }}</bui-btn>
            </div>
          </template>
        </div>
      </div>

      <bui-code language="js">
        <pre>
// alert
this.$alert({
  title:'消息', // 标题 默认值为“消息”
  content:'内容', // 弹窗文字内容
  positions:'top', // 打开位置，可选top|center|top
})</pre
        >
      </bui-code>
      <!--位置-->
      <!-- 自定义按钮文本 -->
      <com-title title="自定义按钮文本" info="custom text"></com-title>
      <p>
        可用参数
        <bui-badge size="24">successText</bui-badge>
        和
        <bui-badge size="24">cancelText</bui-badge>
        指定对话框的按钮展示文本
      </p>
      <div>
        <div class="bui_row_p_6 bui_inline">
          <template v-for="text in ['cancel,ok', '不要,遵命']">
            <div>
              <bui-btn @click="confirm({ content: text, cancelText: text.split(',')[0], successText: text.split(',')[1] })">{{ text }}</bui-btn>
            </div>
          </template>
        </div>
      </div>

      <bui-code language="js">
        <pre>
// alert
this.$alert({
  title:'消息', // 标题 默认值为“消息”
  content:'内容', // 弹窗文字内容
  successText:'遵命', // 确定按钮文本
  cancelText:'不要', // 取消按钮文本
})</pre
        >
      </bui-code>
      <!-- 自定义按钮文本 -->
      <!-- 自定义颜色 -->
      <com-title title="自定义颜色" info="custom color"></com-title>
      <p>
        可用参数
        <bui-badge size="24">colorname</bui-badge>
        指定对话框颜色样式
      </p>
      <div>
        <div class="bui_row_p_6 bui_inline">
          <template v-for="color in $colorArray.filter(res => res !== 'white')">
            <div>
              <bui-btn :colorname="color" @click="confirm({ colorname: color })">{{ color }}</bui-btn>
            </div>
          </template>
        </div>
      </div>

      <bui-code language="js">
        <pre>
// alert
this.$alert({
  title:'消息', // 标题 默认值为“消息”
  content:'内容', // 弹窗文字内容
  colorname:'blue' // 自定义对话框颜色
})</pre
        >
      </bui-code>
      <!-- 自定义颜色 -->
      <!-- 参数配置 -->
      <com-title title="参数配置" info="options"></com-title>
      <div>
        <table class="bui_table bui_fs_12">
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>title</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'消息'</td>
              <td>对话框标题</td>
            </tr>
            <tr>
              <td>content</td>
              <td><bui-badge>String</bui-badge></td>
              <td>''</td>
              <td>对话框内容</td>
            </tr>
            <tr>
              <td>positions</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'top'</td>
              <td>对话框展示位置，可选top|center|bottom</td>
            </tr>
            <tr>
              <td>colorname</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'turquoise'</td>
              <td>对话框颜色</td>
            </tr>
            <tr>
              <td>successText</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'我知道了'</td>
              <td>对话框确认按钮文本</td>
            </tr>
            <tr>
              <td>cancelText</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'取消'</td>
              <td>对话框取消按钮文本</td>
            </tr>
            <tr>
              <td>success</td>
              <td><bui-badge>Function</bui-badge></td>
              <td>()=>{}</td>
              <td>点击确认按钮后回调</td>
            </tr>
            <tr>
              <td>cancel</td>
              <td><bui-badge>Function</bui-badge></td>
              <td>()=>{}</td>
              <td>点击取消按钮后回调</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 参数配置 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    alert(options = {}) {
      var _t = this
      _t.$alert(
        Object.assign(
          {
            content: '您打开了一个alert',
            success() {
              _t.$msg({ content: '您点击了确定', type: 'success' })
            }
          },
          options
        )
      )
    },
    confirm(options = {}) {
      var _t = this
      _t.$confirm(
        Object.assign(
          {
            content: '您打开了一个confirm',
            success() {
              _t.$msg({ content: '您点击了确定', type: 'success' })
            },
            cancel() {
              _t.$msg({ content: '您点击了取消', type: 'error' })
            }
          },
          options
        )
      )
    }
  },
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
