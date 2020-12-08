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
      var _t = this,
        _input = $(_t.$el).find('[type=file]')
      _t.$set(_t, 'isLoading', true)

      // 过滤非图片文件
      var _imgFiles = []
      $.map(_input[0].files, function(res, index) {
        if (res.type.split('/')[0] == 'image') {
          _imgFiles.push(res)
        }
      })

      // 压缩图集
      if (_imgFiles.length != 0) {
        _t.getCompress({
          files: _input[0].files,
          success(res) {
            _input[0].value = ''
            if (!!_t.multiple) {
              _t.$emit('model', _t.modelValue.concat(res))
            } else if (!_t.multiple) {
              _t.$emit('model', res[0])
            }
            _t.$emit('change', _t.modelValue)
            _t.$set(_t, 'isLoading', false)
          }
        })
      } else {
        _t.$set(_t, 'isLoading', false)
      }
    },
    // 压缩
    getCompress(options) {
      var _t = this
      var _base64 = []
      getBase64(options.files, 0)
      function getBase64(array, index) {
        var reader = new FileReader()
        reader.onloadend = function() {
          var _bUrl = reader.result
          var nImg = new Image()
          var nCanvas = $(document.createElement('canvas'))
          var ctx = nCanvas[0].getContext('2d')
          $(nImg).attr('src', _bUrl)
          setTimeout(function() {
            var bw = $(nImg)[0].width,
              bh = $(nImg)[0].height,
              ratio = bw / bh,
              sw = 0,
              sh = 0
            if (ratio >= 1) {
              if (bw > Number(_t.max)) {
                sw = Number(_t.max)
                sh = sw / ratio
              } else {
                sw = bw
                sh = bh
              }
            } else {
              if (bh > Number(_t.max)) {
                sh = Number(_t.max)
                sw = sh * ratio
              } else {
                sw = bw
                sh = bh
              }
            }
            nCanvas.attr({
              width: sw,
              height: sh
            })
            ctx.drawImage($(nImg)[0], 0, 0, sw, sh)
            _base64.push(nCanvas[0].toDataURL('image/jpeg', Number(_t.compress) / 100))
            if (index + 1 < array.length) {
              getBase64(array, index + 1)
            } else {
              typeof options.success == 'function' ? options.success(_base64) : null
            }
          }, 300)
        }
        reader.readAsDataURL(array[index])
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
