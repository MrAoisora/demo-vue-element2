import Login from '../views/Login'
import Home from '../views/Home'
import Page from '../views/page'
import Page2 from '../views/page2'
import dashBoard from '../views/DashBoard'
import framework from '../views/frame'
import msc from '../router/msc'
// import main from '../views/main/NewAppMain'
import main from '../views/main/CardMain'
import Router from 'vue-router'

// 路由设置
const router = new Router({

  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: '登录页',
      children: []
    },
    {
      path: '/',
      name: 'frameWork',
      component: framework,
      meta: '首页', // 此处是标签显示的名字
      beforeEnter: async (to, from, next) => {
        this.a.apps[0].$store.dispatch('globalGetMenuData').then(() => {
          next()
        }).catch()
        // await actions.globalGetMenuData().then(res => {
        //   // console.log('router', this.a.apps[0].$store.dispatch('addTest'))
        // })
      },
      children: [
        {
          path: 'main',
          name: main,
          component: main,
          meta: {
            keepalive: false,
            hasIframe: false,
            key: ''
          },
          beforeEnter: (to, from, next) => {
            to.meta.key = Math.random() // 在进入路由前动态修改metakey，保持唯一性
            next()
          }
        },
        {
          path: 'page',
          name: 'Page',
          component: Page
        },
        {
          path: 'page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: 'dashBoard',
          name: 'dashBoard',
          component: dashBoard
        },
        ...msc
      ]
    },
    {
      path: '/Home',
      name: 'Home',
      Component: Home,
      children: [
        {
          path: 'page',
          name: 'Page',
          component: Page
        },
        {
          path: 'page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: 'dashBoard',
          name: 'dashBoard',
          component: dashBoard
        }
      ]
    }
  ]
})

// router.beforeEach(async (to, from) => {
//   if (to.path === '/') {
//     console.log('11111')
//   }
// })
export default router
