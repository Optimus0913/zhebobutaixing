<template>
  <div>
    <!-- <h1>管理员管理</h1> -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="add">添加</el-button>
    <!-- 列表 -->
    <rlist @edit="edit"></rlist>
    <!-- 弹框 -->
    <atable :addInfo="addInfo" @del="del" ref="dialog"></atable>
  </div>
</template>

<script>
import elBread from "@/components/el-bread";
import rlist from "@/views/cate/list";
import atable from "@/views/cate/add";
export default {
  data() {
    return {
      addInfo: {
        ishow: false,
        isAdd: true,
      },
    };
  },
  components: {
    elBread,
    rlist,
    atable,
  },
  methods: {
    //添加弹框
    add() {
      this.addInfo.ishow = true;
      this.addInfo.isAdd = true;
    },
    //取消弹框
    del(e) {
      this.addInfo.ishow = e;
    },
    edit(e) {
      this.addInfo.ishow = true;
      this.addInfo.isAdd = false;
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
