<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--菜单-->
      <com-title title="菜单" info="Menu"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-menu</bui-badge>
        构造一个树型菜单，使用参数
        <bui-badge size="24">data</bui-badge>
        构造组件数据，目前只支持数据构造，不支持slot
      </p>

      <div>
        <div class="bui_inline_block"><bui-menu :data="menus"></bui-menu></div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  
  <div><bui-menu :data="menus"></bui-menu></div>
  
</template>

<script>
  export default {
    data() {
      return {
        menus: [
          { title: 'menu-path-0-0', info: 'menu-path-0-0-info', icon: 'icon', key: '0-0' },
          {
            title: 'menu-path-0-1',
            info: 'menu-path-0-1-info',
            icon: 'icon',
            key: '0-1',
            children: [
              { title: 'menu-path-1-0', info: 'menu-path-1-0-info', icon: 'icon', key: '1-0' },
              {
                title: 'menu-path-1-1',
                info: 'menu-path-1-1-info',
                icon: 'icon',
                key: '1-1',
                children: [
                  { title: 'menu-path-1-1-0', info: 'menu-path-1-1-0-info', icon: 'icon', key: '1-1-0' },
                  { title: 'menu-path-1-1-1', info: 'menu-path-1-1-1-info', icon: 'icon', key: '1-1-1' },
                  { title: 'menu-path-1-1-2', info: 'menu-path-1-1-2-info', icon: 'icon', key: '1-1-2' }
                ]
              },
              { title: 'menu-path-1-2', info: 'menu-path-1-2-info', icon: 'icon', key: '1-2' }
            ]
          },
          { title: 'menu-path-0-2', info: 'menu-path-0-2-info', icon: 'icon', key: '0-2' }
        ]
      }
    }
  }
</script>
              </textarea
        >
      </bui-code>
      <p>
        构建数据
        <bui-badge size="24">data</bui-badge>
        说明
      </p>
      <div>
        <bui-table
          :columns="$columnsObject"
          border
          :data="[
            { name: 'title', type: ['String'], default: '否', info: '菜单item名称文字' },
            { name: 'info', type: ['String'], default: '否', info: '菜单item说明文字' },
            { name: 'icon', type: ['String'], default: '否', info: '菜单item图标名称，请参考本项目图标' },
            { name: 'key', type: ['String'], default: '是', info: '菜单item唯一索引值，请确保在整个data内有且只有1个' },
            { name: 'children', type: ['Array'], default: '否', info: '菜单item子级数据，结构同data' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" :key="type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!--菜单-->
      <!-- 布局方式 -->
      <com-title title="布局方式" info="mode"></com-title>
      <p>
        使用参数
        <bui-badge size="24">mode</bui-badge>
        定义组件的整体布局，当前提供
        <bui-badge size="24">vertical</bui-badge>
        ，
        <bui-badge size="24">vertical-mini</bui-badge>
        ，
        <bui-badge size="24">drop</bui-badge>
        ，
        <bui-badge size="24">horizontal</bui-badge>
        四种布局方式，请见下方示例
      </p>
      <div class="bui_vm">
        <span>整体布局：</span>
        <bui-btn-group v-model="mode" size="24">
          <option v-for="i in ['vertical', 'vertical-mini', 'drop', 'horizontal']" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_inline_block"><bui-menu :data="menus" @click="click" @expand="expand" defaultActive="0-0" :mode="mode"></bui-menu></div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 垂直布局，子菜单展开，默认值 -->
<bui-menu :data="menus" mode="vertical"></bui-menu>

<!-- 垂直mini布局，子菜单弹出 -->
<bui-menu :data="menus" mode="vertical-mini"></bui-menu>

<!-- 垂直布局，子菜单弹出 -->
<bui-menu :data="menus" mode="drop"></bui-menu>

<!-- 水平布局，子菜单弹出 -->
<bui-menu :data="menus" mode="horizontal"></bui-menu></textarea
        >
      </bui-code>
      <!-- 布局方式 -->
      <!-- 主题颜色 -->
      <com-title title="主题颜色" info="colorname"></com-title>
      <p>
        使用参数
        <bui-badge size="24">colorname</bui-badge>
        定义组件主题颜色 ，请见下方示例
      </p>
      <div class="bui_vm">
        <span>主题颜色：</span>
        <bui-btn-group v-model="colorname" size="24">
          <option v-for="i in $colorArray.filter(res => res !== 'white')" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_inline_block"><bui-menu :data="menus" :colorname="colorname" default-active="0-0"></bui-menu></div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-menu :data="menus" colorname="red"></bui-menu></textarea></bui-code>
      <!-- 主题颜色 -->
      <!-- key值转换 -->
      <com-title title="key值转换" info="changeKey"></com-title>
      <p>
        为了适应各种不同的树型数据结构，组件提供参数
        <bui-badge size="24">changeKey</bui-badge>
        来进行key值转换，支持querySearch方式
      </p>
      <div>
        <div class="bui_inline_block">
          <bui-menu
            :data="menusChangeKey"
            :changeKey="{ key: 'code', title: 'detail.name', icon: 'pic', info: 'detail.summary', children: 'childs' }"
            default-active="0-0"
          ></bui-menu>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>

      <bui-code>
        <textarea>
 <template>
   
  <div><bui-menu :data="menusChangeKey" :changeKey="changeKey"></bui-menu></div>
  
</template>

<script>
  export default {
    data() {
      return {
        changeKey:{
          key: 'code', // 将code取代key
          title: 'detail.name', // 找到对象detail下的name取代title
          icon: 'pic', // 将pic取代icon
          info: 'detail.summary', // 找到对象detail下的summary取代info
          children: 'childs',// 将childs取代children
        },
        menusChangeKey: [
          { detail: { name: 'Home page', summary: 'Home page summary' }, pic: 'home', code: '0-0' },
          {
            detail: { name: 'About Us', summary: 'Company detail' },
            pic: 'explore',
            code: '0-1',
            childs: [
              {
                detail: {
                  name: 'Company',
                  summary: 'Company detail'
                },
                code: '0-1-0',
                childs: [
                  { detail: { name: 'Company-1', summary: 'Company-1' }, code: '0-1-0-0' },
                  {
                    detail: { name: 'Company-2', summary: 'Company-1' },

                    code: '0-1-0-1',
                    childs: [
                      { detail: { name: 'Company-1-1', summary: 'Company-1-1' }, code: '0-1-0-1-1' },
                      { detail: { name: 'Company-1-2', summary: 'Company-1-2' }, code: '0-1-0-1-2' },
                      { detail: { name: 'Company-1-3', summary: 'Company-1-3' }, code: '0-1-0-1-3' }
                    ]
                  },
                  { detail: { name: 'Company-3', summary: 'Company-1' }, code: '0-1-0-2' }
                ]
              },
              { detail: { name: 'Factory', summary: 'Factory detail' }, code: '0-1-1' },
              { detail: { name: 'Jobs', summary: 'Job opportunities' }, code: '0-1-2' }
            ]
          }
        ]
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!-- key值转换 -->
      <!-- 默认激活&展开 -->
      <com-title title="默认激活&展开" info="default open and default active"></com-title>
      <p>
        使用参数
        <bui-badge size="24">defaultOpens</bui-badge>
        、定义组件默认展开下级的item，数组形式，可同时展开多个，此参数只在
        <bui-badge size="24">mode=vertical</bui-badge>
        时生效。
      </p>
      <p>
        使用参数
        <bui-badge size="24">defaultActive</bui-badge>
        、定义组件默认激活item，整个菜单只允许一个激活key
        <bui-badge size="24">mode=vertical</bui-badge>
        时生效。
      </p>
      <div>
        <div class="bui_inline_block"><bui-menu :data="menus" :default-opens="['0-1', '0-2']" default-active="0-4"></bui-menu></div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 传入的数值为item的key值 -->
<bui-menu :data="menus" :default-opens="['0-1', '0-2']" default-active="0-4"></bui-menu></textarea
        >
      </bui-code>
      <!-- 默认激活&展开 -->
      <!-- 关闭其他 -->
      <com-title title="关闭其他" info="close other"></com-title>
      <p>
        使用参数
        <bui-badge size="24">closeOther</bui-badge>
        定义组件展开时是否关闭其他同级item的展开子级，默认为true，如要取消，请设置closeOther为false，此参数只在
        <bui-badge size="24">mode=vertical</bui-badge>
        时生效。
      </p>
      <div class="bui_vm">
        <span>关闭其他：</span>
        <bui-switch v-model="closeOther"></bui-switch>
      </div>
      <div>
        <div class="bui_inline_block"><bui-menu :data="menus" :closeOther="closeOther"></bui-menu></div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-menu :data="menus" :closeOther="false"></bui-menu></textarea></bui-code>
      <!-- 关闭其他 -->
      <!-- 事件 -->
      <com-title title="事件" info="event"></com-title>
      <p>
        使用参数
        <bui-badge size="24">@click</bui-badge>
        ，
        <bui-badge size="24">@expand</bui-badge>
        定义组件点击和展开层级的事件回调，目前@expand仅在mode=vertical有效
      </p>
      <div>
        <div class="bui_inline_block">
          <bui-menu
            :data="menus"
            :closeOther="false"
            @click="$message({ content: 'click，返回参数：' + JSON.stringify($event) })"
            @expand="$message({ content: 'expand，返回参数：' + JSON.stringify($event) })"
          ></bui-menu>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-menu
  :data="menus"
  :closeOther="false"
  @click="$message({ content: 'click，返回参数：' + JSON.stringify($event) })"
  @expand="$message({ content: 'expand，返回参数：' + JSON.stringify($event) })"
></bui-menu></textarea
        >
      </bui-code>
      <!-- 事件 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'data', type: ['Array'], default: '[]', info: '菜单树结构数据' },
            { name: 'mode', type: ['String'], default: 'vertical', info: '菜单布局方式，可选vertical|vertical-mini|drop|horizontal' },
            { name: 'changeKey', type: ['Object'], default: 'null', info: 'key值转换，可匹配不同的树结构数据，支持querySearch方式取值' },
            { name: 'closeOther', type: ['Boolean'], default: 'true', info: '展开下级菜单时，是否关闭同级已展开菜单，只在 mode=vertical 时生效' },
            { name: 'defaultOpens', type: ['Array'], default: 'null', info: '初始默认展开菜单，可同时展开多个，只在 mode=vertical 时生效' },
            { name: 'defaultActive', type: ['String'], default: 'null', info: '初始默认激活菜单key值' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' },
            { name: '@click', type: ['Function'], default: '(res)=>{}', info: '点击叶子级item时回掉，返回res为当前item对象' },
            { name: '@expand', type: ['Function'], default: '(res)=>{}', info: '展开或收起非叶子级item时回掉，返回res为当前展开项数组，仅在 mode=vertical 时生效' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" class="bui_m_6_r">{{ type }}</bui-badge>
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
      menus: [
        { title: 'Home page', info: 'Home page info', icon: 'home', key: '0-0' },
        {
          title: 'About Us',
          info: 'Company detail',
          icon: 'explore',
          key: '0-1',
          children: [
            {
              title: 'Company',
              info: 'Company detail',
              key: '0-1-0',
              children: [
                { title: 'Company-1', info: 'Company-1', key: '0-1-0-0' },
                {
                  title: 'Company-2',
                  info: 'Company-1',
                  key: '0-1-0-1',
                  children: [
                    { title: 'Company-1-1', info: 'Company-1-1', key: '0-1-0-1-1' },
                    { title: 'Company-1-2', info: 'Company-1-2', key: '0-1-0-1-2' },
                    { title: 'Company-1-3', info: 'Company-1-3', key: '0-1-0-1-3' }
                  ]
                },
                { title: 'Company-3', info: 'Company-1', key: '0-1-0-2' }
              ]
            },
            { title: 'Factory', info: 'Factory detail', key: '0-1-1' },
            { title: 'Jobs', info: 'Job opportunities', key: '0-1-2' }
          ]
        },
        {
          title: 'News',
          info: 'News Info',
          icon: 'pie-chart-outlined',
          key: '0-2',
          children: [
            { title: 'Company News', info: 'Company detail', key: '0-2-0' },
            { title: 'Industry News', info: 'Industry detail', key: '0-2-1' },
            { title: 'Global News', info: 'Global detail', key: '0-2-2' }
          ]
        },
        {
          title: 'Products',
          info: 'ours goods center',
          icon: 'move-to-inbox',
          key: '0-3',
          children: [
            { title: 'Top 10', info: 'Top 10 goods', key: '0-3-0' },
            { title: 'Hot goods', info: 'Hot products', key: '0-3-1' },
            { title: 'Search', info: 'Search products', key: '0-3-2' }
          ]
        },
        { title: 'Contact Us', info: 'call me please', icon: 'phone', key: '0-4' }
      ],
      menusChangeKey: [
        { detail: { name: 'Home page', summary: 'Home page summary' }, pic: 'home', code: '0-0' },
        {
          detail: { name: 'About Us', summary: 'Company detail' },

          pic: 'explore',
          code: '0-1',
          childs: [
            {
              detail: {
                name: 'Company',
                summary: 'Company detail'
              },
              code: '0-1-0',
              childs: [
                { detail: { name: 'Company-1', summary: 'Company-1' }, code: '0-1-0-0' },
                {
                  detail: { name: 'Company-2', summary: 'Company-1' },

                  code: '0-1-0-1',
                  childs: [
                    { detail: { name: 'Company-1-1', summary: 'Company-1-1' }, code: '0-1-0-1-1' },
                    { detail: { name: 'Company-1-2', summary: 'Company-1-2' }, code: '0-1-0-1-2' },
                    { detail: { name: 'Company-1-3', summary: 'Company-1-3' }, code: '0-1-0-1-3' }
                  ]
                },
                { detail: { name: 'Company-3', summary: 'Company-1' }, code: '0-1-0-2' }
              ]
            },
            { detail: { name: 'Factory', summary: 'Factory detail' }, code: '0-1-1' },
            { detail: { name: 'Jobs', summary: 'Job opportunities' }, code: '0-1-2' }
          ]
        }
      ],
      mode: 'horizontal',
      colorname: 'red',
      closeOther: false,
      choosed: {},
      expands: {}
    }
  },
  methods: {
    click(menu) {
      this.$msg({ content: '<pre>' + JSON.stringify(menu) + '</pre>' })
      this.choosed = menu
    },
    expand(menu) {
      this.expands = menu
    }
  },
  mounted() {}
}
</script>

<style></style>
