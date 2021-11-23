<template>
  <bui-ratio class="bui_block" :ratio="ratio" :width="width" :height="!!ratio ? 0 : height + 'px'" @change="resize">
    <div :id="'bui-echart-' + _uid" :style="{ width: size.width + 'px', height: size.height + 'px' }"></div>
  </bui-ratio>
</template>

<script>
//引入echart
const echarts = require('echarts')
export default {
  name: 'bui-chart',
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
    animation: { type: Boolean, default: true },
    title: { default: null },
    direction: { default: 'h' },
    percent: { type: Boolean, default: false },
    yAxis: {
      type: Array,
      default: () => {
        return ['number', 'number']
      }
    },
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
    ratio: { default: '16:9' },
    stack: { type: Boolean, default: false },
    smooth: { type: Boolean, default: true } // 线图是否圆滑
  },
  computed: {},
  destroyed() {
    this.echart = null
  },
  mounted() {
    this.size = {
      width: $(this.$el).width(),
      height: $(this.$el).height()
    }
    this.echart = echarts.init(document.getElementById('bui-echart-' + this._uid))
    this.setOption()
    setTimeout(() => {
      !!this.echart ? this.echart.resize() : null
    })
  },
  methods: {
    // 数字单位转换
    unit(num, toFixed) {
      isNaN(Number(num)) ? (num = 0) : (num = Number(num))
      isNaN(Number(toFixed)) ? (toFixed = 2) : (toFixed = Number(toFixed))
      let result = num
      if (num >= 100000000 || num <= -100000000) {
        result = (num / 100000000).toFixed(toFixed) + '亿'
      } else {
        if (num >= 10000 || num <= -10000) {
          result = (num / 10000).toFixed(toFixed) + '万'
        }
      }
      return result
    },
    // 改变尺寸
    resize(res) {
      if (this.data) {
        this.size = res
        setTimeout(() => {
          !!this.echart ? this.echart.resize() : null
        })
      }
    },
    // 设置 object
    setOption() {
      if (!!this.data && this.data.length !== 0 && !!this.echart) {
        // 数据处理
        let legend = []
        let xAxis = []
        let series = []
        // 柱图&线图
        if (this.mode === 'bar' || this.mode === 'line') {
          this.data.forEach((res, index) => {
            legend.push(res.label)
            series.push({
              name: res.label,
              type: !!res.type ? res.type : this.mode,
              stack: this.stack,
              data: [],
              yAxisIndex: res.yAxis || 0,
              smooth: this.smooth,
              label: {
                normal: {
                  show: true,
                  position: this.direction !== 'h' ? 'right' : 'top',
                  textStyle: {
                    color: 'auto',
                    textBorderColor: '#fff',
                    textBorderWidth: 3
                  },
                  formatter: (res) => {
                    let result = this.unit(res.value)
                    if (this.percent) {
                      result = (res.value * 100).toFixed(2) + '%'
                    }

                    return result
                  }
                },
                emphasis: {
                  show: true
                }
              }
            })
            res.value.forEach((item) => {
              series[index].data.push(item.value)
            })
          })
          this.data[0].value.forEach((res) => {
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
            center: ['50%', '45%'],
            itemStyle: {
              borderRadius: 6,
              borderColor: '#fff',
              borderWidth: 3
            },
            label: {
              color: 'auto',
              lineHeight: 20,
              alignTo: 'labelLine',
              formatter: (res) => {
                return '{label|' + res.name + '}\n{value|' + this.unit(res.value) + '} {perc|(' + res.percent + '%)}'
              },
              rich: {
                label: { fontSize: 12 },
                value: { fontSize: 14 },
                perc: { fontSize: 12, color: this.$setColor('black,f') }
              }
            },
            data: []
          }
          this.data.forEach((res) => {
            series.data.push({ name: res.label, value: res.value })
          })
        }

        var option = {
          animation: this.animation,
          darkMode: false,
          toolbox: {
            show: false,
            feature: {
              // restore: { show: true, title: false, title: '还原' },
              // saveAsImage: { show: true, title: '保存' },
              magicType: {
                show: this.mode === 'bar' || this.mode === 'line',
                title: { stack: '堆叠', tiled: '平铺' },
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
              left: 'center',
              triggerEvent: true
            }
          })
        }

        // 柱图 & 线图 处理
        if (this.mode === 'bar' || this.mode === 'line') {
          const category = [
            {
              show: true,
              data: xAxis,
              type: 'category',
              boundaryGap: true,
              axisLabel: {
                rotate: 45
              }
            }
          ]
          const value = []
          this.yAxis.forEach((yAxis) => {
            value.push({
              show: true,
              type: 'value',
              axisLabel: {
                formatter: (res) => {
                  let result = res
                  if (yAxis === '%') {
                    result = res * 100 + '%'
                  } else {
                    result = res
                  }
                  return result
                }
              }
            })
          })

          Object.assign(option, {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: this.mode === 'bar' ? 'shadow' : 'line'
              },
              formatter: (res) => {
                var label = ''
                res.forEach((res) => {
                  label +=
                    '<div class="bui_flex_row">' +
                    ' <div class="bui_flex_row_l"><span style="color:' +
                    res.color +
                    '">●</span></div>' +
                    ' <div class="bui_flex_row_c bui_p_6_lr">' +
                    res.seriesName +
                    '</div>' +
                    ' <div class="bui_flex_row_r bui_ta_r bui_strong">' +
                    (this.percent ? (res.value * 100).toFixed(2) + '%' : res.value) +
                    '</div>' +
                    '</div>'
                })

                return '<div class="bui_fs_12"><div class="bui_strong">' + res[0].axisValue + '</div>' + label + '</div>'
              }
            },
            grid: {
              left: this.direction !== 'h' ? 0 : 0,
              right: this.direction !== 'h' ? 32 : 0,
              bottom: 24,
              top: !!this.title ? 48 : 24,
              containLabel: true
            },
            xAxis: this.direction === 'h' ? category : value,
            yAxis: this.direction === 'h' ? value : category,
            legend: {
              data: legend,
              type: 'scroll',
              bottom: 0,
              left: 'center'
            }
          })
        }
        // 饼图
        else if (this.mode === 'pie' || this.mode === 'round') {
          Object.assign(option, {
            tooltip: {
              trigger: 'item',
              textStyle: {
                fontSize: 12,
                color: this.$setColor('black')
              },
              borderColor: 'none',
              backgroundColor: this.$setColor('white,f,12'),
              formatter: (res) => {
                return (
                  '<b style="color:' +
                  res.color +
                  '">' +
                  res.name +
                  '</b><br/><span style="font-size:16px">' +
                  res.value +
                  '</span> <span style="color:' +
                  this.$setColor('black,f') +
                  '">(' +
                  res.percent +
                  '%)</span>'
                )
              }
            },
            xAxis: { show: false },
            yAxis: { show: false },
            legend: {
              type: 'scroll',
              bottom: 0,
              left: 'center'
            }
          })
        }
        // 写入options
        this.$nextTick(() => {
          this.echart.setOption(option)
        })
      }
    }
  },
  watch: {
    $props: {
      immediate: true,
      deep: true,
      handler() {
        this.setOption()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
