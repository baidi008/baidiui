<template>
  <div>
    <!-- vertical-->
    <template v-if="mode === 'vertical'">
      <template v-for="(menu, menuIndex) in data">
        <div
          :title="$getKey(menu, changeKey.title)"
          :key="menuIndex"
          @click="handlerClick(menu)"
          :class="['bui_flex_row', 'bui_p_12', 'bui_p_24_lr', 'bui_vm', 'bui_cursor_p', 'bui_unselect', !isActive(menu) ? 'bui-menu-item' : 'bui-menu-item-active']"
          :style="itemStyle(menu)"
        >
          <div class="bui_flex_row_l bui_inline bui_vm" style="white-space: nowrap">
            <i class="bui_inline_block" :style="{ width: rank * 1.5 + 'rem' }"></i>
            <bui-icon v-if="$getKey(menu, changeKey.icon)" :icon="$getKey(menu, changeKey.icon)" :size="24"></bui-icon>
          </div>
          <div class="bui_flex_row_c bui_p_6_lr">
            <p :class="[rank === 0 ? 'bui_fs_14' : 'bui_fs_14', '']" class="bui_line_clamp_1" v-if="!!$getKey(menu, changeKey.title)">
              {{ $getKey(menu, changeKey.title) }}
            </p>
            <p class="bui_fs_12" style="opacity: 0.64" v-if="!!$getKey(menu, changeKey.info)">{{ $getKey(menu, changeKey.info) }}</p>
          </div>
          <div class="bui_flex_row_r bui_vm" style="white-space: nowrap">
            <bui-sup colorname="red" :label="$getKey(menu, changeKey.dot)" size="16" :hide="!$getKey(menu, changeKey.dot)"> </bui-sup>
            <template v-if="!!$getKey(menu, changeKey.children) && $getKey(menu, changeKey.children).length !== 0">
              <bui-icon :icon="openKeys.findIndex((res) => res === $getKey(menu, changeKey.key)) !== -1 ? 'keyboard-arrow-down' : 'keyboard-arrow-right'"></bui-icon>
            </template>
          </div>
        </div>
        <template v-if="!!$getKey(menu, changeKey.children) && $getKey(menu, changeKey.children).length !== 0">
          <div :key="$getKey(menu, changeKey.key)" :id="'children-' + $getKey(menu, changeKey.key)" :style="{ display: 'none' }">
            <bui-menu-item
              :parent="menu"
              :data="$getKey(menu, changeKey.children)"
              :mode="mode"
              :activeKey="activeKey"
              :openKeys="openKeys"
              :changeKey="changeKey"
              :closeOther="closeOther"
              :color="color"
              :theme="theme"
              :rank="rank + 1"
              @click="click"
              @expand="expand"
            ></bui-menu-item>
          </div>
        </template>
      </template>
    </template>
    <!-- vertical -->
    <!-- drop-->
    <template v-if="mode === 'drop' || mode === 'vertical-mini' || mode === 'horizontal'">
      <template v-for="(menu, menuIndex) in data">
        <bui-drop
          :color="theme === 'dark' ? $getRGBA(color) : null"
          :key="'drop-' + menuIndex"
          :position="mode === 'horizontal' && rank === 0 ? 'bottom' : 'right'"
          :trigger="trigger"
          :style="{ display: mode === 'horizontal' && rank === 0 ? 'inline-block' : 'block', width: rank === 0 ? 'auto' : '15rem' }"
        >
          <div
            :title="$getKey(menu, changeKey.title)"
            :key="menuIndex"
            @click="handlerClick(menu)"
            :class="['bui_flex_row', 'bui_p_12', 'bui_p_24_lr', 'bui_vm', 'bui_cursor_p', !isActive(menu) ? 'bui-menu-item' : 'bui-menu-item-active']"
            :style="itemStyle(menu)"
          >
            <div class="bui_flex_row_l bui_inline" style="white-space: nowrap">
              <template v-if="mode === 'vertical-mini' && rank === 0">
                <bui-sup colorname="red" :label="$getKey(menu, changeKey.dot) > 99 ? '99+' : $getKey(menu, changeKey.dot)" size="16" :hide="!$getKey(menu, changeKey.dot)">
                  <bui-icon v-if="$getKey(menu, changeKey.icon)" :icon="$getKey(menu, changeKey.icon)" :size="24"></bui-icon>
                </bui-sup>
              </template>
              <template v-else>
                <bui-icon v-if="$getKey(menu, changeKey.icon)" :icon="$getKey(menu, changeKey.icon)" :size="24"></bui-icon>
              </template>
            </div>
            <div class="bui_flex_row_c bui_p_6_lr" v-if="mode !== 'vertical-mini' || rank !== 0">
              <p :class="[rank === 0 ? 'bui_fs_14' : 'bui_fs_14', 'bui_line_clamp_1']" v-if="!!$getKey(menu, changeKey.title)">{{ $getKey(menu, changeKey.title) }}</p>
              <p :class="['bui_fs_12', 'bui_line_clamp_1']" style="opacity: 0.64" v-if="!!$getKey(menu, changeKey.info)">{{ $getKey(menu, changeKey.info) }}</p>
            </div>
            <div class="bui_flex_row_r">
              <template v-if="mode !== 'vertical-mini' || rank != 0">
                <bui-sup colorname="red" :label="$getKey(menu, changeKey.dot) > 99 ? '99+' : $getKey(menu, changeKey.dot)" size="16" :hide="!$getKey(menu, changeKey.dot)">
                </bui-sup>
              </template>

              <template v-if="!!$getKey(menu, changeKey.children) && $getKey(menu, changeKey.children).length !== 0">
                <bui-icon :icon="openKeys.findIndex((res) => res === $getKey(menu, changeKey.key)) !== -1 ? 'keyboard-arrow-down' : 'keyboard-arrow-right'"></bui-icon>
              </template>
            </div>
          </div>
          <template slot="drop" v-if="$getKey(menu, changeKey.children)">
            <bui-menu-item
              :parent="menu"
              :data="$getKey(menu, changeKey.children)"
              :mode="mode"
              :activeKey="activeKey"
              :openKeys="openKeys"
              :changeKey="changeKey"
              :closeOther="closeOther"
              :color="color"
              :theme="theme"
              :rank="0 + 1"
              @click="click"
              @expand="expand"
            ></bui-menu-item>
          </template>
        </bui-drop>
      </template>
    </template>
    <!-- drop -->
  </div>
</template>

<script>
export default {
  name: 'buiMenu',
  data() {
    return {}
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    mode: {
      default: 'vertical'
    },
    trigger: {
      default: 'click'
    },
    activeKey: { type: String, default: '' },
    openKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    changeKey: {
      type: Object,
      default: () => {
        return {}
      }
    },
    closeOther: {
      type: Boolean,
      default: true
    },
    color: { default: null },
    theme: { type: String, default: 'light' },
    rank: { type: Number, default: 0 }
  },
  methods: {
    handlerClick(menu) {
      // 展开当前菜单
      if (this.mode === 'vertical' && !!this.$getKey(menu, this.changeKey.children) && this.$getKey(menu, this.changeKey.children).length) {
        this.setOpenKey(this.$getKey(menu, this.changeKey.key))
      }
      // 跳转链接
      if (!this.$isArray(this.$getKey(menu, this.changeKey.children), true)) {
        this.$emit('click', menu)
      }
    },
    setOpenKey(key) {
      var _openKeys = JSON.parse(JSON.stringify(this.openKeys))
      var _openKeysIndex = _openKeys.findIndex((res) => res === key)
      if (!!this.closeOther) {
        this.data.forEach((res) => {
          const _index = _openKeys.findIndex((item) => item === this.$getKey(res, this.changeKey.key))
          if (_index !== -1) {
            _openKeys.splice(_index, 1)
          }
        })
      }
      _openKeysIndex === -1 ? _openKeys.push(key) : _openKeys.splice(_openKeysIndex, 1)
      this.$emit('expand', _openKeys)
    },
    removeOpenkey(key) {
      var _openKeys = JSON.parse(JSON.stringify(this.openKeys))
      var _openKeysIndex = _openKeys.findIndex((res) => res === key)
      _openKeys.splice(_openKeysIndex, 1)
      this.$emit('expand', _openKeys)
    },
    expand(e) {
      this.$emit('expand', e)
    },
    click(e) {
      this.$emit('click', e)
    }
  },
  computed: {
    isActive() {
      return function (menu) {
        var _t = this
        var _result = false
        if (menu[this.changeKey.key] === this.activeKey) {
          _result = true
        } else {
          _result = false
        }
        return _result
      }
    },
    itemStyle() {
      return function (menu) {
        let result = {
          transition: 'background-color 0.3s',
          'border-style': 'solid'
        }
        if (this.isActive(menu)) {
          result['border-width'] = this.mode === 'horizontal' ? '0 0 0.24rem 0' : '0 0.24rem 0 0'
          result['background-color'] = this.theme === 'dark' ? this.$setColor('white,f,72') : this.$getRGBA(this.color, 'f', 94)
        }
        if (this.theme === 'dark') {
          result['border-color'] = this.$setColor('white,f,24')
        } else {
          result['border-color'] = this.$getRGBA(this.color)
        }
        if (this.isActive(menu) || this.openKeys.findIndex((res) => res === this.$getKey(menu, this.changeKey.key)) !== -1) {
          if (this.theme === 'dark') {
            result['color'] = this.$setColor('white')
            result['text-shadow'] = '0 0 2px #000'
          } else {
            result['color'] = this.$getRGBA(this.color)
          }
        } else {
          if (this.theme === 'dark') {
            result['color'] = this.$setColor('white')
          } else {
            result['color'] = this.$setColor('black')
          }
        }

        return result
      }
    }
  },
  mounted() {},
  components: {},
  watch: {
    mode: {
      immediate: true,
      handler(nv, ov) {}
    },
    openKeys: {
      immediate: true,
      deep: true,
      handler(nv, ov) {
        setTimeout(() => {
          $(this.$el)
            .find('[id*=children-]')
            .each((key, res) => {
              if (this.openKeys.findIndex((key) => key === $(res).attr('id').split('children-')[1]) !== -1) {
                $(res).slideDown(100)
              } else {
                $(res).slideUp(100)
              }
            })
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .bui-menu-item {
    &:hover {
      background-color: rgba(0, 0, 0, 0.032);
    }
  }
</style>