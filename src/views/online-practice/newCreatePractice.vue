<template>
  <div class='CreatePractice_container'>
      <el-form :model="Fileform" :rules="rules" ref="Fileform" label-width="80px">
        <el-form-item label="练习类型" >
            <el-switch v-model="Fileform.value"  active-color="#409EFF" inactive-color="#dcdfe6" active-text="套卷" inactive-text="单一"></el-switch>
            <ul class='list'>
                <li v-for='(item,index) in QuestionTypes' :key="index"
                 v-show='!Fileform.value'         
                 @click='Question(index)'
                 :class="{active: index == activeIndex}"
                 >{{item}}</li>
            </ul>
        </el-form-item>
        <el-form-item label="练习名称"  prop='exerciseName'>
             <el-col :span="8">
                 <el-input v-model="Fileform.exerciseName" clearable placeholder="请输入练习名称"></el-input>
             </el-col>
        </el-form-item>
        <el-form-item label="教材单元" prop='selectedOptions'>
            <el-col class="block" :span='4'>  
                <el-cascader placeholder="请选择"
                    :options="optionsSelect"
                    v-model="Fileform.selectedOptions"
                    @change="handleChange"
                    clearable
                    >
                </el-cascader>
            </el-col>
        </el-form-item>
        <el-form-item label="限制规则">
           <el-col :span="3">
                <el-switch v-model="Fileform.Timekeeping"  active-color="#409EFF" inactive-color="#dcdfe6" active-text="计时" inactive-text="倒计"></el-switch>
            </el-col>
            <el-col :span="1.9" style='font-weight:bold;color:#606266;margin-right:20px;'>练习状态</el-col>
                <!-- <el-col :span="2" style='font-weight:bold;color:#606266;'></el-col> -->
           <el-col :span="3">
                <el-switch v-model="Fileform.Enabled" active-color="#409EFF" inactive-color="#dcdfe6" active-text="已启用" inactive-text="未启"></el-switch>
            </el-col>
        </el-form-item>

         <el-form-item label="练习时间（秒/s）" size="10px"  prop='TrainingTime'>
           <el-col :span="2">
             <el-input v-model="Fileform.TrainingTime"  placeholder="练习时间" ></el-input>
           </el-col>
           <el-col :span="1.9" style='font-weight:bold;color:#606266;margin:0 20px;'>练习总分</el-col>
           <el-col :span="2">
             <el-input v-model="Fileform.PracticeScore"  placeholder="练习总分"></el-input>
           </el-col>
             <el-col :span="1.9" style='font-weight:bold;color:#606266;margin:0 20px;'>随机题数</el-col>
             <el-col :span="2">
             <el-input v-model="Fileform.RandomNumber"  placeholder="随机题数"></el-input>
           </el-col>
          
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="GoBack">返回</el-button>
            <el-button type="primary" @click='next("Fileform")'>下一步</el-button>
            <el-button type="primary" @click='onSubmit("Fileform")'>不了,先提交</el-button>
        </el-form-item>
       </el-form>
  </div>
</template>

<script>
export default {
      data() {
      return {
        Fileform:{
        exerciseName:null, //练习名称
        value:false,     //试卷类型
        Timekeeping:false, // 计时/倒计时
        Enabled:false, //  启动/未启动
        TrainingTime:60, //练习时间
        PracticeScore:100,//练习总分
        RandomNumber:5,  //随机题数
        selectedOptions: [], 
        },
        rules: {
          exerciseName: [
            { required: true, message: '请输入练习名称', trigger: 'blur' },
          ],
          selectedOptions: [
            { required: true, message: '请选择教材单元', trigger: 'blur' },           
          ],
          TrainingTime: [
            { required: true, message: '请将内容填写完成', trigger: 'blur' }
          ],
          PracticeScore: [
            { required: true, message: '请将内容填写完成', trigger: 'blur' }
          ],
          RandomNumber: [
            { required: true, message: '请将内容填写完成', trigger: 'blur' }
          ]
        }, 
        activeIndex:0,  //控制点亮状态
        QuestionTypes:['选择题','填空题','听力题','短文听力题','阅读理解题','任务型阅读题','完形填空题','书面表达题'],//题目类型
        optionsSelect: [{
          value: 'English',
          label: '英语',
          children: [{
            value: 'PrimaryEnglish ',
            label: '小学英语',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'CollegeEnglish',
            label: '大学英语',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'Chinese',
          label: '语文',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }]
        }, {
          value: 'Mathematics',
          label: '数学',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
      }
    },
    methods: {
      Question(index){
       this.activeIndex = index;
      },
      handleChange(value) {
            console.log(value);
      },
      handleSelect(item) {
            console.log(item)
      },
      GoBack(){
        this.$router.push('practice')
      },
      onSubmit(Fileform) {
        this.$refs[Fileform].validate((valid) => {
          if (valid) {
            alert('submit!接口调用')
            this.$router.push('practice')
          } else {
            return false;          
          }
        })
      },
      next(Fileform){
         this.$refs[Fileform].validate((valid) => {
          if (valid) {
            this.$router.push('selective_type')
          } else {
            return false;          
          }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
  // 头部样式
  .CreatePractice_container{
    padding: 10px;
    margin: 0;
    .practice_header{
      margin: 10px 0 20px;
    }
  }
  .list{
      display:flex;
      list-style:none;
      position: absolute;
      top:-10px;
      left:80px;
      li{
        padding:0 10px;
        border:1px solid #ccc;
        font-size:13px;
        border-right:0;
        cursor: pointer;
        height:30px;
        line-height:30px;
      }
      li:last-child{
          border-right:1px solid #ccc;
      }
      li:hover{
          color:#409EFF;
      }    
  }
  .active{
      border:1px solid #409EFF!important;
      color:#409EFF;
  }
</style>
