<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#37455F"
      text-color="#fff"
      active-text-color="skyblue"
      router
      unique-opened
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in getUserinfo.menus"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          :index="items.url"
          v-for="items in item.children"
          :key="items.id"
        >
          <span slot="title">{{ items.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    // console.log(this.$route);
    this.defaultActive = this.$route.path;
  },
  computed: {
    ...mapGetters(["getUserinfo"]),
  },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: 90vh;
}
</style>
