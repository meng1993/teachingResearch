<template>
  <div>
    <el-form  label-width="80px" class='SelectiveType'>
        <el-form-item label="题目">
                <el-button  @click="outerVisible = true">选择题目</el-button>
        </el-form-item>
    </el-form>
    <p style='font-size:14px;margin-left:35px;'>已添加题目列表:</p>
    <div class='main'>
         <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <div class="task_box" v-for="(item,index) in clueTaskList" :key='index'>
      <!--TASK title-->
      <div slot="header" class="clearfix task_header">
        <!-- <el-tag type="success">TASK {{index+1}}</el-tag> -->
        <div style="float: right;">
          <el-button :disabled="index===0" @click="handleUp(index)">上移</el-button>
          <el-button :disabled="index===clueTaskList.length-1" @click="handleDown(index)">下移</el-button>
          <el-button @click="handleRemove(index)">删除</el-button>
        </div>
      </div>
      <!--场景、模块、时长占比、线下资源-->
      <el-row class="task_content">
        <!--场景-->
        <el-col :span="3">
          场景: {{item.scenes}}
        </el-col>
        <!--模块-->
        <el-col :span="3">
          模块: {{item.module}}
        </el-col>
        <!--时长占比-->
        <el-col :span="4">
          时长占比: {{item.duration}}
        </el-col>
        <!--线下资源-->
        <el-col :span="14">
          线下资源: {{item.offlineResource}}
        </el-col>
      </el-row>
      <!--任务结果描述-->
      <el-row style="height:60px;margin: 15px 0;line-height: 60px" class="task_content">
        任务结果描述: {{item.resultDescription}}
      </el-row>
      <!--copy结束-->
      <el-table v-show="item.stepContent" :data="item.stepList" row-key="id"  v-loading.body="listLoading" border fit highlight-current-row style="width: 98%;margin: 0 auto;">
        <!--步骤-->
        <el-table-column align="center" label="步骤" fixed="left" width="65">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <!--话术-->
        <el-table-column width="180px" align="center" label="话术">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.talks"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.talks }}</span>
          </template>
        </el-table-column>
        <!--建议check方式-->
        <el-table-column min-width="150px" label="建议check方式">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.checkMode"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.checkMode }}</span>
          </template>
        </el-table-column>
        <!--线上资源-->
        <el-table-column width="110px" align="center" label="线上资源">
          <template slot-scope="scope">
            <el-button>预览</el-button>
          </template>
        </el-table-column>
        <!--角标-->
        <el-table-column width="110px" align="center" label="角标">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.subscript"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.subscript }}</span>
          </template>
        </el-table-column>
        <!--线上资源使用目的-->
        <el-table-column width="110px" align="center" label="线上资源使用目的">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.usePurpose"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.usePurpose }}</span>
          </template>
        </el-table-column>
        <!--终端推送-->
        <el-table-column width="120px" label="终端推送">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.range"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.range }}</span>
          </template>
        </el-table-column>
        <!--学生端任务话术-->
        <el-table-column align="center" label="学生端任务话术" width="95">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <!--Highlight-->
        <el-table-column class-name="status-col" label="Highlight" width="110">
          <template slot-scope="scope">
            {{scope.row.highlight}}
          </template>
        </el-table-column>
      </el-table>
      <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    </div>
    <!--copy开始-->
    <!--stepList中数组顺利，根据需求，该页面已不再需要-->
    <!--<div class='show-d'>{{$t('table.dragTips1')}} : &nbsp; {{ oldList}}</div>-->
    <!--<div class='show-d'>{{$t('table.dragTips2')}} : {{newList}}</div>-->

  </div>
    </div>
    <el-row style='margin-left:30px;'>
        <el-button type="primary" @click='prev'>上一步</el-button>
        <el-button type="primary">提交</el-button>
    </el-row>

  <!-- 弹出框内容 -->
  <el-dialog title="选择题目" :visible.sync="outerVisible" width="1000px">
    <el-dialog
      width="50%"
      title="预览"
      :visible.sync="innerVisible"
      append-to-body
      >
      <ul>
           <li>
               {{content}}
          </li>
      </ul>

       <el-button type="primary" style='margin-top:20px;' @click="innerVisible = false">确定</el-button>
    </el-dialog>
    <el-row class="practice_header"  :gutter="20">
          <el-col class="block" :span='6'>
            <span class="demonstration"></span>
            <el-cascader placeholder="请选择教材单元"
                :options="optionsSelect"
                v-model="selectedOptions"
                clearable
                @change="handleChange">
            </el-cascader>
        </el-col>

      <el-col class="block" :span='6'>
            <span class="demonstration"></span>
            <el-cascader placeholder="知识点"
                :options="optionsSelects"
                v-model="selectedOptions2"
                clearable
                @change="handleChange">
            </el-cascader>
        </el-col>

      <el-col :span="12">
        <el-autocomplete style="width: 100%"
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="输入题目名称模糊查询"
          :trigger-on-focus="false"
          @select="handleSelect"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-autocomplete>
      </el-col>
    </el-row>


        <el-table :data="list" >
              <!--选中框-->
            <el-table-column type="selection" width="55" ></el-table-column>

            <el-table-column align="center" label="题目名称" width="323px">
                <template slot-scope="scope">
                <span>{{scope.row.timestamp}}</span>
                </template>
            </el-table-column>
            <el-table-column width="323px" align="center" label="题号">
                <template slot-scope="scope">
                <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>
                <el-table-column width="259px" align="center" label="操作">
                <template slot-scope="scope">
                <span style='cursor:pointer;'  @click="Look(scope.row.author)">预览</span>
                </template>
            </el-table-column>
        </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false"   type="primary">确定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
export default {
    data(){
        return{
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
        optionsSelects: [{
          value: 'English',
          label: '英语',
          children: [{
            value: 'PrimaryEnglish ',
            label: '小学英语',
            children: [{
              value: 'yizhi',
              label: '一致'
            }]
          }, {
            value: 'CollegeEnglish',
            label: '大学英语',
            children: [ {
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
            children: [ {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'form',
              label: 'Form 表单'
            }]
          }]
        }, {
          value: 'Mathematics',
          label: '数学',
          children: [{
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
            gridData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            },],
        selectedOptions:[],
        selectedOptions2:[],
        restaurants: [],
        outerVisible: false,
        innerVisible: false,
        list: null,
        total: null,
        list:null,
        content:'', //二次弹出框内容
        state4:'',
        multipleSelection:[],
        listQuery: {
          page: 1,
          limit:10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
         clueTaskList: [
        {
          stepContent: false,
          // 场景
          scenes: '课前',
          // 模块
          module: '词汇',
          // 时长占比
          duration: 10,
          // 线下资源
          offlineResource: '我是task1的线下资源',
          // 任务结果描述
          resultDescription: '任务结果描述111',
          stepList: [
            {
              id: 1,
              talks: '我是话术111',
              checkMode: '我是check方式111',
              subscript: '我是角标111',
              usePurpose: '我是线上资源使用目的111',
              range: '学生端',
              title: '我是学生端话术111',
              highlight: '111'
            },
            {
              id: 2,
              talks: '我是话术222',
              checkMode: '我是check方式222',
              subscript: '我是角标222',
              usePurpose: '我是线上资源使用目的222',
              range: '老师端',
              title: '我是学生端话术222',
              highlight: '222'
            }
          ]
        },
          {
            stepContent: false,
            // 场景
            scenes: '课中',
            // 模块
            module: '音标',
            // 时长占比
            duration: 22,
            // 线下资源
            offlineResource: '我是task2的线下资源',
            // 任务结果描述
            resultDescription: '任务结果描述222',
            stepList: [
              {
                id: 1,
                talks: '我是话术333',
                checkMode: '我是check方式333',
                subscript: '我是角标333',
                usePurpose: '我是线上资源使用目的333',
                range: '老师端',
                title: '我是学生端话术333',
                highlight: '333'
              },
              {
                id: 2,
                talks: '我是话术444',
                checkMode: '我是check方式444',
                subscript: '我是角标444',
                usePurpose: '我是线上资源使用目的444',
                range: '学生端',
                title: '我是学生端话术444',
                highlight: '444'
              }
            ]
          }
        ],
        }
    },
    methods:{
      prev(){
          this.$router.push('new_create_practice')
      },
      // 搜索框方法开始
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ]
      },
      querySearchAsync(queryString, cb) {
        let restaurants = this.restaurants
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      getList() {
          this.listLoading = true
          fetchList(this.listQuery).then(response => {
            this.list = response.data.items
            this.total = response.data.total
            this.listLoading = false
          })
       },
       handleSizeChange(val) {
          this.listQuery.limit = val
          this.getList()
        },
        handleCurrentChange(val) {
          this.listQuery.page = val
          this.getList()
        },
        handleChange(val){
            console.log(val)
        },
        handleSelect(val){
            console.log(val)
        },
        Look(val){
            this.content = val;
            this.innerVisible = true;
        },
         //  展开收起
        handle(index) {
          this.clueTaskList[index].stepContent = !this.clueTaskList[index].stepContent
        },
        // 下移
        handleDown(index) {
          this.clueTaskList.splice(index + 1, 0, this.clueTaskList.splice(index, 1)[0])
        },
        // 上移
        handleUp(index) {
          this.clueTaskList.splice(index, 0, this.clueTaskList.splice(index - 1, 1)[0])
        },
        handleRemove(index) {
          this.clueTaskList.splice(index, 1)
        },
    },
    created() {
      this.getList()
    },
    mounted(){
        this.restaurants = this.loadAll()
    }
}
</script>

<style scoped>

.SelectiveType{
    margin-top:10px;
}
ul{
    list-style:none;
}
</style>

<style lang="scss" scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
  .task_box{
    margin: 15px 0;
    border: 1px solid blue;
    .task_header{
      border-bottom: 1px solid #e9eaec;
      padding: 14px 16px;
      line-height: 1;
    }
    .task_content{
      padding:0 8px;
      margin: 15px 0;
    }
  }
</style>
