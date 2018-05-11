<template>
  <div>
    <div class="app-container" style="height: 200px;">
      <img :src="book.imgUrl" width="140" height="170" alt="" style="vertical-align: top;float: left">
      <div style="float: left;width: 80%;margin-left: 20px">
        <span style="font-size: 40px;margin-right: 50px;vertical-align: middle">{{book.bookName}}</span>
        <el-tag size="small">{{book.bookType}}</el-tag>
        <el-tag size="small" type="success">{{book.status}}</el-tag>
      </div>
      <div style="float: left;margin-top: 40px;margin-left: 20px;color: #97a8be">
        <span>使用范围：通用</span>
        <span>创建人：{{book.createUser}}</span>
        <span>创建时间：{{book.createDate}}</span>
      </div>
    </div>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 250px;" class="filter-item" placeholder="请输入单元或者单元标题搜索..." v-model="listQuery.name">
      </el-input>
      <el-select clearable style="width: 190px" class="filter-item" v-model="listQuery.importance" placeholder="状态">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
      </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <!--<el-table-column align="center" type="selection" width="155"></el-table-column>-->

      <el-table-column align="center" label="单元">
        <template slot-scope="scope">
          <span>{{scope.row.unitMark+scope.row.unitNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" prop="unitName">

      </el-table-column>
      <el-table-column align="center" label="创建人" prop="createUser">
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createDate">
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <!--列表复选框-->
          <el-switch
            v-model="scope.row.status"
            :active-value= 1
            :inactive-value= 0
            @change="setStatus(scope.row.status,scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="资源管理" placement="top">
            <el-button type="primary" icon="el-icon-share" plain circle @click="goResource(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'phoneticSymbolList',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        importanceOptions: [1, 2, 3],
        downloadLoading: false,
        book: null
      }
    },
    created() {
      this.getList()
      this.book = {"auditDate":"2018-04-24 14:09:29","auditUser":"civa","bookName":"123one","bookType":4,"createDate":"2018-04-19 10:34:07","createUser":"civa","delFlag":0,"description":"","ebookFlag":0,"id":"8b7600e9fd9646a7b1aa22cab74ff31e","imgUrl":"http://osi4sn5qr.bkt.clouddn.com/c2e2114889f74225b6aa1e19d01d0f2f.png","oldBookName":"123one","range":6,"status":0,"subject":1,"updateDate":"2018-04-24 14:09:29","updateUser":"civa"}
    },
    methods: {
      getList() {
        this.listLoading = true
        this.list = [{"createDate":"2018-04-19 10:34:07","createUser":"civa","id":"ba2cfaa84bd74ed1982235839dde69a5","seqNo":1,"status":0,"unitMark":"Unit","unitName":"Hello","unitNo":1},{"createDate":"2018-04-19 10:34:07","createUser":"civa","id":"3e812e162c15485ebd900fde2a9057c4","seqNo":2,"status":1,"unitMark":"Unit","unitName":"1243","unitNo":2},{"createDate":"2018-04-19 10:34:07","createUser":"civa","id":"466cae99584f465288517867c5b5006d","seqNo":3,"status":0,"unitMark":"Unit","unitName":"345","unitNo":3},{"createDate":"2018-04-19 10:34:07","createUser":"civa","id":"35962ecf1fbe4e7aa02cb18792ce11ae","seqNo":4,"status":0,"unitMark":"Unit","unitName":"456","unitNo":4}]
        this.total = this.list.length
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      goResource() {
        this.$router.push({ name: 'resource', query: { aaa: 1 }})
      },
      setStatus(status, id) {
        console.log(status)
        console.log(id)
      }
    }
  }
</script>

<style scoped>

</style>
