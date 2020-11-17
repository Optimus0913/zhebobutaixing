import { getSpecslist, getSpecscount } from '../../util/axios'


//state

const state = {
    specslist: [],
    size: 2, //每个页面渲染条数
    page: 1, // 页码
    total: 2
}

//getters
const getters = {
    getSpecslist(state) {
        return state.specslist
    },
    getSpecscount(state) {
        return state.total;
    },
    getSpecsSize() {
        return state.size;
    }
}

//mutation
const mutations = {
    REQ_SPECS(state, payload) {
        state.specslist = payload;
    },
    REQ_SPECSCOUNT(state, payload) {
        state.total = payload
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

//actions
const actions = {
    getSpecsAction(context) {
        // console.log(context, "context");
        //调取列表接口
        getSpecslist({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                // console.log(res, "响应数据");
                //提交一个mutations
                context.commit("REQ_SPECS", res.data.list);
                if (res.data.list == '') {
                    res.data.list = []
                }
            }
        });
    },
    //获取总条数
    getCountAction({ commit }) {
        getSpecscount().then(res => {
            // console.log(res, '总条数');
            if (res.data.code == 200) {
                commit('REQ_SPECSCOUNT', res.data.list[0].total)
            }
        })
    },
    //封装page的action
    changepageAaction(context, payload) {
        context.commit('REQ_PAGE', payload);
        context.dispatch('getSpecsAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}