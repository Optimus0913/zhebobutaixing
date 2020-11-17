<template>
  <div>
    <template>
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column prop="uid" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名称" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="item">
            <div>
              <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
              <el-tag type="danger" v-else>禁用</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="item">
            <div>
              <el-button type="info" @click="edit(item.row.uid)"
                >编辑</el-button
              >
              <el-button type="danger" @click="del(item.row.uid)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页列表 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="usercount"
        :page-size="usersize"
        @current-change="currentchange"
      >
      </el-pagination>
    </template>
  </div>
</template>


<script>
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
import { getUserdelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userlist: "user/getUserlist",
      usercount: "user/getUsercount",
      usersize: "user/getUserSize",
    }),
  },
  mounted() {
    this.getUserAction();
    this.getUserCount();
  },
  methods: {
    ...mapActions({
      getUserAction: "user/getUserAction",
      getUserCount: "user/getCountAction",
      //调取总条数
      changepageAaction: "user/changepageAaction",
    }),
    del(uid) {
      this.$confirm("确实删除？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserdelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserAction();
              this.getUserCount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装切换页码事件
    currentchange(e) {
      console.log(e);
      this.changepageAaction(e);
    },
    //编辑传id
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
.el-pagination {
  float: right;
  margin: 20px 30px 0 0;
}
</style>
