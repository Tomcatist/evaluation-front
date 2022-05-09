<template>
  <div class="app-container">
    <h1>M31:教学竞赛评价标准申报</h1>
    <br>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
      label-position="left">
      <el-form-item label="申报题目" prop="applyName">
        <el-input v-model="formData.applyName" placeholder="请输入申报题目" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="一级分类" prop="firstLevelType">
        <el-select v-model="formData.firstLevelType" placeholder="请选择" clearable @change="changeSelect">
          <el-option
            v-for="(item,index) in firstLevelOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="二级分类" prop="secondLevelType">
        <el-select v-model="formData.secondLevelType" placeholder="请选择" clearable>
          <el-option
            v-for="(item,index) in myOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="申报内容" prop="applyContent">
        <el-input v-model="formData.applyContent" type="textarea" placeholder="请输入申报内容"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="applyMark">
        <el-input v-model="formData.applyMark" type="textarea" placeholder="请输入备注"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="证明材料" prop="applyLink" required>
        <el-upload
          ref="upload"
          :limit="1"
          accept=".rar, .zip"
          :action="upload.url"
          :headers="upload.headers"
          :file-list="upload.fileList"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" :loading="upload.isUploading" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传rar/zip文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getFirstLevel, getSecondLevel, apply } from "@/api/application/M31";
import { getToken } from "@/utils/auth";
export default {
  components: {},
  props: [],
  data() {
    return {
      // 上传参数
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/common/upload",
        // 上传的文件列表
        fileList: []
      },
      firstLevelOptions: [],
      secondLevelOptions: {},
      myOptions:[],
      formData: {
        applyName: undefined,
        firstLevelType:[],
        secondLevelType:[],
        applyContent: undefined,
        applyMark: undefined,
        applyLink: null,
        applyType:"M31",
      },
      rules: {
        applyName: [{
          required: true,
          message: '请输入申报题目',
          trigger: 'blur'
        }],
        firstLevelType: [{
          required: true,
          message: '请选择申报分类',
          trigger: 'change'
        }],
        secondLevelType: [{
          required: true,
          message: '请选择申报分类',
          trigger: 'change'
        }],
        applyContent: [{
          required: true,
          message: '请输入申报内容',
          trigger: 'blur'
        }],
        applyMark: [],
      },
      applyLinkAction: 'https://jsonplaceholder.typicode.com/posts/',
      applyLinkfileList: [],
      typeOptions: [],
      typeProps: {
        "multiple": false
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    getFirstLevel().then(response => {
      this.firstLevelOptions = response
    })
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) {
          apply(this.formData).then(response => {
            this.$message.success("提交成功！")
            this.reset();
          }).catch(() => {});
        }

      })
    },
    // 表单重置
    reset() {
      this.form = {
        applyName: null,
        firstLevelType:null,
        secondLevelType:null,
        applyContent: null,
        applyMark: null,
        applyLink: null,
        applyType:"M31",
      };
      this.resetForm("formData");
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    getTypeOptions() {
      // TODO 发起请求获取数据
      getFirstLevel().then(response => {
        this.formData.type = response.data
      })
    },
    applyLinkBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
    changeSelect() {
      this.formData.secondLevelType = ''
      getSecondLevel(this.formData.firstLevelType).then(response => {
        console.log(response)
        this.myOptions = response
      })
      },
    // 文件提交处理
    submitUpload() {
      this.$refs.upload.submit();
    },
// 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
// 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.isUploading = false;
      this.form.filePath = response.url;
      this.msgSuccess(response.msg);
    }
    },

}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
