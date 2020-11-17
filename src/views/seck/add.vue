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
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changecate(false)"
          >
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changeGoods()"
          >
            <el-option
              v-for="item in secondarr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsarr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
import {
  getGoodslist,
  getSeckadd,
  getSeckedit,
  getSeckinfo,
} from "../../util/axios";
export default {
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      timer: "",
      //二级分类数组
      secondarr: [],
      //三级分类数组
      goodsarr: [],
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      secklist: "seck/getSecklist",
      catelist: "cate/getCatelist",
    }),
  },
  //减少对服务器的交互
  mounted() {
    this.getCatelist();
  },
  props: ["addInfo"],
  methods: {
    //一级分类事件
    changecate(n) {
      let index = this.catelist.findIndex((item) => {
        // console.log(item.id);
        // console.log(this.form.first_cateid);
        return item.id == this.form.first_cateid;
      });
      console.log(index);
      this.secondarr = this.catelist[index].children;
      //清空二级双向数据绑定还要清空三级
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    //点击二级分类出现产品
    changeGoods(n) {
      getGoodslist({
        fis: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsarr = res.data.list;
          if (!n) {
            this.form.goodsid = "";
          }
        }
        console.log(res.data.list);
      });
    },

    //清除数据
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.timer = "";
    },
    del() {
      this.$emit("del", false);
      this.reset();
    },
    //调取行动
    ...mapActions({
      getSecklist: "seck/getSeckAction",
      getCatelist: "cate/getCatelistAction",
    }),

    add() {
      //给开始时间和结束事件赋值
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      console.log(this.form, "表单信息");
      //调取添加接口
      getSeckadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getSecklist();
          //关闭弹框
          this.del();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update() {
      //调取添加接口
      getSeckedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getSecklist();
          //关闭弹框
          this.del();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条事件
    look(id) {
      getSeckinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.timer = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          // 清空之前的双向数据绑定
          this.changecate(true);
          this.changeGoods(true);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
