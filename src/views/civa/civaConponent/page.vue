<template>
  <div class="pagenation" style="float: right">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[ 10, 20, 30]"
      :page-size="400"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: ['totalSize'],
    data() {
      return {
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = `${val}`
        this.$parent.getMessage()
        console.log(`每页显示条数: ${val}`)
      },
      handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`)
        this.$parent.getMessage()
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

