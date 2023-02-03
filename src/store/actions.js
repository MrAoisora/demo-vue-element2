import TYPES from '../store/mutation-types'
import axios from 'axios'

const actions = {
  changEidtFlag ({commit}, payload) {
    commit(TYPES.MENU_CHANGE_EDITFLAG, payload)
  },
  addTest ({commit}, payload) {
    commit(TYPES.TEST_CHANGEIDNEX, payload)
  },

  /**
   * 定义获取后端菜单方法
   * @param commit
   * @param payload
   */
  async globalGetMenuData ({commit}, payload) {
    // eslint-disable-next-line no-unused-vars
    const url = 'http://127.0.0.1:8099/menucreate/queryAllMenu'
    // eslint-disable-next-line no-unused-vars
    const params = ''
    await axios.post(url, params).then(response => {
      // 获取服务器返回的数据
      const menuData = response.data
      commit(TYPES.MENU.MENU_SET_HEADER, menuData)
    }).catch()
  }

}

export default actions
