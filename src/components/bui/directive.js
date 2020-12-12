export default {
  'loading': {
    inserted(el, res) {
      if (!!res.value) {
        setloading(el, true)
      }
    },
    update(el, res) {
      if (res.value !== res.oldValue) {
        setloading(el, !!res.value)
      }
    }
  }
}

function setloading (el, type) {
  $(el)
  .removeClass('bui_unselect')
  .css({
    position: 'relative'
  })
  $(el)
  .children('.loading-mask')
  .remove()
  // 新增
  if (!!type) {
    $(el)
    .addClass('bui_unselect')
    .append(
      '<div class="loading-mask bui_bgc_white_f bui_inline bui_vm bui_ta_c" style="position:absolute;width:100%;height:100%;left:0;top:0;z-index:10000">' +
      ' <i style="width:0;height:100%"></i>' +
      ' <div><i class="fa fa-circle-o-notch fa-spin bui_fc_turquoise bui_fs_24"></i></div>' +
      ' <i style="width:0;height:100%"></i>' +
      '</div>')
  }
}
