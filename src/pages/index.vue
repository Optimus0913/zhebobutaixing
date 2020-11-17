<template>
  <div>
    <el-container>
      <el-header>
        <h2>阿巴阿巴</h2>
        <div>
          <h3>用户：{{ getUserinfo.username }}</h3>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px"><navv></navv></el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navv from "@/components/nav";
export default {
  data() {
    return {};
  },
  components: {
    navv,
  },
  computed: {
    ...mapGetters(["getUserinfo"]),
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    logout() {
      this.changeUserInfoAction(null);
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background: #11EFA8;
}

.el-header h2 {
  float: left;
  font: 36px / 60px '微软雅黑';
  color: #11A1EF;
}

.el-header div {
  float: right;
  display: flex;
}

.el-header h3 {
  font: 24px '微软雅黑';
  margin-top: 10px;
  margin-right: 5px;
}

.el-header .el-button {
  margin-top: 10px;
}
</style>
