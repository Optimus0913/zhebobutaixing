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
        <div id="main" style="width: 100%; height: 500px"></div>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import e from "echarts";
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
  mounted() {
    let echars = e.init(document.getElementById("main"));
    var option = {
      backgroundColor: "#2c343c",

      title: {
        text: "总来访量",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc",
        },
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 274, name: "联盟广告" },
            { value: 235, name: "视频广告" },
            { value: 400, name: "搜索引擎" },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    };
    echars.setOption(option);
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
