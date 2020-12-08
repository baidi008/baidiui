<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--数组移动-->
      <com-title title="数组移动" info="arrayMove"></com-title>
      <div>
        <table class="bui_table bui_fs_12 bui_table_noline">
          <thead>
            <td>序号</td>
            <td>内容</td>
            <td>类型</td>
            <td>操作</td>
          </thead>
          <tbody>
            <template v-for="(data, dataIndex) in array">
              <tr :key="dataIndex">
                <td>{{ dataIndex }}</td>
                <td>{{ data }}</td>
                <td>{{ typeof data }}</td>
                <td>
                  <div class="bui_inline bui_row_p_6">
                    <div>
                      <bui-btn :sq="true" bright="light" size="24" @click="$arrayMove(array, dataIndex, 'down')"><bui-fa-icon icon="arrow-down"></bui-fa-icon></bui-btn>
                    </div>
                    <div>
                      <bui-btn :sq="true" bright="light" size="24" @click="$arrayMove(array, dataIndex, 'up')"><bui-fa-icon icon="arrow-up"></bui-fa-icon></bui-btn>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <bui-code language="js" :model="array"></bui-code>
      <bui-code language="js"><pre>$arrayMove(array,index,action)</pre></bui-code>

      <!--数组移动-->
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
              <td>array</td>
              <td>Object</td>
              <td>必要</td>
              <td><p>绑定数组</p></td>
            </tr>
            <tr>
              <td>index</td>
              <td>number</td>
              <td>必要</td>
              <td>源索引值</td>
            </tr>
            <tr>
              <td>action</td>
              <td>string</td>
              <td>必要</td>
              <td>
                <p>操作方式，可选如下</p>
                <p>'up'向上移动</p>
                <p>'down'向下移动</p>
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
      array: ['字符串string', 1234, { a: 1, b: 2 }, [1, 2, 3]]
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
