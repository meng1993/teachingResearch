<template>
  <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table :data="stepList" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="步骤" width="65" fixed="left">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="话术">
        <template slot-scope="scope">
          <!--<span>{{scope.row.talks}}</span>-->
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.talks"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.talks }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="线上资源">
        <template slot-scope="scope">
          <el-button>资源管理</el-button>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="线上资源使用目的">
        <template slot-scope="scope">
          <!--<span>{{scope.row.usePurpose}}</span>-->
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.usePurpose"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.usePurpose }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="建议check方式">
        <template slot-scope="scope">
          <!--<span>{{scope.row.checkMode}}</span>-->
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.checkMode"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.checkMode }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="终端推送" width="95">
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.range">
            <el-row>
              <el-checkbox label="1">学生端</el-checkbox>
            </el-row>
            <el-row>
              <el-checkbox label="2">老师端</el-checkbox>
            </el-row>
          </el-checkbox-group>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="角标" width="110">
        <template slot-scope="scope">
          <!--<span>{{scope.row.subscript}}</span>-->
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.subscript"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.subscript }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学生端标题" width="150">
        <template slot-scope="scope">
          <!--<span>{{scope.row.title}}</span>-->
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="high light" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.highlight}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small">Ok</el-button>
          <el-button v-else @click='scope.row.edit=!scope.row.edit' size="small">编辑</el-button>
          <el-button @click="removeStep(index)" size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <!--<div class='show-d'>{{$t('table.dragTips1')}} : &nbsp; {{ oldList}}</div>-->
    <!--<div class='show-d'>{{$t('table.dragTips2')}} : {{newList}}</div>-->
    <el-button @click="addStep">+添加步骤</el-button>
  </div>
</template>

<script>
  import { fetchList } from '@/api/article'
  import Sortable from 'sortablejs'
  export default {
    name: 'dragTable',
    data() {
      return {
        stepList: [
          {
            id: '1', seqNo: 1, talks: '222', targetType: 0, targetId: '说好的幸福呢',
            targetStatus: 0, usePurpose: '带读', checkMode: '我是check方式111', range: [1, 2],
            subscript: '111', title: '我是学生端任务标题111', status: 0, highlight: '我是high light111'
          },
          {
            id: '2', seqNo: 1, talks: '222', targetType: 0, targetId: '说好的幸福呢',
            targetStatus: 0, usePurpose: '带读', checkMode: '我是check方式222', range: [1, 2],
            subscript: '111', title: '我是学生端任务标题222', status: 0, highlight: '我是high light111'
          }
        ],
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        sortable: null,
        oldList: [],
        newList: []
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
    created() {
      if (this.$route.query.stepList !== undefined) {
        this.stepList = this.$route.query.stepList
      } else {
        this.stepList = []
      }
    },
    methods: {
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
      addStep() {
        console.log(this.stepList.length)
        let id = this.stepList.length
        let a = { checkMode: '', highlight: '', id: id + 1, subscript: '', talks: '', title: '', usePurpose: '' }
        this.stepList.push(a)
      },
      removeStep(index) {
        this.stepList.splice(index, 1)
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

<style scoped>
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
</style>
