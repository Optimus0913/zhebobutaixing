<template>
  <div>
    <template>
      <el-table :data="secklist" border style="width: 100%">
        <el-table-column prop="title" label="活动名称" width="180">
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
              <el-button type="info" @click="edit(item.row.id)">编辑</el-button>
              <el-button type="danger" @click="del(item.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>


<script>
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
import { getSeckdelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      secklist: "seck/getSecklist",
    }),
  },
  // mounted() {
  //   this.getSeckAction();
  // },
  methods: {
    ...mapActions({
      getSeckAction: "seck/getSeckAction",
    }),
    del(id) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getSeckdelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getSeckAction();
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
    //编辑传id
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
</style>
