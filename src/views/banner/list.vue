<template>
  <div>
    <template>
      <el-table
        :data="bannerlist"
        border
        style="width: 100%"
        row-key="id"
        default-expand-all
      >
        <el-table-column prop="id" label="分类编号" width="180">
        </el-table-column>
        <el-table-column prop="title" label="分类名称" width="180">
        </el-table-column>
        <el-table-column label="图片" width="180">
          <template slot-scope="item">
            <div>
              <img class="img" :src="$imgurl + item.row.img" />
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
    </template>
  </div>
</template>


<script>
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
import { getBannerdelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      bannerlist: "banner/getBannerlist",
    }),
  },
  mounted() {
    this.getBannerAction();
  },
  methods: {
    ...mapActions({
      getBannerAction: "banner/getBannerAction",
    }),
    del(id) {
      this.$confirm("确实删除？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getBannerdelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getBannerAction();
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
.img {
  width: 100px;
  height: 100px;
}
</style>
