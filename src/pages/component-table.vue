<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--表格-->
      <com-title title="表格" info="table"></com-title>
      <p>
        使用
        <bui-badge size="24">bui-table</bui-badge>
        构造一个表格容器，使用参数
        <bui-badge size="24">columns</bui-badge>
        定义表头字段，使用参数
        <bui-badge size="24">data</bui-badge>
        定义表格记录数据
      </p>
      <div>
        <bui-table
          :columns="[{ label: '姓名', key: 'name' }, { label: '性别', key: 'gender' }, { label: '年龄', key: 'age' }]"
          :data="[{ name: '刘德华', gender: '男', age: 24 }, { name: '郭富城', gender: '男', age: 21 }, { name: '王菲', gender: '女', age: 32 }]"
        ></bui-table>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  <div><bui-table :columns="columns" :data="data"></bui-table></div>
</template>

<script>
  export default{
    data(){
      return:{
       columns:[
         { label: '姓名', key: 'name' },
         { label: '性别', key: 'gender' },
         { label: '年龄', key: 'age' }
       ]
       data:[
         { name: '刘德华', gender: '男', age: 24 }, 
         { name: '郭富城', gender: '男', age: 21 },
         { name: '王菲', gender: '女', age: 32 }
       ]
      }
    }
  }
</script></textarea
        >
      </bui-code>

      <!-- 主题样式 -->
      <com-title title="主题样式" info="style"></com-title>
      <p>
        使用参数
        <bui-badge size="24">border</bui-badge>
        定义表格是否开启全边框效果，参数
        <bui-badge size="24">zebra</bui-badge>
        定义表格是否开启斑马线效果，参数
        <bui-badge size="24">height</bui-badge>
        限制表格最大高度，当限制高度小于实际高度时，表格开启滚动模式，并且固定表头
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>边框样式：</span>
            <bui-btn-group v-model="border" size="24" class="bui_m_12_r">
              <option v-for="i in [{ text: '有边框', value: true }, { text: '无边框', value: false }]" :key="i.value" :value="i.value">{{ i.text }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>斑马样式：</span>
            <bui-btn-group v-model="zebra" size="24" class="bui_m_12_r">
              <option v-for="i in [{ text: '斑马线', value: true }, { text: '无斑马线', value: false }]" :key="i.value" :value="i.value">{{ i.text }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>限制高度：</span>
            <bui-btn-group v-model="height" size="24" class="bui_m_12_r">
              <option v-for="i in [null, 100, 200, 300, 3000]" :key="i" :value="i">{{ !!i ? '限高' + i + 'px' : '不限' }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div>
        <bui-table
          :data="data"
          :columns="columns.filter(res => res.label !== '操作')"
          :border="border"
          :zebra="zebra"
          :height="height"
          @rowClick="headerClick"
          @headerClick="headerClick"
        ></bui-table>
      </div>
      <!-- 主题样式 -->

      <!-- 横向滚动&侧边固定 -->
      <com-title title="横向滚动&侧边固定" info="scroll-x & fixed"></com-title>
      <p>
        通过设置表头字段数据的
        <bui-badge size="24">width</bui-badge>
        参数，可定义列宽度，小于64则按64处理。当所有列宽度小于容器宽度时，组件将自动启用横向滚动模式。在该模式下，可设置表头字段数据的
        <bui-badge size="24">fixed</bui-badge>
        参数定义列靠侧边固定，可选left(左侧固定) | right(右侧固定)。设置好fixed后，列序将会重排，请参考下方示例。
      </p>
      <div class="bui_vm">
        <span>示例宽度：</span>
        <bui-btn-group v-model="width" size="24">
          <option v-for="i in ['50%', '100%']" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div :style="{ width: width }">
          <bui-table
            :columns="[
              { label: '左侧', key: 'left', fixed: 'left', width: 120 },
              { label: '右侧固定', key: 'right', fixed: 'right', width: 120 },
              { label: 'item-1', key: 'item1', width: 320 },
              { label: 'item-2', key: 'item2', width: 120 },
              { label: 'item-3', key: 'item3', width: 120 },
              { label: '左侧2', key: 'left2', fixed: 'left', width: 80 }
            ]"
            :data="[
              { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' },
              { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' },
              { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' },
              { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' }
            ]"
            border
          ></bui-table>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  <div><bui-table :columns="columns" :data="data"></bui-table></div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { label: '左侧', key: 'left', fixed: 'left', width: 120 },
          { label: '右侧固定', key: 'right', fixed: 'right', width: 120 },
          { label: 'item-1', key: 'item1', width: 320 },
          { label: 'item-2', key: 'item2', width: 120 },
          { label: 'item-3', key: 'item3', width: 120 },
          { label: '左侧2', key: 'left2', fixed: 'left', width: 240 }
        ],
        data: [
          { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' },
          { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' },
          { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' },
          { left: '左侧1', right: '右侧1', item1: '不固定-1', item2: '不固定-2', item3: '不固定-3', left2: '左侧2' }
        ]
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!-- 横向滚动&侧边固定 -->

      <!-- 自定义插槽 -->
      <com-title title="自定义插槽" info="slots"></com-title>
      <p>
        可通过插槽
        <bui-badge size="24">slot=key</bui-badge>
        插入对应列的自定义内容，用参数slot-scope定义返回参数的keyname
      </p>
      <div>
        <bui-table
          :columns="[
            { label: '按钮', key: 'button', width: 180 },
            { label: '输入框', key: 'input', width: 180 },
            { label: '图片', key: 'img', width: 96 },
            { label: '返回数据', key: 'data', width: 600 }
          ]"
          :data="[
            { button: '按钮文本1', input: '我是第1个输入框', img: 'https://baidiui.com/demo/pic/pic001.jpg' },
            { button: '按钮文本2', input: '我是第2个输入框', img: 'https://baidiui.com/demo/pic/pic002.jpg' },
            { button: '按钮文本3', input: '我是第3个输入框', img: 'https://baidiui.com/demo/pic/pic003.jpg' },
            { button: '按钮文本4', input: '我是第4个输入框', img: 'https://baidiui.com/demo/pic/pic004.jpg' },
            { button: '按钮文本5', input: '我是第5个输入框', img: 'https://baidiui.com/demo/pic/pic005.jpg' }
          ]"
        >
          <template slot="button" slot-scope="item">
            <bui-btn width="100%" type="success" @click="$message({ content: '点击了按钮，返回内容：' + JSON.stringify(item) })">{{ item.row.button }}</bui-btn>
          </template>
          <template slot="input" slot-scope="item">
            <bui-input width="100%" v-model="item.row.input"></bui-input>
          </template>
          <template slot="img" slot-scope="item">
            <bui-img :src="item.row.img" width="3em"></bui-img>
          </template>
          <template slot="data" slot-scope="item">
            <p class="bui_fs_12 bui_line_clamp_1">{{ item }}</p>
          </template>
        </bui-table>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  <div> 
    <bui-table :columns="columns" :data="data">
      <template slot="button" slot-scope="item">
        <bui-btn width="100%" type="success">&#119060;&#119060;item.row.button&#125;&#125;</bui-btn>
      </template>
      <template slot="input" slot-scope="item">
        <bui-input width="100%" v-model="item.row.input"></bui-input>
      </template>
      <template slot="img" slot-scope="item">
        <bui-img :src="item.row.img" width="3em"></bui-img>
      </template>
      <template slot="data" slot-scope="item">
        <p class="bui_fs_12 bui_line_clamp_1">&#119060;&#119060;item&#125;&#125;</p>
      </template>
    </bui-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { label: '按钮', key: 'button', width: 180 },
          { label: '输入框', key: 'input', width: 180 },
          { label: '图片', key: 'img', width: 96 },
          { label: '返回数据', key: 'data', width: 600 }
        ],
        data: [
          { button: '按钮文本1', input: '我是第1个输入框', img: 'https://baidiui.com/demo/pic/pic001.jpg' },
          { button: '按钮文本2', input: '我是第2个输入框', img: 'https://baidiui.com/demo/pic/pic002.jpg' },
          { button: '按钮文本3', input: '我是第3个输入框', img: 'https://baidiui.com/demo/pic/pic003.jpg' },
          { button: '按钮文本4', input: '我是第4个输入框', img: 'https://baidiui.com/demo/pic/pic004.jpg' },
          { button: '按钮文本5', input: '我是第5个输入框', img: 'https://baidiui.com/demo/pic/pic005.jpg' }
        ]
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!-- 自定义插槽 -->
      <!-- 表格复选 -->
      <com-title title="表格复选" info="checkbox"></com-title>
      <p>
        使用
        <bui-badge size="24">v-model</bui-badge>
        绑定到一个数组数据时，开启复选模式。当组件处于该模式时，使用参数
        <bui-badge size="24">selectionKey</bui-badge>
        参数指定取值的keyname，一般选择类似id，code等唯一值。下方选择name不属于唯一值时会出现某种错误
      </p>
      <div class="vm">
        <span>取值：</span>
        <bui-btn-group v-model="selectionKey" size="24" @change="selected = []">
          <option v-for="i in ['', 'id', 'name']" :key="i" :value="i">{{ !!i ? i : '不指定' }}</option>
        </bui-btn-group>
      </div>
      <div>
        <bui-table :data="data" v-model="selected" :selectionKey="selectionKey" :columns="columns">
          <template slot="operation" slot-scope="item">
            <div class="bui_row_p_6 bui_inline">
              <div>
                <bui-btn type="success" size="24" @click="$msg({ content: '你要编辑' + item.row.id })">
                  <i class="fa fa-edit"></i>
                  编辑
                </bui-btn>
              </div>
              <div>
                <bui-btn type="error" size="24" colorname="red" @click="$msg({ content: '你要删除' + item.row.id })">
                  <i class="fa fa-close"></i>
                  移除
                </bui-btn>
              </div>
            </div>
          </template>
        </bui-table>
      </div>
      <p>已选中数据：</p>
      <bui-code :model="selected"></bui-code>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  <div><bui-table :columns="columns" :data="data" v-model="selected" selectionKey="id"></bui-table></div>
</template>

<script>
  export default {
    data(){
      return {
        selected: [],
        columns: [
          { label: '姓名', key: 'name', width: 120, fixed: 'left' },
          { label: '性别', key: 'gender', width: 120 },
          { label: '年龄', key: 'age' },
          { label: '身高', key: 'height' },
          { label: '体重', key: 'weight' },
          { label: '地址', width: 240, key: 'address' },
          { label: '操作', key: 'operation', width: 200, fixed: 'right' }
        ],
        data: [
          {
            id: 1,
            name: '刘德华',
            gender: '男',
            age: 32,
            height: 175,
            weight: 65,
            address: '广东省广州市天河区猎德大道'
          },
          {
            id: 2,
            name: '张曼玉',
            gender: '女',
            age: 24,
            height: 167,
            weight: 45,
            address: '广东省广州市天河区猎德大道'
          },
          {
            id: 3,
            name: '张学友',
            gender: '男',
            age: 31,
            height: 170,
            weight: 64,
            address: '广东省广州市天河区猎德大道'
          },
          {
            id: 4,
            name: '郭富城',
            gender: '男',
            age: 34,
            height: 180,
            weight: 72,
            address: '广东省广州市天河区猎德大道'
          },
          {
            id: 5,
            name: '王小二',
            gender: '女',
            age: 24,
            height: 175,
            weight: 65,
            address: '广东省广州市天河区猎德大道'  
          }
        ]
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!-- 表格复选 -->
      <!-- columns 对象说明 -->
      <com-title title="columns 对象说明" info="columns API"></com-title>
      <div>
        <bui-table
          class="bui_fs_12"
          :columns="$columnsObject"
          :data="[
            { name: 'label', type: ['String'], default: '是', info: '表头字段名' },
            { name: 'key', type: ['String'], default: '是', info: '对应data数据的key值，用于显示默认数据，也用于指定插槽name' },
            { name: 'width', type: ['Number'], default: '否', info: '指定列宽度，不指定则根据table宽度平均分配' },
            { name: 'fixed', type: ['String'], default: '否', info: '固定列位置，可选left(左侧固定) | right(右侧固定)' }
          ]"
        ></bui-table>
      </div>
      <!-- columns 对象说明 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'columns', type: ['Array'], default: '[]', info: '表格列column数组' },
            { name: 'data', type: ['Array'], default: '[]', info: '表格行row数据' },
            { name: 'v-model', type: ['Array'], default: '[]', info: '组件绑定数据，用于绑定复选数据，启用该参数则开启复选框模式' },
            { name: 'selectionKey', type: ['String'], default: 'id', info: '复选模式时，取值keyname' },
            { name: 'height', type: ['Number'], default: '', info: '表格限制最大高度，当表格高度超过此值时，开启滚动条' },
            { name: 'border', type: ['Boolean'], default: 'false', info: '表格是否开启全边框样式' },
            { name: 'zebra', type: ['Boolean'], default: 'true', info: '表格是否开启斑马线样式' }
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
      isSlot: false,
      border: true,
      zebra: true,
      height: 0,
      width: '50%',
      selectionKey: '',
      selected: [],
      columns: [
        { label: '姓名', key: 'name', width: 120, fixed: 'left' },
        { label: '性别', key: 'gender', width: 120 },
        { label: '年龄', key: 'age' },
        { label: '身高', key: 'height' },
        { label: '体重', key: 'weight' },
        { label: '地址', width: 240, key: 'address' },
        { label: '操作', key: 'operation', width: 200, fixed: 'right' }
      ],
      data: [
        {
          id: 1,
          name: '刘德华',
          gender: '男',
          age: 32,
          height: 175,
          weight: 65,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 2,
          name: '张曼玉',
          gender: '女',
          age: 24,
          height: 167,
          weight: 45,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 3,
          name: '张学友',
          gender: '男',
          age: 31,
          height: 170,
          weight: 64,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 4,
          name: '郭富城',
          gender: '男',
          age: 34,
          height: 180,
          weight: 72,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 5,
          name: '王小二',
          gender: '女',
          age: 24,
          height: 175,
          weight: 65,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 6,
          name: '王小二',
          gender: '女',
          age: 24,
          height: 175,
          weight: 65,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 7,
          name: '王小二',
          gender: '女',
          age: 24,
          height: 175,
          weight: 65,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 8,
          name: '王小二',
          gender: '女',
          age: 24,
          height: 175,
          weight: 65,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 9,
          name: '王小二',
          gender: '女',
          age: 24,
          height: 175,
          weight: 65,
          address: '广东省广州市天河区猎德大道'
        },
        {
          id: 10,
          name: '王小二',
          gender: '女',
          age: 24,
          height: 175,
          weight: 65,
          address: '广东省广州市天河区猎德大道'
        }
      ]
    }
  },
  methods: {
    // 表头点击
    headerClick(res) {
      console.log(res)
    }
  },
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
