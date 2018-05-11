<template>
    <div class='practice_container'>
      <el-row class="practice_header"  :gutter="20">

          <el-col class="block" :span='4'>
            <span class="demonstration"></span>
            <el-cascader placeholder="教材-单元选择"
                :options="optionsSelect"
                v-model="selectedOptions"
                @change="handleChange">
            </el-cascader>
        </el-col>

      <el-col :span="4">
        <el-select v-model="practice_status" placeholder="状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="practice_type" placeholder="限时规则">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-autocomplete style="width: 100%"
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入教学横版关键字查询"
          :trigger-on-focus="false"
          @select="handleSelect"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row class="create_delete" :gutter="20" style="margin: 0;">
      <el-button @click="createTeach">新建在线练习</el-button>
      <el-button @click="deleteSelect">删除</el-button>
    </el-row>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%;margin-top:20px;">

        <!--选中框-->
     <el-table-column type="selection" width="55"></el-table-column>
    
      <el-table-column align="center" label="题号" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="练习名称">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
        <el-table-column width="150px" align="center" label="练习类型">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
        <el-table-column width="150px" align="center" label="题目类型">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
        <el-table-column width="150px" align="center" label="题目数量">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
        <el-table-column width="150px" align="center" label="限时规则">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
       <el-table-column label="状态" align="center" width="150px">
        <template slot-scope="scope">
          <el-switch @change="changeSwitch(scope.row)"
            v-model="scope.row.status">
          </el-switch>
        </template>
      </el-table-column>

       <el-table-column label="操作" width="260px" align="center">
        <template slot-scope="scope">
          <el-button style='margin-left:30px;'
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="lookCourse(scope.$index, scope.row)">预览</el-button>
        </template>
      </el-table-column>

    </el-table>

     <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- <el-table :data="tableData5" style="width: 100%;margin: 20px 0;" :border="true"  @select="selectMessage" >
    
      <el-table-column type="selection" width="55"></el-table-column>
     
      <el-table-column label="题号" prop="id"></el-table-column>
      <el-table-column label="练习名称" prop="PracticeName"></el-table-column>
      <el-table-column label="练习类型" prop="name"></el-table-column>
      <el-table-column label="题目类型" prop="category"></el-table-column>
      <el-table-column label="题目数量" prop="address"></el-table-column>
      <el-table-column label="限时规则" prop="shop"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch @change="changeSwitch(scope.row)"
            v-model="scope.row.status">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190px">
        <template slot-scope="scope">
          <el-button style='margin-left:20px'
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="lookCourse(scope.$index, scope.row)">查看</el-button>

        </template>
      </el-table-column>
    </el-table> -->

        <!-- <div class="pagination-container">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="100">
         </el-pagination>
        </div> -->
          
  </div>
</template>

<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
export default {
   data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
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
        selectedOptions: [],
        practice_status: '',
        practice_type: '',
        state4: '',
        timeout:null,
        options: [
          {
            value: '选项1',
            label: '状态',
            disabled: true
          },
          {
            value: '选项2',
            label: '已启用'
          },
          {
            value: '选项3',
            label: '未启用'
          }
        ],
        options2: [
          {
            value: '选项1',
            label: '全部',
            // disabled: true
          },
          {
            value: '选项2',
            label: '计时'
          },
          {
            value: '选项3',
            label: '倒计时'
          }
        ],
        //  // 表格开始
        // tableData5: [
        //   {
        //     id: '1',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: true
        //   },
        //   {
        //     id: '2222',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: true
        //   },
        //   {
        //     id: '333',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '333',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '333',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '444',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '555',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '666',
        //    name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //    id: '7',
        //    name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '8',      
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '9',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        //   {
        //     id: '10',
        //     name: '英语四级',
        //     PracticeName:'英语四级',
        //     category: '江浙小吃、小吃零食',
        //     desc: '荷兰优质淡奶，奶香浓而不腻',
        //     address: '上海市普陀区真北路',
        //     shop: '王小虎夫妻店',
        //     shopId: '10333',
        //     status: false
        //   },
        // ],
        // selectData: [],
        // //  表格结束  
        // listQuery: {
        //   page: 1,
        //   limit: 10,
        //   importance: undefined,
        //   title: undefined,
        //   type: undefined,
        //   sort: '+id'
        // },
        //  list: null,
        //  total:0,
        //  listLoading: true,
      };
    },
    methods: {
        getList() {
          this.listLoading = true
          fetchList(this.listQuery).then(response => {
            this.list = response.data.items
            this.total = response.data.total
            this.listLoading = false
          })
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
        createTeach() {
            this.$router.push('new_create_practice')
        },
        // 删除选中事件
      deleteSelect() {
        if (this.selectData.length !== 0) {
          // 选中的有，就弹出是否确认删除
          this.$confirm('此操作将永久删除选中文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
        else {
          // 如果没选中就弹
          this.$alert('请选择您要删除的教学横版', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '',
            type: 'error'
          })
        }
      },
        selectMessage(selection, row) {
            this.selectData = selection
            console.log(selection)
            console.log(row)
        },
        //  点击开关事件
        changeSwitch(data) {
            console.log(data)
        },
        handleChange(value) {
            console.log(value);
        },
        handleSelect(item) {
            console.log(item)
        },
        handleEdit(a, b) {
        //this.$router.push('care_teach_week')
        console.log(a)
        console.log(b)
        },
        lookCourse(a, b) {
            //this.$router.push('look_course')
            console.log(a)
            console.log(b)
        },
         handleSizeChange(val) {
          this.listQuery.limit = val
          this.getList()
        },
        handleCurrentChange(val) {
          this.listQuery.page = val
          this.getList()
        },
    },
     created() {
      this.getList()
    },
}
</script>

<style lang="scss" scoped>
  // 头部样式
  .practice_container{
    padding: 0 10px;
    margin: 0;
    .practice_header{
      margin: 10px 0 20px;
    }
  }
</style>
