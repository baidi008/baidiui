<template>
  <div>
    <!-- vertical-->
    <template v-if="mode === 'vertical'">
      <template v-for="(menu, menuIndex) in data">
        <div
          :title="$getKey(menu, changeKey.title)"
          :key="menuIndex"
          @click="handlerClick(menu)"
          :class="['bui_flex_row', 'bui_p_12', 'bui_p_24_lr', 'bui_vm', 'bui_cursor_p', !isActive(menu) ? 'bui_bgc_silver_l_h' : 'bui-menu-active']"
          :style="{
            transition: 'background-color 0.3s',
            'border-style': 'solid',
            'border-width': isActive(menu) ? '0 0.24rem 0 0' : '0',
            'border-color': isActive(menu) ? realColor : 'white',
            'background-color': isActive(menu) ? $setColor(colorname + ',f,94') : '',
            color: isActive(menu) || openKeys.findIndex(res => res === $getKey(menu, changeKey.key)) !== -1 ? realColor : $setColor('black')
          }"
        >
          <div class="bui_flex_row_l bui_inline" style="white-space: nowrap;">
            <i class="bui_inline_block" :style="{ width: rank * 1.5 + 'rem' }"></i>
            <bui-icon v-if="$getKey(menu, changeKey.icon)" :icon="$getKey(menu, changeKey.icon)" :size="24"></bui-icon>
          </div>
          <div class="bui_flex_row_c bui_p_6_lr">
            <p :class="[rank === 0 ? 'bui_fs_14' : 'bui_fs_14', 'bui_line_clamp_1']" v-if="!!$getKey(menu, changeKey.title)">{{ $getKey(menu, changeKey.title) }}</p>
            <p class="bui_fs_12" style="opacity: 0.64;" v-if="!!$getKey(menu, changeKey.info)">{{ $getKey(menu, changeKey.info) }}</p>
          </div>
          <div class="bui_flex_row_r">
            <template v-if="!!$getKey(menu, changeKey.children) && $getKey(menu, changeKey.children).length !== 0">
              <bui-icon :icon="openKeys.findIndex(res => res === $getKey(menu, changeKey.key)) !== -1 ? 'keyboard-arrow-down' : 'keyboard-arrow-right'"></bui-icon>
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
              :colorname="colorname"
              :color="color"
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
          :key="'drop-' + menuIndex"
          :position="mode === 'horizontal' && rank === 0 ? 'bottom' : 'right'"
          :trigger="'click'"
          :style="{ display: mode === 'horizontal' && rank === 0 ? 'inline-block' : 'block', width: rank === 0 ? 'auto' : '15rem' }"
        >
          <div
            :title="$getKey(menu, changeKey.title)"
            :key="menuIndex"
            @click="handlerClick(menu)"
            :class="['bui_flex_row', 'bui_p_12', 'bui_p_24_lr', 'bui_vm', 'bui_cursor_p', !isActive(menu) ? 'bui_bgc_silver_l_h' : 'bui-menu-active']"
            :style="{
              transition: 'background-color 0.3s',
              'border-style': 'solid',
              'border-width': isActive(menu) ? (mode === 'horizontal' && rank === 0 ? '0 0 0.24rem 0' : '0 0.24rem 0 0') : '0',
              'border-color': isActive(menu) ? realColor : 'white',
              'background-color': isActive(menu) ? $setColor(colorname + ',f,94') : '',
              color: isActive(menu) || openKeys.findIndex(res => res === $getKey(menu, changeKey.key)) !== -1 ? realColor : $setColor('black')
            }"
          >
            <div class="bui_flex_row_l bui_inline" style="white-space: nowrap;">
              <bui-icon v-if="$getKey(menu, changeKey.icon)" :icon="$getKey(menu, changeKey.icon)" :size="24"></bui-icon>
            </div>
            <div class="bui_flex_row_c bui_p_6_lr" v-if="mode !== 'vertical-mini' || rank !== 0">
              <p :class="[rank === 0 ? 'bui_fs_14' : 'bui_fs_14', 'bui_line_clamp_1']" v-if="!!$getKey(menu, changeKey.title)">{{ $getKey(menu, changeKey.title) }}</p>
              <p :class="['bui_fs_12', 'bui_line_clamp_1']" style="opacity: 0.64;" v-if="!!$getKey(menu, changeKey.info)">{{ $getKey(menu, changeKey.info) }}</p>
            </div>
            <div class="bui_flex_row_r">
              <template v-if="!!$getKey(menu, changeKey.children) && $getKey(menu, changeKey.children).length !== 0">
                <bui-icon :icon="openKeys.findIndex(res => res === $getKey(menu, changeKey.key)) !== -1 ? 'keyboard-arrow-down' : 'keyboard-arrow-right'"></bui-icon>
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
              :colorname="colorname"
              :color="color"
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
    colorname: { default: 'turquoise' },
    color: { default: null },
    rank: { type: Number, default: 0 }
  },
  methods: {
    handlerClick(menu) {
      // 展开当前菜单
      if (this.mode === 'vertical' && !!this.$getKey(menu, this.changeKey.children) && this.$getKey(menu, this.changeKey.children).length) {
        this.setOpenKey(this.$getKey(menu, this.changeKey.key))
      }
      // 跳转链接
      if (!this.$getKey(menu, this.changeKey.children)) {
        this.$emit('click', menu)
      }
    },
    setOpenKey(key) {
      var _openKeys = JSON.parse(JSON.stringify(this.openKeys))
      var _openKeysIndex = _openKeys.findIndex(res => res === key)
      if (!!this.closeOther) {
        this.data.forEach(res => {
          const _index = _openKeys.findIndex(item => item === this.$getKey(res, this.changeKey.key))
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
      var _openKeysIndex = _openKeys.findIndex(res => res === key)
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
      return function(menu) {
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
    realColor() {
      var _t = this
      var _result = ''
      if (!_t.color) {
        _result = _t.$setColor(_t.colorname)
      } else {
        _result = _t.color
      }
      return _result
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
              if (
                this.openKeys.findIndex(
                  key =>
                    key ===
                    $(res)
                      .attr('id')
                      .split('children-')[1]
                ) !== -1
              ) {
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
<style></style>
