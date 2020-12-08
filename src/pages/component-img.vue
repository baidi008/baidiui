<template>
  <div class="bui_p_48">
    <div class="bui_row_p_32">
      <!--图片-->
      <com-title title="图片" info="image"></com-title>
      <p>
        使用组件
        <bui-badge size="24">bui-img</bui-badge>
        构造一个图片容器，使用参数
        <bui-badge size="24">src</bui-badge>
        指定图片的路径
      </p>
      <div><bui-img src="https://baidiui.com/demo/pic/pic001.jpg"></bui-img></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-img src="https://baidiui.com/demo/pic/pic001.jpg"></bui-img></textarea></bui-code>
      <!--图片-->
      <!--容器尺寸-->
      <com-title title="容器尺寸" info="width"></com-title>
      <p>
        容器宽高比默认为1:1，只要设置参数
        <bui-badge size="24">width</bui-badge>
        即可改变整个图片的尺寸,支持px，em，rem，%等单位；设置参数
        <bui-badge size="24">ratio</bui-badge>
        定义容器的比例，可根据宽高比自动设置整体尺寸
      </p>
      <p>将width设置为空值，如:width="null"，则使用图片原尺寸，此时ratio将不生效</p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>图片宽度：</span>
            <bui-btn-group v-model="width" size="24">
              <option v-for="i in [false, '128px', '256px', '320px', '12rem', '24rem', '16em', '50%', '100%']" :key="i" :value="i">{{ !!i ? i : '原图' }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>图片比例：</span>
            <bui-btn-group v-model="ratio" size="24">
              <option v-for="i in ['1:1', '4:3', '16:9', '21:9', '1:2']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>边角样式：</span>
            <bui-btn-group v-model="radius" size="24">
              <option v-for="i in ['default', 'fillet', 'pill']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-img :src="'https://baidiui.com/demo/pic/pic005.jpg'" :width="width" :ratio="ratio" :radius="radius"></bui-img></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-img src="https://baidiui.com/demo/pic/pic001.jpg" width="100%" ratio="4:3"></bui-img></textarea></bui-code>
      <!--容器尺寸-->

      <!--容器适应-->
      <com-title title="容器适应" info="object-fit"></com-title>
      <p>
        使用参数
        <bui-badge size="24">fit</bui-badge>
        设置容器适应方式，可选
        <bui-badge size="24">fill</bui-badge>
        ，
        <bui-badge size="24">contain</bui-badge>
        ，
        <bui-badge size="24">cover</bui-badge>
        ，
        <bui-badge size="24">none</bui-badge>
        ，详情请见css的object-fit参数
      </p>
      <div class="bui_vm">
        <span>容器适应：</span>
        <bui-btn-group v-model="fit" size="24">
          <option v-for="i in ['fill', 'contain', 'cover', 'none']" :key="i" :value="i">{{ i }}</option>
        </bui-btn-group>
      </div>
      <div>
        <div class="bui_row_p_12 bui_inline">
          <div><bui-img :src="'https://baidiui.com/demo/pic/pic001.jpg'" :fit="fit" width="256px"></bui-img></div>
        </div>
      </div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code>
        <textarea>
<!-- 严格设置图片尺寸为容器尺寸，不保证图片比例 -->
<bui-img src="https://baidiui.com/demo/pic/pic001.jpg" fit="fill"></bui-img>

<!-- 保证图片比例，图片宽高值不会超过容器宽高值，不足部分将留空 -->
<bui-img src="https://baidiui.com/demo/pic/pic001.jpg" fit="contain"></bui-img>

<!-- 保证图片比例，图片宽高值不会小于容器宽高值，超出部分将被裁剪 -->
<bui-img src="https://baidiui.com/demo/pic/pic001.jpg" fit="cover"></bui-img>

<!-- 维持图片原有尺寸，不足部分将留空，超出部分将被裁剪 -->
<bui-img src="https://baidiui.com/demo/pic/pic001.jpg" fit="none"></bui-img>
</textarea
        >
      </bui-code>
      <!--容器适应-->
      <!--载入效果-->
      <com-title title="载入效果" info="effect"></com-title>
      <p>
        使用参数
        <bui-badge size="24">effect</bui-badge>
        定义图片加载动画效果，可选
        <bui-badge size="24">default</bui-badge>
        ，
        <bui-badge size="24">fade</bui-badge>
        ，
        <bui-badge size="24">zoom</bui-badge>
        ，
        <bui-badge size="24">slide</bui-badge>
        请选择效果之后切换图片看效果
      </p>
      <div>
        <div class="bui_row_p_12">
          <div class="bui_vm">
            <span>载入效果：</span>
            <bui-btn-group v-model="effect" size="24">
              <option v-for="i in ['default', 'fade', 'zoom', 'slide']" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
          <div class="bui_vm">
            <span>切换图片：</span>
            <bui-btn-group v-model="pic" size="24">
              <option v-for="i in 9" :key="i" :value="i">{{ i }}</option>
            </bui-btn-group>
          </div>
        </div>
      </div>
      <div><bui-img :src="'https://baidiui.com/demo/pic/pic00' + pic + '.jpg'" width="256px" :effect="effect"></bui-img></div>
      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-img src="https://baidiui.com/demo/pic/pic001.jpg" effect="zoom"></bui-img></textarea></bui-code>
      <!--载入效果-->
      <!--懒加载-->
      <com-title title="懒加载" info="lazyload"></com-title>
      <p>
        使用参数
        <bui-badge size="24">lazy</bui-badge>
        将图片容器设置未懒加载模式，图片不在显示区域时将不主动下载图片，节省流量
      </p>
      <div>
        <bui-btn @click="length = length + 20" mode="dark" class="bui_m_12_r">增加20个图片</bui-btn>
        <bui-btn @click="length = 10" class="bui_m_12_r">重置</bui-btn>
        <span>添加后滚动试试...</span>
      </div>
      <div>
        <div class="bui_avg_2 bui_row_p_24">
          <div>
            <div class="bui_p_24 bui_bds_1 bui_bdc_silver_l">
              <p>default</p>
              <div class="bui_m_12_t">
                <div class="bui_avg_5_md bui_avg_2 bui_row_p_24">
                  <div v-for="i in length" :key="i"><bui-img :src="'https://baidiui.com/demo/pic/pic006.jpg'" width="100%" effect="zoom"></bui-img></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="bui_p_24 bui_bds_1 bui_bdc_silver_l">
              <p>lazyload</p>
              <div class="bui_m_12_t">
                <div class="bui_avg_5_md bui_avg_2 bui_row_p_24">
                  <div v-for="i in length"><bui-img :src="'https://baidiui.com/demo/pic/pic006.jpg'" width="100%" effect="zoom" lazy></bui-img></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>具体使用方法请参考以下代码</p>
      <bui-code><textarea><bui-img src="https://baidiui.com/demo/pic/pic001.jpg" :lazy="true"></bui-img></textarea></bui-code>
      <!--懒加载-->
      <!-- public props -->
      <com-title title="公用参数" info="public props"></com-title>
      <div>
        <bui-table
          :columns="$columnsProps"
          :data="[
            { name: 'src', type: ['String'], default: '', info: '图片的路径' },
            { name: 'width', type: ['String'], default: '6rem', info: '图片的宽度，将值设为null时启用原图尺寸比例，ratio参数失效' },
            { name: 'ratio', type: ['String'], default: '1:1', info: '响应图片宽度参数width的比例值，width=null时，此参数失效' },
            { name: 'fit', type: ['String'], default: 'cover', info: '容器适应模式，可选fill | contain | cover | none，详情请见css的object-fit参数' },
            { name: 'radius', type: ['String'], default: 'default', info: '组件边角，可选 default(无弧度) | fillet(圆角) | pill(圆形)' },
            { name: 'effect', type: ['String'], default: 'fade', info: '图片载入效果，可选default | fade | zoom | slide' },
            { name: 'lazy', type: ['Boolean'], default: 'false', info: '图片是否启用懒加载模式，处于懒加载模式时图片不在window显示区域时将不主动下载图片' }
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
      width: '256px',
      ratio: '1:1',
      fit: 'contain',
      effect: 'zoom',
      pic: 1,
      length: 20,
      radius: 'default'
    }
  },
  methods: {},
  mounted() {
    var _t = this
  }
}
</script>

<style></style>
