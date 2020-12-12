<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--输入框-->
      <com-title title="输入框" info="input"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-input</bui-badge>
        重新构造一个文本输入框
      </p>
      <div>
        <div class="bui_inline bui_row_p_12">
          <div><bui-input v-model="value" placeholder="请输入内容"></bui-input></div>
          <div><bui-input v-model="value" placeholder="我是只读的" :readonly="true"></bui-input></div>
          <div><bui-input v-model="value" placeholder="我是禁用的" :disabled="true"></bui-input></div>
        </div>
      </div>
      <div>
        <div class="bui_inline bui_row_p_12">
          <div><bui-input type="password" v-model="value" placeholder="请输入内容"></bui-input></div>
          <div><bui-input type="password" v-model="value" placeholder="我是只读的" :readonly="true"></bui-input></div>
          <div><bui-input type="password" v-model="value" placeholder="我是禁用的" :disabled="true"></bui-input></div>
        </div>
      </div>

      <div>
        <bui-code language="xml">
          <pre>
&lt;bui-input v-model="绑定数据"&gt;&lt;/bui-input&gt; // 正常
&lt;bui-input v-model="绑定数据" :readonly="true"&gt;&lt;/bui-input&gt; // 只读
&lt;bui-input v-model="绑定数据" :disabled="true"&gt;&lt;/bui-input&gt; // 禁用</pre
          >
        </bui-code>
      </div>
      <!--输入框-->
      <!--主题-->
      <com-title title="主题" info="theme"></com-title>
      <p>
        使用参数
        <bui-badge size="24">effect</bui-badge>
        定义文本输入框的主题，另外可用
        <bui-badge size="24">colorname</bui-badge>
        ，
        <bui-badge size="24">size</bui-badge>
        ，
        <bui-badge size="24">width</bui-badge>
        ，控制组件的主题色和尺寸
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>主题样式：</span>
            <bui-btn-group v-model="effect" size="24">
              <option v-for="i in ['default', 'line']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div>
            <span>主题颜色：</span>
            <bui-btn-group v-model="colorname" size="24">
              <template v-for="i in $colorArray.filter(res => res !== 'white')">
                <option :key="i" :value="i">{{ i }}</option>
              </template>
            </bui-btn-group>
          </div>
          <div>
            <span>组件尺寸：</span>
            <bui-btn-group v-model="size" size="24">
              <template v-for="i in [12, 24, 32, 48, 64, 72]">
                <option :key="i" :value="i">{{ i }}</option>
              </template>
            </bui-btn-group>
          </div>
          <div>
            <span>组件宽度：</span>
            <bui-btn-group v-model="width" size="24">
              <template v-for="i in ['12rem', '50%', '100%']">
                <option :key="i" :value="i">{{ i }}</option>
              </template>
            </bui-btn-group>
          </div>
          <div>
            <span>边角样式：</span>
            <bui-btn-group v-model="radius" size="24">
              <template v-for="i in ['default', 'fillet', 'pill']">
                <option :key="i" :value="i">{{ i }}</option>
              </template>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-input v-model="value" placeholder="请输入内容" :size="size" :width="width" :effect="effect" :colorname="colorname" :radius="radius"></bui-input></div>
      <div>
        <bui-input v-model="valueNumber" type="number" placeholder="请输入内容" :size="size" :width="width" :effect="effect" :colorname="colorname" :radius="radius"></bui-input>
      </div>
      <div>
        <bui-input
          v-model="valueTextarea"
          type="textarea"
          placeholder="请输入内容"
          :size="size"
          :width="width"
          :effect="effect"
          :colorname="colorname"
          :radius="radius"
        ></bui-input>
      </div>
      <bui-code language="xml"><pre>&lt;bui-input v-model="绑定数据" colorname="green"&gt;&lt;/bui-input&gt;</pre></bui-code>
      <!--主题-->

      <!--标题-->
      <com-title title="标题" info="title"></com-title>
      <p>
        使用参数
        <bui-badge size="24">title</bui-badge>
        定义文本输入框标题
      </p>
      <div><bui-input v-model="value" placeholder="请输入内容" width="100%" :title="'我是标题'" :size="size"></bui-input></div>
      <div>
        <bui-code language="xml"><pre>&lt;bui-input v-model="绑定数据" title="我是标题"&gt;&lt;/bui-input&gt;</pre></bui-code>
      </div>
      <!--标题-->
      <!--前后内容-->
      <com-title title="前后内容" info="fix" :size="size"></com-title>
      <p>
        使用参数
        <bui-badge size="24" class="bui_m_6_r">icon-l</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">icon-r</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">text-l</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">text-r</bui-badge>
        定义文本输入框前后图标或文本
      </p>
      <div class="bui_col_4_md"><bui-input v-model="value" :size="size" placeholder="请输入内容" width="100%" icon-l="search"></bui-input></div>
      <div class="bui_col_4_md"><bui-input v-model="value" :size="size" placeholder="请输入内容" width="100%" icon-r="date-range"></bui-input></div>
      <div class="bui_col_4_md"><bui-input v-model="value" :size="size" placeholder="请输入内容" width="100%" icon-l="search" icon-r="date-range"></bui-input></div>
      <div class="bui_col_4_md"><bui-input v-model="value" :size="size" placeholder="请输入内容" width="100%" text-l="https://"></bui-input></div>
      <div class="bui_col_4_md"><bui-input v-model="value" :size="size" placeholder="请输入内容" width="100%" text-r=".com"></bui-input></div>
      <div class="bui_col_4_md"><bui-input v-model="value" :size="size" placeholder="请输入内容" width="100%" text-l="https://" text-r=".com"></bui-input></div>
      <div>
        <bui-code language="xml">
          <pre>
// 图标
&lt;bui-input v-model="绑定数据" icon-l="search" icon-r="bars"&gt;&lt;/bui-input&gt;

// 文本
&lt;bui-input v-model="绑定数据" text-l="http://" text-r=".com"&gt;&lt;/bui-input&gt;</pre
          >
        </bui-code>
      </div>
      <!--前后内容-->
      <!--文本域-->
      <com-title title="文本域" info="textarea"></com-title>
      <p>
        使用参数
        <bui-badge size="24">type="textarea"</bui-badge>
        将输入框定义为文本域
      </p>
      <div><bui-input type="textarea" v-model="valueTextarea" placeholder="请输入内容" width="100%"></bui-input></div>
      <div>
        <bui-code language="xml"><pre>&lt;bui-input type="textarea" v-model="绑定数据"&gt;&lt;/bui-input&gt;</pre></bui-code>
      </div>
      <!--文本域-->
      <!--数字-->
      <com-title title="数字" info="number"></com-title>
      <p>
        使用参数
        <bui-badge size="24">type="number"</bui-badge>
        将输入框定义为数字输入框
      </p>
      <div class="bui_col_3_md">
        <p class="bui_fc_silver_d bui_fs_12 bui_p_6_b">default</p>
        <bui-input type="number" v-model="valueNumber" placeholder="请输入内容" title="tsaet" width="100%" :min="-1"></bui-input>
      </div>
      <div class="bui_col_3_md">
        <p class="bui_fc_silver_d bui_fs_12 bui_p_6_b">
          参数
          <bui-badge>step</bui-badge>
          定义数字加减步长
        </p>
        <bui-input type="number" step="10.24" v-model="valueNumber" placeholder="请输入内容" title="tsaet" width="100%"></bui-input>
        <p class="bui_fc_silver_d bui_fs_12">例：step=10.24</p>
      </div>
      <div class="bui_col_3_md">
        <p class="bui_fc_silver_d bui_fs_12 bui_p_6_b">
          参数
          <bui-badge class="bui_m_6_r">min</bui-badge>
          <bui-badge class="bui_m_6_r">min</bui-badge>
          定义最大数值和最小数值
        </p>
        <bui-input type="number" min="-5" max="8.5" v-model="valueNumber" placeholder="请输入内容" title="tsaet" width="100%"></bui-input>
        <p class="bui_fc_silver_d bui_fs_12">例：min=-5，max=8.5</p>
      </div>
      <div class="bui_col_3_md">
        <p class="bui_fc_silver_d bui_fs_12 bui_p_6_b">
          参数
          <bui-badge class="bui_m_6_r">tofixed</bui-badge>
          定义数字后最大保留小数点数位数
        </p>
        <bui-input type="number" tofixed="4" step="2.45874" v-model="valueNumber" placeholder="请输入内容" title="tsaet" width="100%"></bui-input>
        <p class="bui_fc_silver_d bui_fs_12">例：tofixed=4</p>
      </div>
      <div>
        <bui-code language="xml">
          <pre>&lt;bui-input type="number" v-model="绑定数据" step="步长" min="最小值" max="最大值" tofixed="最大小数点位数"&gt;&lt;/bui-input&gt;</pre>
        </bui-code>
      </div>
      <!--数字-->
      <!--监听操作-->
      <com-title title="监听操作" info="input"></com-title>
      <p>
        使用参数
        <bui-badge size="24" class="bui_m_6_r">@input</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">@focus</bui-badge>
        <bui-badge size="24" class="bui_m_6_r">@blur</bui-badge>
        来定义操作框事件回调
      </p>
      <div class="bui_col_4_md"><bui-input v-model="value" placeholder="请输入内容" width="100%" title="监听输入" @input="$msg({ content: '已输入内容' })"></bui-input></div>
      <div class="bui_col_4_md"><bui-input v-model="value" placeholder="请输入内容" width="100%" title="监听获得焦点" @focus="$msg({ content: '已获得焦点' })"></bui-input></div>
      <div class="bui_col_4_md"><bui-input v-model="value" placeholder="请输入内容" width="100%" title="监听失去焦点" @blur="$msg({ content: '已失去焦点' })"></bui-input></div>

      <div>
        <bui-code language="xml">
          <pre>
&lt;bui-input v-model="绑定数据" @input="$msg({content:'已输入内容'})"&gt;&lt;/bui-input&gt;
&lt;bui-input v-model="绑定数据" @focus="$msg({content:'已获得焦点'})"&gt;&lt;/bui-input&gt;
&lt;bui-input v-model="绑定数据" @blur="$msg({content:'已失去焦点'})"&gt;&lt;/bui-input&gt;</pre
          >
        </bui-code>
      </div>
      <!--监听操作-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'v-model', type: ['String', 'Number'], default: '', info: '文本输入框绑定数据' },
            { name: 'placeholder', type: ['String'], default: '', info: '输入框为空时提示文本' },
            { name: 'type', type: ['String'], default: 'input', info: '输入框类型，可选 input(文本) | textarea(文本域) | number(数字)' },
            { name: 'disabled', type: ['Boolean'], default: 'false', info: '禁用输入框' },
            { name: 'readonly', type: ['Boolean'], default: 'false', info: '将输入框设为只读' },
            { name: 'title', type: ['String'], default: 'null', info: '输入框标题' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '文本输入框边框颜色' },
            { name: 'size', type: ['Number'], default: 32, info: '文本输入框高度（响应内部元素尺寸）' },
            { name: 'effect', type: ['String'], default: 'default', info: '输入框样式，可选 default(全边框) | line(下边框)' },
            { name: 'radius', type: ['String'], default: 'radius', info: '输入框边角，可选 default(无弧度) | fillet(圆角) | pill(圆形) 该值在effect=line时无效' },
            { name: '@input', type: ['Function'], default: '()=>{}', info: '输入后回调' },
            { name: '@focus', type: ['Function'], default: '()=>{}', info: '文本框获得焦点后回调' },
            { name: '@blur', type: ['Function'], default: '()=>{}', info: '文本框失去焦点后回调' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- public props -->
      <!-- input props -->
      <com-title title="文本输入框 参数" info="input props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'icon-l', type: ['String'], default: '', info: '左侧图标类名' },
            { name: 'icon-r', type: ['String'], default: '', info: '右侧图标类名' },
            { name: 'text-l', type: ['String'], default: '', info: '左侧附加文本' },
            { name: 'text-r', type: ['String'], default: '', info: '右侧附加文本' },
            { name: 'clearable', type: ['Boolean'], default: 'true', info: '是否显示清空按钮' },
            { name: 'maxlength', type: ['Number'], default: '', info: '输入框最大字数' },
            { name: 'show-length', type: ['Boolean'], default: '', info: '是否显示字数提示' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- input props -->
      <!-- textarea props -->
      <com-title title="文本域 参数" info="textarea props"></com-title>
      <div>
        <bui-table :columns="$columnsProps" :data="[{ name: 'resize', type: ['Boolean'], default: 'true', info: '文本域是否可鼠标拖动缩放' }]" class="bui_fs_12">
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- textarea props -->
      <!-- number props -->
      <com-title title="数字输入框 参数" info="number props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'step', type: ['Number'], default: '1', info: '点击按钮数字变化步长' },
            { name: 'min', type: ['Number'], default: '', info: '允许最小数值' },
            { name: 'max', type: ['Number'], default: '', info: '允许最大数值' },
            { name: 'tofixed', type: ['Number'], default: '2', info: '允许小数点后最大位数' }
          ]"
          class="bui_fs_12"
        >
          <template slot="type" slot-scope="res">
            <bui-badge v-for="type in res.row.type" class="bui_m_6_r">{{ type }}</bui-badge>
          </template>
        </bui-table>
      </div>
      <!-- number props -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 'text',
      valueTextarea:
        'textareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextarea',
      valueNumber: '0',
      colorname: 'turquoise',
      size: 48,
      effect: 'default',
      width: '12rem',
      radius: 'pill'
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
