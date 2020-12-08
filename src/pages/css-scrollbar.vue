<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--预设滚动条-->
      <com-title title="预设滚动条" info="scrollbar"></com-title>
      <p>
        使用预设类
        <bui-badge size="24">.bui_scrollbar</bui-badge>
        重构元素内滚动条样式，目前只兼容chrome浏览器，并且元素要指定或者继承一个真实的height值
      </p>
      <div>
        <div class="bui_scrollbar" style="height: 20rem;">
          <table class="bui_table bui_fs_12">
            <tbody>
              <tr v-for="tr in 20">
                <td v-for="td in 10">
                  <p :style="{ 'white-space': 'nowrap' }">{{ tr + '-' + td }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <div>
        <bui-code>
          <pre><div class="bui_scrollbar" style="height: 20rem;">...</div></pre>
        </bui-code>
      </div>
      <!--预设滚动条-->

      <!--滚动条颜色-->
      <com-title title="滚动条颜色" info="color"></com-title>
      <p>
        在类名后方加入颜色名可渲染相应的滚动条颜色，例如
        <bui-badge size="24">.bui_scrollbar_red</bui-badge>
        为红色滚动条，默认为black
      </p>
      <div>
        <div class="bui_avg_3 bui_row_p_24">
          <template v-for="color in $colorArray">
            <div>
              <div :class="'bui_scrollbar_' + color" style="height: 10rem;">
                <table class="bui_table bui_fs_12">
                  <tbody>
                    <tr v-for="tr in 20">
                      <td v-for="td in 10">
                        <p :style="{ 'white-space': 'nowrap' }">{{ tr + '-' + td }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <bui-code>
        <pre><template v-for="color in $colorArray"><div :class="'bui_scrollbar_'+color" style="height: 20rem;">...</div>
</template></pre>
      </bui-code>
      <!--滚动条颜色-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style></style>
