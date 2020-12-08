<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--预设颜色-->
      <com-title title="预设颜色" info="setColor"></com-title>
      <p>
        用
        <bui-badge size="24">$setColor(*)</bui-badge>
        方法，可返回预设颜色的RGBA值
      </p>
      <template v-for="colorname in $colorArray">
        <div class="bui_fs_12">
          <div :class="['bui_p_12', colorname != 'white' ? 'bui_fc_white' : 'bui_fc_black_l']" :style="{ 'background-color': $setColor(colorname) }">
            <p class="bui_line_clamp_1">$setColor('{{ colorname }}')</p>
            <p class="bui_line_clamp_1">{{ $setColor(colorname) }}</p>
          </div>
          <div class="bui_avg_5" v-for="type in ['l', 'd', 'f']">
            <template v-for="i in 5">
              <div
                :key="i"
                :style="{
                  'background-image': 'url(//www.baidiui.com/demo/pic/pic003.jpg)',
                  'background-size': 'cover',
                  'background-position': 'center'
                }"
              >
                <div
                  :class="['bui_p_12', colorname != 'white' ? 'bui_fc_white' : 'bui_fc_black_l']"
                  :style="{ 'background-color': $setColor(colorname + ',' + type + ',' + [i * 12]) }"
                >
                  <p class="bui_line_clamp_1">$setColor('{{ colorname }},{{ type }},{{ i * 12 }}')</p>
                  <p class="bui_line_clamp_1">{{ $setColor(colorname + ',' + type + ',' + [i * 12]) }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>

      <bui-code language="js">
        <pre>
	//缺省值返回绿松石色
	$setColor() => '{{ $setColor() }}'
	
	//基础色
	$setColor('green') => '{{ $setColor('green') }}'
	
	//调整类型，'l'变亮，'d'变暗，'f'半透明化
	$setColor('green,l') => '{{ $setColor('green,l') }}'
	$setColor('green,d') => '{{ $setColor('green,d') }}'
	$setColor('green,f') => '{{ $setColor('green,f') }}'
	
	//调整数值缺省值为32，可自定义
	$setColor('green,l,24') => '{{ $setColor('green,l,24') }}'
	$setColor('green,d,24') => '{{ $setColor('green,d,24') }}'
	$setColor('green,f,24') => '{{ $setColor('green,f,24') }}'</pre
        >
      </bui-code>

      <!--预设颜色-->
      <!-- 参数说明-->
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
              <td>[0]</td>
              <td>String</td>
              <td>'turquoise'</td>
              <td>
                <p>字符串分为三段，用逗号隔开。</p>
                <p>'颜色名称,调整类型,调整数值'</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 参数说明 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorname: 'turquoise'
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
