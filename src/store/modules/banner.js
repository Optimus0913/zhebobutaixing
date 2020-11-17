import { getBannerlist } from '../../util/axios'

//state
const state = {
    bannerlist: []
}

//getters

const getters = {
    getBannerlist(state) {
        return state.bannerlist
    }
}

//mutations
const mutations = {
    REQ_BANNER(state, payload) {
        state.bannerlist = payload
    }
}

//actions
const actions = {
    getBannerAction({ commit }) {
        getBannerlist({
            istree: true
        }).then(res => {
            if (res.data.code == 200) {
                if (!res.data.list) {
                    res.data.list = []
                }
                commit('REQ_BANNER', res.data.list)
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
    namespaced: true
}