<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--标签切换-->
      <com-title title="标签切换" info="tab"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-tab</bui-badge>
        构建一个标签切换容器，用slot定义内部item
      </p>
      <div>
        <bui-tab>
          <template v-for="i in 5">
            <div :name="'tab-' + i" :key="i">
              <div class="bui_p_24">
                <p><bui-img :src="'https://baidiui.com/demo/pic/pic00' + i + '.jpg'"></bui-img></p>
                <p>我是第{{ i }}个标签页</p>
              </div>
            </div>
          </template>
        </bui-tab>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-tab>
 <div name="tab-1">第1个标签页</div>
 <div name="tab-2">第2个标签页</div>
 <div name="tab-3">第3个标签页</div>
</bui-tab></textarea
        >
      </bui-code>
      <!--标签切换-->
      <!--颜色应用-->
      <com-title title="颜色应用" info="color"></com-title>
      <p>
        使用参数
        <bui-badge size="24">colorname</bui-badge>
        定义组件的主题颜色
      </p>

      <div class="bui_vm">
        <span>主题颜色：</span>
        <bui-btn-group v-model="colorname" size="24">
          <option v-for="i in $colorArray.filter(res => res !== 'white')" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>

      <div>
        <bui-tab :colorname="colorname">
          <template v-for="i in 3">
            <div :name="'tab-' + i" :key="i">
              <div class="bui_p_24">
                <p>
                  我是颜色样式为
                  <span :style="{ color: $setColor(colorname) }">{{ colorname }}</span>
                  的第{{ i }}个标签页
                </p>
              </div>
            </div>
          </template>
        </bui-tab>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-tab colorname="red">
  <div name="tab-1">第1个标签页</div>
  <div name="tab-2">第2个标签页</div>
  <div name="tab-3">第3个标签页</div>
</bui-tab></textarea
        >
      </bui-code>
      <!--颜色应用-->
      <!--导航位置-->
      <com-title title="导航位置" info="positions"></com-title>
      <p>
        使用参数
        <bui-badge size="24">positions</bui-badge>
        定义组件导航展示位置，可选top(默认值) | bottom | left | right
      </p>
      <template v-for="position in ['top', 'bottom', 'left', 'right']">
        <div class="bui_col_6_md" :key="position">
          <bui-tab :positions="position" class="bui_bds_1">
            <template v-for="i in 3">
              <div :name="'tab-' + i" :key="i">
                <div
                  :class="[
                    'bui_p_24',
                    position == 'bottom' ? 'bui_bds_1_b' : position == 'left' ? 'bui_bds_1_l' : position == 'right' ? 'bui_bds_1_r' : position == 'top' ? 'bui_bds_1_t' : ''
                  ]"
                >
                  <p><bui-img :src="'https://baidiui.com/demo/pic/pic00' + i + '.jpg'"></bui-img></p>
                  <p>我是第{{ i }}个标签页</p>
                </div>
              </div>
            </template>
          </bui-tab>
        </div>
      </template>

      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-tab positions="bottom">
  <div name="tab-1">第1个标签页</div>
  <div name="tab-2">第2个标签页</div>
  <div name="tab-3">第3个标签页</div>
</bui-tab></textarea
        >
      </bui-code>
      <!--导航位置-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' },
            { name: 'positions', type: ['String'], default: 'top', info: '组件导航显示位置' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" :key="type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- public props -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorname: 'red'
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
