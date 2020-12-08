<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--幻灯片-->
      <com-title title="幻灯片" info="tab"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-swiper</bui-badge>
        构造一个幻灯片容器，用slot插槽定义内容item
      </p>
      <p>
        组件依赖于swiper 3.0.0 版本，只是做了基础易用性处理，更多功能请访问
        <a href="https://swiperjs.com/" target="_blank" class="bui_fc_turquoise">swiperjs 官网</a>
      </p>
      <div class="bui_col_6_md">
        <bui-swiper>
          <div v-for="(i, index) in $colorArray.filter(res => res !== 'white')" :key="i">
            <div :class="['bui_bgc_' + i, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 20rem;">
              <i style="height: 100%;"></i>
              <p class="bui_fs_48">item-{{ index }}</p>
              <i style="height: 100%;"></i>
            </div>
          </div>
        </bui-swiper>
      </div>
      <div class="bui_col_6_md">
        <bui-swiper>
          <div v-for="i in 5" :key="i">
            <div
              :style="{
                height: '20rem',
                'background-image': 'url(https://baidiui.com/demo/pic/pic00' + [i + 1] + '.jpg)',
                'background-size': 'cover',
                'background-position': 'center'
              }"
            ></div>
          </div>
        </bui-swiper>
      </div>
      <p>每一个default slot生成一个swiperItem，具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-swiper>
  <div>item-0</div>
  <div>item-1</div>
  <div>item-2</div>
  ...
</bui-swiper></textarea
        >
      </bui-code>
      <!--幻灯片-->
      <!-- 切换效果 -->
      <com-title title="切换效果" info="effect"></com-title>
      <p>
        通过参数
        <bui-badge size="24">effect</bui-badge>
        控制swiper容器的切换效果，目前可用 default(滑动) | fade(渐变) | cube(方块) | coverflow(卡片) | flip(翻牌) 五种效果
      </p>
      <div v-for="i in ['fade', 'cube', 'coverflow', 'flip']" :key="i" class="bui_col_3_md">
        <p class="bui_fs_12 bui_m_12_b">{{ i }} 效果</p>
        <bui-swiper :effect="i">
          <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
            <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 20rem;">
              <i style="height: 100%;"></i>
              <p class="bui_fs_48">slider{{ colorIndex }}</p>
              <i style="height: 100%;"></i>
            </div>
          </div>
        </bui-swiper>
      </div>
      <!-- 播放 -->
      <com-title title="播放" info="play"></com-title>
      <p>
        使用参数
        <bui-badge size="24">autoplay</bui-badge>
        控制幻灯片的自动播放间隔时间，当
        <bui-badge size="24">autoplay=false</bui-badge>
        时停止自动播放，参数
        <bui-badge size="24">speed</bui-badge>
        控制幻灯片播放动画速度
      </p>
      <div class="bui_col_4_md">
        <div class="bui_row_p_12">
          <p class="bui_fs_12">禁止自动播放</p>
          <bui-swiper :autoplay="false">
            <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
              <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 20rem;">
                <i style="height: 100%;"></i>
                <p class="bui_fs_48">slider{{ colorIndex }}</p>
                <i style="height: 100%;"></i>
              </div>
            </div>
          </bui-swiper>
          <bui-code><textarea><bui-swiper :autoplay="false">...</bui-swiper></textarea></bui-code>
        </div>
      </div>
      <div class="bui_col_4_md">
        <div class="bui_row_p_12">
          <p class="bui_fs_12">自动播放间隔时间</p>
          <bui-swiper :autoplay="1000">
            <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
              <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 20rem;">
                <i style="height: 100%;"></i>
                <p class="bui_fs_48">slider{{ colorIndex }}</p>
                <i style="height: 100%;"></i>
              </div>
            </div>
          </bui-swiper>
          <bui-code><textarea><bui-swiper :autoplay="1000" >...</bui-swiper></textarea></bui-code>
        </div>
      </div>
      <div class="bui_col_4_md">
        <div class="bui_row_p_12">
          <p class="bui_fs_12">播放速度</p>
          <bui-swiper :speed="100" :autoplay="600">
            <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
              <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 20rem;">
                <i style="height: 100%;"></i>
                <p class="bui_fs_48">slider{{ colorIndex }}</p>
                <i style="height: 100%;"></i>
              </div>
            </div>
          </bui-swiper>
          <bui-code><textarea><bui-swiper :speed="100" :autoplay="600">...</bui-swiper></textarea></bui-code>
        </div>
      </div>
      <!-- 播放 -->
      <!-- 控件 -->
      <com-title title="控件" info="plug"></com-title>
      <p>
        使用参数
        <bui-badge size="24">plugin</bui-badge>
        参数控制控件显示方式，plugin=default为控件常显示，plugin=hover(默认)为鼠标经过时显示控件
      </p>
      <p>
        也可通过
        <bui-badge size="24">isnav=false</bui-badge>
        和
        <bui-badge size="24">isbtn=false</bui-badge>
        单独禁用导航控件和左右按钮控件
      </p>
      <div class="bui_col_6_md">
        <div class="bui_row_p_12">
          <p class="bui_fs_12">常显示</p>
          <bui-swiper plugin="default">
            <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
              <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 15rem;">
                <i style="height: 100%;"></i>
                <p class="bui_fs_48">slider{{ colorIndex }}</p>
                <i style="height: 100%;"></i>
              </div>
            </div>
          </bui-swiper>
          <bui-code><textarea><bui-swiper plugin="default">...</bui-swiper></textarea></bui-code>
        </div>
      </div>
      <div class="bui_col_6_md">
        <div class="bui_row_p_12">
          <p class="bui_fs_12">禁用进度导航</p>
          <bui-swiper :isnav="false">
            <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
              <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 15rem;">
                <i style="height: 100%;"></i>
                <p class="bui_fs_48">slider{{ colorIndex }}</p>
                <i style="height: 100%;"></i>
              </div>
            </div>
          </bui-swiper>
          <bui-code><textarea><bui-swiper :isnav="false">...</bui-swiper></textarea></bui-code>
        </div>
      </div>
      <div class="bui_col_6_md">
        <div class="bui_row_p_12">
          <p class="bui_fs_12">禁用左右按钮</p>
          <bui-swiper :isbtn="false">
            <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
              <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 15rem;">
                <i style="height: 100%;"></i>
                <p class="bui_fs_48">slider{{ colorIndex }}</p>
                <i style="height: 100%;"></i>
              </div>
            </div>
          </bui-swiper>
          <bui-code><textarea><bui-swiper :isbtn="false">...</bui-swiper></textarea></bui-code>
        </div>
      </div>
      <div class="bui_col_6_md">
        <div class="bui_row_p_12">
          <p class="bui_fs_12">全部禁用</p>
          <bui-swiper :isnav="false" :isbtn="false">
            <div v-for="(color, colorIndex) in $colorArray" :key="colorIndex" v-if="color != 'white'">
              <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 15rem;">
                <i style="height: 100%;"></i>
                <p class="bui_fs_48">slider{{ colorIndex }}</p>
                <i style="height: 100%;"></i>
              </div>
            </div>
          </bui-swiper>
          <bui-code><textarea><bui-swiper :isnav="false" :isbtn="false">...</bui-swiper></textarea></bui-code>
        </div>
      </div>

      <!-- 控件 -->
      <!-- 导航颜色 -->
      <com-title title="导航颜色" info="plug color"></com-title>
      <p>通过参数colorname控制swiper容器的主题颜色（其实只是控件颜色）</p>
      <div class="bui_vm">
        <span>主题颜色：</span>
        <bui-btn-group v-model="colorname" size="24">
          <option v-for="i in $colorArray" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div>
        <bui-swiper :colorname="colorname" plugin="default">
          <div v-for="(color, colorIndex) in $colorArray.filter(res => res !== 'white')" :key="colorIndex">
            <div :class="['bui_bgc_' + color, 'bui_ta_c', 'bui_fc_white', 'bui_inline', 'bui_vm']" style="height: 20rem;">
              <i style="height: 100%;"></i>
              <p class="bui_fs_48">slider{{ colorIndex }}</p>
              <i style="height: 100%;"></i>
            </div>
          </div>
        </bui-swiper>
      </div>

      <bui-code><textarea><bui-swiper :colorname="red">...</bui-swiper></textarea></bui-code>
      <!-- 导航颜色 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'effect', type: ['String'], default: 'default', info: '幻灯片切换效果，可选 default(滑动) | fade(渐变) | cube(方块) | coverflow(卡片) | flip(翻牌)' },
            { name: 'autoplay', type: ['Boolean', 'Number'], default: '3000', info: '幻灯片自动播放速度，设为false将禁止自动播放' },
            { name: 'speed', type: ['Number'], default: '1000', info: '幻灯片动画切换时间' },
            { name: 'plugin', type: ['String'], default: 'hover', info: '控件显示方式，hover为鼠标经过时现实，default为常显示' },
            { name: 'isnav', type: ['Boolean'], default: 'true', info: '是否显示导航控件' },
            { name: 'isbtn', type: ['Boolean'], default: 'true', info: '是否显示左右按钮控件' },
            { name: 'colorname', type: ['String'], default: 'turquoise', info: '组件主题颜色' }
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
        <bui-table :columns="$columnsSlots" :data="[{ name: 'default', default: 'null', info: '每个子元素生成一个swiper item，内部可为任意元素' }]" class="bui_fs_12">
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
      colorname: 'red',
      autoplay: false
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
