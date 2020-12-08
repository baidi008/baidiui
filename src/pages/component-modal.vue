<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--模态对话框-->
      <com-title title="模态对话框" info="modal"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-modal</bui-badge>
        构建一个模态对话框，常用于临时展示复杂内容。设置其参数
        <bui-badge size="24">ref</bui-badge>
        作为页面上唯一引用信息，通过组件内置方法
        <bui-badge size="24">open</bui-badge>
        和
        <bui-badge size="24">close</bui-badge>
        控制对话框的打开关闭
      </p>
      <p>
        对话框内容使用插槽
        <bui-badge size="24">slot=default</bui-badge>
        来定义
      </p>
      <div>
        <bui-btn @click="$refs['basic'].open()">打开一个模态对话框</bui-btn>
        <bui-modal ref="basic" title="modal title">
          <bui-img :src="'https://baidiui.com/demo/pic/pic001.jpg'" width="100%" ratio="21:9"></bui-img>
          <div class="bui_p_24 bui_ta_c">
            <div class="bui_row_p_24">
              <p>一个支持复杂内容展示的模态对话框</p>
              <div>
                <bui-btn @click=";(position = 'top'), $refs['basic'].close()" colorname="red" class="bui_m_12_r">关闭这个</bui-btn>
                <bui-btn @click=";(position = 'top'), $refs['position'].open()">打开另外一个</bui-btn>
              </div>
            </div>
          </div>
        </bui-modal>
      </div>

      <bui-code>
        <textarea>
<template>
  <div>
    <!-- 按钮 -->
    <button @click="openModal">打开模态对话框</button>
    <button @click="closeModal">关闭模态对话框</button>
    <!-- 按钮 -->
    
    <!-- 模态对话框 -->
    <bui-modal ref="modal">我是一个基础的模态对话框</bui-modal>
    <!-- 模态对话框 -->
  </div>
</template>

<script>
  export default {
    methods: {
      // 打开模态对话框
      openModal() {
        this.$refs['modal'].open()
      },
      // 关闭模态对话框
      closeModal() {
        this.$refs['modal'].open()
      }
    }
  }
</script>
  </textarea
        >
      </bui-code>

      <!--模态对话框-->
      <!--展示位置-->
      <com-title title="展示位置" info="position"></com-title>
      <p>
        使用
        <bui-badge size="24">positions</bui-badge>
        元素控制对话框展示位置，可选位置 top(顶部default) | center(垂直居中) | bottom(底部) | side,left(侧边左) | side,right(侧边右) | side,top(侧边上) | side,bottom(侧边下)
      </p>
      <div>
        <div class="bui_row_p_12">
          <div>
            <bui-btn-group v-model="position" @change="$refs['position'].open()">
              <option v-for="data in ['top', 'center', 'bottom']" :key="data" :value="data">{{ data }}</option>
            </bui-btn-group>
          </div>
          <div>
            <bui-btn-group v-model="position" @change="$refs['position'].open()">
              <option v-for="data in ['side,left', 'side,right', 'side,top', 'side,bottom']" :key="data" :value="data">{{ data }}</option>
            </bui-btn-group>
          </div>
        </div>

        <bui-modal ref="position" :title="'modal-' + position" :positions="position">
          <div class="bui_p_24 bui_ta_c">
            <div class="bui_row_p_24">
              <p><bui-img :src="'https://baidiui.com/demo/pic/pic002.jpg'" width="20rem" ratio="21:9"></bui-img></p>
              <p>一个支持复杂内容展示的展示位置</p>
            </div>
          </div>
        </bui-modal>
      </div>
      <bui-code>
        <textarea>
<bui-modal positions="top">顶部</bui-modal>
<bui-modal positions="center">垂直居中</bui-modal>
<bui-modal positions="bottom">底部</bui-modal>
<bui-modal positions="side,top">侧边顶部</bui-modal>
<bui-modal positions="side,bottom">侧边底部</bui-modal>
<bui-modal positions="side,left">侧边左</bui-modal>
<bui-modal positions="side,right">侧边右</bui-modal></textarea
        >
      </bui-code>
      <!--展示位置-->
      <!-- 宽度 -->
      <com-title title="宽度" info="width"></com-title>
      <p>
        使用参数
        <bui-badge size="24">width</bui-badge>
        定义组件的宽度。至于高度则为自适应模式，如果超出window高度，默认显示内部滚动条
      </p>
      <div>
        <bui-btn-group v-model="width" @change="$refs['width'].open()">
          <option v-for="i in ['320px', '480px', '50rem', '50%', '100%']" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
        <bui-modal ref="width" title="width-demo" :width="width">
          <div class="bui_p_24">
            <div class="bui_row_p_12">
              <p><bui-btn @click="row = row + 10">添加十行</bui-btn></p>
              <p><bui-btn @click="row = 1">重置</bui-btn></p>
              <p v-for="(i, index) in row" :key="i">{{ index + 1 }}.当前预设宽度为{{ width }}</p>
            </div>
          </div>
        </bui-modal>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-modal width="100%">当前预设宽度为100%</bui-modal></textarea></bui-code>
      <!-- 宽度 -->
      <!-- 交互对话 -->
      <com-title title="预设交互对话" info="default interactive"></com-title>
      <p>
        使用参数
        <bui-badge size="24">mode=alert</bui-badge>
        ，
        <bui-badge size="24">mode=confirm</bui-badge>
        定义对话框的预设交互功能，默认不开启
      </p>
      <p>
        当打开预设交互功能时，点击按钮后并不对对话框进行其他操作，需在事件回调中自行关闭，提供了
        <bui-badge size="24">@cancel</bui-badge>
        和
        <bui-badge size="24">@submit</bui-badge>
        两个事件回调，可设置点击取消按钮，点击确定按钮后回调
      </p>
      <p>
        可以使用参数
        <bui-badge size="24">successText</bui-badge>
        、
        <bui-badge size="24">cancelText</bui-badge>
        自定义按钮显示文字
      </p>

      <div>
        <div class="bui_row_p_12 bui_inline">
          <div><bui-btn @click=";(mode = 'alert'), (successText = '确定'), (cancelText = '取消'), $refs['mode'].open()">alert</bui-btn></div>
          <div><bui-btn @click=";(mode = 'confirm'), (successText = '确定'), (cancelText = '取消'), $refs['mode'].open()">confirm</bui-btn></div>
          <div><bui-btn @click=";(mode = 'confirm'), (successText = '搞他！'), (cancelText = '不搞了！'), $refs['mode'].open()">自定义按钮文本</bui-btn></div>
        </div>
        <bui-modal
          ref="mode"
          :title="mode"
          :mode="mode"
          @cancel="$msg({ content: '点击了cancel按钮' }), $refs['mode'].close()"
          @submit="$msg({ content: '点击了submit按钮' }), $refs['mode'].close()"
          :successText="successText"
          :cancelText="cancelText"
        >
          <p class="bui_p_24">我是一个 {{ mode }} 对话框</p>
        </bui-modal>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<template>
  <div>
    <bui-modal ref="modalAlert" mode="alert" @submit="submit">我是一个alert对话框</bui-modal>
    <bui-modal ref="modalConfirm" mode="confirm" @submit="submit" @cancel="cancel">我是一个confirm对话框</bui-modal>
  </div>
</template>

<script>
  export default(){
    mounted(){
     // 打开alert对话框
     this.$refs['modalAlert'].open()
     // 打开confirm对话框
     this.$refs['modalConfirm'].open()
    },
    methods:{
      submit(){
        console.log('你点击了submit按钮')
        this.$refs['modalAlert'].close()
        this.$refs['modalConfirm'].close()
      },cancel(){
        console.log('你点击了cancel按钮')
        this.$refs['modalAlert'].close()
        this.$refs['modalConfirm'].close()
      }
    }
  }
</script></textarea
        >
      </bui-code>
      <!-- 交互对话 -->
      <!--关闭方式-->
      <com-title title="关闭方式" info="closeble"></com-title>
      <p>
        对话框本身提供点击按钮，点击遮罩层两种关闭方式，可通过参数
        <bui-badge size="24">closeble</bui-badge>
        定义对话框关闭方式。
      </p>
      <p>
        <bui-badge size="24">closeble</bui-badge>
        默认值为数组['button','mask']，代表响应点击按钮和点击遮罩层关闭方式，如设置为['button']则表示只响应点击按钮关闭方式、设置为['mask']则表示只响应点击遮罩层关闭方式。如设置未false或null则关闭全部关闭方式，此时必须用组件内置方法close()关闭，如this.$refs['modal'].close()
      </p>
      <div>
        <bui-btn-group v-model="closeble" @change="$refs['closeble'].open()">
          <option v-for="(i, index) in [false, ['button'], ['mask'], ['button', 'mask']]" :key="index" :value="i">{{ i }}</option>
        </bui-btn-group>
        <bui-modal ref="closeble" title="测试关闭" :closeble="closeble">
          <div class="bui_p_24">
            <p>当前关闭方式为：{{ closeble }}</p>
            <template v-if="!closeble">
              <p class="bui_vm">
                <span>当前方式你只能通过内置方法</span>
                <bui-btn mode="link" @click="$refs['closeble'].close()">close()</bui-btn>
                <span>来关闭</span>
              </p>
            </template>
          </div>
        </bui-modal>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 默认 两种方式都可以关闭 -->
<bui-modal ref="closebelDemo">...</bui-modal>

<!-- 只能点击按钮关闭 -->
<bui-modal ref="closebelDemo" :closeble="['button']">...</bui-modal>

<!-- 只能点击遮罩层关闭 -->
<bui-modal ref="closebelDemo" :closeble="['mask']">...</bui-modal>

<!-- 禁用全部关闭方式，只能通过内置方法关闭 -->
<bui-modal ref="closebelDemo" :closeble="false">...</bui-modal></textarea
        >
      </bui-code>
      <!--关闭方式-->
      <!--自定义页头页脚-->
      <com-title title="自定义页头页脚" info="custom"></com-title>
      <p>
        使用
        <bui-badge size="24">slot=header</bui-badge>
        和
        <bui-badge size="24">slot=footer</bui-badge>
        可自定义页头页脚内容，可更自由的操作对话框展示样式
      </p>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div><bui-btn @click="$refs['custom'].open()">自定义页头页脚</bui-btn></div>
        </div>

        <bui-modal ref="custom">
          <div slot="header" class="bui_p_12 bui_bgc_red bui_fc_white">
            <bui-fa-icon icon="bars"></bui-fa-icon>
            使用slot定义页头内容
          </div>
          <div class="bui_p_24 bui_ta_c">
            <div class="bui_row_p_24">
              <p><bui-img :src="'https://baidiui.com/demo/pic/pic003.jpg'" width="20rem" ratio="21:9"></bui-img></p>
              <p>自定义页头页脚</p>
            </div>
          </div>
          <div slot="footer" class="bui_p_12 bui_bds_1_t bui_fc_white bui_ta_r">
            <div class="bui_inline bui_ta_c">
              <div class="bui_p_6_lr"><bui-btn @click="$refs['custom'].close()">点我关闭</bui-btn></div>
              <div class="bui_p_6_lr"><bui-btn colorname="red" @click="$msg({ content: '触发了某个事件' })">打开消息</bui-btn></div>
              <div class="bui_p_6_lr"><bui-btn colorname="orange" @click="$confirm({ content: '触发了某个事件' })">打开对话</bui-btn></div>
            </div>
          </div>
        </bui-modal>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-modal ref="custom">
  <div slot="header">页头内容</div>
  <div>body内容</div>
  <div slot="footer">页脚内容</div>
</bui-modal></textarea
        >
      </bui-code>
      <!--自定义页头页脚-->
      <!-- 事件回调 -->
      <com-title title="事件回调" info="event"></com-title>
      <p>
        提供
        <bui-badge size="24">@opened</bui-badge>
        ，
        <bui-badge size="24">@closed</bui-badge>
        ，
        <bui-badge size="24">@submit</bui-badge>
        ，
        <bui-badge size="24">@cancel</bui-badge>
        四种回调方式，分别响应打开后，关闭后，点击取消按钮后，点击确定按钮后的事件回调，其中@submit只有在mode=alert或model=confirm时有效，@cancel只在mode=confirm时有效
      </p>
      <div>
        <bui-btn @click="$refs['event'].open()">点击打开</bui-btn>
        <bui-modal
          title="event demo"
          ref="event"
          mode="confirm"
          @opened="$msg({ content: '已打开' })"
          @closed="$msg({ content: '已关闭' })"
          @cancel="$msg({ content: '点击了cancel按钮' })"
          @submit="$msg({ content: '点击了submit按钮' })"
        >
          <p class="bui_p_24">测试事件回调</p>
        </bui-modal>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-modal
  title="event demo"
  ref="event"
  mode="confirm"
  @opened="$msg({ content: '已打开' })"
  @closed="$msg({ content: '已关闭' })"
  @cancel="$msg({ content: '点击了cancel按钮' })"
  @submit="$msg({ content: '点击了submit按钮' })"
>
  <p class="bui_p_24">测试事件回调</p>
</bui-modal></textarea
        >
      </bui-code>
      <!-- 事件回调 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'ref', type: ['String'], default: '', info: '页面唯一引用信息，自动在页面的this.$refs内注册' },
            { name: 'title', type: ['String'], default: '', info: '模态对话框标题' },
            { name: 'width', type: ['String', 'Number'], default: '480px', info: '组件宽度，可为px | rem | em | rpx | % 等单位' },
            {
              name: 'positions',
              type: ['String'],
              default: 'top',
              info: '组件展示位置，可选位置 top(顶部default) | center(垂直居中) | bottom(底部) | side,left(侧边左) | side,right(侧边右) | side,top(侧边上) | side,bottom(侧边下)'
            },
            { name: 'mode', type: ['String'], default: '', info: '预设交互模式，可选 alert(警告) | confirm(对话)' },
            { name: 'successText', type: ['String'], default: '确定', info: '开启预设交互模式时，确定按钮文本。' },
            { name: 'cancelText', type: ['String'], default: '取消', info: '开启预设交互模式时，取消按钮文本。' },
            { name: 'closeble', type: ['Array', 'Boolean'], default: '[\'button\',\'mask\']', info: '允许关闭操作，默认允许button和mask操作，该参数为false时，禁用所有关闭方式' },
            { name: 'colorname', type: ['String'], default: 'black,f,24', info: '组件遮罩层颜色，默认为黑色透明。' },
            { name: '@opened', type: ['Function'], default: '()=>{}', info: '组件打开后回调' },
            { name: '@close', type: ['Function'], default: '()=>{}', info: '组件关闭后回调' },
            { name: '@submit', type: ['Function'], default: '()=>{}', info: '开启预设交互模式时，点击确定按钮回调' },
            { name: '@cancel', type: ['Function'], default: '()=>{}', info: '开启预设交互模式时，点击取消按钮回调' }
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
          :data="[
            { name: 'default', default: 'null', info: '模态对话框主要内容' },
            { name: 'header', default: '将覆盖默认页头', info: '模态对话框自定义页头' },
            { name: 'footer', default: '将覆盖默认页脚', info: '模态对话框自定义页脚' }
          ]"
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
      position: '',
      width: '',
      row: 1,
      mode: false,
      successText: '确定',
      cancelText: '取消',
      closeble: false
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
