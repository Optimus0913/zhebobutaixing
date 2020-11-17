<template>
  <div>
    <!-- <h1>菜单管理</h1> -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>
    <!-- 表格渲染 -->
    <list @edit="edit"></list>
    <!-- 弹框 -->
    <atable :addInfo="addInfo" @fdel="fdel" ref="dialog"></atable>
  </div>
</template>

<script>
import elBread from "@/components/el-bread";
import list from "@/views/menu/list";
import atable from "@/views/menu/add";
export default {
  data() {
    return {
      addInfo: {
        ishow: false, //判断弹框是否出现
        isAdd: true, //判断弹框是添加还是编辑
      },
    };
  },
  components: {
    elBread,
    list,
    atable,
  },
  methods: {
    isAdd() {
      this.addInfo.ishow = true;
      this.addInfo.isAdd = true;
    },
    fdel(e) {
      this.addInfo.ishow = e;
    },
    edit(e) {
      // console.log(e);
      //一触发就修改弹框状态
      this.addInfo.ishow = true;
      this.addInfo.isAdd = false;
      //获取弹框的函数
      // console.log(this.$refs.dialog);
      this.$refs.dialog.look(e);
    },
  },
};
</script>

<style lang="" scoped>
.el-button {
  margin-bottom: 5px;
}
</style>
