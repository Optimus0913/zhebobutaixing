<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加规格' : '编辑规格'"
      :visible.sync="addInfo.ishow"
      center
      :before-close="del"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="gui"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button @click="cancel(index)" type="danger" v-else
            >删除</el-button
          >
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
import loginVue from "../../pages/login.vue";
import { getSpecsadd, getSpecsedit, getSpecsinfo } from "../../util/axios";
export default {
  data() {
    return {
      arrAttr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  methods: {
    //增加属性
    addAttr() {
      if (this.arrAttr.length <= 5) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("不能继续添加");
      }
    },
    //删除某条数据
    cancel(idx) {
      // console.log(this.arrAttr);
      // console.log(idx);
      this.arrAttr.splice(idx, 1);
    },
    //清除数据
    reset() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
      //清空树结构框
    },
    del() {
      this.$emit("del", false);
      this.reset();
    },
    //调取行动
    ...mapActions({
      getSpecslist: "specs/getSpecsAction",
      getSpecscount: "specs/getCountAction",
    }),

    add() {
      // this.form.attrs = this.arrAttr.value;
      let newarr = this.arrAttr.map((item) => {
        return item.value;
      });
      this.form.attrs = newarr.join(",");
      getSpecsadd(this.form)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.getSpecslist();
            this.getSpecscount();
            this.del();
          } else {
            this.$message.error(res.date.msg);
          }
        })
        .catch((err) => {});
    },
    update() {
      let newarr = this.arrAttr.map((item) => {
        return item.value;
      });
      this.form.attrs = newarr.join(",");
      getSpecsedit(this.form)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.getSpecslist();
            this.getSpecscount();
            this.del();
          } else {
            this.$message.error(res.date.msg);
          }
        })
        .catch((err) => {});
    },
    //查看一条事件
    look(id) {
      getSpecsinfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, idx) => {
            if (idx == 0) {
              //如果索引是0，强制匹配第一项！
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item,
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.gui {
  width: 300px;
  margin-right: 30px;
}
</style>
