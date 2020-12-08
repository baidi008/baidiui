<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--监听dom尺寸变化-->
      <com-title title="监听dom尺寸变化" info="resize"></com-title>
      <div class="bui_col_6_md">
        <textarea
          id="textarea-a"
          class="bui_bds_1"
          style="resize:both;max-width:100%"
          placeholder="请尝试改变我的尺寸"
          :value="'我的宽度为' + value.a.width + 'px\n我的高度为' + value.a.height + 'px'"
        ></textarea>
      </div>
      <div class="bui_col_6_md">
        <textarea
          id="textarea-b"
          class="bui_bds_1"
          style="resize:both;max-width:100%"
          placeholder="请尝试改变我的尺寸"
          :value="'我的宽度为' + value.b.width + 'px\n我的高度为' + value.b.height + 'px'"
        ></textarea>
      </div>
      <bui-code :model="value"></bui-code>
      <bui-code language="js">
        <pre>
	//原生js
	$resize(document.getElementsByTagName('textarea'), res => {
		console.log(res);
		do some thing ..
	});							
	
	//jQuery
	$reszie($('textarea'),function(res){
		console.log(res);
		do some thing ..
	})</pre
        >
      </bui-code>

      <!--监听dom尺寸变化-->
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
              <td>Object</td>
              <td>无</td>
              <td>dom元素，支持jquery选择器</td>
            </tr>
            <tr>
              <td>[1]</td>
              <td>function</td>
              <td>无</td>
              <td>当选中dom元素的宽度或者高度改变时执行的回调</td>
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
      value: { a: { width: 0, height: 0 }, b: { width: 0, height: 0 } }
    }
  },
  methods: {},
  mounted() {
    var _t = this

    _t.$resize($('#textarea-a'), res => {
      _t.$set(_t.value, 'a', res)
    })
    _t.$resize($('#textarea-b'), res => {
      _t.$set(_t.value, 'b', res)
    })
  }
}
</script>

<style></style>
