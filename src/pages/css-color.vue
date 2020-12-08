<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--背景颜色-->
      <com-title title="背景颜色" info="background color"></com-title>
      <p>
        使用预设类
        <bui-badge size="24">.bui_bgc_*</bui-badge>
        快速定义元素背景色
      </p>
      <div>
        <div class="bui_avg_4 bui_row_p_12">
          <template v-for="data in $colorArray">
            <div>
              <template v-for="type in pageData.type">
                <p :class="['bui_bgc_' + data + type.code, data == 'white' ? 'bui_fc_silver' : 'bui_fc_white', 'bui_p_12', 'bui_fs_14']">{{ type.text }} {{ data }}</p>
              </template>
            </div>
          </template>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <div class="bui_avg_2 bui_row_p_24">
        <bui-code>
          <pre>//基础色
<template v-for="color in $colorArray"><p :class="'bui_bgc_'+color">{{color}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//发光
<template v-for="color in $colorArray"><p :class="'bui_bgc_'+color+'_l'">{{color+' light'}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//暗淡
<template v-for="color in $colorArray"><p :class="'bui_bgc_'+color+'_d'">{{color+' dark'}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//半透明
<template v-for="color in $colorArray"><p :class="'bui_bgc_'+color+'_f'">{{color+' fade'}}</p>
</template></pre>
        </bui-code>
      </div>

      <!--背景颜色-->
      <!--文本颜色-->
      <com-title title="文本颜色" info="font color"></com-title>
      <p>
        使用预设类
        <bui-badge size="24">.bui_fc_*</bui-badge>
        快速定义元素文本颜色
      </p>
      <div>
        <div class="bui_avg_4 bui_row_p_12">
          <template v-for="data in $colorArray">
            <div>
              <template v-for="type in pageData.type">
                <p :class="['bui_fc_' + data + type.code, data == 'white' ? 'bui_bgc_silver' : 'bui_bgc_white', 'bui_p_12', 'bui_fs_14']">{{ type.text }} {{ data }}</p>
              </template>
            </div>
          </template>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <div class="bui_avg_2 bui_row_p_24">
        <bui-code>
          <pre>//基础色
<template v-for="color in $colorArray"><p :class="'bui_fc_'+color">{{color}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//发光
<template v-for="color in $colorArray"><p :class="'bui_fc_'+color+'_l'">{{color+' light'}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//暗淡
<template v-for="color in $colorArray"><p :class="'bui_fc_'+color+'_d'">{{color+' dark'}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//半透明
<template v-for="color in $colorArray"><p :class="'bui_fc_'+color+'_f'">{{color+' fade'}}</p>
</template></pre>
        </bui-code>
      </div>
      <!--文本颜色-->
      <!--边框颜色-->
      <com-title title="边框颜色" info="border color"></com-title>
      <p>
        使用预设类
        <bui-badge size="24">.bui_bdc_*</bui-badge>
        快速定义元素边框颜色
      </p>
      <div>
        <div class="bui_avg_4 bui_row_p_12">
          <template v-for="data in $colorArray">
            <div>
              <div class="bui_row_p_6">
                <template v-for="type in pageData.type">
                  <div>
                    <p :class="['bui_bds_1', 'bui_bdc_' + data + type.code, data == 'white' ? 'bui_fc_silver' : 'bui_fc_' + data + type.code, 'bui_p_12', 'bui_fs_14']">
                      {{ type.text }} {{ data }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <div class="bui_avg_2 bui_row_p_24">
        <bui-code>
          <pre>//基础色
<template v-for="color in $colorArray"><p :class="'bui_bds_1 bui_bdc_'+color">{{color}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//发光
<template v-for="color in $colorArray"><p :class="'bui_bds_1 bui_bdc_'+color+'_l'">{{color+' light'}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//暗淡
<template v-for="color in $colorArray"><p :class="'bui_bds_1 bui_bdc_'+color+'_d'">{{color+' dark'}}</p>
</template></pre>
        </bui-code>
        <bui-code>
          <pre>//半透明
<template v-for="color in $colorArray"><p :class="'bui_bds_1 bui_bdc_'+color+'_f'">{{color+' fade'}}</p>
</template></pre>
        </bui-code>
      </div>
      <!--边框颜色-->

      <!-- hover -->
      <com-title title="鼠标经过" info="hover"></com-title>
      <p>
        一般情况下，在类名最后加上
        <bui-badge size="24">_h</bui-badge>
        ,可定义为鼠标经过时显示的颜色，如下
      </p>
      <div>
        <div class="bui_row_p_12">
          <div>
            <div class="bui_p_12 bui_bgc_turquoise bui_bgc_red_h bui_fs_12 bui_fc_white bui_inline_block">
              <p>鼠标经过改变背景色</p>
              <p>bui_bgc_turquoise bui_bgc_red_h</p>
            </div>

            <div class="bui_p_12 bui_fc_turquoise bui_fc_red_h bui_fs_12 bui_inline_block">
              <p>鼠标经过改变字体颜色</p>
              <p>bui_fc_turquoise bui_fc_red_h</p>
            </div>

            <div class="bui_p_12 bui_bds_1 bui_bdc_turquoise bui_bdc_red_h bui_fs_12 bui_inline_block">
              <p>鼠标经过改变字体颜色</p>
              <p>bui_bdc_turquoise bui_bdc_red_h</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>具体使用方式请见下方代码演示</p>
        <bui-code>
          <pre><div class="bui_bgc_turquoise bui_bgc_red_h">改变背景色</div>
<div class="bui_fc_turquoise bui_fc_red_h">改变文本颜色</div>
<div class="bui_bdc_turquoise bui_bdc_red_h">改变边框颜色</div>

<div class="bui_bgc_turquoise bui_bgc_red_l_h">改变背景色</div>
<div class="bui_fc_turquoise bui_fc_red_l_h">改变文本颜色</div>
<div class="bui_bdc_turquoise bui_bdc_red_l_h">改变边框颜色</div></pre>
        </bui-code>
      </div>

      <!-- hover -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageData: {
        type: [
          {
            text: 'light',
            code: '_l'
          },
          {
            text: 'default',
            code: ''
          },
          {
            text: 'dark',
            code: '_d'
          },
          {
            text: 'transparent',
            code: '_f'
          }
        ]
      }
    }
  },
  mounted() {}
}
</script>

<style></style>
