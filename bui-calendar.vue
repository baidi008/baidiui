<template>
  <div class="bui_flex_column" :style="{ maxHeight: height }">
    <template v-if="$isArray(pannelDates, true)">
      <div class="bui_flex_column_t">
        <div class="bui_flex_row bui_vm bui_bds_1_b bui_p_12">
          <div class="bui_flex_row_l">
            <div class="bui_row_p_12 bui_inline bui_vm">
              <div>
                <bui-btn-group @change="pannelChange($moment(pannelDates[0]).add($event.value, $code(pannelRealType, 'month:M,year:Y')).format('YYYY-MM-DD'))">
                  <option :value="-1">
                    <bui-icon icon="keyboard-arrow-left"></bui-icon>
                  </option>
                  <option :value="1"><bui-icon icon="keyboard-arrow-right"></bui-icon></option>
                </bui-btn-group>
              </div>
              <div>
                <bui-btn
                  :color="realColor"
                  :mode="$moment(currentDate).format('YYYY-MM-DD') === $moment().format('YYYY-MM-DD') ? 'dark' : 'light'"
                  @click="pannelChange($moment()), (currentDate = $moment().format('YYYY-MM-DD'))"
                  >Today</bui-btn
                >
              </div>
            </div>
          </div>
          <div class="bui_flex_row_c bui_vm">
            <p class="bui_fs_24 bui_ta_c">{{ $moment(pannelDates[0]).format(pannelRealType === 'month' ? 'YYYY-MM' : 'YYYY') }}</p>
          </div>
          <div class="bui_flex_row_r">
            <div class="bui_inline bui_row_p_12 bui_vm">
              <div>
                <bui-btn-group
                  :color="realColor"
                  :options="[
                    { label: 'Year', value: 'year' },
                    { label: 'Month', value: 'month' }
                  ]"
                  v-model="pannelRealType"
                ></bui-btn-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bui_flex_column_m bui_scrollbar">
        <div class="bui_p_12" v-if="pannelRealType === 'month'">
          <bui-calendar-month
            :weeks="weeks"
            :pannelDate.sync="pannelDates[0]"
            :currentDate.sync="currentDate"
            :colorname="colorname"
            :color="color"
            :items="items"
            :pannelType="pannelRealType"
          ></bui-calendar-month>
        </div>
        <div class="bui_p_12" v-if="pannelRealType === 'year' && $isArray(pannelDates, true)">
          <div class="bui_avg_3 bui_row_p_24">
            <template v-for="(i, index) in pannelDates">
              <div :key="index">
                <bui-calendar-month
                  :weeks="weeks"
                  :pannelDate="i"
                  :currentDate.sync="currentDate"
                  :colorname="colorname"
                  :color="color"
                  :items="items"
                  :pannelType="pannelRealType"
                ></bui-calendar-month>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'bui-calendar',
  data() {
    return {
      currentDate: '',
      pannelDates: [],
      pannelRealType: ''
    }
  },
  props: {
    height: { default: 'auto' },
    pannelType: { default: 'month' },
    colorname: { default: 'turquoise' },
    color: { default: null },
    weeks: {
      default: () => {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
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
    // 下拉菜单列表
    monthsOptions() {
      let result = []
      if (this.currentDate) {
        for (let i = 1; i <= 12; i++) {
          result.push(this.$moment(`${this.$moment(this.currentDate).format('YYYY')},${i}`).format('YYYY-MM'))
        }
      }
      return result
    }
  },
  methods: {
    dateChange(res) {
      this.$set(this, 'currentDate', res.day)
      this.$emit('click', res.day)
    },
    pannelChange(res) {
      this.pannelDates = []
      if (this.pannelRealType === 'month') {
        this.pannelDates = [this.$moment(res).format('YYYY-MM-DD')]
      } else if (this.pannelRealType == 'year') {
        for (let i = 0; i < 12; i++) {
          this.pannelDates.push(this.$moment(res).startOf('Y').add(i, 'M').format('YYYY-MM-DD'))
        }
      }
    }
  },
  mounted() {
    !this.currentDate ? this.$set(this, 'currentDate', this.$moment().format('YYYY-MM-DD')) : null
  },
  watch: {
    currentDate: {
      immediate: true,
      handler(nv) {
        if (this.$moment(nv)._isValid) {
          this.pannelChange(this.$moment(nv).format('YYYY-MM'))
        }
      }
    },
    pannelDates: {
      immediate: true,
      handler(nv) {
        if (this.$moment(nv)._isValid) {
          this.$emit('pannelChange', nv)
        }
      }
    },
    pannelType: {
      immediate: true,
      handler(nv) {
        if (nv) {
          this.$set(this, 'pannelRealType', nv)
        } else {
          this.$set(this, 'pannelRealType', 'month')
        }
      }
    },
    pannelRealType: {
      immediate: true,
      handler() {
        this.pannelChange(this.$moment(this.currentDate))
      }
    }
  }
}
</script>

<style>
</style>