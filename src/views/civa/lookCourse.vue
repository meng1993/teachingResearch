<template>
  <div class="look_course_container">
    <el-row class="title">
      <el-col :span="24"><div class="grid-content bg-purple-dark">EEC教材教学规划</div></el-col>
    </el-row>
    <el-row class="character">【学习目标】</el-row>
    <el-row class="character">
      {{learningGoal}}
    </el-row>
    <el-row class="character">
      【适用人群】{{goalCrowd}}
    </el-row>
    <el-row class="character">
      【教学周数】{{weekNum}}        【学习模式】{{learningMode}}   【类型】{{category}}
    </el-row>
    <!--按钮和搜索框-->
    <el-row class="character">
      <el-button style="float: left" size="mini" type="primary">维护教学周</el-button>
      <el-button style="float: left" size="mini" type="primary" @click="deleteSelect">删除</el-button>
      <el-col :span="8" style="float: right;">
        <el-autocomplete style="width: 100%"
                         v-model="state4"
                         :fetch-suggestions="querySearchAsync"
                         placeholder="请输入教学横版关键字查询"
                         :trigger-on-focus="false"
                         @select="handleSelect">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-autocomplete>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="tableData5" style="width: 100%;margin: 20px 0;" :border="true" @select="selectMessage">
      <!--选中框-->
      <el-table-column type="selection" width="55"></el-table-column>
      <!--table数据部分-->
      <el-table-column label="教学周数" prop="seqNo"></el-table-column>
      <el-table-column label="教学内容" prop="teachingGoal"></el-table-column>
      <el-table-column label="教学重难点" prop="teachingDifficult"></el-table-column>
      <el-table-column label="任务数量" prop="desc"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="lookTeachWeek(scope.$index, scope.row)">查看</el-button>
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
        learningGoal: '', // 学习目标
        goalCrowd: '', // 目标人群
        weekNum: '', // 教学周数
        learningMode: '', // 学习模式
        category: '', // 类型
        // 搜索三个变量
        restaurants: [],
        state4: '',
        timeout: null,
        // 表格开始
        tableData5: [
          {
            id: '1111',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            status: true
          },
          {
            id: '2222',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            status: true
          },
          {
            id: '333',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            status: false
          },
          {
            id: '444',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333',
            status: false
          },
          {
            id: '555',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '666',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '7777',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '888',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '999',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '10',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '11',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }
        ],
        selectData: []
        //  表格结束
      }
    },
    components: {
      pagenation
    },
    created() {
      // this.getMessage()
    },
    mounted() {
      this.getMessage()
    },
    methods: {
      getMessage() {
        // 牵扯到列表模糊查询，后台把数据分成了两个接口传数据
        let planId = this.$route.params.courseId // 课程id（用于请求上边杂乱数据）
        let bookId = this.$route.params.bookId // 教材id（用于请求下边表格列表数据）
        let pageSize = this.$refs.page.pageSize
        let pageNum = this.$refs.page.currentPage
        this.$api.get('/plan/' + planId + '', null, r => {
          console.log(r)
          this.learningGoal = r.result.learningGoal // 学习目标
          this.goalCrowd = r.result.goalCrowd // 适用人群
          this.weekNum = r.result.weekNum // 教学周数
          this.learningMode = r.result.learningMode // 学习模式
          this.category = r.result.category // 类型
        })
        this.$api.get('/plan/week?bookId=' + bookId + '&pageSize=' + pageSize + '&pageNum=' + pageNum, null, r => {
          console.log(JSON.stringify(r))
          this.tableData5 = r.result.list
          this.totalSize = r.result.total
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
      lookTeachWeek(a, b) {
        this.$router.push('look_teach_week/lookTeachWeek')
        console.log(a)
        console.log(b)
      },
      selectMessage(selection, row) {
        this.selectData = selection
        console.log(selection)
      },
      handleEdit(a, b) {
        let bookId = b.bookId
        let clueId = b.id
        console.log(clueId)
        this.$router.push({ 'name': 'careTeachWeek', 'params': { 'bookId': bookId, 'clueId': clueId, 'type': '2' }})
        console.log(a)
        console.log(b)
      },
      // 删除教学周
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
            let clueId = arr.join(',')
            console.log(clueId)
            this.$api.delete('/clue/' + clueId + '', null, r => {
              console.log(r)
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
    }
  }
</script>

<style lang="scss" scoped>
  .look_course_container{
    padding: 0 10px;
    margin: 0;
    .title{
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 30px;
    }
    .character{
      margin: 15px 30px 0;
    }
  }
</style>
