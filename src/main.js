import Vue from 'vue'
import App from './App.vue'

// 引入路由和路由配置
import router from './router.config.js'
router.beforeEach(function (to, from, next) {
  if (to.name) {
    document.title = to.name + '-BaidiUi'
  }
  next();
});

// 引入BUI框架
import bui from './components/bui/';
Vue.use(bui);

// 项目组件
import './components/object/'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    data() {
      return Object.assign(bui.buiData, {})
    }
  })
.$mount('#app')
