<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--分页-->
      <com-title title="分页" info="pagination"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-pagination</bui-badge>
        构建一个分页组件容器，使用参数
        <bui-badge size="24">pageTotal</bui-badge>
        ，
        <bui-badge size="24">pageNo</bui-badge>
        ，
        <bui-badge size="24">pageSize</bui-badge>
        控制页码总数、当前页码、前后显示页码数，
        <bui-badge size="24">disabled</bui-badge>
        定义组件是否禁用，
        <bui-badge size="24">@change</bui-badge>
        定义页码改变后回调
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>页码总数：</span>
            <bui-input v-model="pagination.pageTotal" type="number" size="24" min="1"></bui-input>
          </div>
          <div class="bui_vm">
            <span>当前页码：</span>
            <bui-input v-model="pagination.pageNo" type="number" size="24" min="1"></bui-input>
          </div>
          <div class="bui_vm">
            <span>显示数量：</span>
            <bui-input v-model="pagination.pageSize" type="number" size="24" min="1"></bui-input>
          </div>
          <div class="bui_vm">
            <span>禁用组件：</span>
            <bui-btn-group v-model="pagination.disabled" size="24">
              <option v-for="i in [false, true]" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div>
        <bui-pagination
          :pageTotal="pagination.pageTotal"
          :pageNo="pagination.pageNo"
          :pageSize="pagination.pageSize"
          :disabled="pagination.disabled"
          @change=";(pagination.pageNo = $event), $message({ content: '数据变更了，当前页码：' + $event })"
        ></bui-pagination>
      </div>
      <div>
        <bui-code language="xml">
          <textarea>
<template>
  <bui-pagination
    :pageTotal="pagination.pageTotal"
    :pageNo="pagination.pageNo"
    :pageSize="pagination.pageSize"
    @change="change"
  ></bui-pagination>
</template>

<script>
  export default{
    data(){
      return {
        pagination: { 
          pageTotal: 999, 
          pageNo: 1, 
          pageSize: 3 ,
        }
      }
    },
    methods:{
      change(i) {
        this.pageNo == i
      }
    }
  }
</script>
</textarea
          >
        </bui-code>
      </div>
      <!--分页-->
      <!--主题样式-->
      <com-title title="主题样式" info="style"></com-title>
      <p>
        使用参数
        <bui-badge size="24">mode</bui-badge>
        定义组件的主题样式，可选light(浅色) | dark(深色) ，
        <bui-badge size="24">size</bui-badge>
        定义组件高度，相应内部元素尺寸，
        <bui-badge size="24">colorname</bui-badge>
        定义组件主题颜色
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>容器主题：</span>
            <bui-btn-group v-model="pagination.mode" size="24">
              <option v-for="i in ['light', 'dark']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>组件尺寸：</span>
            <bui-btn-group v-model="pagination.size" size="24">
              <option v-for="i in [24, 32, 48, 64]" :key="i" :value="i">{{ i }}px</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>主题颜色：</span>
            <bui-btn-group v-model="pagination.colorname" size="24">
              <option v-for="i in $colorArray" :key="i" :value="i" v-if="i !== 'white'">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div>
        <bui-pagination
          :pageTotal="pagination.pageTotal"
          :pageNo="pagination.pageNo"
          :pageSize="pagination.pageSize"
          :disabled="pagination.disabled"
          :size="pagination.size"
          :colorname="pagination.colorname"
          :mode="pagination.mode"
          @change="change"
        ></bui-pagination>
      </div>
      <div>
        <bui-code language="xml">
          <textarea>
<bui-pagination
  :pageTotal="pagination.pageTotal"
  :pageNo="pagination.pageNo"
  :pageSize="pagination.pageSize"
  :size="48"
  colorname="red"
  mode="dark"
></bui-pagination></textarea
          >
        </bui-code>
      </div>
      <!--主题样式-->
      <!--参数-->
      <com-title title="参数" info="props"></com-title>
      <div>
        <bui-table
          :columns="[{ label: '参数', key: 'name' }, { label: '类型', key: 'type' }, { label: '默认值/参数', key: 'default' }, { label: '说明', key: 'content' }]"
          :data="[
            { name: 'pageTotal', type: 'Number', default: '0', content: '最大页码数' },
            { name: 'pageNo', type: 'Number', default: '0', content: '当前页码' },
            { name: 'pageSize', type: 'Number', default: '0', content: '前后最大显示页码数' },
            { name: 'size', type: 'Number', default: '32', content: '尺寸' },
            { name: 'colorname', type: 'String', default: 'turquoise', content: '颜色名称' },
            { name: 'mode', type: 'String', default: 'dark', content: '显示效果，可选 dark | light' },
            { name: 'disabled', type: 'Boolean', default: 'false', content: '禁用分页器' },
            { name: '@change', type: 'Function', default: '(i)=>{当前页码=i}', content: '页面切换操作回调' }
          ]"
          class="bui_fs_12"
        ></bui-table>
      </div>
      <!-- 参数 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: { pageTotal: 999, pageNo: 1, pageSize: 3, size: 32, colorname: 'red', mode: 'dark', disabled: false }
    }
  },
  methods: {
    change(i) {
      this.pagination.disabled = true
      setTimeout(() => {
        this.pagination.disabled = false
        this.pagination.pageNo = i
      }, 300)
    }
  },
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
