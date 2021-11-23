<template>
  <div :style="{ position: 'relative', display: 'inline-block' }">
    <input type="file" class="fileInput" :multiple="multiple" @change="chooseImage()" />
    <div class="mask bui_bgc_black_f" v-if="isLoading"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  props: {
    modelValue: {
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    max: {
      default: 960
    },
    compress: {
      default: 90
    }
  },
  model: {
    prop: 'modelValue',
    event: 'model'
  },
  methods: {
    // 选择图片后动作
    chooseImage() {
      this.$emit('beforeChange')
      var _t = this,
        _input = $(_t.$el).find('[type=file]')
      _t.$set(_t, 'isLoading', true)

      // 过滤非图片文件
      var _imgFiles = []
      $.map(_input[0].files, (res, index) => {
        if (res.type.split('/')[0] === 'image') {
          _imgFiles.push(res)
        } else {
          this.$message({ content: `检测到非图片文件 [${res.name}] ,已过滤`, type: 'warning' })
        }
      })

      // 压缩图集
      if (_imgFiles.length != 0) {
        this.$imageToBase64({
          files: _imgFiles,
          max: this.max,
          compress: this.compress,
          success(res) {
            _input[0].value = ''
            if (_t.multiple) {
              _t.$emit('model', _t.modelValue.concat(res))
            } else if (!_t.multiple) {
              _t.$emit('model', res[0])
            }
            _t.$emit('change', res)
            _t.$set(_t, 'isLoading', false)
          }
        })
      } else {
        _input[0].value = ''
        _t.$set(_t, 'isLoading', false)
      }
    }
  }
}
</script>
<style>
.fileInput {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer !important;
  z-index: 100;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
  z-index: 200;
}
</style>
