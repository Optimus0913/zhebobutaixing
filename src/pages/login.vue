<template>
  <div class="login">
    <el-form
      :model="userlist"
      :rules="rules"
      ref="userlist"
      label-width="100px"
      class="userlist"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userlist.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="userlist.password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login('userlist')" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getUserlogin } from "../util/axios";
export default {
  data() {
    return {
      userlist: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3 到 12个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // console.log(this.userlist);
          getUserlogin(this.userlist).then((res) => {
            if (res.data.code == 200) {
              console.log(res);
              this.$message.success(res.data.msg);
              // sessionStorage.setItem("userInfo", JSON.stringify(res.data.list));
              this.changeUserInfoAction(res.data.list);
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: $fristBgColor;

  .userlist {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 4px;
    margin: -110px 0 0 -200px;
    width: 400px;
    height: 220px;
    padding: 35px 10px;
    background: skyblue;
  }

  .el-button {
  }
}</style>
