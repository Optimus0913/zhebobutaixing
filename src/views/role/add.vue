<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.ishow"
      center
      :before-close="del"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            check-strictly
            show-checkbox
            :data="menulist"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="del">取 消</el-button>
        <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoleadd, getRoleedit, getRoleinfo } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/getMenuList",
    }),
  },
  //减少对服务器的交互
  mounted() {
    if (this.menulist.length == 0) {
      this.getMenulist();
    }
  },
  props: ["addInfo"],
  methods: {
    //清除数据
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      //清空树结构框
      this.$refs.tree.setCheckedKeys([]);
    },
    del() {
      this.$emit("del", false);
      this.reset();
    },
    //调取行动
    ...mapActions({
      getMenulist: "menu/getMenulistAction",
    }),
    ...mapActions({
      getRolelist: "role/getRoleAction",
    }),
    add() {
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      getRoleadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRolelist();
          this.del();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      console.log(this.form);
    },
    update(formName) {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      getRoleedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRolelist();
          this.del();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条事件
    look(id) {
      getRoleinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.menus = this.$refs.tree.setCheckedKeys(
            // JSON.parse(this.form.menus)
            this.form.menus.split(",")
          );
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
