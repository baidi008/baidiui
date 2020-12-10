// 注册样式
import './baidiui_scss.scss'

//引入moment
import moment from 'moment'

//引入jquery
import $ from 'jquery'

// 引入 prototype
import prototype from './prototype.js'

// 引入公用组件
import buiBadge from './bui-badge.vue'
import buiBtn from './bui-btn.vue'
import buiBtnGroup from './bui-btn-group.vue'
import buiChooseImg from './bui-choose-img.vue'
import buiIcon from './bui-icon.vue'
import buiFaIcon from './bui-fa-icon.vue'
import buiImg from './bui-img.vue'
import buiInput from './bui-input.vue'
import buiSelect from './bui-select.vue'
import buiRadio from './bui-radio.vue'
import buiCheckbox from './bui-checkbox.vue'
import buiSwitch from './bui-switch.vue'
import buiListBox from './bui-list-box.vue'
import buiListItem from './bui-list-item.vue'
import buiModal from './bui-modal.vue'
import buiProgress from './bui-progress.vue'
import buiProgressO from './bui-progress-o.vue'
import buiRatio from './bui-ratio.vue'
import buiSwiper from './bui-swiper.vue'
import buiDatetime from './bui-datetime.vue'
import buiTab from './bui-tab.vue'
import buiCode from './bui-code.vue'
import buiTree from './bui-tree.vue'
import buiDrop from './bui-drop.vue'
import buiTable from './bui-table.vue'
import buiPagination from './bui-pagination.vue'
import buiMenu from './bui-menu.vue'
import buiMenuItem from './bui-menu-item'
import buiChart from './bui-chart'
import buiUndefined from './bui-undefined'

export default {
  install(Vue) {
    var _t = this
    //引入jQuery
    window.$ = window.jQuery = $

    // 注册公用函数
    Object.assign(Vue.prototype, prototype)

    // 注册公用函数 moment
    moment.locale('Zh-cn')
    window.$moment = moment
    Vue.prototype.$moment = moment

    // 注册公用组件
    const buiComponents = {
      buiBadge,
      buiBtn,
      buiBtnGroup,
      buiChooseImg,
      buiIcon,
      buiFaIcon,
      buiImg,
      buiInput,
      buiSelect,
      buiRadio,
      buiCheckbox,
      buiSwitch,
      buiListBox,
      buiListItem,
      buiModal,
      buiProgress,
      buiProgressO,
      buiRatio,
      buiSwiper,
      buiDatetime,
      buiTab,
      buiCode,
      buiTree,
      buiDrop,
      buiTable,
      buiPagination,
      buiMenu,
      buiMenuItem,
      buiChart,
      buiUndefined
    }
    Object.keys(buiComponents)
    .forEach(key => {
      Vue.component(key, buiComponents[key])
    })

    getWinInfo()

    function getWinInfo () {
      _t.buiData.win = {
        width: $(window)
        .width(),
        height: $(window)
        .height(),
        dev: $(window)
        .width() >= 992 ? 'pc' : $(window)
        .width() < 992 && $(window)
        .width() >= 768 ? 'pad' : 'mobile'
      }
      $(window)
      .unbind('resize')
      .resize(function (res) {
        getWinInfo()
      })
    }
  },
  buiData: {
    win: {}
  }
}
