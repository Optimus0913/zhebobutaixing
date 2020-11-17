//引入核心库
import Vue from 'vue';
//引入Vuex
import Vuex from 'vuex'
//调用Vuex插件
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import banner from './modules/banner'
import member from './modules/member'
import seck from './modules/seck'
import goods from './modules/goods'
//导出实例化的仓库
export default new Vuex.Store({
    state: {
        userinfo: sessionStorage.getItem('userInfo') ?
            JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    getters: {
        getUserinfo(state) {
            return state.userinfo
        }
    },
    mutations: {
        REQ_USERINFO(state, payload) {
            state.userinfo = payload;
            if (payload) {
                sessionStorage.setItem("userInfo", JSON.stringify(payload))
            } else {
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions: {
        changeUserInfoAction({ commit }, payload) {
            commit('REQ_USERINFO', payload)
        }
    },
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        banner,
        member,
        seck,
        goods
    }
})