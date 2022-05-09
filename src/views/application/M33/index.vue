<template>
  <div class="app-container">
    <h1>M33:发表教研科研论文评价标准</h1>
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
        <el-select v-model="formData.secondLevelType" placeholder="请选择" clearable @change="changeSelect1">
          <el-option
            v-for="(item,index) in secondLevelOptions"
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
        <el-upload ref="applyLink" :file-list="applyLinkfileList" :action="applyLinkAction"
                   :before-upload="applyLinkBeforeUpload">
          <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传不超过 2MB 的文件</div>
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
import { getFirstLevel, getSecondLevel, apply } from "@/api/application/M33";


export default {
  components: {},
  props: [],
  data() {
    return {
      firstLevelOptions: [],
      secondLevelOptions: [],
      thirdLevelOptions: [],
      formData: {
        applyName: undefined,
        firstLevelType:[],
        secondLevelType:[],
        applyContent: undefined,
        applyMark: undefined,
        applyLink: null,
        applyType:"M33",
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
        thirdLevelType: [{
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
        applyType:"M33",
      };
      this.resetForm("formData");
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
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
        this.secondLevelOptions = response
      })
    }
  },
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>

