//引入角色接口
import { getRolelist } from '../../util/axios'

const state = {
    rolelist: []
}

//getters

const getters = {
    getRolelist(state) {
        return state.rolelist
    }
}

const mutations = {
    REQ_ROLELIST(state, payload) {
        state.rolelist = payload
    }
}

const actions = {
    //封装获取角色列表的行动
    getRoleAction({ commit }) {
        getRolelist().then(res => {
            // console.log(res);
            if (res.data.code == 200) {
                commit('REQ_ROLELIST', res.data.list)
            }
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}