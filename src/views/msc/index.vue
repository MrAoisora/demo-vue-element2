<template>
  <el-card>
    <iframe
      v-if="!notFound"
      v-for="(iframeObj, key) in iframeList.data"
      :key="key"
      v-show="getShowFlag(iframeObj.path)"
      width="100%"
      :height="getIframeHeight()"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      scrolling="auto"
      vspace="0"
      :src=iframeObj.url>
    </iframe>
    <div v-else
         class="failed-wrapper"
         :style="{height:getIframeHeight()+'px'}">
      <div class="failed-tips-wrapper">
        <div class="failed-msg">
          404
          <br/>
          <span>页面不存在</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      activatedId: '',
      loading: false,
      notFound: true,
      url: '',
      iframeList: this.$store.state.globalMenuList
    }
  },
  activated () {
    console.log('====进入activated=========')
  },
  mounted () {
    console.log('router', this.$route)
    console.log('iframeList', this.$store.state.globalMenuList)
    if (this.$store.state.MENUSTATE.menuHeader.data[0].children) {
      this.updateUrl()
    }
  },
  methods: {
    /**
     * 获取展示某iframe的标志
     * */
    getShowFlag (path) {
      console.log('path=', path)
      this.activatedPath = this.$store.state.globalMenuList.activedPath
      return path === this.activatedPath
    },
    updateUrl () {
      try {
        this.loading = true
        if (this.$store.state.globalMenuList.activedId !== '') {
          this.notFound = false
        } else {
          this.notFound = true
        }
      } finally {
        this.loading = false
      }
    },
    getIframeHeight () {
      // if (this.size.mainContentHeight > 0) {
      //   // eslint-disable-next-line no-unused-vars
      //   const cardPadding = 20
      //   // eslint-disable-next-line no-unused-vars
      //   const tabTitleHeader = 56
      //   return this.size.mainContentHeigtht - tabTitleHeader - cardPadding * 2 - this.size.headerHeight - this.size.footerHeight
      // }
      return 500
    }
  }
  /**
   * 添加监听器,监听store的变化
   */
  // watch: {
  //   '$store.state.globalMenuList.activedId': {
  //     immediate: true, // 开启首次监听
  //     handler: (newVal, oldVal) => {
  //       console.log('========================', newVal, oldVal)
  //       if (newVal !== oldVal) {
  //         console.log('=======================进入判断')
  //         this.activatedId = newVal
  //         console.log('=========activateId=======', this.activatedId)
  //       }
  //     }
  //   }
  // }
}
</script>

<style scoped lang="scss">
.failed-wrapper {
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  margin-top: 0 !important;
}
</style>
