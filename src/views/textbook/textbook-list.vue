<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入单词名称搜索..." v-model="listQuery.name">
      </el-input>
      <el-select clearable style="width: 290px" class="filter-item" v-model="listQuery.importance" placeholder="教材类型">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addPhoneticSymbol">添加</el-button>
      </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <!--<el-table-column align="center" type="selection" width="155"></el-table-column>-->

      <el-table-column width="350px" align="center" label="教材名称" prop="bookName">
      </el-table-column>
      <el-table-column width="150px" align="center" label="教材封面">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <img :src="scope.row.imgUrl" width="180" height="200" alt="">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.imgUrl" width="37" height="50" alt="">
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="教材类型" prop="bookType">
      </el-table-column>
      <el-table-column width="110px" align="center" label="状态" prop="status">
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看单元" placement="top">
            <el-button type="primary" icon="el-icon-share" plain circle @click="goUnit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" plain circle @click="handleUpdate(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" plain circle @click="handleUpdate(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
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
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.list = [{"bookName":"123one","bookType":4,"id":"8b7600e9fd9646a7b1aa22cab74ff31e","imgUrl":"http://osi4sn5qr.bkt.clouddn.com/c2e2114889f74225b6aa1e19d01d0f2f.png","oldBookName":"123one","status":0},{"bookName":"123one1","bookType":4,"id":"a62ec41d4dc24155b9ba5f3f450f6376","imgId":"878e0556e00c4f7ea58d4d58f6c24960.gif","imgUrl":"http://osi4sn5qr.bkt.clouddn.com/878e0556e00c4f7ea58d4d58f6c24960.gif","oldBookName":"123one1","status":0},{"bookName":"32测试","bookType":4,"id":"68fee845-beb5-475e-87dd-fc610371b876","imgId":"/upload/image/201603/26/1603261535108603515.jpg","imgUrl":"http://media.adxs.civaonline.cn/upload/image/201603/26/1603261535108603515.jpg","oldBookName":"32测试","seqNo":93,"status":0},{"bookName":"3H","bookType":4,"id":"d8b0ad90-2a3b-4247-84a0-0ac843a5036b","imgUrl":"http://osi4sn5qr.bkt.clouddn.com/c2e2114889f74225b6aa1e19d01d0f2f.png","oldBookName":"3H","seqNo":0,"status":0},{"bookName":"ceshi","bookType":4,"id":"5a999c0a3d594c979df90b2a12df200e","imgUrl":"http://osi4sn5qr.bkt.clouddn.com/c2e2114889f74225b6aa1e19d01d0f2f.png","oldBookName":"ceshi","status":0},{"bookName":"Civa Cup 全球英语能力挑战赛","bookType":4,"id":"125b8eac-79ca-4598-9cea-31eb7ab5aef3","imgId":"/upload/image/201703/04/1703041734490041768.jpg","imgUrl":"http://media.adxs.civaonline.cn/upload/image/201703/04/1703041734490041768.jpg","oldBookName":"Civa Cup 全球英语能力挑战赛","seqNo":200,"status":0},{"bookName":"Civa Cup 全球英语能力挑战赛","bookType":4,"id":"10a202aa-c1bd-461c-8463-068b0b3f2d69","imgId":"/upload/image/201703/04/1703041733247229254.jpg","imgUrl":"http://media.adxs.civaonline.cn/upload/image/201703/04/1703041733247229254.jpg","oldBookName":"Civa Cup 全球英语能力挑战赛","seqNo":200,"status":0},{"bookName":"Civa Cup 全球英语能力挑战赛(省决赛)","bookType":4,"id":"0348f0ed-16ae-4163-a713-55fc1876ad5b","imgUrl":"http://osi4sn5qr.bkt.clouddn.com/c2e2114889f74225b6aa1e19d01d0f2f.png","oldBookName":"Civa Cup 全球英语能力挑战赛(省决赛)","seqNo":0,"status":0},{"bookName":"Civa Cup 全球英语能力挑战赛(省决赛)","bookType":4,"id":"8409d8cb-5e91-4db5-a0f6-6ed4f671d0c4","imgId":"/upload/image/201703/04/1703041733247229254.jpg","imgUrl":"http://media.adxs.civaonline.cn/upload/image/201703/04/1703041733247229254.jpg","oldBookName":"Civa Cup 全球英语能力挑战赛(省决赛)","seqNo":200,"status":0},{"bookName":"Civa Cup 全球英语能力挑战赛(省决赛)","bookType":4,"id":"d35607dc-67a1-4481-a928-b649219c30c3","imgId":"/upload/image/201703/04/1703041734490041768.jpg","imgUrl":"http://media.adxs.civaonline.cn/upload/image/201703/04/1703041734490041768.jpg","oldBookName":"Civa Cup 全球英语能力挑战赛(省决赛)","seqNo":200,"status":0}]
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
      addPhoneticSymbol() {
        this.$router.push({ name: 'addPhoneticSymbol', params: { aaa: 1 }})
      },
      goUnit() {
        this.$router.push({ name: 'unitList' })
      }
    }
  }
</script>

<style scoped>

</style>
