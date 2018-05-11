<template>
  <div class="createClass_container">
    <el-row class="title">
      <el-col v-if="this.type === '1'" :span="24"><div class="grid-content bg-purple-dark">新建课程</div></el-col>
      <el-col v-else :span="24"><div class="grid-content bg-purple-dark">编辑课程</div></el-col>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="margin-top: 20px">

      <el-form-item label="应用教材" prop="bookId">
        <el-select v-model="ruleForm.bookId" placeholder="选择教材">
          <el-option
            v-for="item in bookList"
            :key="item.bookId"
            :label="item.bookName"
            :value="item.bookId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程模式" prop="name">
        <el-select v-model="ruleForm.category" placeholder="选择教材">
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程名称" prop="name">
        <el-input style="width: 200px;" v-model="ruleForm.name" placeholder="由教材+模式组合而成"></el-input>
      </el-form-item>

      <el-form-item label="学习周数" prop="weekNum">
        <el-input style="width: 200px;" v-model="ruleForm.weekNum" placeholder="由教材+模式组合而成"></el-input>
      </el-form-item>

      <el-form-item label="适用人群" prop="goalCrowd">
        <el-input type="textarea" :rows="4" v-model="ruleForm.goalCrowd" style="width: 600px;"></el-input>
      </el-form-item>

      <el-form-item label="学习目标" prop="learningGoal">
        <el-input type="textarea" :rows="8" v-model="ruleForm.learningGoal" style="width: 600px;"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="btnBack">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: 1, // type为1：新增课程，为2：编辑课程
        ruleForm: {
          bookId: '', // 应用教材
          category: '1', // 课程模式（教学横版、教学规划）
          name: '', // 课程名称
          weekNum: '', // 学习周数
          learningGoal: '', // 学习目标
          goalCrowd: '' // 适用人群
        },
        rules: {
          bookId: [
            { required: false, message: '请选择教材', trigger: 'blur' }
          ],
          name: [
            { required: false, message: '教材名称、单元名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          learningGoal: [
            { required: false, message: '请填写学习目标', trigger: 'blur' }
          ],
          goalCrowd: [
            { required: false, message: '请填写适用人群', trigger: 'blur' }
          ]
        },
        bookList: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        categoryList: [
          {
            value: '1',
            label: '教学横版'
          },
          {
            value: '2',
            label: '教学规划'
          }
        ]
      }
    },
    created() {
      this.getBookList()
      this.typeFun()
    },
    methods: {
      // 获取教材下拉框数据
      getBookList() {
        this.$api.get('/base/bookunitlist/2', null, r => {
          console.log(r)
          this.bookList = r.result
        })
      },
      typeFun() {
        this.type = this.$route.params.type
        // this.courseObj = this.$route.params.courseObj
        this.ruleForm = JSON.parse(this.$route.params.courseObj)
        // console.log(this.$route.params.courseObj)
      },
      btnBack() {
        this.$router.push('course')
      },
      submitForm(formName) {
        console.log(this.ruleForm)
        if (this.type === '1') {
          this.$api.post('/plan', this.ruleForm, r => {
            console.log(r)
            this.$router.push({ name: 'course' })
          })
        } else if (this.type === '2') {
          this.$api.put('/plan', this.ruleForm, r => {
            console.log(r)
            // this.$router.push('course')
            this.$router.push({ name: 'course' })
          })
        }
      },
      // 三级联动框方法
      handleChange(value) {
        console.log(value)
      }
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
  }
</style>
