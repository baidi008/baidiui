export default {
  install(Vue) {
    Object.assign(Vue.prototype, this.prototype)
  },
  prototype: {
    $getKey(obj, key) {
      var _result
      if (obj && key) {
        loop(obj, key.split('.'), 0, res => {
          _result = res
        })
      }

      function loop (obj, keys, index, callback) {
        if (obj[keys[index]] && keys[index + 1]) {
          loop(obj[keys[index]], keys, index + 1, callback)
        } else {
          typeof callback === 'function' ? callback(obj[keys[index]]) : null
        }
      }
      return _result
    },
    $setColor(colorname) {
      var _return = '';
      if (colorname) {
        var _colorname = colorname.split(',')[0],
          _type = colorname.split(',')[1],
          _num = colorname.split(',')[2] || 32

        var _colorArray = [{
          name: "white",
          value: [255, 255, 255]
        }, {
          "name": "silver",
          value: [211, 211, 211]
        }, {
          "name": "black",
          value: [51, 51, 51]
        }, {
          "name": "coffee",
          value: [100, 51, 51]
        }, {
          "name": "red",
          value: [231, 76, 60]
        }, {
          "name": "pink",
          value: [255, 102, 153]
        }, {
          "name": "orange",
          value: [243, 123, 29]
        }, {
          "name": "yellow",
          value: [255, 201, 38]
        }, {
          "name": "green",
          value: [94, 185, 94]
        }, {
          "name": "turquoise",
          value: [26, 188, 156]
        }, {
          "name": "blue",
          value: [52, 152, 219]
        }, {
          "name": "purple",
          value: [141, 108, 255]
        }]

        var _color = _colorArray.find(res => res.name == _colorname);

        if (_color) {
          if (_type) {
            if (_type == 'f') {
              _return = 'rgba(' + _color.value[0] + ',' + _color.value[1] + ',' + _color.value[2] + ',' + [100 - _num] /
                100 +
                ')'
            } else if (_type == 'l') {
              _return = 'rgba(' + plus(_color.value[0], _num, 'plus') + ',' + plus(_color.value[1], _num, 'plus') + ',' +
                plus(
                  _color
                .value[2], _num, 'plus') + ',1)'
            } else if (_type == 'd') {
              _return = 'rgba(' + plus(_color.value[0], _num, 'cut') + ',' + plus(_color.value[1], _num, 'cut') + ',' +
                plus(
                  _color
                .value[2], _num, 'cut') + ',1)'
            }
          } else {
            _return = 'rgba(' + _color.value[0] + ',' + _color.value[1] + ',' + _color.value[2] + ',1)'
          }

        };

        function plus (target, value, type) {
          var _return = 0
          if (type == 'plus') {
            _return = Number(target) + Number(value) <= 255 ? Number(target) + Number(value) : 255
          } else if (type == 'cut') {

            _return = Number(target) - Number(value) > 0 ? Number(target) - Number(value) : 0;
          };
          return _return
        };
      }

      this.fade = () => {}

      return _return;

    },
    $colorArray: [
      "white",
      "silver",
      "black",
      "coffee",
      "red",
      "pink",
      "orange",
      "yellow",
      "green",
      "turquoise",
      "blue",
      "purple"
    ],
    $arrayMove(array, index, action) {
      var _obj = {
        prev: array[index - 1],
        next: array[index + 1],
      };
      if (action == 'up') {
        if (_obj.prev) {
          array.splice(index - 1, 1);
          array.splice(index, 0, _obj.prev);
        }
      } else if (action == 'down') {
        if (_obj.next) {
          array.splice(index + 1, 1);
          array.splice(index, 0, _obj.next);
        }
      }
    },
    $resize(el, callback) {
      if ($(document)
      .find(el)
      .length > 0) {
        var _ow = el[0].clientWidth,
          _oh = el[0].clientHeight;
        var _loop = self.setInterval(function () {
          if ($(document)
          .find(el)
          .length > 0) {
            var _nw = el[0].clientWidth,
              _nh = el[0].clientHeight;
            if (_nw != _ow || _nh != _oh) {
              typeof (callback) == 'function' ? callback({
                width: _nw,
                height: _nh
              }): null;
              _ow = _nw;
              _oh = _nh;
            }
          } else {
            self.clearInterval(_loop);
          }
        }, 0)
      }
    },
    $alert(options) {
      var _t = this;
      if (options) {
        _t.$modal(Object.assign(options, {
          type: 'alert'
        }));
      }
    },
    $confirm(options) {
      var _t = this;
      if (options) {
        _t.$modal(Object.assign(options, {
          type: 'confirm'
        }));
      }
    },
    // 动态modal
    $modali: 0,
    $modal: function (options) {
      var _t = this;
      _t.$modali++;
      var _id = _t.$modali;
      var _default = Object.assign({
        title: '消息',
        width: 480,
        type: 'alert',
        positions: 'top',
        content: 'undefined',
        colorname: 'turquoise',
        success() {},
        cancel() {},
        successText: '我知道了',
        cancelText: '取消'
      }, options)

      $('body')
      .append('<div class="modal_box" id="modal-' + _id +
        '" style="position:fixed;width:100%;height:100%;left:0;top:0;z-index:' + [1000 + _id] + ';opacity:0;">' +
        '	<div style="position:relative;width:100%;height:100%;">' +

        '		<div class="modal_close" style="position:absolute;z-index:0;width:100%;height:100%;left:0;top:0;background-color:' +
        _t.$setColor(
          'black,f,24') +
        ';"></div>' +
        '		<div class="modal_item" style="position:absolute;z-index:1;padding:1rem;max-width:100%;max-height:100%;">' +
        '			<div class="bui_flex_column bui_bgc_white bui_shadow bui_shadow_24" style="height:100%;opacity:0;">' +
        '				<div class="bui_flex_column_t bui_fc_' + _default.colorname + '">' +
        '					<div class="bui_flex_row bui_vm">' +
        '						<div class="bui_flex_row_c bui_p_12_lr">' + _default.title + '</div>' +
        '						<div class="bui_flex_row_r"><div class="bui_p_12 bui_fc_silver bui_fc_red_h bui_cursor_p modal_close"><i class="fa fa-close fa-fw"></i></div></div>' +
        '					</div>' +
        '				</div>' +
        '				<div class="bui_flex_column_m bui_scrollbar"><p class="bui_p_12 bui_p_24_lr bui_fs_14 bui_ta_l" style="color:' +
        _t.$setColor(
          'silver,d,72') + '">' + _default.content + '</p></div>' +
        '				<div class="bui_flex_column_b bui_p_12 bui_ta_r">' +
        (_default.type == 'confirm' ?
          '<div class="bui_btn bui_bgc_silver bui_radius modal_cancel">' + _default.cancelText + '</div>' : '') +
        '					<div class="bui_btn bui_radius modal_submit bui_bgc_' + _default.colorname + '">' + _default.successText +
        '</div>' +
        '				</div>' +
        '			</div>' +
        '		</div>' +
        '	</div>' +
        '</div>');
      modalShow();

      function modalShow () {
        var _box = $('#modal-' + _id),
          _item = _box.find('.modal_item');
        var _css = {
          width: _default.width,
          left: '50%',
          top: 0,
          transform: 'translate(-50%,0)'
        };

        _box.addClass('bui_am_fadeIn');
        setTimeout(function () {
          if (_default.positions == 'center') {
            Object.assign(_css, {
              top: '50%',
              transform: 'translate(-50%,-50%)'
            })
          } else if (_default.positions == 'bottom') {
            Object.assign(_css, {
              top: 'auto',
              bottom: 0,
              transform: 'translate(-50%,0)'
            })
          }
          _item.css(_css);
          setTimeout(function () {
            if (_default.positions == 'top') {
              _item.find('.bui_flex_column')
              .addClass('bui_am_slideDownIn');
            } else if (_default.positions == 'center') {
              _item.find('.bui_flex_column')
              .addClass('bui_am_zoomIn');
            } else if (_default.positions == 'bottom') {
              _item.find('.bui_flex_column')
              .addClass('bui_am_slideUpIn');
            }

            _box.find('.modal_close')
            .bind({
              'click': function () {
                modalClose(_id);
              }
            });

            _box.find('.modal_submit')
            .bind({
              'click': function () {
                typeof _default.success == 'function' ? _default.success() : null;
                modalClose(_id);
              }
            });
            _box.find('.modal_cancel')
            .bind({
              'click': function () {
                typeof _default.cancel == 'function' ? _default.cancel() : null;
                modalClose(_id);
              }
            })

          })
        })
      }

      function modalClose (id) {
        var _box = $('#modal-' + id),
          _item = _box.find('.modal_item');
        if (_item.find('.bui_flex_column')
        .hasClass('bui_am_slideDownIn')) {
          _item.find('.bui_flex_column')
          .remove('bui_am_slideDownIn')
          .addClass('bui_am_slideDownOut')
        } else if (_item.find('.bui_flex_column')
        .hasClass('bui_am_zoomIn')) {
          _item.find('.bui_flex_column')
          .remove('bui_am_zoomIn')
          .addClass('bui_am_zoomOut')
        } else if (_item.find('.bui_flex_column')
        .hasClass('bui_am_slideUpIn')) {
          _item.find('.bui_flex_column')
          .remove('bui_am_slideUpIn')
          .addClass('bui_am_slideUpOut')
        };
        setTimeout(function () {
          _box.removeClass('bui_am_fadeIn')
          .addClass('bui_am_fadeOut');
          setTimeout(function () {
            _box.remove();
          }, 300)
        }, 0)
      }
    },
    $msgi: 1,
    // 消息提示
    $msg(options) {
      var _t = this;
      var _i = _t.$msgi;
      var _default = {
        content: '',
        type: 'default',
        positions: 'top',
        timeout: 3000,
        opened() {},
        closed() {}
      };
      Object.assign(_default, options);
      if (!_default.colorname) {
        _default['colorname'] = _default.type === 'success' ? 'turquoise' : _default.type === 'error' ? 'red' :
          _default.type === 'warning' ? 'orange' : 'blue'
      }
      if (!_default.icon) {
        _default['icon'] = _default.type === 'success' ? 'bi bi-check-circle' : _default.type === 'error' ?
          'bi bi-cancel' :
          _default.type === 'warning' ? 'bi bi-info' : 'bi bi-info'
      }
      if ($('body')
      .length != 0) {
        if ($('.bui-msg-box.bui-msg-box-' + _default.positions)
        .length == 0) {
          $('body')
          .append(
            '<div class="bui-msg-box bui-msg-box-' + _default.positions + '" style="z-index:1000">' +
            '	<div class="bui_p_12">' +
            '		<div class="bui_row_p_12"></div>' +
            '	</div>' +
            '</div>'
          );
          addMsgItem();
        } else {
          addMsgItem();
        }
      };

      function addMsgItem () {
        var _color = _t.$setColor(_default.colorname);
        var _itemHtml = '' +
          '' +
          '<div class="bui-msg-item" positions="' + _default.positions + '" itemid="' + _i + '" style="opacity:0;">' +
          '	<div class="bui_p_12 bui_shadow" style="position:relative;background-color:white;color:black;border-left-width:0.32rem;border-style:solid;border-color:' +
          _color + '">' +
          '		<div class="bui_flex_row bui_vm" style="position:relative;z-index:1;">' +
          (_default.icon ? '<div class="bui_flex_row_l"><i style="color:' + _color + '" class="' + _default
          .icon +
          ' bui_fl"></i></div>' : '') +
          '			<div class="bui_flex_row_c bui_fs_14 bui_p_6_lr">' + _default.content + '</div>' +
          '			<div class="bui_flex_row_r"><div class="bui_cursor_p bui_fs_12 bui_fc_silver_d bui_fc_silver_l_h"><i class="fa fa-close fa-fw"></i></div></div>' +
          '		</div>' +
          '		<div style="position:absolute;left:0;top:0;bottom:0;background-color:rgba(255,255,255,0.86);"></div>' +
          '	</div>' +
          '</div>';
        setTimeout(function () {
          $(".bui-msg-item[itemid=" + _i + "] .bui_cursor_p")
          .unbind()
          .bind({
            'click': function () {
              _t.$msgRemove(_i, _default.closed);
            }
          })
        })
        if (_default.positions == 'top' || _default.positions == 'center') {
          $(".bui-msg-box-" + _default.positions)
          .children()
          .children()
          .append(_itemHtml);
          if (_default.positions == 'top') {
            $(".bui-msg-item[itemid=" + _i + "]")
            .addClass('bui_am_slideDownIn');
          } else if (_default.positions == 'center') {
            $(".bui-msg-item[itemid=" + _i + "]")
            .addClass('bui_am_zoomIn');
          }

        } else if (_default.positions == 'bottom') {
          $(".bui-msg-box-" + _default.positions)
          .children()
          .children()
          .prepend(_itemHtml);
          $(".bui-msg-item[itemid=" + _i + "]")
          .addClass('bui_am_slideUpIn');
        };
        if (_default.timeout != 0) {
          setTimeout(function () {
            _t.$msgRemove(_i, _default.closed);
          }, _default.timeout);
        };

        _t.$msgSetSize();
        var unwatch = _t.$watch('$root.win.width', function (nv, ov) {
          if ($('.bui-msg-box')
          .length > 0) {
            _t.$msgSetSize();
          } else {
            unwatch();
          }
        });
        _t.$msgi = _i + 1;

        typeof _default.opened === 'function' ? _default.opened() : null
      }
    },
    // msg设置位置尺寸
    $msgSetSize(callback) {
      var _t = this;
      $(".bui-msg-box")
      .css({
        'position': 'fixed',
        'left': $(window)
        .width() > 480 ? '50%' : 0,
        'width': $(window)
        .width() > 480 ? 480 : '100%',
        'margin-left': $(window)
        .width() > 480 ? -240 : 0,
      });
      $(".bui-msg-box-top")
      .css({
        'top': 0
      });
      $(".bui-msg-box-center")
      .css({
        'margin-top': -[$(".bui-msg-box-center")
        .height() / 2
        ],
        'top': '50%'
      });
      $(".bui-msg-box-bottom")
      .css({
        'bottom': 0
      });
      typeof (callback) == 'function' ? callback(): null;
    },
    // 移除msg
    $msgRemove(id, callback) {
      var _t = this;
      var _dom = $(".bui-msg-item[itemid=" + id + "]"),
        _positions = _dom.attr('positions');
      if (_positions == 'top' || _positions == 'center') {
        if (_positions == 'top') {
          _dom.removeClass('bui_am_slideDownIn')
          .addClass('bui_am_slideDownOut');
        } else if (_positions == 'center') {
          _dom.removeClass('bui_am_zoomIn')
          .addClass('bui_am_zoomOut');
        }
      } else if (_positions == 'bottom') {
        _dom.removeClass('bui_am_slideUpIn')
        .addClass('bui_am_slideUpOut');
      };
      setTimeout(function () {
        _dom.remove();
        _t.$msgSetSize();
        if ($(".bui-msg-box-" + _positions)
        .find('.bui-msg-item')
        .length == 0) {
          $(".bui-msg-box-" + _positions)
          .remove();
        }
        typeof callback === 'function' ? callback() : null
      }, 300)
    },
    $message(options) {
      return this.$msg(options)
    },
    // 遮罩层
    $mask(options) {
      var _t = this;
      var _options = {
        bgc: _t.$setColor('black,f'),
        effectIn: 'bui_am_zoomIn',
        effectOut: 'bui_am_zoomOut',
        content: '',
        success: function () {}
      };
      Object.assign(_options, options);

      if ($('.bui_mask_box')
      .length > 0) {
        _t.$maskClose();
      } else {
        $('body')
        .append('' +
          '<div class="bui_mask_box bui_unselect" style="position:fixed;width:100%;height:100%;top:0;left:0;z-index:1000;">' +
          '	<div class="bui_mask_bg bui_inline bui_ta_c bui_vm" style="position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;z-index:0;background-color:' +
          _options.bgc + '"></div>' +
          '	<div class="bui_mask_wrap bui_inline bui_ta_c bui_vm" style="position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;z-index:1;">' +
          '		<i style="width:0;height:100%"></i>' +
          '		<div>' + _options.content + '</div>' +
          '		<i style="width:0;height:100%"></i>' +
          '	</div>' +
          '</div>'
        );
        $('.bui_mask_box')
        .data(_options);
        $('.bui_mask_bg')
        .addClass('bui_am_fadeIn');
        $('.bui_mask_wrap')
        .addClass(_options.effectIn);
        setTimeout(function () {
          typeof _options.success == 'function' ? _options.success() : null;
        }, 300)
      }
    },
    $maskClose(callback) {
      var _t = this;
      var _options = $('.bui_mask_box:first')
      .data();
      $('.bui_mask_bg')
      .removeClass('bui_am_fadeIn')
      .addClass('bui_am_fadeOut');
      $('.bui_mask_wrap')
      .removeClass(_options.effectIn)
      .addClass(_options.effectOut);
      setTimeout(function () {
        $('.bui_mask_box')
        .remove();
        typeof callback == 'function' ? callback() : null;
      }, 300);
    },
    // 打开loading提示器
    $loadingOpen(options) {
      var _t = this;
      var _options = {
        text: 'loading...',
        full: false,
        size: 32,
        success: function () {}
      };
      Object.assign(_options, options);

      _t.$mask({
        bgc: _options.full ? _t.$setColor('black,f') : '',
        content: '' + '<div class="bui_p_24 bui_fc_white bui_radius ' + (!_options.full ? 'bui_bgc_black_f' : '') +
          '">' +
          '	<p style="font-size:' + _options.size + 'px"><i class="fa fa-circle-o-notch fa-spin"></i></p>' +
          '	<p class="bui_line_clamp_1 bui_fs_12">' + _options.text + '</p>' +
          '</div>',
        success: _options.success
      })
    },
    // 关闭loading提示器
    $loadingClose(callback) {
      var _t = this;
      _t.$maskClose(callback);
    },
    // 截取小数点位数
    $toFixed: function (value, fixed) {
      !fixed ? fixed = 2 : null;
      var _return = value
      if (String(value)
      .split('.')[1]) {
        if (String(value)
        .split('.')[1].length > fixed) {
          _return = value.toFixed(fixed)
        }
      }
      return _return;
    },
    // 获得随机数
    $random(min, max, decimal) {
      return decimal ? parseFloat(Math.random() * (max - min) + min)
      .toFixed(decimal) : parseInt(Math.random() * (max -
        min) + min);
    },
    // router跳转
    $gotoUrl(url) {
      var _t = this;
      console.log(url);
      if (url && url != _t.$router.history.current.name) {
        _t.$router.push(url);
      }
    }
  }

}
