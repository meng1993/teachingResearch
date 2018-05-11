<template>
  <div class="createClass_container">
    <el-row class="title">
      <el-col :span="24"><div class="grid-content bg-purple-dark">维护教学周</div></el-col>
    </el-row>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="margin-top: 20px">
      <el-form-item label="应用教材" prop="name">
        <el-input v-model="ruleForm.name" :key="ruleForm.bookId" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="应用单元" prop="unitId">
        <el-select v-model="ruleForm.unitId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.unitId"
            :label="item.unitName"
            :value="item.unitId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model="ruleForm.number" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="教学内容" prop="teachingGoal">
        <el-input type="textarea" :rows="4" :maxlength="500" v-model="ruleForm.teachingGoal" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="教学重难点" prop="teachingDifficult">
        <el-input type="textarea" :rows="4" :maxlength="500" v-model="ruleForm.teachingDifficult" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" :rows="4" :maxlength="500" v-model="ruleForm.remarks" style="width: 600px;"></el-input>
      </el-form-item>
      <template v-if="taskListType">
        <el-form-item label="教学横版" prop="version">
          <el-button type="primary" @click="newTask">新建task</el-button>
        </el-form-item>
        <!--教学横版内容开始-->
        <careTeach v-bind:clueTaskList="clueTaskList"></careTeach>
        <!--教学横版内容结束-->
      </template>
      <el-form-item>
        <el-button type="primary" @click="btnBack">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import careTeach from './civaConponent/dragTable'
  export default {
    data() {
      return {
        clueTaskList: [],
        ruleForm: {
          name: '',
          bookId: '', // bookid
          unitId: '', // 单元id
          number: '1',
          teachingGoal: '', // 教学内容
          teachingDifficult: '', // 教学重难点
          remarks: '', // 备注
          id: '4bb282f5ce284d88951edfab73690331'
        },
        rules: {
          name: [
            { required: false, message: '教材名称、单元名称', trigger: 'blur' }
          ],
          unitId: [
            { required: true, message: '请选择单元', trigger: 'blur' }
          ],
          teachingGoal: [
            { required: true, message: '请填写教学目标', trigger: 'blur' }
          ],
          teachingDifficult: [
            { required: false, message: '请填写教学重难点', trigger: 'blur' }
          ],
          remarks: [
            { required: false, message: '请填写教学重难点', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '请填写教学重难点', trigger: 'blur' }
          ]
        },
        // 应用单元数据开始
        options: [
          {
            value: 'zhinan',
            label: '单元1'
          },
          {
            value: 'ziyuan',
            label: '单元2'
          }
        ],
        // 应用单元数据结束
        // 折叠面板
        taskListType: false
      }
    },
    components: {
      careTeach
    },
    created() {
      this.getMessage()
    },
    methods: {
      getMessage() {
        let bookId = this.$route.params.bookId // 教材id（用于请求下边表格列表数据）
        let clueId = this.$route.params.clueId // clueid
        let type = this.$route.params.type
        this.clueId = clueId
        if (type === '1') {
          this.taskListType = false
        } else if (type === '2') {
          this.taskListType = true
        }
        console.log('bookId-------->' + bookId + 'type--------->' + type + 'clueId-------->' + clueId)
        // 上边单元列表接口
        this.$api.get('/maintainWeek/' + bookId, null, r => {
          console.log(r)
          this.options = r.result.unitListVOs
          this.ruleForm.name = r.result.bookName
          this.ruleForm.bookId = r.result.bookId
          this.ruleForm.number = r.result.seqNo
        })
        // 下边task列表接口
        this.$api.get('/task/' + clueId, null, r => {
          console.log(JSON.stringify(r))
          let jj = r.result
          let hh = { stepContent: false }
          jj.forEach(todo => {
            Object.assign(todo.task, hh)
            console.log(todo)
          })
          this.clueTaskList = r.result
          // console.log(this.clueTaskList)
        })
      },
      btnBack() {
        this.$router.push({ 'name': 'course' })
      },
      submitForm(formName) {
        console.log(this.ruleForm)
        let type = this.$route.params.type
        if (type === '1') {
          this.$api.post('/clue', this.ruleForm, r => {
            console.log(r)
            this.$router.push({ 'name': 'course' })
          })
        } else if (type === '2') {
          this.$api.put('/clue', this.ruleForm, r => {
            console.log(r)
            this.$router.back(-1)
          })
        }
      },
      // 新建task
      newTask() {
        this.$router.push({ name: 'newCreateTask' })
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
