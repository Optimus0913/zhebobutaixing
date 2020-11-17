// 引入重新封装的axios实例
import http from './axios'
//封装菜单添加接口
export function getMenuAdd(data) {
    return http.post('/api/menuadd', data)
}
//封装菜单列表接口 
export function getMenuList(params) {
    return http.get('/api/menulist', {
        params
    })
}
//封装菜单获取一条数据
export function getMenuinfo(params) {
    return http.get('/api/menuinfo', {
        params
    })
}
//封装菜单修改接口
export function getMenuedit(data) {
    return http.post('/api/menuedit', data)
}

//封装菜单删除接口
export function getMenuDelete(data) {
    return http.post('/api/menudelete', data)
}

//封装角色添加接口
export function getRoleadd(data) {
    return http.post('/api/roleadd', data)
}
//封装角色列表接口
export function getRolelist(params) {
    return http.get('/api/rolelist', {
        params
    })
}
//封装角色获取一条接口
export function getRoleinfo(params) {
    return http.get('/api/roleinfo', {
        params
    })
}
//封装角色修改接口
export function getRoleedit(data) {
    return http.post('/api/roleedit', data)
}
//封装角色删除接口

export function getRoledelete(data) {
    return http.post('/api/roledelete', data)
}



//封装管理员添加接口
export function getUseradd(data) {
    return http.post('/api/useradd', data)
}

//封装管理员总数（用于计算分页）
export function getUsercount() {
    return http.get('/api/usercount')
}

//封装管理员列表(分页)
export function getUserlist(params) {
    return http.get('/api/userlist', {
        params
    })
}

//封装管理员获取（一条）
export function getUserinfo(params) {
    return http.get('/api/userinfo', {
        params
    })
}
//封装管理员修改
export function getUseredit(data) {
    return http.post('/api/useredit', data)
}

//封装管理员删除
export function getUserdelete(data) {
    return http.post('/api/userdelete', data)
}

//封装管理员登录
export function getUserlogin(data) {
    return http.post('/api/userlogin', data)
}



//封装商品分类添加接口
export function getCateadd(data) {
    return http.post('/api/cateadd', data)
}

//封装商品分类列表
export function getCatelist(params) {
    return http.get('/api/catelist', {
        params
    })
}

//封装商品一条获取
export function getCateinfo(params) {
    return http.get('/api/cateinfo', {
        params
    })
}

//封装商品分类修改
export function getCateedit(data) {
    return http.post('/api/cateedit', data)
}

//封装商品分类删除
export function getCatedelete(data) {
    return http.post('/api/catedelete', data)
}


// 封装商品规格添加
export function getSpecsadd(data) {
    return http.post('/api/specsadd', data)
}

//封装商品规格总数
export function getSpecscount() {
    return http.get('/api/specscount')
}

//封装商品规格列表
export function getSpecslist(params) {
    return http.get('/api/specslist', {
        params
    })
}
//商品规格一条
export function getSpecsinfo(params) {
    return http.get('/api/specsinfo', {
        params
    })
}
//商品规格修改
export function getSpecsedit(data) {
    return http.post('/api/specsedit', data)
}

//商品规格删除
export function getSpecsdelete(data) {
    return http.post('/api/specsdelete', data)
}


//轮播图添加
export function getBanneradd(data) {
    return http.post('/api/banneradd', data)
}

//轮播图列表
export function getBannerlist() {
    return http.get('/api/bannerlist')
}

//轮播图获取一条
export function getBannerinfo(params) {
    return http.get('/api/bannerinfo', {
        params
    })
}

//轮播图修改
export function getBanneredit(data) {
    return http.post('/api/banneredit', data)
}

//轮播图删除
export function getBannerdelete(data) {
    return http.post('/api/bannerdelete', data)
}


//封装会员列表
export function getMemberlist() {
    return http.get('/api/memberlist')
}

//封装会员获取
export function getMemberinfo(param) {
    return http.get('/api/memberinfo', {
        params
    })
}

//封装会员修改
export function getMemberedit(data) {
    return http.post('/api/memberedit', data)
}



//封装限时秒杀添加
export function getSeckadd(data) {
    return http.post('/api/seckadd', data)
}

//封装限时秒杀列表
export function getSecklist() {
    return http.get('/api/secklist')
}

//封装限时秒杀获取一条
export function getSeckinfo(params) {
    return http.get('/api/seckinfo', {
        params
    })
}

//封装限时秒杀修改
export function getSeckedit(data) {
    return http.post('/api/seckedit', data)
}

//封装限时秒杀删除
export function getSeckdelete(data) {
    return http.post('/api/seckdelete', data)
}


//封装商品添加
export function getGoodsadd(data) {
    return http.post('/api/goodsadd', data)
}

//封装商品总数
export function getGoodscount() {
    return http.get('/api/goodscount')
}

//封账商品列表
export function getGoodslist(params) {
    return http.get('/api/goodslist', {
        params
    })
}

//封装商品获取一条
export function getGoodsinfo(params) {
    return http.get('/api/goodsinfo', {
        params
    })
}

//封装商品修改
export function getGoodsedit(data) {
    return http.post('/api/goodsedit', data)
}
//封装商品删除
export function getGoodsdelete(data) {
    return http.post('/api/goodsdelete', data)
}