<template>
  <div>
    <el-dialog
      title="编辑会员"
      :visible.sync="addInfo.ishow"
      center
      :before-close="del"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码 " :label-width="formLabelWidth">
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
        <!-- <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >添 加</el-button
        > -->
        <el-button type="primary" @click="update">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMemberlist, getMemberedit, getMemberinfo } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在 11个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      memberlist: "member/getMembetlist",
    }),
  },
  //减少对服务器的交互
  // mounted() {
  //   if (this.memberlist.length == 0) {
  //     this.getMemberlist();
  //   }
  // },
  props: ["addInfo"],
  methods: {
    //清除数据
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
    },
    del() {
      this.$emit("del", false);
      this.reset();
    },
    //调取行动
    ...mapActions({
      getMemberlist: "member/getMemberAction",
    }),
    // add() {
    //   // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
    //   // this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
    //   getMemberadd(this.form).then((res) => {
    //     if (res.data.code == 200) {
    //       this.$message.success(res.data.msg);
    //       this.getMemberlist();
    //       this.del();
    //     } else {
    //       this.$message.error(res.data.msg);
    //     }
    //   });
    //   console.log(this.form);
    // },
    update() {
      // this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      getMemberedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getMemberlist();
          this.del();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条事件
    look(id) {
      getMemberinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // this.form.menus = this.$refs.tree.setCheckedKeys(
          //   // JSON.parse(this.form.menus)
          //   this.form.menus.split(",")
          // );
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
