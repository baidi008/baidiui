import Vue from 'vue';

// 注册公用组件

import comNav from './com-nav.vue';
import comTitle from './com-title.vue';
import comTree from './com-tree.vue';

const objectComponent = {
  comNav,
  comTitle,
  comTree,
}
Object.keys(objectComponent)
.forEach(key => {
  Vue.component(key, objectComponent[key])
})

// 项目prototype
Object.assign(Vue.prototype, {
  $columnsProps: [{
    label: '参数',
    key: 'name'
  }, {
    label: '类型',
    key: 'type'
  }, {
    label: '默认值',
    key: 'default'
  }, {
    label: '说明',
    key: 'info',
    width: 640
  }],
  $columnsObject: [{
    label: '参数',
    key: 'name'
  }, {
    label: '类型',
    key: 'type'
  }, {
    label: '必选',
    key: 'default'
  }, {
    label: '说明',
    key: 'info',
    width: 640
  }],
  $columnsSlots: [{
    label: 'slot-name',
    key: 'name'
  }, {
    label: '默认值',
    key: 'default'
  }, {
    label: '说明',
    key: 'info',
    width: 640
  }]
})
