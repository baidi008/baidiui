<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--单图处理-->
      <com-title title="单图处理" info="update images"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-choose-img</bui-badge>
        构建一个图片上传区域，可在图片上传前做出压缩质量、改变尺寸等预处理后生成图片base64字符串以待上传，显示元素使用slot插槽构建
      </p>
      <p>
        使用参数
        <bui-badge size="24">v-model</bui-badge>
        绑定数据，返回base64值
      </p>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div class="bui_vm">
            <span>最大尺寸：</span>
            <bui-select v-model="max" :size="32">
              <option v-for="(i, index) in [240, 480, 960, 1024]" :key="index" :value="i">{{ i }}</option>
            </bui-select>
          </div>
          <div class="bui_vm">
            <span>图片质量：</span>
            <bui-select v-model="compress" :size="32">
              <option v-for="(i, index) in [0, 20, 40, 80, 100]" :key="index" :value="i">{{ i }}</option>
            </bui-select>
          </div>
        </div>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_m_12_b">点击一下图片更换</p>
        <bui-choose-img v-model="images.url" :compress="compress" :max="max">
          <div class="bui_p_12 bui_bds_1"><bui-img :src="images.url" :width="null"></bui-img></div>
        </bui-choose-img>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_m_12_b">处理后图片大小：</p>
        <div>{{ $toFixed(images.url.length / 1024, 2) + 'kb' }}</div>
      </div>
      <div>
        <p class="bui_fs_12 bui_fc_silver_d bui_m_12_b">处理后base64编码（只显示前10行）：</p>
        <div class="bui_line_clamp_10">{{ images.url }}</div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-choose-img v-model="image">任意内容</bui-choose-img></textarea></bui-code>
      <!--单图处理-->
      <!-- 多图处理 -->
      <com-title title="多图处理" info="multiple"></com-title>
      <p>
        使用参数
        <bui-badge size="24">multiple</bui-badge>
        定义组件为多选模式，该模式绑定数据必须为数组形式
      </p>
      <div>
        <div class="bui_bds_1 bui_p_12">
          <div class="bui_inline bui_row_p_12">
            <template v-for="(img, imgIndex) in images.urls">
              <div>
                <div :key="imgIndex" style="position: relative;">
                  <bui-img :src="img"></bui-img>
                  <div style="position: absolute;right:0.25rem;top:0.25rem;">
                    <bui-btn size="24" :sq="true" colorname="red" @click="images.urls.splice(imgIndex, 1)"><bui-fa-icon icon="close"></bui-fa-icon></bui-btn>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <bui-ratio style="width: 6rem;">
                <bui-choose-img v-model="images.urls" multiple style="width: 100%;height: 100%;line-height: 6rem;" class="bui_bds_1 bui_ta_c">
                  <bui-fa-icon icon="plus" size="48" colorname="silver"></bui-fa-icon>
                </bui-choose-img>
              </bui-ratio>
            </div>
          </div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-choose-img v-model="images" multiple>任意内容</bui-choose-img></textarea></bui-code>
      <!-- 多图处理 -->
      <!-- 事件 -->
      <com-title title="事件" info="event"></com-title>
      <p>
        使用参数
        <bui-badge size="24">@change</bui-badge>
        定义组件数据变更时回调，返回$event为新图片的base64编码
      </p>
      <div>
        <bui-choose-img v-model="images.url" @change="$message({ content: '图片已选择并处理完毕，处理后尺寸为：' + $event.length })">
          <bui-img :src="images.url"></bui-img>
        </bui-choose-img>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<bui-choose-img v-model="images.url" @change="$message({ content: '图片已选择并处理完毕，处理后尺寸为：' + $event.length })">
  <bui-img :src="images.url"></bui-img>
</bui-choose-img></textarea
        >
      </bui-code>
      <!-- 事件 -->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'v-model', type: ['String', 'Array'], default: '', info: '组件绑定数据' },
            { name: 'multiple', type: ['Boolean'], default: 'false', info: '组件是否为多选模式' },
            { name: '@change', type: ['Function'], default: '()=>{}', info: '组件数据变更后回调，返回$event为新图片的base64编码' }
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
        <bui-table :columns="$columnsSlots" :data="[{ name: 'default', default: 'null', info: '组件显示内容，可为任意内容' }]" class="bui_fs_12">
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
      images: {
        url:
          'data:image/jpeg;base64,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',
        urls: []
      },
      max: 480,
      compress: 80
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
