/**
 *定义菜单存储
 */
const MENUSTATE = {
  menuHeader: {
    data: '',
    headerActivedId: ''
  },
  menuLeftAside: {
    data: '',
    leftAsideActivedId: ''
  },
  editableFlag: false
}

const state = {
  MENUSTATE,
  globalRouter: {url: `/`, params: {}, go: {}, replace: false},
  globalMenuList: {activedPath: '', activedName: '', activeFourthPage: [], data: []},
  editableTabs: {tabs: []},
  menuData: '',
  itemId: ''
}
export default state
