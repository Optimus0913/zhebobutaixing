import { getSecklist } from '../../util/axios'

//state

const state = {
    secklist: []
}

//getters

const getters = {
    getSecklist(state) {
        return state.secklist;
    }
}

//mutations

const mutations = {
    REQ_SECKLIST(state, payload) {
        state.secklist = payload
    }
}

//actions

const actions = {
    getSeckAction({ commit }) {
        getSecklist().then(res => {
            if (res.data.code == 200) {
                if (!res.data.list) {
                    res.data.list = []
                }
                commit('REQ_SECKLIST', res.data.list)
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