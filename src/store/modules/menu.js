//引入封装好的接口
import { getMenuList } from '../../util/axios';

//state
const state = {
    menuList: []
}

//getters

const getters = {
    getMenuList(state) {
        return state.menuList
    }
}

const mutations = {
    REQ_MENULIST(state, payload) {
        state.menuList = payload;
    }
}

const actions = {
    getMenulistAction({ commit }) {
        getMenuList({ istree: true }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
                commit('REQ_MENULIST', res.data.list)
                    // console.log('hh');
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}