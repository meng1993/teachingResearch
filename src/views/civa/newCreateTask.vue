<template>
  <div class="createClass_container">
    <el-row class="title">
      <el-col v-if="ruleForm.stepContent === undefined" :span="24"><div class="grid-content bg-purple-dark">新建Task</div></el-col>
      <el-col v-else :span="24"><div class="grid-content bg-purple-dark">编辑Task</div></el-col>
    </el-row>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="margin-top: 20px">
      <!--应用教学周-->
      <el-form-item label="应用教学周" prop="week">
        <el-input v-model="ruleForm.week" disabled style="width:300px"></el-input>
      </el-form-item>
      <!--场景-->
      <el-row :gutter="40" style="margin-right: 0;">
        <el-col :span="6">
          <el-form-item label="场景" prop="scenes" class="scenes">
            <el-select v-model="ruleForm.scenes" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" align="middle">
            时长占比:
            <el-col :span="18" style="margin-left: 15px">
              <div class="block">
                <el-slider
                  v-model="ruleForm.duration"
                  show-input>
                </el-slider>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!--模块-->
      <el-form-item label="模块" prop="module" class="scenes">
        <el-select v-model="ruleForm.module" placeholder="请选择">
          <el-option
            v-for="item in moduleList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--线下资源-->
      <el-form-item label="线下资源" prop="offlineResource">
        <el-input type="textarea" :rows="4" :maxlength="500" v-model="ruleForm.offlineResource" style="width: 600px;"></el-input>
      </el-form-item>
      <!--结果描述-->
      <el-form-item label="结果描述" prop="resultDescription">
        <el-input type="textarea" :rows="4" :maxlength="500" v-model="ruleForm.resultDescription" style="width: 600px;"></el-input>
      </el-form-item>

      <!--教学横版内容开始-->
      <careTeach></careTeach>
      <!--教学横版内容结束-->
      <el-form-item>
        <el-button type="primary" @click="btnBack">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
    <!--<el-row>-->
      <!--<el-button type="dashed" @click="handleAddResource(index)" icon="plus-round">添加步骤</el-button>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import careTeach from './civaConponent/createTask'
  // import careTeach from './civaConponent/demo'
  export default {
    data() {
      return {
        ruleForm: {
          week: '', // 应用教学周
          scenes: '', // 场景
          duration: '', // 时长占比
          module: '', // 模块
          offlineResource: '', // 线下资源
          resultDescription: '' // 结果描述
        },
        rules: {
          week: [
            { required: false, message: '教材名称、单元名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          scenes: [
            { required: false, message: '教材名称、单元名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          module: [
            { required: false, message: '教材名称、单元名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          offlineResource: [
            { required: false, message: '请填写教学目标', trigger: 'blur' }
          ],
          resultDescription: [
            { required: false, message: '请填写教学目标', trigger: 'blur' }
          ]
        },
        // 场景数据开始
        options: [
          {
            value: 'keqian',
            label: '课前'
          },
          {
            value: 'kezhong',
            label: '课中'
          },
          {
            value: 'kehou',
            label: '课后'
          }
        ],
        // 模块数据
        moduleList: [
          { label: '音标', value: 1 },
          { label: '词汇', value: 2 },
          { label: '句型', value: 3 },
          { label: '语篇', value: 4 },
          { label: '知识点', value: 5 },
          { label: '综合', value: 7 },
          { label: '在线练习', value: 9 },
          { label: '教学活动', value: 10 }
        ]
      }
    },
    components: {
      careTeach
    },
    created() {
      this.ruleForm = this.$route.query
      console.log(this.$route.query)
    },
    methods: {
      btnBack() {
        this.$router.push('care_teach_week')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
      // 教学横版
      // handleChange(val) {
      //   console.log(val)
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .createClass_container{
    padding: 0 10px;
    margin: 0;
    .title{
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 30px;
    }
    .demo-ruleForm{
      .scenes{
        /*width: 220px;*/
      }
    }
  }
</style>
