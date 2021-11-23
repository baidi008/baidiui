<template>
  <div class="box">
    <div class="bui_bds_1_b bui_p_12 bui_strong bui_fs_14" v-if="pannelType === 'year'">{{ $moment(pannelDate).format('YYYY-M') }}</div>
    <div class="bui_avg_7 bui_ta_c" :class="[pannelType === 'year' ? 'bui_fs_12' : 'bui_fs_14']">
      <template v-for="(i, index) in weeks">
        <div :key="`weeks-${index}`">
          <div
            class="bui_bds_1_b bui_strong bui_line_clamp_1"
            :class="[pannelType === 'year' ? 'bui_p_6 bui_m_6_b' : 'bui_p_12 bui_m_12_b']"
            :style="{ color: index > 4 ? $setColor('red') : '' }"
          >
            {{ i }}
          </div>
        </div>
      </template>
      <template v-for="(i, index) in pannelArray(pannelDate)">
        <div :key="`days-${index}`" class="bui_cursor_p" @click="$parent.dateChange(i)">
          <div :style="{ opacity: i.inMonth ? 1 : 0.48 }">
            <div
              :class="[`bui_bds_4_b`, pannelType === 'month' ? 'bui_p_12' : 'bui_p_6']"
              :style="{
                'border-color': i.isToday ? `${realColor} !important` : `rgba(255,255,255,0) !important`,
                backgroundColor: currentDate === i.day ? `${$setColor(`${colorname},f,90`)} !important` : ``
              }"
            >
              <bui-drop width="300px" :disabled="!$isArray(i.items, true)" trigger="hover" position="top" class="bui_block">
                <div class="bui_block">
                  <p class="bui_line_clamp_1" :style="{ color: currentDate === i.day ? `${realColor} !important` : '' }">
                    {{ $moment(i.day).format('DD') }}
                  </p>
                  <div>
                    <template v-if="!$isArray(i.items, true)">
                      <bui-sup size="16" colorname="white" style="opacity: 0"></bui-sup>
                    </template>
                    <template v-else>
                      <bui-sup size="16" :label="i.items.length" :colorname="i.items.findIndex((res) => res.color === 'red') != -1 ? 'red' : i.items[0].color"></bui-sup>
                    </template>
                  </div>
                </div>
                <template slot="drop">
                  <div class="bui_p_6 bui_ta_l" :class="[pannelType === 'year' ? 'bui_fs_12' : 'bui_fs_14']">
                    <div class="bui_scrollbar" :style="{ 'max-height': '12rem', 'max-width': pannelType === 'year' ? '20rem' : '20rem' }">
                      <div v-for="(i, index) in i.items" :key="`items-${index}`" class="bui_p_6 bui_flex_row bui_vt">
                        <div class="bui_flex_row_l">
                          <bui-sup size="12" :colorname="i.color"></bui-sup>
                        </div>
                        <div class="bui_flex_row_c bui_p_6_l">
                          {{ i.label }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </bui-drop>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bui-calendar-month',
  data() {
    return {}
  },
  props: {
    weeks: {
      default: () => {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    pannelType: { default: 'month' },
    currentDate: { default: '' },
    pannelDate: { default: '' },
    colorname: { default: 'turquoise' },
    color: { default: null },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    pannelArray() {
      return function (pannel) {
        let result = []
        if (pannel) {
          for (let i = 1; i <= this.$moment(pannel).daysInMonth(); i++) {
            let _day = this.$moment([this.$moment(pannel).year(), this.$moment(pannel).months(), i]).format('YYYY-MM-DD')
            result.push({
              inMonth: true,
              isToday: this.$moment().format('YYYY-MM-DD') == _day,
              isCurrent: this.$moment(_day).format('x') === this.$moment(this.currentDate).format('x'),
              items: this.items.filter((res) => this.$moment(res.date).format('YYYY-MM-DD') === this.$moment(_day).format('YYYY-MM-DD')),
              day: _day
            })
          }
          for (let i = 1; i < this.$moment(pannel).startOf('month').weekday() + 1; i++) {
            result.unshift({
              isMonth: false,
              day: this.$moment(pannel).startOf('month').add(-i, 'day').format('YYYY-MM-DD')
            })
          }

          for (let i = 0; i < 6 - this.$moment(pannel).endOf('month').weekday(); i++) {
            result.push({
              isMonth: false,
              day: this.$moment(pannel)
                .endOf('month')
                .add(i + 1, 'day')
                .format('YYYY-MM-DD')
            })
          }
          let len = result.length
          if (len < 42) {
            for (let i = 1; i <= 42 - len; i++) {
              if (result[len - 1]) {
                result.push({
                  isMonth: false,
                  day: this.$moment(result[len - 1].day)
                    .add(i, 'day')
                    .format('YYYY-MM-DD')
                })
              }
            }
          }
        }
        return result
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scope>
  .box {
    position: relative;
    overflow: hidden;
  }
</style>