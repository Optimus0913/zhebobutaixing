<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="addInfo.ishow"
      center
      :before-close="del"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import { getUseradd, getUseredit, getUserinfo } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      rolelist: "role/getRolelist",
      userlist: "user/getUserlist",
    }),
  },
  //减少对服务器的交互
  mounted() {
    if (this.rolelist.length == 0) {
      this.getRolelist();
    }
  },
  props: ["addInfo"],
  methods: {
    //清除数据
    reset() {
      this.form = {
        roleid: "",
        uesrname: "",
        password: "",
        status: 1,
      };
      //清空树结构框
    },
    del() {
      this.$emit("del", false);
      this.reset();
    },
    //调取行动
    ...mapActions({
      getRolelist: "role/getRoleAction",
      getUserlist: "user/getUserAction",
      getUsercount: "user/getCountAction",
    }),

    add() {
      getUseradd(this.form)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.getUserlist();
            this.getUsercount();
            this.del();
          } else {
            this.$message.error(res.date.msg);
          }
        })
        .catch((err) => {});
    },
    update(uid) {
      getUseredit(this.form)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.getUserlist();
            this.getUsercount();
            this.del();
          } else {
            this.$message.error(res.date.msg);
          }
        })
        .catch((err) => {});
    },
    //查看一条事件
    look(uid) {
      getUserinfo({ uid }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
