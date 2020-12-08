<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--消息提示-->
      <com-title title="消息提示" info="message"></com-title>
      <p>构建并打开一个消息提示框，适用于消息提示</p>
      <p>
        设置参数
        <bui-badge size="24">type</bui-badge>
        定义消息提示的类型，可选 default(默认)|success(成功)|warning(警告)|error(错误)
      </p>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <template
            v-for="i in [{ type: 'default', color: 'blue' }, { type: 'success', color: 'turquoise' }, { type: 'waring', color: 'orange' }, { type: 'error', color: 'red' }]"
          >
            <div>
              <bui-btn
                :colorname="i.color"
                @click="
                  msg({
                    content: 'This is a ' + i.type + ' message!'
                  })
                "
              >
                {{ i.type }} message
              </bui-btn>
            </div>
          </template>
        </div>
      </div>
      <bui-code language="js">
        <pre>
//basic
this.$msg({
  content: '消息内容', //消息内容
  type:'default' // 消息提示类型 default(默认)|success(成功)|warning(警告)|error(错误)
})</pre
        >
      </bui-code>
      <!--消息提示-->
      <!--展示位置-->
      <com-title title="展示位置" info="positions"></com-title>
      <p>
        设置参数
        <bui-badge size="24">positions</bui-badge>
        定义消息提示的展示位置，可选top(上)|center(中)|bottom(下)
      </p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <template v-for="positions in ['top', 'center', 'bottom']">
            <div>
              <bui-btn @click="msg({ content: '我的位置在' + positions + '', positions: positions })">{{ positions }}</bui-btn>
            </div>
          </template>
        </div>
      </div>

      <bui-code language="js">
        <pre>
//positions
this.$msg({
  content: '消息内容', //消息内容
  positions: 'top', //展示位置，默认为顶部居中，可选top(上)|center(中)|bottom(下)
})</pre
        >
      </bui-code>
      <!--展示位置-->
      <!--颜色-->
      <com-title title="颜色" info="custom color"></com-title>
      <p>
        设置参数
        <bui-badge size="24">colorname</bui-badge>
        定义消息提示的颜色
      </p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <template v-for="color in $colorArray" class="bui_col_2_md" v-if="color != 'white'">
            <div>
              <bui-btn :colorname="color" :block="true" @click="msg({ content: '我的颜色名为' + color + '', colorname: color })">{{ color }}</bui-btn>
            </div>
          </template>
        </div>
      </div>

      <bui-code language="js">
        <pre>
//color
this.$msg({
  content: '消息内容', //消息内容
  colorname: 'turquoise', //颜色，默认为turquoise,可选 silver|black|coffee|red|pink|orange|yellow|green|turquoise|blue|purple
})</pre
        >
      </bui-code>
      <!--颜色-->
      <!--延时关闭-->
      <com-title title="延时关闭" info="timeout"></com-title>
      <p>
        设置参数
        <bui-badge size="24">timeout</bui-badge>
        定义消息提示的自动关闭延时，设置为0时不自动关闭
      </p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <template v-for="timeout in [0, 1000, 5000, 3000, 800]" class="bui_col_2_md">
            <div>
              <bui-btn :block="true" @click="msg({ content: '等待' + timeout + '毫秒后关闭', timeout: timeout })">
                {{ timeout == 0 ? '不自动关闭' : '延时' + timeout + 'ms后关闭' }}
              </bui-btn>
            </div>
          </template>
        </div>
      </div>

      <bui-code language="js">
        <pre>
//timeout
this.$msg({
  content: '消息内容', //消息内容
  timeout: 3000, //延时关闭，单位为ms，默认3000，设为0则不自动关闭
})</pre
        >
      </bui-code>
      <!--延时关闭-->
      <!--图标-->
      <com-title title="图标" info="custom icon"></com-title>
      <p>
        设置参数
        <bui-badge size="24">icon</bui-badge>
        定义消息提示的自定义图标，详情见 fontawsome 4.7.0
      </p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <template v-for="icon in ['fa-user', 'fa-bell-o', 'fa-car', 'fa-hand-peace-o', 'fa-hourglass-start', 'fa-arrow-up']" class="bui_col_2_md">
            <div>
              <bui-btn :block="true" @click="msg({ content: '我的图标名' + icon + '', icon: 'fa ' + icon })">
                <i :class="['fa', icon]"></i>
                {{ icon }}
              </bui-btn>
            </div>
          </template>
        </div>
      </div>

      <bui-code language="js">
        <pre>
//positions
this.$msg({
  content: '消息内容', //消息内容
  icon: 'fa fa-lightbulb-o', //图标类名，详情见fontawsome 4.7.0
})</pre
        >
      </bui-code>
      <!--图标-->
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
              <td>content</td>
              <td><bui-badge>String</bui-badge></td>
              <td>''</td>
              <td>消息提示内容</td>
            </tr>
            <tr>
              <td>positions</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'top'</td>
              <td>消息提示展示位置，可选top|center|bottom</td>
            </tr>
            <tr>
              <td>colorname</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'turquoise'</td>
              <td>消息提示颜色</td>
            </tr>
            <tr>
              <td>timeout</td>
              <td><bui-badge>Number</bui-badge></td>
              <td>2000</td>
              <td>消息提示自动关闭延时，单位ms</td>
            </tr>
            <tr>
              <td>icon</td>
              <td><bui-badge>String</bui-badge></td>
              <td>'bi bi-info'</td>
              <td>消息提示自定义图标，此参数覆盖type响应值</td>
            </tr>
            <tr>
              <td>opened</td>
              <td><bui-badge>Function</bui-badge></td>
              <td>()={}</td>
              <td>打开消息弹窗回调</td>
            </tr>
            <tr>
              <td>closed</td>
              <td><bui-badge>Function</bui-badge></td>
              <td>()={}</td>
              <td>关闭消息弹窗回调</td>
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
    msg(options = {}) {
      return this.$msg(
        Object.assign(
          {
            opened(e) {
              console.log('已经打开')
            },
            closed(e) {
              console.log('已经关闭')
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
