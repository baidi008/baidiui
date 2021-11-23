<template>
  <div
    :style="{ height: '100%', width: mode === 'horizontal' ? '100%' : mode === 'vertical-mini' ? 'auto' : width, backgroundColor: theme === 'dark' ? realColor : 'white' }"
    class="bui_scrollbar"
  >
    <bui-menu-item
      :data="data"
      :mode="mode"
      :trigger="trigger"
      :changeKey="changeKeys"
      :activeKey="activeKey"
      :openKeys="openKeys"
      :closeOther="closeOther"
      :color="realColor"
      :theme="theme"
      @click="click"
      @expand="expand"
    ></bui-menu-item>
  </div>
</template>

<script>
export default {
  name: 'buiMenu',
  data() {
    return {
      activeKey: '',
      openKeys: []
    }
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
    changeKey: {
      type: Object,
      default: () => {
        return {}
      }
    },
    defaultOpens: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultActive: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    },
    closeOther: {
      type: Boolean,
      default: true
    },
    colorname: { default: 'turquoise' },
    color: { default: null },
    theme: { type: String, default: 'light' },
    gotoPath: { type: Boolean, default: false },
    width: { default: '16rem' }
  },
  computed: {
    realColor() {
      return this.$getRGBA(this.color) || this.$getRGBA(this.$setColor(this.colorname))
    },
    changeKeys() {
      var _t = this
      var _result = { title: 'title', info: 'info', children: 'children', path: 'path', icon: 'icon', key: 'key', dot: 'dot' }
      _result = Object.assign(_result, _t.changeKey)
      return _result
    }
  },
  methods: {
    click(e) {
      this.$set(this, 'activeKey', this.$getKey(e, this.changeKeys.key))
      !!this.gotoPath && !!this.$getKey(e, this.changeKeys.path) ? this.$router.history.push(this.$getKey(e, this.changeKeys.path)) : null
      this.$emit('click', e)
    },
    expand(e) {
      this.openKeys = e
      this.$emit('expand', e)
    }
  },
  mounted() {
    var _t = this
    // 根据prop设置初始值
    this.$set(this, 'openKeys', this.defaultOpens)
  },
  watch: {
    active: {
      immediate: true,
      handler(nv, ov) {
        var _t = this
        const loop = (array, openKeys = [], callback = () => {}) => {
          array.forEach((res) => {
            const openKeysConcat = openKeys.concat([this.$getKey(res, this.changeKeys.key)])
            if (this.active === this.$getKey(res, this.changeKeys.key)) {
              this.$set(this, 'activeKey', this.$getKey(res, this.changeKeys.key))
              this.$set(this, 'openKeys', openKeys)
            }
            // 判断有无下级
            const children = this.$getKey(res, this.changeKeys.children)
            if (!!children && children.length !== 0) {
              loop(children, openKeysConcat)
            }
          })
        }
        setTimeout(() => {
          // 展开子级
          loop(_t.data)
          // 滚动到活动按钮
          setTimeout(() => {
            var _activeDom = $(_t.$el).find('.bui-menu-active:visible:eq(0)')
            if (_activeDom.length !== 0) {
              $(_t.$el).animate(
                {
                  scrollTop: $(_t.$el).scrollTop() + _activeDom.offset().top - _activeDom.outerHeight() * 2
                },
                100
              )
            }
          }, 300)
        }, 300)
      }
    },
    data: {
      immediate: true,
      deep: true,
      handler(nv, ov) {}
    },
    defaultActive: {
      immediate: true,
      handler(nv) {
        // 根据prop设置当前活动项
        this.$set(this, 'activeKey', nv)

        // 根据prop 设置展开父层
        let defaultExpandKeys = []
        const loop = (array, expandKeys) => {
          array.forEach((res) => {
            if (this.$getKey(res, this.changeKeys.key) === nv) {
              defaultExpandKeys = expandKeys
            } else {
              if (this.$isArray(this.$getKey(res, this.changeKeys.children), true)) {
                loop(this.$getKey(res, this.changeKeys.children), [...expandKeys, this.$getKey(res, this.changeKeys.key)])
              }
            }
          })
        }
        loop(this.data, [])
        this.$nextTick(() => {
          this.$set(this, 'openKeys', defaultExpandKeys)
        })
      }
    }
  }
}
</script>
<style></style>
