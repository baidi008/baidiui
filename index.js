import Vue from 'vue'

// 注册样式
import './baidiui_scss.scss'

//引入moment
import moment from 'moment'

//引入jquery
import $ from 'jquery'

// 引入 prototype
import prototype from './prototype.js'

// 引入自定义指令 directive
import directive from './directive.js'

// 引入公用组件 找到当前目录包括子文件夹下以.vue命名的文件
const vueFiles = require.context('./', true, /\.vue$/)
function toHump(name) {
  return name.replace(/\-(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
vueFiles.keys().forEach((fileName) => {
  const name = toHump(fileName.split('/')[fileName.lastIndexOf('/')].replace('.vue', ''))
  const comConfig = vueFiles(fileName).default
  Vue.component(name, comConfig)
})

export default {
  install(Vue, object = { name: null }) {
    var _t = this
    //引入jQuery
    window.$ = window.jQuery = $

    // 注册公用函数
    if (!!object.name) {
      Object.assign(Vue.prototype, { [object.name]: prototype })
    } else {
      Object.assign(Vue.prototype, prototype)
    }

    // 注册公用函数 moment
    moment.locale('Zh-cn')
    window.$moment = moment
    Vue.prototype.$moment = moment

    // 引入自定义指令
    Object.keys(directive).forEach((res) => {
      Vue.directive(res, directive[res])
    })

    getWinInfo()

    function getWinInfo() {
      _t.buiData.win = {
        width: $(window).width(),
        height: $(window).height(),
        dev: $(window).width() >= 992 ? 'pc' : $(window).width() < 992 && $(window).width() >= 768 ? 'pad' : 'mobile'
      }
      $(window)
        .unbind('resize')
        .resize(function(res) {
          getWinInfo()
        })
    }
  },
  buiData: {
    win: {}
  }
}
