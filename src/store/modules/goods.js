import { getGoodslist, getGoodscount } from "../../util/axios"

//state 
const state = {
    goodslist: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数 
}

//getters

const getters = {
    getGoodslist(state) {
        return state.goodslist
    },
    getGoodscount() {
        return state.total;
    },
    //导出总条数
    getGoodsSize() {
        return state.size;
    }
}

//mutation

const mutations = {
    REQ_GOODSLIST(state, payload) {
        state.goodslist = payload;
    },
    //修改state中的total总条数
    REQ_GOODSCOUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

//actions

const actions = {
    //封装一个获取管理员列表的行动
    getGoodsAction(context) {
        console.log(context, "context");
        //调取列表接口
        getGoodslist({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                console.log(res, "响应数据");
                //提交一个mutations
                context.commit("REQ_GOODSLIST", res.data.list);
            }
        });
    },
    //封装一个获取总条数事件
    getCountAction({ commit }) {
        getGoodscount().then(res => {
            if (res.data.code == 200) {
                commit("REQ_GOODSCOUNT", res.data.list[0].total);
            }
        });
    },
    //封装一个修改page的action
    changePageAction(context, payload) {
        console.log(context, '页码哈哈哈哈哈')
        context.commit('REQ_PAGE', payload)
            //重新调取列表
        context.dispatch('getGoodsAction')
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}