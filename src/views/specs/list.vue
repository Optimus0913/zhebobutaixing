<template>
  <div>
    <template>
      <el-table :data="specslist" border style="width: 100%">
        <el-table-column prop="id" label="规格编号" width="180">
        </el-table-column>
        <el-table-column prop="specsname" label="规格名称" width="180">
        </el-table-column>
        <el-table-column label="规格属性" width="180">
          <template slot-scope="item">
            <div>
              <el-tag
                type="success"
                v-for="items in item.row.attrs"
                :key="items"
                >{{ items }}</el-tag
              >
            </div>
          </template>
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
      <!-- 分页列表 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="specscount"
        :page-size="specssize"
        @current-change="currentchange"
      >
      </el-pagination>
    </template>
  </div>
</template>


<script>
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
import { getSpecsdelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specslist: "specs/getSpecslist",
      specscount: "specs/getSpecscount",
      specssize: "specs/getSpecsSize",
    }),
  },
  mounted() {
    this.getSpecsAction();
    this.getSpecsCount();
  },
  methods: {
    ...mapActions({
      getSpecsAction: "specs/getSpecsAction",
      getSpecsCount: "specs/getCountAction",
      //调取总条数
      changepageAaction: "specs/changepageAaction",
    }),
    del(id) {
      this.$confirm("确实删除？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsdelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecsAction();
              this.getSpecsCount();
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
      // console.log(e);
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
