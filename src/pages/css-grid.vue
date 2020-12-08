<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <com-title title="网格" info="grid"></com-title>
      <p>快速构造一个网格分布盒子，常用于横向列表</p>
      <!-- 平均分布 -->
      <com-title title="平均分布" info="Average Grid"></com-title>
      <p>
        可用
        <bui-badge size="24">.bui_avg_*</bui-badge>
        来定义每个子级元素的平均宽度。如
        <bui-badge size="24">.bui_avg_3</bui-badge>
        ，即定义子级元素每行平均分为3份；
        <bui-badge size="24">.bui_avg_5</bui-badge>
        ，即定义子级元素每行平均分为5份，允许范围1-12。
      </p>

      <div>
        <div class="bui_row_p_12">
          <template v-for="i in 6">
            <div>
              <div :class="['bui_avg_' + i, 'bui_ta_c', 'bui_fs_12', 'bui_row_p_12']">
                <div v-for="c in i">
                  <div :class="['bui_p_12 bui_bgc_silver_h bui_fc_white bui_radius', 'bui_bgc_turquoise']">
                    <p class="bui_line_clamp_1">{{ i + 'column' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <div>
        <bui-code>
          <textarea v-pre>
<div class="bui_avg_3">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div></textarea
          >
        </bui-code>
      </div>

      <!-- 平均分布 -->
      <!--自由分布-->
      <com-title title="自由分布" info="Free Grid"></com-title>
      <p>
        在子级元素上可用
        <bui-badge size="24">.bui_col_*</bui-badge>
        来定义该元素占用整行宽度的*/12，例如
        <bui-badge size="24">.bui_col_4</bui-badge>
        即定义该元素占用整行宽度的4/12
        <bui-badge size="24">.bui_col_6</bui-badge>
        即定义该元素占用整行宽度的一半
      </p>

      <div>
        <div class="bui_row_p_12">
          <div>
            <div :class="['bui_row_p_6']">
              <template v-for="i in [2, 4, 6]">
                <div :class="['bui_col_' + i]">
                  <div :class="['bui_bgc_turquoise', 'bui_bgc_silver_h', 'bui_p_12', 'bui_fc_white', 'bui_fs_12', 'bui_ta_c', 'bui_radius']">
                    <p class="bui_line_clamp_1">{{ i }} place</p>
                  </div>
                </div>
              </template>
              <template v-for="i in [4, 6, 2]">
                <div :class="['bui_col_' + i]">
                  <div :class="['bui_bgc_turquoise', 'bui_bgc_silver_h', 'bui_p_12', 'bui_fc_white', 'bui_fs_12', 'bui_ta_c', 'bui_radius']">
                    <p class="bui_line_clamp_1">{{ i }} place</p>
                  </div>
                </div>
              </template>
              <template v-for="i in [2, 1, 5, 4]">
                <div :class="['bui_col_' + i]">
                  <div :class="['bui_bgc_turquoise', 'bui_bgc_silver_h', 'bui_p_12', 'bui_fc_white', 'bui_fs_12', 'bui_ta_c', 'bui_radius']">
                    <p class="bui_line_clamp_1">{{ i }} place</p>
                  </div>
                </div>
              </template>
              <template v-for="i in [1, 2, 3, 4, 2]">
                <div :class="['bui_col_' + i]">
                  <div :class="['bui_bgc_turquoise', 'bui_bgc_silver_h', 'bui_p_12', 'bui_fc_white', 'bui_fs_12', 'bui_ta_c', 'bui_radius']">
                    <p class="bui_line_clamp_1">{{ i }} place</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <div>
        <bui-code>
          <textarea v-pre>
<div>
  <div class="bui_col_2">...</div>
  <div class="bui_col_4">...</div>
  <div class="bui_col_6">...</div>
</div></textarea
          >
        </bui-code>
      </div>
      <!--自由分布-->
      <!--分布间隔-->
      <com-title title="分布间隔" info="Grid interval"></com-title>
      <p>
        无论是平均分布或自由分布，均可在父级元素上用
        <bui-badge size="24">.bui_row_p_*</bui-badge>
        来定义该盒子下所有子元素的间隔。 *只能限制在6px、12px、24px、32px、48px、64px、72px、96px
      </p>

      <div>
        <div class="bui_row_p_12">
          <template v-for="col in [6, 12, 24, 32, 48, 64, 72, 96]">
            <div>
              <div :class="['bui_avg_4', 'bui_row_p_' + col]">
                <template v-for="i in 4">
                  <div>
                    <div :class="['bui_bgc_turquoise', 'bui_bgc__h', 'bui_p_12', 'bui_fc_white', 'bui_fs_12', 'bui_ta_c', 'bui_radius']">
                      <p class="bui_line_clamp_1">{{ col }}px interval</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <div>
        <bui-code>
          <textarea v-pre>
<div class="bui_row_p_12">
  <div class="bui_col_2">...</div>
  <div class="bui_col_4">...</div>
  <div class="bui_col_6">...</div>
</div>

<div class="bui_avg_3 bui_row_p_12">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div></textarea
          >
        </bui-code>
      </div>
      <!--分布间隔-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
