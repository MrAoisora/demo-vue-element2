<template>
  <div id="frame_Container">
    <el-button @click="checkState" style="height: 20px;width: 100px">查看state</el-button>
    <el-button @click="changeAbleFlag" style="height: 20px;width: 100px">改变侧边栏tab的可用状态</el-button>
    <!--    <el-button @click="openTab({title:'test',path:'test'})" style="height: 20px;width: 100px">测试openTab</el-button>-->
    <!--    <el-button @click="openTab({title:'test2',path:'test2'})" style="height: 20px;width: 100px">测试openTab</el-button>-->
    <appheader></appheader>
    <el-container>
      <appleftAside></appleftAside>
      <el-main style="padding: 20px">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.id"
            :label="item.name"
            :name="item.path"
          >
          </el-tab-pane>
        </el-tabs>
        <vueRouterIframe></vueRouterIframe>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import appleftAside from '../leftAside/NewMenuLeftAside'
import appheader from '../head/NewHead'
import appMiain from '../main/NewAppMain'
import msc from '../msc/index'
import TYPES from '../../store/mutation-types'
import vueRouterIframe from '../router-iframe/vue-router-iframe.vue'

export default {
  name: 'framework',
  components: {
    appleftAside,
    appheader,
    appMiain,
    msc,
    vueRouterIframe
  },
  watch: {
    // 监听路由变化后新增tab页
    '$store.state.globalMenuList.activedPath': {
      immediate: true, // 开启首次监听
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log('=======================data变化===================', newVal)
          this.openTab()
          if (newVal.startsWith('/frameWork/msc')) {
            if (this.$router.path !== `/frameWork/msc`) {
              this.$router.push(`/frameWork/msc`)
            }
          }
        }
      }
    }
  },
  created () {
    console.log('state===============>', this.$store.state.MENUSTATE.menuHeader)
  },
  data () {
    return {
      changeFlag: false,
      componentsArr: [],
      editableTabsValue: '',
      editableTabs: [],
      tabIndex: 2
    }
  },
  methods: {
    changeAbleFlag () {
      this.$store.commit(TYPES.MENU_CHANGE_EDITFLAG, true)
    },
    /**
     * 查看state
     */
    checkState () {
      console.log('state = ', this.$store.state)
      console.log('this====', this)
    },
    /**
     * 动态生成router-view的key值
     * @returns {string|*}
     */
    checkKey () {
      if (!this.$route.meta.keepAlive) {
        console.log('this.$route=', this.$route)
        return this.$route.meta.key
      }
      return this.$route.params.itemId
    },
    /**
     * 路由变化导致页面url更改重新渲染其实和增加tab页是脱钩的，可以理解为1.点击侧边栏菜单增加一个tab页，2.监听到路由变化重新
     * 把url渲染让router-view出口展示页面
     * @param targetName
     */
    openTab () {
      // eslint-disable-next-line no-unused-vars
      // const {editableTabs: tabs} = this // 获取vue自身this的editableTabs
      // console.log('==========', tabs)
      // const tab = {
      //   title,
      //   name: path || this.$route.path // ||表示或者
      // }
      // if (this.$store.state.editableTabs.tabs.filter((t) => t.name === tab.name).length === 0) {
      //   this.$store.commit(TYPES.CHANGE_TABLIST, tab)
      // }
      // editableTabsValue为tab的v-mode绑定对象，更改name自动选中对应的的相同的名为name的tab页
      this.editableTabsValue = this.$store.state.globalMenuList.activedPath
      this.editableTabs = this.$store.state.globalMenuList.data
    },
    removeTab (targetName) {
      let tabs = this.editableTabs // 当前tab页列表
      let activeName = this.editableTabsValue // 当前活动的tab页Id
      tabs.forEach((tab, index) => {
        if (tab.id === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.id
            const payLoad = {
              id: targetName
            }
            this.$store.commit(TYPES.MENU.MENU_REDUCE_GLOBLMENULIST, payLoad)
            const itemObj = {
              'id': nextTab.id,
              'name': nextTab.name
            }
            this.$store.commit(TYPES.MENU.MENU_SET_GLOBLMENULIST, itemObj)
          }
        }
      })
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    handleClick (tab) {
      console.log('==========触发tab页事件========', tab.$options.propsData)
      const itemObj = {
        'id': tab.name,
        'name': tab.lable
      }
      this.$store.commit(TYPES.MENU.MENU_SET_GLOBLMENULIST, itemObj)
      if (this.$router.path !== `/frameWork/msc`) {
        this.$router.push(`/frameWork/msc`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
</style>
