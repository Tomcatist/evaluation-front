<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="申请人" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入申请人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所在系部" prop="deptName">
        <el-select v-model="queryParams.deptName" placeholder="请选择系部" clearable>
          <el-option
            v-for="(item,index) in deptNameList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申报类型" prop="applyType">
        <el-select v-model="queryParams.applyType" placeholder="请选择申报类型" clearable>
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="applicationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="申请人" align="center" prop="userName" />
      <el-table-column label="所属系部" align="center" prop="deptName" />
      <el-table-column label="申报题目" align="center" prop="applyName" />
      <el-table-column label="申报类型" align="center" prop="applyType" />
      <el-table-column label="一级分类" align="center" prop="firstLevelType" />
      <el-table-column label="二级分类" align="center" prop="secondLevelType" :formatter="secondLevelTypeFormat"/>
      <el-table-column label="三级分类" align="center" prop="thirdLevelType" :formatter="thirdLevelTypeFormat"/>
      <el-table-column label="分数" align="center" prop="scores" />
<!--      <el-table-column label="申报内容" align="center" prop="applyContent" />-->
<!--      <el-table-column label="证明材料" align="center" prop="applyLink" />-->
<!--      <el-table-column label="备注" align="center" prop="applyMark" />-->
      <el-table-column label="申报结果" align="center" prop="applyResultName" />
      <el-table-column label="申报时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--          >审核</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="申报题目" prop="applyName">
          <el-input v-model="form.applyName" placeholder="请输入申报题目" />
        </el-form-item>
        <el-form-item label="申报类型id" prop="applyTypeId">
          <el-input v-model="form.applyTypeId" placeholder="请输入申报类型id" />
        </el-form-item>
        <el-form-item label="申报内容" prop="applyContent">
          <el-input v-model="form.applyContent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="证明材料">
          <file-upload v-model="form.applyLink"/>
        </el-form-item>
        <el-form-item label="备注" prop="applyMark">
          <el-input v-model="form.applyMark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="申报结果" prop="applyResult">
          <el-input v-model="form.applyResult" placeholder="请输入申报结果" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改申请对话框 -->
    <el-dialog :title="title" :visible.sync="updateOpen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="申报结果" prop="applyResult">
<!--          <el-input v-model="form.applyResult" placeholder="请输入申报结果" />-->
          <el-radio v-model="form.applyResult" label="1">申报成功</el-radio>
          <el-radio v-model="form.applyResult" label="2">申报失败</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listApplication, getApplication, delApplication, addApplication, updateApplication, getDeptName, getType } from "@/api/application/applicationSta";

export default {
  name: "Application",
  data() {
    return {
      radio: '1',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 申请表格数据
      applicationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      deptNameList: [],
      typeList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userName: null,
        deptName: null,
        applyName: null,
        firstLevelType: null,
        secondLevelType: null,
        thirdLevelType: null,
        scores: null,
        applyType: null,
        applyTypeId: null,
        applyContent: null,
        applyLink: null,
        applyMark: null,
        applyResult: null,
        applyResultName: null,
        createTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    getDeptName().then(response => {
      this.deptNameList = response
    })
    getType().then(response => {
      this.typeList = response
    })
  },
  methods: {
    /** 查询申请列表 */
    getList() {
      this.loading = true;
      listApplication(this.queryParams).then(response => {
        this.applicationList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.updateOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        applyName: null,
        applyType: null,
        applyTypeId: null,
        applyContent: null,
        applyLink: null,
        applyMark: null,
        applyResult: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids

      getApplication(id).then(response => {
        this.form = response.data;
        this.updateOpen = true;
        this.title = "修改申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateApplication(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.updateOpen = false;
              this.getList();
            });
          } else {
            addApplication(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除申请编号为"' + ids + '"的数据项？').then(function() {
        return delApplication(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('application/application/export', {
        ...this.queryParams
      }, `application_${new Date().getTime()}.xlsx`)
    },
    // 类型格式化
    thirdLevelTypeFormat (row) {
      let showProp = null
      row.thirdLevelType ? showProp = row.thirdLevelType : showProp = '---'
      return showProp
    },
    // 类型格式化
    secondLevelTypeFormat(row) {
      let showProp = null
      row.thirdLevelType ? showProp = row.thirdLevelType : showProp = '---'
      return showProp
    },
  }
};
</script>
