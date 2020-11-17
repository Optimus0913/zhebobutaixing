import { getCatelist } from '../../util/axios'

//state

const state = {
    catelist: []
}

//getters
const getters = {
    getCatelist(state) {
        return state.catelist
    }
}

const mutations = {
    REQ_CATELIST(state, payload) {
        state.catelist = payload
    }
}

const actions = {
    getCatelistAction({ commit }) {
        getCatelist({
            istree: true
        }).then(res => {
            if (res.data.code == 200) {
                //提交一个mutation以及携带参数，参数就是返回的数据
                if (!res.data.list) {
                    res.data.list = []
                }
                commit("REQ_CATELIST", res.data.list)
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}