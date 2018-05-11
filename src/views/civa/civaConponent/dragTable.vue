<template>
  <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <div class="task_box" v-for="item,index in clueTaskList">
      <!--TASK title-->
      <div slot="header" class="clearfix task_header">
        <el-tag type="success">TASK {{index+1}}</el-tag>
        <div style="float: right;" v-if="pageType">
          <el-button :disabled="index===0" @click="handleUp(index)">上移</el-button>
          <el-button :disabled="index===clueTaskList.length-1" @click="handleDown(index)">下移</el-button>
          <el-button @click="handleRemove(index)">删除</el-button>
          <el-button @click="edit(index)">编辑</el-button>
          <el-button @click="handle(index)" v-if="item.task.stepContent">收起</el-button>
          <el-button @click="handle(index)" v-else>展开</el-button>
        </div>
      </div>
      <!--场景、模块、时长占比、线下资源-->
      <el-row class="task_content">
        <!--场景-->
        <el-col :span="3">
          场景: {{item.task.scenes}}
        </el-col>
        <!--模块-->
        <el-col :span="3">
          模块: {{item.task.module}}
        </el-col>
        <!--时长占比-->
        <el-col :span="4">
          时长占比: {{item.task.duration}}
        </el-col>
        <!--线下资源-->
        <el-col :span="14">
          线下资源: {{item.task.offlineResource}}
        </el-col>
      </el-row>
      <!--任务结果描述-->
      <el-row style="margin: 15px 0;line-height: 60px" class="task_content">
        任务结果描述: {{item.task.resultDescription}}
      </el-row>
      <!--copy结束-->
      <el-table v-show="item.task.stepContent" :data="item.steps" row-key="id"  v-loading.body="listLoading" border fit highlight-current-row style="width: 98%;margin: 0 auto;">
        <!--步骤-->
        <el-table-column align="center" label="步骤" fixed="left" width="65">
          <template slot-scope="scope">
            <span>{{scope.row.seqNo}}</span>
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
</template>

<script>
import { fetchList } from '@/api/article'
import Sortable from 'sortablejs'

export default {
  name: 'dragTable',
  props: ['clueTaskList'],
  data() {
    return {
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      oldList: [],
      newList: [],
      // 11111111111111111新增
      // range: [2, 3],
      status: 0,
      // 展开收起变量
      stepContent: true,
      pageType: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  mounted() {
    this.getList()
    if (this.$parent.jj === 'lookTeachWeek') {
      console.log('666666666666666666666------->')
      this.pageType = false
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html

          v.originalTitle = v.title //  will be used when user click the cancel botton

          return v
        })
        this.listLoading = false
        this.total = response.data.total
        this.listLoading = false
        this.oldList = this.list.map(v => v.id)
        this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    //  展开收起
    handle(index) {
      this.clueTaskList[index].task.stepContent = !this.clueTaskList[index].task.stepContent
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
    //  编辑task
    edit(index) {
      let taskObj = this.clueTaskList[index]
      // console.log(taskObj)
      // this.$router.push({ path: 'new_create_task', query: taskObj })
      this.$router.push({ name: 'newCreateTask', query: taskObj })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
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
