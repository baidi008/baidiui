<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--预设间距&填充-->
      <com-title title="预设间距 & 填充" info="margin & padding"></com-title>
      <p>快速定义元素的间距或填充数值，可自定义方向以及占位尺寸</p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <div v-if="$root.win.dev != 'mobile'">
            <bui-btn-group v-model="direction" size="24">
              <option :value="i.value" v-for="i in directionArray">{{ i.name }}</option>
            </bui-btn-group>
          </div>
          <div v-else>
            <bui-select v-model="direction" size="24">
              <option :value="i.value" v-for="i in directionArray">{{ i.name }}</option>
            </bui-select>
          </div>
          <div v-if="$root.win.dev != 'mobile'">
            <bui-btn-group v-model="size" size="24">
              <option v-for="i in sizeArray" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div v-else>
            <bui-select v-model="size" size="24">
              <option v-for="i in sizeArray" :value="i">{{ i }}</option>
            </bui-select>
          </div>
        </div>
      </div>

      <div>
        <table class="bui_table bui_fs_12">
          <thead>
            <tr>
              <th width="10">type</th>
              <th>view</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(type, typeIndex) in [{ name: 'margin', value: '_m' }, { name: 'padding', value: '_p' }]" :key="typeIndex">
              <td>{{ type.name }}</td>
              <td>
                <p class="bui_p_12_b">
                  <bui-badge size="32">{{ '.bui' + type.value + '_' + size + direction }}</bui-badge>
                </p>
                <div class="bui_bds_1 bui_bdc_turquoise bui_inline_block">
                  <div class="bui_bgc_turquoise bui_fc_white" :class="'bui' + type.value + '_' + size + direction">{{ type.name }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>具体使用方式请见下方代码演示</p>
      <bui-code>
        <textarea v-pre>
<!-- bui_[间距or填充]_[px]_[方向] -->
<div class="bui_m_24"></div>
<div class="bui_p_24"></div></textarea
        >
      </bui-code>
      <!--预设间距&填充-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 24,
      direction: '',
      directionArray: [
        { name: '↑', value: '_t' },
        { name: '↓', value: '_b' },
        { name: '←', value: '_l' },
        { name: '→', value: '_r' },
        { name: '↕', value: '_tb' },
        { name: '↔', value: '_lr' },
        { name: 'all', value: '' }
      ],
      sizeArray: [3, 6, 8, 12, 24, 32, 48, 64, 72, 96]
    }
  },
  mounted() {}
}
</script>

<style></style>
