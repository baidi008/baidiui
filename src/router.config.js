import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const routeComp = {
  render(el) {
    return el('router-view')
  }
}

export default new Router({
  routes: [
    // 默认路由
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页',
        info: 'index',
        icon: 'dashboard'
      },
      component: () => import('@/pages/index')
    },
    // 基础样式
    {
      path: '/css',
      name: 'css',
      meta: {
        title: '基础样式',
        info: 'Style',
        icon: 'dialpad'
      },
      component: routeComp,
      redirect: {
        name: 'css-layout'
      },
      children: [{
          path: '/css/css-layout',
          name: 'css-layout',
          meta: {
            title: '布局',
            info: 'layout'
          },
          component: () => import('@/pages/css-layout')
        },
        {
          path: '/css/css-grid',
          name: 'css-grid',
          meta: {
            title: '网格',
            info: 'grid'
          },
          component: () => import('@/pages/css-grid')
        },
        {
          path: '/css/css-margin-padding',
          name: 'css-margin-padding',
          meta: {
            title: '间距&填充',
            info: 'margin & padding'
          },
          component: () => import('@/pages/css-margin-padding')
        },
        {
          path: '/css/css-color',
          name: 'css-color',
          meta: {
            title: '颜色',
            info: 'color'
          },
          component: () => import('@/pages/css-color')
        },
        {
          path: '/css/css-border',
          name: 'css-border',
          meta: {
            title: '边框',
            info: 'broder'
          },
          component: () => import('@/pages/css-border')
        },
        {
          path: '/css/css-scrollbar',
          name: 'css-scrollbar',
          meta: {
            title: '滚动条',
            info: 'scroll-bar'
          },
          component: () => import('@/pages/css-scrollbar')
        },
        {
          path: '/css/css-line-clamp',
          name: 'css-line-clamp',
          meta: {
            title: '文字裁剪',
            info: 'line-clamp'
          },
          component: () => import('@/pages/css-line-clamp')
        }, // 基础-预设按钮
        {
          path: '/css/css-btn',
          name: 'css-btn',
          meta: {
            title: '按钮',
            info: 'button'
          },
          component: () => import('@/pages/css-btn')
        },
      ]
    },
    // 方法函数
    {
      path: '/methods',
      name: 'methods',
      meta: {
        title: '方法函数',
        info: 'methods',
        icon: 'code'
      },
      redirect: {
        name: 'methods-modal'
      },
      component: routeComp,
      children: [ // methods-模态对话框
        {
          path: '/methods/methods-modal',
          name: 'methods-modal',
          meta: {
            title: '模态对话框',
            info: 'modal'
          },
          component: () => import('@/pages/methods-modal')
        }, // methods-消息弹框
        {
          path: '/methods/methods-msg',
          name: 'methods-msg',
          meta: {
            title: '消息弹框',
            info: 'message'
          },
          component: () => import('@/pages/methods-msg')
        }, // methods-遮罩层
        {
          path: '/methods/methods-mask',
          name: 'methods-mask',
          meta: {
            title: '遮罩层',
            info: 'mask'
          },
          component: () => import('@/pages/methods-mask')
        }, // methods-设置颜色
        {
          path: '/methods/methods-setColor',
          name: 'methods-setColor',
          meta: {
            title: '预设颜色',
            info: 'setColor'
          },
          component: () => import('@/pages/methods-setColor')
        }, // methods-数组位置调整
        {
          path: '/methods/methods-arrayMove',
          name: 'methods-arrayMove',
          meta: {
            title: '数组位置调整',
            info: 'arrayMove'
          },
          component: () => import('@/pages/methods-arrayMove')
        }, // methods-监听dom尺寸变化
        {
          path: '/methods/methods-resize',
          name: 'methods-resize',
          meta: {
            title: '监听dom尺寸变化',
            info: 'resize'
          },
          component: () => import('@/pages/methods-resize')
        },
      ]
    },
    // 页面组件
    {
      path: '/component',
      name: 'component',
      meta: {
        title: '页面组件',
        info: 'Components',
        icon: 'extension'
      },
      redirect: {
        name: 'component-img'
      },
      component: routeComp,
      children: [
        // 常用 general
        {
          path: '/general',
          name: 'general',
          meta: {
            title: '常用',
            info: 'general'
          },
          component: routeComp,
          children: [ // component-菜单
            {
              path: '/component/component-menu',
              name: 'component-menu',
              meta: {
                title: '菜单',
                info: 'menu'
              },
              component: () => import('@/pages/component-menu')
            }, // component-图片
            {
              path: '/component/component-img',
              name: 'component-img',
              meta: {
                title: '图片',
                info: 'image'
              },
              component: () => import('@/pages/component-img')
            }, // component-标签页
            {
              path: '/component/component-tab',
              name: 'component-tab',
              meta: {
                title: '标签页',
                info: 'tabs'
              },
              component: () => import('@/pages/component-tab')
            }, // component-进度条
            {
              path: '/component/component-progress',
              name: 'component-progress',
              meta: {
                title: '进度条',
                info: 'progress'
              },
              component: () => import('@/pages/component-progress')
            }, // component-进度条-环形
            {
              path: '/component/component-progress-o',
              name: 'component-progress-o',
              meta: {
                title: '进度条-环形',
                info: 'progress circle'
              },
              component: () => import('@/pages/component-progress-o')
            },
          ]
        },
        //表单
        {
          path: '/form',
          name: 'form',
          meta: {
            title: '表单',
            info: 'form'
          },
          component: routeComp,
          children: [
            // component-输入框
            {
              path: '/component/component-input',
              name: 'component-input',
              meta: {
                title: '输入框',
                info: 'input'
              },
              component: () => import('@/pages/component-input')
            }, // component-选择器
            {
              path: '/component/component-select',
              name: 'component-select',
              meta: {
                title: '选择器',
                info: 'select'
              },
              component: () => import('@/pages/component-select')
            }, // component-单选框
            {
              path: '/component/component-radio',
              name: 'component-radio',
              meta: {
                title: '单选',
                info: 'radio'
              },
              component: () => import('@/pages/component-radio')
            }, // component-复选框
            {
              path: '/component/component-checkbox',
              name: 'component-checkbox',
              meta: {
                title: '复选',
                info: 'checkbox'
              },
              component: () => import('@/pages/component-checkbox')
            }, // component-开关
            {
              path: '/component/component-switch',
              name: 'component-switch',
              meta: {
                title: '开关',
                info: 'switch'
              },
              component: () => import('@/pages/component-switch')
            }, // component-按钮
            {
              path: '/component/component-btn',
              name: 'component-btn',
              meta: {
                title: '按钮',
                info: 'button'
              },
              component: () => import('@/pages/component-btn')
            }, // component-按钮组
            {
              path: '/component/component-btn-group',
              name: 'component-btn-group',
              meta: {
                title: '按钮组',
                info: 'button group'
              },
              component: () => import('@/pages/component-btn-group')
            }, // component-时间日期选择器
            {
              path: '/component/component-datetime',
              name: 'component-datetime',
              meta: {
                title: '时间日期选择器',
                info: 'datetime picker'
              },
              component: () => import('@/pages/component-datetime')
            }, // component-选择并压缩本地图片
            {
              path: '/component/component-choose-img',
              name: 'component-choose-img',
              meta: {
                title: '图片上传预处理',
                info: 'Compress images'
              },
              component: () => import('@/pages/component-choose-img')
            },
          ]
        },
        // interactive
        {
          path: '/interactive',
          name: 'interactive',
          meta: {
            title: '交互组件',
            info: 'interactive'
          },
          component: routeComp,
          children: [ // component-模态对话框
            {
              path: '/component/component-modal',
              name: 'component-modal',
              meta: {
                title: '模态对话框',
                info: 'modal'
              },
              component: () => import('@/pages/component-modal')
            }, // component-弹出菜单
            {
              path: '/component/component-drop',
              name: 'component-drop',
              meta: {
                title: '弹出菜单',
                info: 'drop menu'
              },
              component: () => import('@/pages/component-drop')
            },
          ]
        },
        // 图标
        {
          path: '/icon',
          name: 'icon',
          meta: {
            title: '图标',
            info: 'icon'
          },
          component: routeComp,
          children: [ // component-图标-bui
            {
              path: '/component/component-icon',
              name: 'component-icon',
              meta: {
                title: '图标-bui',
                info: 'icon bui'
              },
              component: () => import('@/pages/component-icon')
            }, // component-图标-fontawesome
            {
              path: '/component/component-icon-fa',
              name: 'component-icon-fa',
              meta: {
                title: '图标-fontawesome',
                info: 'icon fontawesome'
              },
              component: () => import('@/pages/component-icon-fa')
            }
          ]
        },
        // 图表
        {
          path: '/echart',
          name: 'echart',
          meta: {
            title: '图表',
            info: 'echart'
          },
          component: () => import('@/pages/component-echart')
        },

        // component-幻灯片
        {
          path: '/component/component-swiper',
          name: 'component-swiper',
          meta: {
            title: '幻灯片',
            info: 'swiper'
          },
          component: () => import('@/pages/component-swiper')
        },
        // component-表格
        {
          path: '/component/component-table',
          name: 'component-table',
          meta: {
            title: '表格',
            info: 'table'
          },
          component: () => import('@/pages/component-table')
        },
        // component-分页
        {
          path: '/component/component-pagination',
          name: 'component-pagination',
          meta: {
            title: '分页',
            info: 'pagination'
          },
          component: () => import('@/pages/component-pagination')
        }
      ]
    },

  ]
})
