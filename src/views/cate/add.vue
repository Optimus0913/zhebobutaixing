<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.ishow"
      center
      :before-close="del"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">
              <el-option
                v-for="item in catelist"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              >
              </el-option>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onchange"
            :file-list="filelist"
            :on-exceed="onexceed"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
        <el-button
          type="primary"
          @click="add('formDialog')"
          v-if="addInfo.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update('formDialog')" v-else
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCateadd, getCateedit, getCateinfo } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      //预览图片地址
      dialogImageUrl: "",
      dialogVisible: false,
      imgurl: "", //用来接收图片信息
      filelist: [],
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/getCatelist",
    }),
  },
  // //减少对服务器的交互
  // mounted() {
  //   if (this.catelist.length == 0) {
  //     this.getCatelist();
  //   }
  // },
  props: ["addInfo"],
  methods: {
    //图片上传
    onchange(file) {
      console.log(file);
      this.imgurl = file.raw;
    },
    //图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移出
    onRemove(file, filelist) {},
    //文件上传限制
    onexceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //清除数据
    reset() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
    },
    del() {
      this.$emit("del", false);
      this.reset();
    },
    //调取行动
    ...mapActions({
      getCatelist: "cate/getCatelistAction",
    }),

    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          console.log(this.form);
          let data = this.form;
          let file = new FormData(); //通过append添加属性,get取值
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgurl);
          getCateadd(file).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.del();
              // //重新获取列表
              this.getCatelist();
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
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          // console.log(this.form);
          let data = this.form;
          let file = new FormData(); //通过append添加属性,get取值
          for (let i in data) {
            file.append(i, data[i]);
          }
          //如果新添加了图片this.imgurl就有值，就赋值给this.imgurl.如果没有添加就是用上一次的图片
          this.imgurl = this.imgurl ? this.imgurl : this.form.img;
          file.append("img", this.imgurl);
          getCateedit(file).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.del();
              // //重新获取列表
              this.getCatelist();
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
    //查看一条事件
    look(id) {
      getCateinfo({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.filelist = this.form.img
            ? [{ url: `${this.$imgurl}${this.form.img}` }]
            : [];
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
