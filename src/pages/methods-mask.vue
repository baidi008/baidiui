<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--loading提示-->
      <com-title title="loading提示" info="modal"></com-title>
      <p>构建并打开一个loading提示框</p>
      <div>
        <div class="bui_inline bui_row_p_6">
          <div><bui-btn @click="loadingOpen()">default</bui-btn></div>
          <div><bui-btn @click="loadingOpen({ full: true })">全屏</bui-btn></div>
        </div>
      </div>
      <bui-code language="js">
        <pre>
// 打开
this.$loadingOpen()

// 关闭
this.$loadingClose()</pre
        >
      </bui-code>
      <!--loading提示-->
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
              <td>text</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'loading...'</td>
              <td>加载中文本</td>
            </tr>
            <tr>
              <td>full</td>
              <td><bui-badge>Boolean</bui-badge></td>
              <td>false</td>
              <td>是否全屏覆盖</td>
            </tr>
            <tr>
              <td>size</td>
              <td><bui-badge>Number</bui-badge></td>
              <td>32</td>
              <td>图标文本尺寸</td>
            </tr>
            <tr>
              <td>success</td>
              <td><bui-badge>Function</bui-badge></td>
              <td>()=>{}</td>
              <td>展开后回调</td>
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
    loadingOpen(options = {}) {
      return this.$loadingOpen(
        Object.assign(options, {
          success: () => {
            setTimeout(() => {
              this.$loadingClose()
            }, 600)
          }
        })
      )
    }
  },
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
