<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <com-title title="边框" info="border"></com-title>
      <p>
        使用类名
        <bui-badge size="24">.bui_bds_</bui-badge>
        快速定义元素边框
      </p>
      <!--边框尺寸-->
      <com-title title="边框尺寸" info="size"></com-title>
      <p>预设边框尺寸限定在 1|2|4|8|16 之间，其他数值无效</p>
      <div>
        <bui-btn-group v-model="size" size="24">
          <option v-for="i in sizeArray" :value="i">{{ i + 'px' }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_p_12 bui_p_24_lr bui_fs_12 bui_bgc_silver_l bui_inline_block" :class="'bui_bds_' + size">{{ 'bui_bds_' + size }}</div>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <bui-code>
        <pre><template v-for="i in sizeArray"><div :class="'bui_bds_'+i">{{i+'px'}}</div>
</template></pre>
      </bui-code>
      <!--边框尺寸-->
      <!--方向-->
      <com-title title="方向" info="direction"></com-title>
      <p>预设边框尺寸限定在 t|b|l|r 之间，不设置则为全包围边框，其他数值无效</p>
      <div>
        <bui-btn-group v-model="direction" size="24">
          <option v-for="i in directionArray" :value="i.value">{{ i.name }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_p_12 bui_p_24_lr bui_fs_12 bui_bgc_silver_l bui_inline_block" :class="'bui_bds_4' + direction">{{ 'bui_bds_4' + direction }}</div>
      </div>
      <div>
        <bui-code>
          <pre><template v-for="i in directionArray"><div :class="'bui_bds_4'+i.value">{{i.name}}</div>
</template></pre>
        </bui-code>
      </div>
      <!--方向-->
      <!--颜色-->
      <com-title title="颜色" info="color"></com-title>
      <p>
        使用类名
        <bui-badge size="24">.bui_bdc_*</bui-badge>
        快速定义元素的边框颜色，预设值限定在 {{ $colorArray }} 之间
      </p>
      <div>
        <bui-btn-group v-model="color" size="24">
          <option v-for="i in $colorArray" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_p_24 bui_bgc_silver_l">
          <div class="bui_p_12 bui_p_24_lr bui_fs_12 bui_bgc_silver_l bui_inline_block bui_bds_4" :class="['bui_bdc_' + color, 'bui_fc_' + color]">{{ 'bui_bdc_' + color }}</div>
        </div>
      </div>
      <div>
        <bui-code>
          <pre><template v-for="color in $colorArray"><div :key="color" :class="['bui_bds_1','bui_bdc_'+color]">{{color}}</div>
</template></pre>
        </bui-code>
      </div>
      <!--颜色-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 1,
      direction: '',
      color: 'silver',
      directionArray: [{ name: 'top', value: '_t' }, { name: 'bottom', value: '_b' }, { name: 'left', value: '_l' }, { name: 'right', value: '_r' }, { name: 'all', value: '' }],
      sizeArray: [1, 2, 4, 8, 16]
    }
  },
  mounted() {}
}
</script>

<style></style>
