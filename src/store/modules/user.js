import { getUserlist, getUsercount } from '../../util/axios'

//state
const state = {
    userlist: [],
    size: 2, //每个页面渲染条数
    page: 1, // 页码
    total: 2
}

//getters
const getters = {
    getUserlist(state) {
        return state.userlist;
    },
    getUsercount(state) {
        return state.total;
    },
    getUserSize() {
        return state.size
    }
}

//mutations
const mutations = {
    REQ_USERLIST(state, payload) {
        state.userlist = payload
    },
    REQ_USERCOUNT(state, payload) {
        state.total = payload
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

//actions
const actions = {
    getUserAction(context) {
        getUserlist({
            size: context.state.size,
            page: context.state.page,

        }).then(res => {
            if (res.data.code == 200) {
                console.log(res);
                context.commit('REQ_USERLIST', res.data.list)
            }
        })
    },
    //获取总条数
    getCountAction({ commit }) {
        getUsercount().then(res => {
            console.log(res, '总条数');
            if (res.data.code == 200) {
                commit('REQ_USERCOUNT', res.data.list[0].total)
            }
        })
    },
    //封装page的action
    changepageAaction(context, payload) {
        context.commit('REQ_PAGE', payload);
        context.dispatch('getUserAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}