<template>
  <bui-ratio class="bui_block bui_bgc_white" :ratio="ratio" :width="width" :height="!!ratio ? 0 : height" @change="resize">
    <div :id="'bui-echart-' + _uid" :style="{ width: size.width + 'px', height: size.height + 'px' }"></div>
  </bui-ratio>
</template>

<script>
//引入echart
const echarts = require('echarts')
export default {
  data() {
    return {
      echart: null,
      size: {
        width: 0,
        height: 0
      }
    }
  },
  props: {
    mode: { type: String, default: 'bar' },
    title: { default: null },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    color: {
      type: Array,
      default: () => {
        return []
      }
    },
    width: { default: '100%' },
    height: { default: null },
    rose: { type: Boolean, default: false },
    ratio: { default: '16:9' }
  },
  computed: {},
  mounted() {
    this.size = {
      width: $(this.$el).width(),
      height: $(this.$el).height()
    }
    this.echart = echarts.init(document.getElementById('bui-echart-' + this._uid))
    setTimeout(() => {
      !!this.echart ? this.echart.resize() : null
    })
  },
  methods: {
    resize(res) {
      if (this.data) {
        this.size = res
        setTimeout(() => {
          !!this.echart ? this.echart.resize() : null
        })
      }
    },
    setOption() {
      if (!!this.data && this.data.length !== 0 && !!this.echart) {
        // 数据处理
        let legend = []
        let xAxis = []
        let series = []
        let data = []
        // 柱图&线图
        if (this.mode === 'bar' || this.mode === 'line') {
          this.data.forEach((res, index) => {
            console.log(res.type)
            legend.push(res.label)
            series.push({
              name: res.label,
              type: !!res.type ? res.type : this.mode,
              data: [],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  formatter: function(dataLabel) {
                    return dataLabel.value
                  }
                }
              }
            })
            res.value.forEach(item => {
              series[index].data.push(item.value)
            })
          })
          this.data[0].value.forEach(res => {
            xAxis.push(res.label)
          })
        }
        // 饼图
        else if (this.mode === 'pie' || this.mode === 'round') {
          series = {
            name: this.title,
            type: 'pie',
            radius: [this.mode === 'pie' ? '0%' : '40%', '70%'],
            roseType: this.rose ? 'radius' : false,
            center: ['50%', '50%'],
            itemStyle: {
              borderRadius: 6,
              borderColor: '#fff',
              borderWidth: 3
            },
            label: {
              alignTo: 'labelLine',
              formatter: '{label|{b}}\n{value|{c}} {perc|({d}%)}',
              rich: {
                label: { fontSize: 14, opacity: 0.32 },
                value: { fontSize: 16, opacity: 1 },
                perc: { fontSize: 12, opacity: 0.64 }
              }
            },
            data: []
          }
          this.data.forEach(res => {
            series.data.push({ name: res.label, value: res.value })
          })
        }

        var option = {
          darkMode: false,
          toolbox: {
            show: false,
            feature: {
              // restore: { show: true, title: false, title: '还原' },
              saveAsImage: { show: true, title: '保存' },
              magicType: {
                show: this.mode === 'bar' || this.mode === 'line',
                title: { stack: '折叠', tiled: '平铺' },
                type: ['stack', 'tiled']
              }
            }
          },

          series: series,
          color:
            this.color.length !== 0
              ? this.color
              : [this.$setColor('turquoise'), this.$setColor('blue'), this.$setColor('orange'), this.$setColor('pink'), this.$setColor('green'), this.$setColor('purple')],
          textStyle: { fontFamily: '微软雅黑', fontWeight: 'normal' }
        }

        // 插入标题
        if (!!this.title) {
          Object.assign(option, {
            title: {
              text: this.title,
              textStyle: { fontSize: 16, fontFamily: '微软雅黑', fontWeight: 'normal', textBorderColor: 'white', textBorderWidth: 8 },
              left: 0,
              triggerEvent: true
            }
          })
        }

        // 柱图 & 线图 处理
        if (this.mode === 'bar' || this.mode === 'line') {
          Object.assign(option, {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: this.mode === 'bar' ? 'shadow' : 'line'
              }
            },
            grid: {
              left: 0,
              right: 0,
              bottom: 0,
              top: 48,
              containLabel: true
            },
            xAxis: {
              show: true,
              data: xAxis,
              type: 'category',
              boundaryGap: true,
              axisLabel: {
                rotate: 45
              }
            },
            yAxis: { show: true },
            legend: {
              data: legend,
              top: 0,
              left: 'center'
            }
          })
        }
        // 饼图
        else if (this.mode === 'pie' || this.mode === 'round') {
          Object.assign(option, {
            tooltip: {
              trigger: 'item',
              formatter: '<p class="bui_fs_12 bui_fc_black_l">{b}</p><p><span class="bui_fs_14 bui_fc_black">{c}</span> <span class="bui_fs_12 bui_fc_black_l">({d}%)</span></p>'
            },
            xAxis: { show: false },
            yAxis: { show: false },
            legend: {
              top: 0,
              left: 'center'
            }
            // legend: {
            //   bottom: 0,
            //   left: 'center'
            // }
          })
        }

        // 写入options
        this.echart.setOption(option)
      }
    }
  },
  watch: {
    $props: {
      immediate: true,
      deep: true,
      handler(nv, ov) {
        this.setOption()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
