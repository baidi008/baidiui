import Vue from 'vue'
import buiModal from './bui-modal.vue'

export default {
  // 简单替换数组对象key名称
  $changeKey(data, keylist) {
    var _result = ''
    if (!!data && !!keylist && typeof keylist === 'object' && keylist.length !== 0) {
      _result = JSON.stringify(data)
      keylist.forEach((res, index) => {
        const _from = res.split('|')[0]
        const _to = res.split('|')[1]
        _result = _result.replace(eval('/"' + _from + '":/g'), '"' + _to + '":')
      })
      _result = JSON.parse(_result)
    }
    return _result
  },
  // 数字单位
  $unit(number, toFixed) {
    const getToFixed = (number) => {
      toFixed = toFixed || 2
      if (String(number).indexOf('.') !== -1) {
        if (String(number).split('.')[1].length < toFixed) {
          toFixed = String(number).split('.')[1].length
        } else {
          toFixed = toFixed
        }
      } else {
        toFixed = 0
      }
      return number.toFixed(toFixed)
    }
    let result = 0
    if (number) {
      number = Number(number)
      result = getToFixed(number)
      // 万位数
      if (number >= 10000 || number <= -10000) {
        result = getToFixed(number / 10000) + '万'
      }
      // 亿位数
      if (number >= 100000000 || number <= -100000000) {
        result = getToFixed(number / 100000000) + '亿'
      }
    }
    return result
  },
  $getArrayTotal(array, key) {
    let result = 0
    if (this.$isArray(array)) {
      array.forEach((res) => {
        if (key) {
          result += Number(this.$getKey(res, key))
        } else {
          result += res
        }
      })
    }
    return result
  },
  $isArray(array, noEmpty = false) {
    let result = false
    if (noEmpty) {
      if (Array.isArray(array) && array.length !== 0) {
        result = true
      }
    } else {
      if (Array.isArray(array)) {
        result = true
      }
    }
    return result
  },
  $code(value, arrayString, noMatch) {
    let text = noMatch ? noMatch : 'undefined',
      array = arrayString.split(',')
    if (!!array && array.length !== 0) {
      if (!value && value != 0) {
        array.forEach((res) => {
          if (res.split(':')[0] == 'null') {
            text = res.split(':')[1]
          }
        })
      } else {
        array.forEach((res) => {
          if (res.split(':')[0] && res.split(':')[1]) {
            if (value == res.split(':')[0]) {
              text = res.split(':')[1]
            }
          }
        })
      }
    }
    return text
  },
  $domChange(dom, callback) {
    const observer = new MutationObserver((mutationsList) => {
      typeof callback === 'function' ? callback(mutationsList[0].target) : null
    })
    observer.observe(dom, {
      attributes: true,
      childList: true,
      subtree: true
    })
  },
  $getKey(obj, key) {
    var _result
    let keyArray = []
    key.split('.').forEach((res) => {
      if (res.indexOf('[') !== -1 && res.indexOf(']') !== -1) {
        keyArray.push(res.split('[')[0])
        res.split('[').forEach((res) => {
          if (res.indexOf(']') !== -1) {
            keyArray.push(Number(res.split(']')[0]))
          }
        })
      } else {
        keyArray.push(res)
      }
    })

    if (obj && key) {
      loop(obj, keyArray, 0, (res) => {
        _result = res
      })
    }

    function loop(obj, keys, index, callback) {
      if (obj[keys[index]] && (keys[index + 1] || !isNaN(keys[index + 1]))) {
        loop(obj[keys[index]], keys, index + 1, callback)
      } else {
        typeof callback === 'function' ? callback(obj[keys[index]]) : null
      }
    }
    return _result
  },
  $filterKey(obj, keys) {
    let result = {}
    if (Array.isArray(keys) && keys.length !== 0) {
      keys.forEach((res) => {
        result[res] = obj[res]
      })
    }
    return result
  },
  $setColor(string = 'turquoise') {
    let result = ''
    if (string) {
      const name = string.split(',')[0],
        type = string.split(',')[1],
        value = Number(string.split(',')[2] || 32)

      const colors = [
        { name: 'white', value: [255, 255, 255] },
        { name: 'silver', value: [211, 211, 211] },
        { name: 'black', value: [51, 51, 51] },
        { name: 'coffee', value: [100, 51, 51] },
        { name: 'red', value: [231, 76, 60] },
        { name: 'pink', value: [255, 102, 153] },
        { name: 'orange', value: [243, 123, 29] },
        { name: 'yellow', value: [255, 201, 38] },
        { name: 'green', value: [94, 185, 94] },
        { name: 'turquoise', value: [26, 188, 156] },
        { name: 'blue', value: [52, 152, 219] },
        { name: 'purple', value: [141, 108, 255] }
      ]
      const color = colors.find((res) => res.name == name)

      if (type) {
        result = this.$getRGBA(`rgba(${color.value})`, type, value)
      } else {
        result = this.$getRGBA(`rgba(${color.value})`)
      }
    }

    return result
  },
  $colorArray: ['white', 'silver', 'black', 'coffee', 'red', 'pink', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'purple'],
  $arrayMove(array, index, action) {
    var _obj = {
      prev: array[index - 1],
      next: array[index + 1]
    }
    if (action == 'up') {
      if (_obj.prev) {
        array.splice(index - 1, 1)
        array.splice(index, 0, _obj.prev)
      }
    } else if (action == 'down') {
      if (_obj.next) {
        array.splice(index + 1, 1)
        array.splice(index, 0, _obj.next)
      }
    }
  },
  $resize(el, callback) {
    if (el instanceof jQuery) {
      el = el[0]
    }
    if ($(document).find(el).length > 0) {
      var _ow = el.clientWidth,
        _oh = el.clientHeight
      var _loop = self.setInterval(function() {
        if ($(document).find(el).length > 0) {
          var _nw = el.clientWidth,
            _nh = el.clientHeight
          if (_nw != _ow || _nh != _oh) {
            typeof callback == 'function'
              ? callback({
                  width: _nw,
                  height: _nh
                })
              : null
            _ow = _nw
            _oh = _nh
          }
        } else {
          self.clearInterval(_loop)
        }
      }, 0)
    }
  },
  $modal(options) {
    // 创建虚拟dom并转成真实dom
    const comp = new (Vue.extend(buiModal))({
      propsData: {
        title: '消息',
        mode: 'alert',
        closeble: [],
        confirmed: () => {
          typeof options.success === 'function' ? options.success() : null
          typeof options.confirm === 'function' ? options.confirm() : null
          comp.close()
        },
        cancelled: () => {
          typeof options.cancel === 'function' ? options.cancel() : null
          comp.close()
        },
        closed: () => {
          document.body.removeChild(comp.$el)
        },
        ...options
      }
    }).$mount()
    document.body.appendChild(comp.$el)
    comp.open()
  },
  $alert(options) {
    if (options) {
      this.$modal({ mode: 'alert', ...options })
    }
  },
  $confirm(options) {
    if (options) {
      this.$modal({ mode: 'confirm', ...options })
    }
  },
  $msgi: 1,
  // 消息提示
  $msg(options) {
    var _t = this
    var _i = _t.$msgi
    var _default = {
      content: '',
      type: 'default',
      positions: 'top',
      timeout: 3000,
      opened() {},
      closed() {}
    }
    Object.assign(_default, options)
    if (!_default.colorname) {
      _default['colorname'] = _default.type === 'success' ? 'turquoise' : _default.type === 'error' ? 'red' : _default.type === 'warning' ? 'orange' : 'blue'
    }
    if (!_default.icon) {
      _default['icon'] = _default.type === 'success' ? 'bi bi-check-circle' : _default.type === 'error' ? 'bi bi-cancel' : _default.type === 'warning' ? 'bi bi-info' : 'bi bi-info'
    }
    if ($('body').length != 0) {
      if ($('.bui-msg-box.bui-msg-box-' + _default.positions).length == 0) {
        $('body').append(
          '<div class="bui-msg-box bui-msg-box-' +
            _default.positions +
            '" style="z-index:1000">' +
            '	<div class="bui_p_12">' +
            '		<div class="bui_row_p_12"></div>' +
            '	</div>' +
            '</div>'
        )
        addMsgItem()
      } else {
        addMsgItem()
      }
    }

    function addMsgItem() {
      var _color = _t.$setColor(_default.colorname)
      var _itemHtml =
        '' +
        '' +
        '<div class="bui-msg-item" positions="' +
        _default.positions +
        '" itemid="' +
        _i +
        '" style="opacity:0;">' +
        '	<div class="bui_p_12 bui_shadow" style="position:relative;background-color:white;color:black;border-left-width:0.32rem;border-style:solid;border-color:' +
        _color +
        '">' +
        '		<div class="bui_flex_row bui_vm" style="position:relative;z-index:1;">' +
        (_default.icon ? '<div class="bui_flex_row_l"><i style="color:' + _color + '" class="' + _default.icon + ' bui_fl"></i></div>' : '') +
        '			<div class="bui_flex_row_c bui_fs_14 bui_p_6_lr">' +
        _default.content +
        '</div>' +
        '			<div class="bui_flex_row_r"><div class="bui_cursor_p bui_fs_12 bui_fc_silver_d bui_fc_silver_l_h"><i class="fa fa-close fa-fw"></i></div></div>' +
        '		</div>' +
        '		<div style="position:absolute;left:0;top:0;bottom:0;background-color:rgba(255,255,255,0.86);"></div>' +
        '	</div>' +
        '</div>'
      setTimeout(function() {
        $('.bui-msg-item[itemid=' + _i + '] .bui_cursor_p')
          .unbind()
          .bind({
            click: function() {
              _t.$msgRemove(_i, _default.closed)
            }
          })
      })
      if (_default.positions == 'top' || _default.positions == 'center') {
        $('.bui-msg-box-' + _default.positions)
          .children()
          .children()
          .append(_itemHtml)
        if (_default.positions == 'top') {
          $('.bui-msg-item[itemid=' + _i + ']').addClass('bui_am_slideDownIn')
        } else if (_default.positions == 'center') {
          $('.bui-msg-item[itemid=' + _i + ']').addClass('bui_am_zoomIn')
        }
      } else if (_default.positions == 'bottom') {
        $('.bui-msg-box-' + _default.positions)
          .children()
          .children()
          .prepend(_itemHtml)
        $('.bui-msg-item[itemid=' + _i + ']').addClass('bui_am_slideUpIn')
      }
      if (_default.timeout != 0) {
        setTimeout(function() {
          _t.$msgRemove(_i, _default.closed)
        }, _default.timeout)
      }

      _t.$msgSetSize()
      var unwatch = _t.$watch('$root.win.width', function(nv, ov) {
        if ($('.bui-msg-box').length > 0) {
          _t.$msgSetSize()
        } else {
          unwatch()
        }
      })
      _t.$msgi = _i + 1

      typeof _default.opened === 'function' ? _default.opened() : null
    }
  },
  // msg设置位置尺寸
  $msgSetSize(callback) {
    var _t = this
    $('.bui-msg-box').css({
      position: 'fixed',
      left: $(window).width() > 480 ? '50%' : 0,
      width: $(window).width() > 480 ? 480 : '100%',
      'margin-left': $(window).width() > 480 ? -240 : 0
    })
    $('.bui-msg-box-top').css({
      top: 0
    })
    $('.bui-msg-box-center').css({
      'margin-top': -[$('.bui-msg-box-center').height() / 2],
      top: '50%'
    })
    $('.bui-msg-box-bottom').css({
      bottom: 0
    })
    typeof callback == 'function' ? callback() : null
  },
  // 移除msg
  $msgRemove(id, callback) {
    var _t = this
    var _dom = $('.bui-msg-item[itemid=' + id + ']'),
      _positions = _dom.attr('positions')
    if (_positions == 'top' || _positions == 'center') {
      if (_positions == 'top') {
        _dom.removeClass('bui_am_slideDownIn').addClass('bui_am_slideDownOut')
      } else if (_positions == 'center') {
        _dom.removeClass('bui_am_zoomIn').addClass('bui_am_zoomOut')
      }
    } else if (_positions == 'bottom') {
      _dom.removeClass('bui_am_slideUpIn').addClass('bui_am_slideUpOut')
    }
    setTimeout(function() {
      _dom.remove()
      _t.$msgSetSize()
      if ($('.bui-msg-box-' + _positions).find('.bui-msg-item').length == 0) {
        $('.bui-msg-box-' + _positions).remove()
      }
      typeof callback === 'function' ? callback() : null
    }, 300)
  },
  $message(options) {
    return this.$msg(options)
  },
  // 遮罩层
  $mask(options) {
    var _t = this
    var _options = {
      bgc: _t.$setColor('black,f'),
      effectIn: 'bui_am_zoomIn',
      effectOut: 'bui_am_zoomOut',
      content: '',
      success: function() {}
    }
    Object.assign(_options, options)

    if ($('.bui_mask_box').length > 0) {
      _t.$maskClose()
    } else {
      $('body').append(
        '' +
          '<div class="bui_mask_box bui_unselect" style="position:fixed;width:100%;height:100%;top:0;left:0;z-index:1000;">' +
          '	<div class="bui_mask_bg bui_inline bui_ta_c bui_vm" style="position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;z-index:0;background-color:' +
          _options.bgc +
          '"></div>' +
          '	<div class="bui_mask_wrap bui_inline bui_ta_c bui_vm" style="position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;z-index:1;">' +
          '		<i style="width:0;height:100%"></i>' +
          '		<div>' +
          _options.content +
          '</div>' +
          '		<i style="width:0;height:100%"></i>' +
          '	</div>' +
          '</div>'
      )
      $('.bui_mask_box').data(_options)
      $('.bui_mask_bg').addClass('bui_am_fadeIn')
      $('.bui_mask_wrap').addClass(_options.effectIn)
      setTimeout(function() {
        typeof _options.success == 'function' ? _options.success() : null
      }, 300)
    }
  },
  $maskClose(callback) {
    var _t = this
    var _options = $('.bui_mask_box:first').data()
    $('.bui_mask_bg')
      .removeClass('bui_am_fadeIn')
      .addClass('bui_am_fadeOut')
    $('.bui_mask_wrap')
      .removeClass(_options.effectIn)
      .addClass(_options.effectOut)
    setTimeout(function() {
      $('.bui_mask_box').remove()
      typeof callback == 'function' ? callback() : null
    }, 300)
  },
  // 打开loading提示器
  $loadingOpen(options) {
    var _t = this
    var _options = {
      text: 'loading...',
      full: false,
      size: 32,
      success: function() {}
    }
    Object.assign(_options, options)

    _t.$mask({
      bgc: _options.full ? _t.$setColor('black,f') : '',
      content:
        '' +
        '<div class="bui_p_24 bui_fc_white bui_radius ' +
        (!_options.full ? 'bui_bgc_black_f' : '') +
        '">' +
        '	<p style="font-size:' +
        _options.size +
        'px"><i class="fa fa-circle-o-notch fa-spin"></i></p>' +
        '	<p class="bui_line_clamp_1 bui_fs_12">' +
        _options.text +
        '</p>' +
        '</div>',
      success: _options.success
    })
  },
  // 关闭loading提示器
  $loadingClose(callback) {
    var _t = this
    _t.$maskClose(callback)
  },
  // 截取小数点位数
  $toFixed: function(value, fixed) {
    !fixed ? (fixed = 2) : null
    var _return = value
    if (String(value).split('.')[1]) {
      if (String(value).split('.')[1].length > fixed) {
        _return = value.toFixed(fixed)
      }
    }
    return _return
  },
  // 获得随机数
  $random(min, max, decimal) {
    return decimal ? parseFloat(Math.random() * (max - min) + min).toFixed(decimal) : parseInt(Math.random() * (max - min) + min)
  },
  // router跳转
  $gotoUrl(url) {
    var _t = this
    if (url && url != _t.$router.history.current.name) {
      _t.$router.push(url)
    }
  },
  // 图片文件转base64
  $imageToBase64(options) {
    options = { files: [], max: 960, compress: 90, ...options }
    const getBase64 = (array, index) => {
      var reader = new FileReader()
      reader.onloadend = () => {
        var _bUrl = reader.result
        var nImg = new Image()
        var nCanvas = $(document.createElement('canvas'))
        var ctx = nCanvas[0].getContext('2d')
        $(nImg).attr('src', _bUrl)
        this.$nextTick(() => {
          var bw = $(nImg)[0].width,
            bh = $(nImg)[0].height,
            ratio = bw / bh,
            sw = 0,
            sh = 0
          if (ratio >= 1) {
            if (bw > Number(options.max)) {
              sw = Number(options.max)
              sh = sw / ratio
            } else {
              sw = bw
              sh = bh
            }
          } else {
            if (bh > Number(options.max)) {
              sh = Number(options.max)
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
          _base64.push(nCanvas[0].toDataURL('image/jpeg', Number(options.compress) / 100))
          if (index + 1 < array.length) {
            getBase64(array, index + 1)
          } else {
            typeof options.success == 'function' ? options.success(_base64) : null
          }
        })
      }
      reader.readAsDataURL(array[index])
    }
    let _base64 = []
    getBase64(options.files, 0)
  },
  // 驼峰转换下划线
  $toLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase()
  },
  // 下划线转换驼峰
  $toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter) {
      return letter.toUpperCase()
    })
  },
  // html转word
  $html2word(options) {
    require('./plug/jquery.wordexport/')
    if (options.el) {
      options.el.wordExport(options.filename || '文档', options.css)
    }
  },
  // 获取颜色rgba
  $getRGBA(string, action, value = 32) {
    let result = null
    if (string) {
      const colornames = [
        'aliceblue|#f0f8ff',
        'antiquewhite|#faebd7',
        'aqua|#00ffff',
        'aquamarine|#7fffd4',
        'azure|#f0ffff',
        'beige|#f5f5dc',
        'bisque|#ffe4c4',
        'black|#000000',
        'blanchedalmond|#ffebcd',
        'blue|#0000ff',
        'blueviolet|#8a2be2',
        'brown|#a52a2a',
        'burlywood|#deb887',
        'cadetblue|#5f9ea0',
        'chartreuse|#7fff00',
        'chocolate|#d2691e',
        'coral|#ff7f50',
        'cornflowerblue|#6495ed',
        'cornsilk|#fff8dc',
        'crimson|#dc143c',
        'cyan|#00ffff',
        'darkblue|#00008b',
        'darkcyan|#008b8b',
        'darkgoldenrod|#b8860b',
        'darkgray|#a9a9a9',
        'darkgreen|#006400',
        'darkkhaki|#bdb76b',
        'darkmagenta|#8b008b',
        'darkolivegreen|#556b2f',
        'darkorange|#ff8c00',
        'darkorchid|#9932cc',
        'darkred|#8b0000',
        'darksalmon|#e9967a',
        'darkseagreen|#8fbc8f',
        'darkslateblue|#483d8b',
        'darkslategray|#2f4f4f',
        'darkturquoise|#00ced1',
        'darkviolet|#9400d3',
        'deeppink|#ff1493',
        'deepskyblue|#00bfff',
        'dimgray|#696969',
        'dodgerblue|#1e90ff',
        'feldspar|#d19275',
        'firebrick|#b22222',
        'floralwhite|#fffaf0',
        'forestgreen|#228b22',
        'fuchsia|#ff00ff',
        'gainsboro|#dcdcdc',
        'ghostwhite|#f8f8ff',
        'gold|#ffd700',
        'goldenrod|#daa520',
        'gray|#808080',
        'green|#008000',
        'greenyellow|#adff2f',
        'honeydew|#f0fff0',
        'hotpink|#ff69b4',
        'indianred|#cd5c5c',
        'indigo|#4b0082',
        'ivory|#fffff0',
        'khaki|#f0e68c',
        'lavender|#e6e6fa',
        'lavenderblush|#fff0f5',
        'lawngreen|#7cfc00',
        'lemonchiffon|#fffacd',
        'lightblue|#add8e6',
        'lightcoral|#f08080',
        'lightcyan|#e0ffff',
        'lightgoldenrodyellow|#fafad2',
        'lightgrey|#d3d3d3',
        'lightgreen|#90ee90',
        'lightpink|#ffb6c1',
        'lightsalmon|#ffa07a',
        'lightseagreen|#20b2aa',
        'lightskyblue|#87cefa',
        'lightslateblue|#8470ff',
        'lightslategray|#778899',
        'lightsteelblue|#b0c4de',
        'lightyellow|#ffffe0',
        'lime|#00ff00',
        'limegreen|#32cd32',
        'linen|#faf0e6',
        'magenta|#ff00ff',
        'maroon|#800000',
        'mediumaquamarine|#66cdaa',
        'mediumblue|#0000cd',
        'mediumorchid|#ba55d3',
        'mediumpurple|#9370d8',
        'mediumseagreen|#3cb371',
        'mediumslateblue|#7b68ee',
        'mediumspringgreen|#00fa9a',
        'mediumturquoise|#48d1cc',
        'mediumvioletred|#c71585',
        'midnightblue|#191970',
        'mintcream|#f5fffa',
        'mistyrose|#ffe4e1',
        'moccasin|#ffe4b5',
        'navajowhite|#ffdead',
        'navy|#000080',
        'oldlace|#fdf5e6',
        'olive|#808000',
        'olivedrab|#6b8e23',
        'orange|#ffa500',
        'orangered|#ff4500',
        'orchid|#da70d6',
        'palegoldenrod|#eee8aa',
        'palegreen|#98fb98',
        'paleturquoise|#afeeee',
        'palevioletred|#d87093',
        'papayawhip|#ffefd5',
        'peachpuff|#ffdab9',
        'peru|#cd853f',
        'pink|#ffc0cb',
        'plum|#dda0dd',
        'powderblue|#b0e0e6',
        'purple|#800080',
        'red|#ff0000',
        'rosybrown|#bc8f8f',
        'royalblue|#4169e1',
        'saddlebrown|#8b4513',
        'salmon|#fa8072',
        'sandybrown|#f4a460',
        'seagreen|#2e8b57',
        'seashell|#fff5ee',
        'sienna|#a0522d',
        'silver|#c0c0c0',
        'skyblue|#87ceeb',
        'slateblue|#6a5acd',
        'slategray|#708090',
        'snow|#fffafa',
        'springgreen|#00ff7f',
        'steelblue|#4682b4',
        'tan|#d2b48c',
        'teal|#008080',
        'thistle|#d8bfd8',
        'tomato|#ff6347',
        'turquoise|#40e0d0',
        'violet|#ee82ee',
        'violetred|#d02090',
        'wheat|#f5deb3',
        'white|#ffffff',
        'whitesmoke|#f5f5f5',
        'yellow|#ffff00',
        'yellowgreen|#9acd32'
      ]
      const currentColor = colornames.filter((res) => res.split('|')[0] === string)

      let dom = new Image()
      if (this.$isArray(currentColor, true)) {
        string = currentColor[0].split('|')[1]
      }
      dom.style = `background-color:${string}`
      let rgbaArray = $(dom)
        .css('background-color')
        .split('(')[1]
        .split(')')[0]
        .split(',')

      if (!rgbaArray[3]) {
        rgbaArray.push('1')
      }
      rgbaArray = rgbaArray.map((res) => Number(res))

      // 变量或变暗
      if (action === 'l' || action === 'd') {
        rgbaArray = rgbaArray.map((res, index) => {
          let result = res
          if (index < 3) {
            if (action === 'd') {
              if (res - value < 0) {
                result = 0
              } else {
                result = res - value
              }
            } else if (action === 'l') {
              if (res + value > 255) {
                result = 255
              } else {
                result = res + value
              }
            }
          }
          return result
        })
      } else if (action === 'f') {
        rgbaArray[3] = Number((1 - value / 100).toFixed(2))
      }
      result = `rgba(${rgbaArray.join(',')})`
    }

    return result
  }
}
