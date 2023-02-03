import msc from '../../views/msc'
import VueRouter from 'vue-router'

/**
 * 路由传参
 */
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default [
  {
    path: 'msc',
    name: msc,
    iframeComponent: msc,
    title: msc,
    meta: {
      keepAlive: true,
      hasIframe: true
    }
  }
]
