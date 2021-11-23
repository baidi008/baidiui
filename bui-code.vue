<template>
  <div>
    <pre class="bui_p_24 bui_fs_12 bui_scrollbar bui_bds_4_l bui_bdc_silver" :style="{ height: height ? height : 'auto' }" v-text="model ? model : html"></pre>
    <div style="display: none;"><slot></slot></div>
  </div>
</template>
<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
export default {
  data() {
    return {
      html: ''
    }
  },
  props: {
    height: { default: null },
    language: { default: 'html' },
    model: { default: '' }
  },
  mounted() {
    var _t = this
    _t.init(_t.language)
  },
  methods: {
    init(language) {
      var _t = this
      var _html = ''
      if (_t.$slots.default && _t.$slots.default.length > 0) {
        _t.$slots.default.forEach(function(res, index) {
          _html += $(res.elm).html()
        })
      }

      _html = _html.replace(/&lt;/g, '<')
      _html = _html.replace(/&gt;/g, '>')

      _t.$set(_t, 'html', _html)
      setTimeout(function() {
        hljs.configure({
          languages: [language]
        })
        hljs.highlightBlock($(_t.$el).find('pre')[0])
      })
    }
  },
  watch: {
    model: {
      handler(nv, ov) {
        var _t = this
        if (nv) {
          setTimeout(function() {
            _t.init('js')
          })
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style></style>
