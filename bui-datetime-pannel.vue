<template>
  <div :class="['bui_avg_' + pannelDate.length, 'bui_bgc_white']" :style="{ width: (mode === 'drop' ? pannelWidth : pannelWidth) * pannelDate.length + 'px' }" ref="pannels">
    <template v-for="(pannel, pannelIndex) in pannelDate">
      <div :key="pannelIndex">
        <!-- header -->
        <div class="bui_flex_row bui_vm bui_fc_white bui_ta_c" :class="[mode === 'drop' ? 'bui_p_24' : 'bui_p_24']" :style="{ 'background-color': color }">
          <div class="bui_flex_row_l bui_cursor_p" @click="setPannelDate('prev', pannel)"><bui-fa-icon icon="angle-left" :size="mode === 'drop' ? 32 : 64"></bui-fa-icon></div>
          <div class="bui_flex_row_c bui_p_12_lr">
            <p :class="[mode === 'drop' ? 'bui_fs_24' : 'bui_fs_32']" class="bui_fc_white_f_h bui_cursor_p" v-if="pannel.deep == 1">
              {{ $moment(pannelYears(pannel)[0]).format('YYYY') }} - {{ $moment(pannelYears(pannel)[pannelYears(pannel).length - 1]).format('YYYY') }}
            </p>
            <p :class="[mode === 'drop' ? 'bui_fs_24' : 'bui_fs_32']" class="bui_fc_white_f_h bui_cursor_p bui_vm" @click="pannel.deep = 1" v-if="pannel.deep > 1">
              {{ $moment(pannel.date).year() + '年' }}
            </p>
            <p class="bui_fc_white_f_h bui_cursor_p bui_vm" :class="[mode === 'drop' ? 'bui_fs_14' : 'bui_fs_20']" v-if="pannel.deep <= 2">
              <span>请选择{{ pannel.deep == 1 ? '年' : '月' }}</span>
              <bui-fa-icon icon="angle-down"></bui-fa-icon>
            </p>
            <p class="bui_fc_white_f_h bui_cursor_p bui_vm" :class="[mode === 'drop' ? 'bui_fs_14' : 'bui_fs_20']" @click="pannel.deep = pannel.deep - 1" v-if="pannel.deep > 2">
              <span>
                {{
                  $moment(pannel.date).format(pannel.deep == 3 ? 'M月' : pannel.deep == 4 ? 'M月D日' : pannel.deep == 5 ? 'M月D日 H时' : pannel.deep == 6 ? 'M月D日 H时m分' : ' ')
                }}
              </span>
              <bui-fa-icon icon="angle-down"></bui-fa-icon>
            </p>
          </div>
          <div class="bui_flex_row_r bui_fc_white_f_h bui_cursor_p" @click="setPannelDate('next', pannel)">
            <bui-fa-icon icon="angle-right" :size="mode === 'drop' ? 32 : 64"></bui-fa-icon>
          </div>
        </div>
        <!-- header -->
        <!-- body -->
        <!-- year -->
        <template v-if="pannel.deep == 1">
          <div class="bui_avg_3 bui_ta_c" :class="[mode === 'drop' ? 'bui_p_12' : 'bui_p_24']">
            <template v-for="(year, yearIndex) in pannelYears(pannel)">
              <div :key="yearIndex" class="bui_bgc_silver_l_h bui_cursor_p" @click="setDate(year.year, pannelIndex)">
                <p
                  class="bui_p_12"
                  :style="{
                    color: year.isCurrent ? $setColor('white') : year.isToday ? color : '',
                    'background-color': year.isCurrent ? color : year.isRange ? $setColor('silver,l') : ''
                  }"
                >
                  {{ year.year + '年' }}
                </p>
              </div>
            </template>
          </div>
        </template>
        <!-- year -->
        <!-- month -->
        <template v-if="pannel.deep == 2">
          <div class="bui_avg_3 bui_ta_c" :class="[mode === 'drop' ? 'bui_p_12' : 'bui_p_24']">
            <template v-for="(month, monthIndex) in pannelMonths(pannel)">
              <div :key="monthIndex">
                <div
                  class="bui_p_12 bui_bgc_silver_l_h bui_cursor_p"
                  :style="{
                    color: month.isCurrent ? $setColor('white') : month.isToday ? color : '',
                    'background-color': month.isCurrent ? color : month.isRange ? $setColor('silver,l') : ''
                  }"
                  @click="setDate(month.month, pannelIndex)"
                >
                  <p class="bui_fs_12">{{ $moment(month.month).format('YYYY') }}</p>
                  <p>{{ $moment(month.month).format('M') + '月' }}</p>
                </div>
              </div>
            </template>
          </div>
        </template>
        <!-- month -->
        <!-- day -->
        <template v-if="pannel.deep == 3">
          <div class="bui_avg_7 bui_ta_c bui_fs_14" :class="[mode === 'drop' ? 'bui_p_12' : 'bui_p_24']">
            <template v-for="(week, weekIndex) in ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Su']">
              <div :key="weekIndex"><p v-text="week" :class="['bui_strong', 'bui_p_12', week == 'Sat' || week == 'Su' ? 'bui_fc_red' : 'bui_fc_black']"></p></div>
            </template>
            <template v-for="(day, dayIndex) in pannelDays(pannel)">
              <div :title="$moment(day.day).format('YYYY-DD-MM')" @click="setDate(day.day, pannelIndex)" :key="'day-' + dayIndex">
                <p
                  class="bui_p_12 bui_cursor_p bui_bgc_silver_l_h"
                  :class="[!day.inMonth ? 'bui_fc_silver_d' : '', day.isToday ? 'bui_strong' : '']"
                  :style="{
                    color: day.isCurrent ? $setColor('white') : day.isToday ? color : '',
                    'background-color': day.isCurrent ? color : day.isRange ? $setColor('silver,l') : ''
                  }"
                >
                  {{ $moment(day.day).format('DD') }}
                </p>
              </div>
            </template>
          </div>
        </template>
        <!-- day -->
        <!-- hour -->
        <template v-if="pannel.deep == 4">
          <div class="bui_avg_6 bui_ta_c bui_fs_12" :class="[mode === 'drop' ? 'bui_p_12' : 'bui_p_24']">
            <p class="bui_col_12 bui_p_12 bui_fc_silver_d">上午</p>
            <template v-for="(hour, hourIndex) in pannelHours(pannel)">
              <div :key="hourIndex" class="bui_bgc_silver_l_h bui_cursor_p" @click="setDate(hour.hour, pannelIndex)" v-if="$moment(hour.hour).format('H') < 12">
                <p
                  class="bui_p_6"
                  :style="{
                    color: hour.isCurrent ? $setColor('white') : hour.isToday ? color : '',

                    'background-color': hour.isCurrent ? color : ''
                  }"
                >
                  {{ $moment(hour.hour).format('H') + '时' }}
                </p>
              </div>
            </template>
            <p class="bui_col_12 bui_p_12 bui_fc_silver_d">下午</p>
            <template v-for="(hour, hourIndex) in pannelHours(pannel)">
              <div :key="hourIndex" class="bui_bgc_silver_l_h bui_cursor_p" @click="setDate(hour.hour, pannelIndex)" v-if="$moment(hour.hour).format('H') >= 12">
                <p
                  class="bui_p_6"
                  :style="{
                    color: hour.isCurrent ? $setColor('white') : hour.isToday ? color : '',

                    'background-color': hour.isCurrent ? color : ''
                  }"
                >
                  {{ $moment(hour.hour).format('H') + '时' }}
                </p>
              </div>
            </template>
          </div>
        </template>
        <!-- hour -->
        <!-- minute -->
        <template v-if="pannel.deep == 5">
          <div class="bui_avg_6 bui_ta_c bui_fs_12" :class="[mode === 'drop' ? 'bui_p_12' : 'bui_p_24']">
            <template v-for="(minute, minuteIndex) in pannelMinutes(pannel)">
              <div :key="minuteIndex" class="bui_bgc_silver_l_h bui_cursor_p" @click="setDate(minute.minute, pannelIndex)">
                <p
                  class="bui_p_6"
                  :style="{
                    color: minute.isCurrent ? $setColor('white') : minute.isToday ? color : '',

                    'background-color': minute.isCurrent ? color : ''
                  }"
                >
                  {{ $moment(minute.minute).format('m') + '分' }}
                </p>
              </div>
            </template>
          </div>
        </template>
        <!-- minute -->
        <!-- second -->
        <template v-if="pannel.deep == 6">
          <div class="bui_avg_6 bui_ta_c bui_fs_12" :class="[mode === 'drop' ? 'bui_p_12' : 'bui_p_24']">
            <template v-for="(second, secondIndex) in pannelSeconds(pannel)">
              <div :key="secondIndex" class="bui_bgc_silver_l_h bui_cursor_p" @click="setDate(second.second, pannelIndex)">
                <p
                  class="bui_p_6"
                  :style="{
                    color: second.isCurrent ? $setColor('white') : second.isToday ? color : '',

                    'background-color': second.isCurrent ? color : ''
                  }"
                >
                  {{ $moment(second.second).format('ss') + '秒' }}
                </p>
              </div>
            </template>
          </div>
        </template>
        <!-- second -->
        <!-- body -->
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'bui-datetime-pannel',
  data() {
    return {
      choose: [],
      pannelDate: []
    }
  },
  props: {
    color: {
      default: ''
    },
    mode: {
      default: ''
    },
    modelValue: {
      default: ''
    },
    range: {
      default: false
    },
    pannelWidth: {
      type: Number,
      default: 400
    },
    start: {
      default: 3
    },
    end: {
      default: 3
    },
    currentUnix: { default: null },
    output: {
      default: null
    }
  },
  computed: {
    //面板数组 - 年
    pannelYears() {
      return function (pannel) {
        var _t = this
        var _result = []
        for (var i = 0; i < 8; i++) {
          var _year = _t.$moment(pannel.date).add(i, 'year').format('YYYY')
          _result.push({
            isToday: _t.$moment().format('YYYY') == _year,
            isCurrent:
              (_t.range !== 'year' && _t.$moment(_t.modelValue).format('YYYY') == _year) ||
              (_t.range === 'year' && _t.$moment(_t.choose[0]).format('YYYY') == _year) ||
              (_t.range === 'year' && _t.choose.length === 2 && _t.$moment(_t.choose[1]).format('YYYY') == _year),
            isRange: _t.range === 'year' && _t.choose.length === 2 && _t.$moment(_t.choose[0]).format('YYYY') < _year && _t.$moment(_t.choose[1]).format('YYYY') > _year,
            year: _year
          })
        }
        for (var i = 1; i < 8; i++) {
          var _year = _t.$moment(pannel.date).subtract(i, 'year').format('YYYY')
          _result.unshift({
            isToday: _t.$moment().format('YYYY') == _year,
            isCurrent:
              (_t.range !== 'year' && _t.$moment(_t.modelValue).format('YYYY') == _year) ||
              (_t.range === 'year' && _t.$moment(_t.choose[0]).format('YYYY') == _year) ||
              (_t.range === 'year' && _t.choose.length === 2 && _t.$moment(_t.choose[1]).format('YYYY') == _year),
            isRange: _t.range === 'year' && _t.choose.length === 2 && _t.$moment(_t.choose[0]).format('YYYY') < _year && _t.$moment(_t.choose[1]).format('YYYY') > _year,
            year: _year
          })
        }
        return _result
      }
    },
    // 面板数组 - 月
    pannelMonths() {
      return function (pannel) {
        var _t = this
        var _result = []
        for (var i = 0; i < 12; i++) {
          var _month = _t.$moment(pannel.date).month(i).format('YYYY-MM')
          _result.push({
            isToday: _t.$moment().format('YYYY-MM') == _month,
            isCurrent:
              (_t.range !== 'month' && _t.$moment(_t.modelValue).format('YYYY-MM') == _month) ||
              (_t.range === 'month' && _t.$moment(_t.choose[0]).format('YYYY-MM') == _month) ||
              (_t.range === 'month' && _t.choose.length === 2 && _t.$moment(_t.choose[1]).format('YYYY-MM') == _month),
            isRange: _t.range === 'month' && _t.choose.length === 2 && _t.$moment(_t.choose[0]).format('YYYY-MM') < _month && _t.$moment(_t.choose[1]).format('YYYY-MM') > _month,
            month: _month
          })
        }
        return _result
      }
    },
    // 面板数组 - 日
    pannelDays() {
      return function (pannel) {
        var _t = this
        var _result = []
        for (var i = 1; i <= _t.$moment(pannel.date).daysInMonth(); i++) {
          var _day = _t.$moment([_t.$moment(pannel.date).year(), _t.$moment(pannel.date).months(), i]).format('YYYY-MM-DD')
          _result.push({
            inMonth: true,
            isToday: _t.$moment().format('YYYY-MM-DD') == _day,
            isCurrent:
              (_t.range !== 'day' && _t.$moment(_t.modelValue).format('YYYY-MM-DD') == _day) ||
              (_t.range === 'day' && _t.$moment(_t.choose[0]).format('YYYY-MM-DD') == _day) ||
              (_t.range === 'day' && _t.choose.length === 2 && _t.$moment(_t.choose[1]).format('YYYY-MM-DD') == _day),
            isRange: _t.range === 'day' && _t.choose.length === 2 && _t.$moment(_t.choose[0]).format('YYYY-MM-DD') < _day && _t.$moment(_t.choose[1]).format('YYYY-MM-DD') > _day,
            day: _day
          })
        }

        for (var i = 1; i < _t.$moment(pannel.date).startOf('month').weekday() + 1; i++) {
          _result.unshift({
            isMonth: false,
            day: _t.$moment(pannel.date).startOf('month').subtract(i, 'day').format('YYYY-MM-DD')
          })
        }

        for (var i = 0; i < 6 - _t.$moment(pannel.date).endOf('month').weekday(); i++) {
          _result.push({
            isMonth: false,
            day: _t
              .$moment(pannel.date)
              .endOf('month')
              .add(i + 1, 'day')
              .format('YYYY-MM-DD')
          })
        }
        var _len = _result.length
        if (_len < 42) {
          for (var i = 1; i <= 42 - _len; i++) {
            _result.push({
              isMonth: false,
              day: _t
                .$moment(_result[_len - 1].day)
                .add(i, 'day')
                .format('YYYY-MM-DD')
            })
          }
        }
        return _result
      }
    },
    // 面板数组 - 时
    pannelHours() {
      return function (pannel) {
        var _t = this
        var _result = []
        for (var i = 0; i < 24; i++) {
          var _hour = _t.$moment(pannel.date).hours(i).format('YYYY-MM-DD HH')
          _result.push({
            isToday: _t.$moment().format('YYYY-MM-DD HH') == _hour,
            isCurrent: _t.$moment(_t.modelValue).format('YYYY-MM-DD HH') == _hour,
            hour: _hour
          })
        }
        return _result
      }
    },
    // 面板数组 - 分
    pannelMinutes() {
      return function (pannel) {
        var _t = this
        var _result = []
        for (var i = 0; i < 60; i++) {
          var _minute = _t.$moment(pannel.date).minute(i).format('YYYY-MM-DD HH:mm')
          _result.push({
            isToday: _t.$moment().format('YYYY-MM-DD HH:mm') == _minute,
            isCurrent: _t.$moment(_t.modelValue).format('YYYY-MM-DD HH:mm') == _minute,
            minute: _minute
          })
        }
        return _result
      }
    },
    // 面板数组 - 秒
    pannelSeconds() {
      return function (pannel) {
        var _t = this
        var _result = []
        for (var i = 0; i < 60; i++) {
          var _second = _t.$moment(pannel.date).second(i).format('YYYY-MM-DD HH:mm:ss')
          _result.push({
            isToday: _t.$moment().format('YYYY-MM-DD HH:mm:ss') == _second,
            isCurrent: _t.$moment(_t.modelValue).format('YYYY-MM-DD HH:mm:ss') == _second,
            second: _second
          })
        }
        return _result
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.range) {
        // 处理已选时间区间
        this.$set(this, 'choose', [Number(this.$moment().format('x')), Number(this.$moment().format('x'))])
        if (Array.isArray(this.modelValue)) {
          this.modelValue[0] ? this.$set(this.choose, 0, Number(this.$moment(this.modelValue[0]).format('x'))) : null
          this.modelValue[1] ? this.$set(this.choose, 1, Number(this.$moment(this.modelValue[1]).format('x'))) : null
        }

        // 预设值
        let deep = 1
        let next = 0
        if (this.range === 'year') {
          deep = 1
          next = Number(this.$moment(this.choose[0]).add(15, 'year').format('x'))
        } else if (this.range === 'month') {
          deep = 2
          next = Number(this.$moment(this.choose[0]).add(1, 'year').format('x'))
        } else if (this.range === 'day') {
          deep = 3
          next = Number(this.$moment(this.choose[0]).add(1, 'month').format('x'))
        }

        // 创建面板
        this.$set(this, 'pannelDate', [
          {
            date: this.choose[0],
            deep: deep,
            end: deep
          },
          {
            date: this.choose[1] > next ? this.choose[1] : next,
            deep: deep,
            end: deep
          }
        ])
      } else {
        this.$set(this, 'pannelDate', [
          {
            date: this.modelValue ? this.currentUnix : Number(this.$moment().format('x')),
            deep: Number(this.start),
            end: Number(this.end)
          }
        ])
        this.$set(this, 'choose', [this.pannelDate[0].date])
      }
    })
  },
  methods: {
    setDate(date, pannelIndex) {
      let _t = this
      date = Number(_t.$moment(date).format('x'))
      this.$nextTick(() => {
        Object.assign(this.pannelDate[pannelIndex], { date: Number(this.$moment(date).format('x')) })
        if (this.pannelDate[pannelIndex].deep < this.pannelDate[pannelIndex].end) {
          setTimeout(() => {
            Object.assign(this.pannelDate[pannelIndex], { deep: this.pannelDate[pannelIndex].deep + 1 })
          })
        } else {
          // range
          if (_t.range) {
            if (_t.choose.length < 2) {
              _t.choose.push(date)
            } else {
              _t.$set(_t, 'choose', [date])
            }
            _t.choose.sort()
            if (_t.choose.length === 2) {
              setDate(_t.choose)
            }
          } else {
            setDate(date)
          }
        }
      })

      function setDate(date) {
        let value = ''
        let output = ''
        if (_t.output) {
          output = _t.output
        } else {
          if (_t.pannelDate[0].end === 1) {
            output = 'YYYY'
          } else if (_t.pannelDate[0].end === 2) {
            output = 'YYYY-MM'
          } else if (_t.pannelDate[0].end === 3) {
            output = 'YYYY-MM-DD'
          } else if (_t.pannelDate[0].end > 3) {
            output = 'YYYY-MM-DD HH:mm:ss'
          }
        }

        if (_t.range) {
          value = [_t.$moment(date[0]).format(output), _t.$moment(date[1]).format(output)]
          if (output === 'x') {
            value = [Number(_t.$moment(date[0]).format(output)), Number(_t.$moment(date[1]).format(output))]
          }
        } else {
          value = _t.$moment(date).format(output)
          if (output === 'x') {
            value = Number(value)
          }
        }
        _t.$emit('change', value)
      }
    },
    setPannelDate(type, pannel) {
      var _t = this
      var _result = _t.$moment(pannel.date)
      if (type == 'prev') {
        if (pannel.deep == 1) {
          _result = _result.add(-15, 'year').format('YYYY')
        } else if (pannel.deep == 2) {
          _result = _result.add(-1, 'year').format('YYYY')
        } else if (pannel.deep == 3) {
          _result = _result.add(-1, 'month').format('YYYY-MM')
        } else if (pannel.deep == 4) {
          _result = _result.add(-1, 'day').format('YYYY-MM-DD')
        } else if (pannel.deep == 5) {
          _result = _result.add(-1, 'hour').format('YYYY-MM-DD HH')
        } else if (pannel.deep == 6) {
          _result = _result.add(-1, 'minutes').format('YYYY-MM-DD HH:mm')
        }
      } else if (type == 'next') {
        if (pannel.deep == 1) {
          _result = _result.add(15, 'year').format('YYYY')
        } else if (pannel.deep == 2) {
          _result = _result.add(1, 'year').format('YYYY')
        } else if (pannel.deep == 3) {
          _result = _result.add(1, 'month').format('YYYY-MM')
        } else if (pannel.deep == 4) {
          _result = _result.add(1, 'day').format('YYYY-MM-DD')
        } else if (pannel.deep == 5) {
          _result = _result.add(1, 'hour').format('YYYY-MM-DD HH')
        } else if (pannel.deep == 6) {
          _result = _result.add(1, 'minutes').format('YYYY-MM-DD HH:mm')
        }
      }
      pannel.date = _result
    }
  },
  watch: {}
}
</script>

<style></style>
