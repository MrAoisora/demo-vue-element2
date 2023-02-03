<template>
  <div>
    <!-- Vue的router-view -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- iframe页 -->
    <component
      v-for="item in hasOpenComponentsArr"
      :key="item.name"
      :is="item.name"
      v-show="$route.path ===`/frameWork/${item.path}`"
    ></component>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'vue-router-iframe',
  data () {
    return {
      componentsArr: []
    }
  },
  mounted () {
    const componentsArr = this.getCompoentsArr()
    console.log('componentsArr=', componentsArr)
    componentsArr.forEach((item) => {
      // name必须是带有‘’的字符串
      Vue.component(`'${item.name}'`, item.component)
    })
    this.componentsArr = componentsArr
    this.isOpenIframePage()
  },
  watch: {
    $route () {
      this.isOpenIframePage()
    }
  },
  computed: {
    hasOpenComponentsArr () {
      return this.componentsArr.filter(item => item.hasOpen)
    }
  },
  methods: {
    isOpenIframePage () {
      const target = this.componentsArr.find(item => {
        console.log('this.$route.path=', this.$route.path)
        return `/frameWork/${item.path}` === this.$route.path
      })
      if (target && !target.hasOpen) {
        target.hasOpen = true
      }
    },
    /**
     * 循环遍历routers，获取chilren
     * @param arr
     * @param routers
     * @returns {*}
     */
    getIframeArr (arr, routers) {
      for (const routerObj of routers) {
        if (routerObj.iframeComponent) {
          arr.push(routerObj)
        }
        if (routerObj.children && routerObj.children.length > 0) {
          this.getIframeArr(arr, routerObj.children)
        }
      }
      return arr
    },
    // 遍历所有的路由，把包含iframeComponent表示的组件收集起来，即包含iframe的组件
    getCompoentsArr () {
      const routers = this.$router.options.routes
      let iframeArr = []
      iframeArr = this.getIframeArr(iframeArr, routers)
      /**
       * 1.数组map方法的作用 : 映射数组
       按照某种映射关系,把数组的每一个元素给修改了
       2.语法: array.map( function ( item, index, arr) {} )
       第一个参数:item,必须,当前元素的值
       第二个参数:index,可选,当前元素在数组中的索引值
       第三个参数:arr,当前元素属于的数组对象
       */
      return iframeArr.map((item) => {
        return {
          name: item.name || item.path.replace('/', ''),
          path: item.path,
          hasOpen: false, // 是否点击过，默认未false
          component: item.iframeComponent // 组件文件引用
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
