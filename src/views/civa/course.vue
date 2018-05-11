<template>
  <div class="course_container">
    <el-row class="course_header" :gutter="20">
      <el-col :span="4">
        <el-select v-model="course_status" placeholder="请选择">
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
        <el-select v-model="course_type" placeholder="请选择">
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
      <el-button @click="createTeach">新建课程</el-button>
      <el-button @click="deleteSelect">删除</el-button>
    </el-row>
    <!--表格-->
    <el-table :data="tableData5" style="width: 100%;margin: 20px 0;" :border="true" @select="selectMessage">
      <!--选中框-->
      <el-table-column type="selection" width="55"></el-table-column>
      <!--展开框-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="创建人">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="创建日期">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="修改人">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="修改日期">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--table数据部分-->
      <el-table-column label="课程名称" prop="name"></el-table-column>
      <el-table-column label="类型" prop="category" :formatter="category"></el-table-column>
      <el-table-column label="学习周数" prop="weekNum"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch @change="changeSwitch(scope.row)"
            v-model="scope.row.status ? true:false">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="290px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editTeach(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="lookCourse(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">维护教学周</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagenation ref="page" v-bind:totalSize="totalSize"></pagenation>
  </div>
</template>

<script>
  import pagenation from './civaConponent/page'
  export default {
    data() {
      return {
        totalSize: '',
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
            label: '类型',
            disabled: true
          },
          {
            value: '选项2',
            label: '教学规划'
          },
          {
            value: '选项3',
            label: '教学横版'
          }
        ],
        course_status: '',
        course_type: '',
        // 搜索三个变量
        restaurants: [],
        state4: '',
        timeout: null,
        // 表格开始
        tableData5: [],
        selectData: []
        //  表格结束
      }
    },
    components: {
      pagenation
    },
    created() {
      this.getMessage()
    },
    mounted() {
      this.restaurants = this.loadAll()
      this.getMessage()
    },
    methods: {
      getMessage() {
        var pageSize = this.$refs.page.pageSize
        var pageNum = this.$refs.page.currentPage
        this.$api.get('/plan/selectLikePlan?pageNum=' + pageNum + '&pageSize=' + pageSize + '', null, r => {
          console.log(JSON.stringify(r))
          this.totalSize = r.result.total
          this.tableData5 = r.result.list
        })
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
      handleSelect(item) {
        console.log(item)
      },
      // 搜索框方法结束
      //  表格开始
      // 维护教学周跳转到维护教学周界面
      handleDelete(a, b) {
        let bookId = b.bookId
        this.$router.push('care_teach_week/' + bookId + '/1')
        console.log(a)
        console.log(b)
      },
      lookCourse(a, b) {
        let courseId = b.id
        let bookId = b.bookId
        this.$router.push('look_course/' + courseId + '/' + bookId + '' + '')
      },
      selectMessage(selection, row) {
        this.selectData = selection
        console.log(selection)
        console.log(row)
      },
      //  表格结束
      //  点击开关事件
      changeSwitch(data) {
        // 点击要请求接口，成功的话状态改变
        let planId = data.id
        this.$api.put('/plan/' + planId + '', null, r => {
          console.log(r)
          if (data.status === 0) {
            data.status = 1
          } else {
            data.status = 0
          }
        })
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
            let arr = []
            this.selectData.forEach(function(value) {
              arr.push(value.id)
            })
            let planId = arr.join(',')
            console.log(planId)
            this.$api.delete('/plan/' + planId + '', null, r => {
              this.getMessage()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          // 如果没选中就弹
          this.$alert('请选择您要删除的教学横版', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '',
            type: 'error'
          })
        }
      },
      createTeach() {
        // console.log(a)
        // console.log(b)
        this.$router.push('new_create_class/1')
      },
      editTeach(a, b) {
        console.log(a)
        console.log(b)
        this.$router.push('new_create_class/2/' + JSON.stringify(b))
      },
      category(data) {
        if (data.category === 1) {
          return '教学横版'
        } else if (data.category === 2) {
          return '教学规划'
        }
      }
      // handleEdit() {
      //   // console.log(this.$refs.page.page)
      // }
    }
  }
</script>

<style lang="scss" scoped>
  // 头部样式
  .course_container{
    padding: 0 10px;
    margin: 0;
    .course_header{
      margin: 10px 0 20px;
    }
  }
</style>
