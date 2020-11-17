import { getMemberlist } from '../../util/axios'

//state

const state = {
    memberlist: ''
}

//getters

const getters = {
    getMemberlist(state) {
        return state.memberlist
    }
}

//mutations
const mutations = {
    REQ_MEMBERLIST(state, payload) {
        state.memberlist = payload;
    }
}

//actions

const actions = {
    getMemberAction({ commit }) {
        getMemberlist().then(res => {
            if (res.data.code == 200) {
                if (!res.data.list) {
                    res.data.list = []
                }
                commit('REQ_MEMBERLIST', res.data.list)
            }
        }).catch(err => {
            console.log(err, '错误信息');
        })
    }
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}