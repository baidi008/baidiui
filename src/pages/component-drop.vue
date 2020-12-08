<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--弹出菜单-->
      <com-title title="弹出菜单" info="drop"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-drop</bui-badge>
        构造一个弹出菜单容器，使用插槽
        <bui-badge size="24">slot=default</bui-badge>
        定义弹出前内容，插槽
        <bui-badge size="24">slot=drop</bui-badge>
        定义弹出内容
      </p>
      <div>
        <bui-drop>
          <bui-btn>
            点击弹出菜单
            <bui-fa-icon icon="angle-down"></bui-fa-icon>
          </bui-btn>
          <template slot="drop">
            <div class="bui_p_24">
              <bui-img width="320px" ratio="21:9" src="https://baidiui.com/demo/pic/pic002.jpg"></bui-img>
              <p>这是一个弹出menu菜单</p>
              <p>内部可以放很多内容</p>
            </div>
          </template>
        </bui-drop>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <div>
        <bui-code>
          <textarea>
<bui-drop>
  <bui-btn>点击弹出菜单</bui-btn>
  <template slot="drop">这里展示下拉菜单内容...</template>
</bui-drop></textarea
          >
        </bui-code>
      </div>
      <!--弹出菜单-->
      <!--弹出事件-->
      <com-title title="弹出事件" info="trigger"></com-title>
      <p>
        使用参数
        <bui-badge size="24">trigger</bui-badge>
        定义组件的操作方式，可选click(点击，默认) | hover(鼠标经过)
      </p>
      <div>
        <template v-for="trigger in ['click', 'hover']">
          <bui-drop class="bui_m_12_r" :trigger="trigger">
            <bui-btn>
              {{ trigger }}
              <bui-fa-icon icon="angle-down"></bui-fa-icon>
            </bui-btn>
            <template slot="drop">
              <div class="bui_p_12" v-html="html"></div>
            </template>
          </bui-drop>
        </template>
      </div>

      <div>
        <bui-code>
          <textarea>
<!-- 点击展开 -->
<bui-drop trigger="click">...</bui-drop>

<!-- 鼠标经过展开 -->
<bui-drop trigger="hover">...</bui-drop></textarea
          >
        </bui-code>
      </div>
      <!--弹出事件-->
      <!--弹出方向-->
      <com-title title="弹出方向" info="trigger"></com-title>
      <p>
        使用参数
        <bui-badge size="24">position</bui-badge>
        定义菜单弹出方向，可选top(上方显示) | bottom(下方显示) | left(左侧显示) | right(右侧显示)
      </p>
      <div>
        <template v-for="position in ['top', 'bottom', 'left', 'right']">
          <bui-drop class="bui_m_12_r" :position="position" :ref="position">
            <bui-btn>
              {{ position }}
              <bui-fa-icon icon="angle-down"></bui-fa-icon>
            </bui-btn>
            <template slot="drop">
              <div class="bui_p_12" v-html="html"></div>
            </template>
          </bui-drop>
        </template>
      </div>

      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 上方显示 -->
<bui-drop position="top">...</bui-drop>

<!-- 下方显示 默认 -->
<bui-drop position="bottom">...</bui-drop>

<!-- 左侧显示 -->
<bui-drop position="left">...</bui-drop>

<!-- 右侧显示 -->
<bui-drop position="right">...</bui-drop>
</textarea
        >
      </bui-code>
      <!--弹出方向-->
      <!--递归嵌套-->
      <com-title title="递归嵌套" info="drop"></com-title>
      <p>可在插槽slot=drop下方再构造bui-drop，常应用与树形菜单的递归嵌套菜单</p>
      <div class="bui_col_3_md">
        <bui-drop position="right" trigger="click">
          <bui-btn>
            点击弹出菜单
            <bui-fa-icon icon="angle-right"></bui-fa-icon>
          </bui-btn>
          <template slot="drop">
            <div>
              <div v-for="i in 5" :key="i">
                <bui-drop position="right" trigger="click">
                  <div class="bui_cursor_p bui_bgc_silver_l_h bui_flex_row bui_vm bui_p_12">
                    <div class="bui_flex_row_l"><bui-fa-icon icon="bars"></bui-fa-icon></div>
                    <div class="bui_flex_row_c bui_p_12_lr bui_nowrap">menu-item-{{ i }}</div>
                    <div class="bui_flex_row_r"><bui-fa-icon icon="angle-right"></bui-fa-icon></div>
                  </div>
                  <template slot="drop">
                    <div v-for="i in 3" :key="i">
                      <bui-drop position="right" trigger="click">
                        <div class="bui_cursor_p bui_bgc_silver_l_h bui_flex_row bui_vm bui_p_12">
                          <div class="bui_flex_row_l"><bui-fa-icon icon="bars"></bui-fa-icon></div>
                          <div class="bui_flex_row_c bui_p_12_lr bui_nowrap">children-item-{{ i }}</div>
                          <div class="bui_flex_row_r"><bui-fa-icon icon="angle-right"></bui-fa-icon></div>
                        </div>
                        <template slot="drop">
                          <div class="bui_p_24" style="width: 15rem;">
                            <p>last-item</p>
                            <p><bui-img src="https://baidiui.com/demo/pic/pic001.jpg"></bui-img></p>
                          </div>
                        </template>
                      </bui-drop>
                    </div>
                  </template>
                </bui-drop>
              </div>
            </div>
          </template>
        </bui-drop>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-drop>
  <bui-btn>点击弹出菜单</bui-btn>
  <template slot="drop">
  <bui-drop>
    <bui-btn>menu-item-1</bui-btn>
    <template slot="drop">
    ...
    </template>
  </bui-drop>
  </template>
</bui-drop></textarea
        >
      </bui-code>
      <!--递归嵌套-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'trigger', type: ['String'], default: 'click', info: '弹出方式，可选click(点击，默认) | hover(鼠标经过)' },
            { name: 'position', type: ['String'], default: 'bottom', info: '弹出方向，可选top(上方显示) | bottom(下方显示) | left(左侧显示) | right(右侧显示)' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" :key="type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- public props -->
      <!-- slots -->
      <com-title title="插槽" info="slots"></com-title>
      <div>
        <bui-table
          :columns="$columnsSlots"
          :data="[{ name: 'default', default: 'null', info: '常显示内容' }, { name: 'drop', default: 'null', info: '弹出菜单内显示内容' }]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" :key="type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- slots -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html:
        '<p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p><p>这里展示下拉菜单内容...</p>'
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style></style>
