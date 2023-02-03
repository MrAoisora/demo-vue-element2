import types from './mutation-types'
// import state from './state'

/**
 * 方式一
 * @type {{}}
 */
const mutations = {}

mutations[types.TEST_INCREMENT] = (state, index) => {
  state.selectedIndex = index
}

mutations[types.TEST_MUTATION_TYPE2] = (state, index) => {
  state.selectedIndex2 = index
}

mutations[types.TEST_CHANGEIDNEX] = (state, index) => {
  state.selectedIndex2 = index
}

/**
 * 更改已被存储的tab
 */
mutations[types.CHANGE_TABLIST] = (state, payLoad) => {
  state.editableTabs.tabs.push(payLoad)
}

/**
 * 用来提交数据到state，保存从后端获取到的菜单数据
 * @param state
 * @param payLoad
 */
const MENU = types.MENU
mutations[types.SAVE_MENUDATA] = (state, payLoad) => {
  debugger
  state.menuData = payLoad
}
mutations[MENU.MENU_SET_HEADER] = (state, payLoad) => { // 设置菜单头
  state.MENUSTATE.menuHeader.data = payLoad
}

/**
 * 用来存储已经点击过的菜单
 */
mutations[MENU.MENU_SET_GLOBLMENULIST] = (state, payLoad) => {
  /**
   * payLoad{itemId:'',name:'',path:'',url:''}
   */
  state.globalMenuList.activedPath = payLoad.path
  state.globalMenuList.activedName = payLoad.name
  if (state.globalMenuList.data.length > 0) {
    for (const obj of state.globalMenuList.data) {
      if (obj.id === payLoad.id) {
        console.log('========菜单已经被存入list==========')
        return
      }
    }
  }
  state.globalMenuList.data.push(payLoad)
}

/***
 * 用来移除存储过的菜单
 */
mutations[MENU.MENU_REDUCE_GLOBLMENULIST] = (state, payLoad) => {
  if (state.globalMenuList.data.length > 0) {
    state.globalMenuList.data.forEach((menuObj, index) => {
      if (menuObj.id === payLoad.id) {
        if (index !== -1) {
          state.globalMenuList.data.splice(index, 1)
        }
      }
    })
  }
}

/**
 * 改变编辑状态
 */
mutations[MENU.MENU_CHANGE_EDITFLAG] = (state, payLoad) => {
  debugger
  state.MENUSTATE.editableFlag = payLoad
}

export default {
  mutations
}
