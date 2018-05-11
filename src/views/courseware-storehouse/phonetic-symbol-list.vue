<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入单词名称搜索..." v-model="listQuery.name">
      </el-input>
      <!--
      key：唯一标识
      label：页面显示文字
      value：选项的值
      ：代表使用的变量
      width:每一列的宽度
      -->
      <el-select clearable style="width: 290px" class="filter-item" v-model="listQuery.importance" placeholder="教材-单元">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addPhoneticSymbol">添加</el-button>
      </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" type="selection" width="55"></el-table-column>

      <el-table-column width="150px" align="center" label="音标" prop="symbol">
      </el-table-column>
      <el-table-column width="150px" align="center" label="单词" prop="name">
      </el-table-column>
      <el-table-column min-width="210px" align="center" label="文字解析" prop="analysis">
      </el-table-column>
      <el-table-column width="110px" align="center" label="创建人" prop="createUser">
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">预览</el-button>
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
        this.list = [{"analysis":"文字解析，菜刀修改","audio":"2ea3f1aca3244866b961e37a42effe7c","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/07/1803071212183851989.mp3","audioName":"EEC1 Unit3 PartA","createDate":"2018-03-30 11:09:14","createUser":"civa","id":"736bbd2b538f455c9011232fa90ad4fa","imgUrl":"","name":"OK1111111","symbol":"oook","updateDate":"2018-04-25 15:09:39","updateUser":"civa","videoId":""},{"analysis":"文字解析，菜刀修改","audio":"2ea3f1aca3244866b961e37a42effe7c","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/07/1803071212183851989.mp3","audioName":"EEC1 Unit3 PartA","createDate":"2018-03-30 11:09:14","createUser":"civa","id":"736bbd2b538f455c9011232fa90ad4fa","imgUrl":"","name":"OK1111111","symbol":"oook","updateDate":"2018-04-25 15:09:39","updateUser":"civa","videoId":""},{"analysis":"文字解析1","audio":"4761732dca6f42f492565e8c8b143972","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/10/1803102209133695681.mp3","audioName":"re-[ri]","createDate":"2018-03-30 10:13:25","createUser":"civa","id":"920f718fba554a5fad62035812848806","imgUrl":"","name":"OOOO","symbol":"OOOOOOO","updateDate":"2018-03-30 11:02:10","updateUser":"civa","videoId":"db761420c7424ea58c7f3b8610831c54","videoKey":"89A7140BA802E1449C33DC5901307461","videoName":"字母X"},{"analysis":"力拔山兮气盖世。时不利兮骓不逝。骓不逝兮可奈何！虞兮虞兮奈若何！","audio":"72f39375cd29451ab000bcc9730193e1","audioKey":"aaf8640394634ecf810f7a853c50d64d.mp3","audioName":"李丰溢 - 同桌的你 (伴奏)","createDate":"2018-03-24 15:21:10","createUser":"civa","id":"f5f08088e76f42d69b20ce08178f556f","imgUrl":"","name":"O===[;;;;;;;;;;;;;;;;;;;;;;;;>","symbol":"like,,,,,,","videoId":"af55f4e01fc8468db6856d84e07c549d","videoKey":"E8A885FE88B2B8C09C33DC5901307461","videoName":"未命名视频"},{"analysis":"[j] 辅音音素","audio":"0f6eb39b9ab345baaf8d9ddba4e483f5","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/16/1803162151012915219.mp3","audioName":"[j]","createDate":"2018-03-16 21:51:03","createUser":"赵峰","id":"da7f464f-c67e-4a67-9afe-5e91be5ba004","imgUrl":"","name":"[j]","symbol":"[j]","updateDate":"2018-03-16 21:51:03","updateUser":"赵峰"},{"analysis":"[d] 辅音音素","audio":"f50118050def4cf2a9083570f2c42e86","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/16/1803162150147445788.mp3","audioName":"[dr]","createDate":"2018-03-16 21:50:30","createUser":"赵峰","id":"bc466808-8624-468c-b2e8-475d05e2166c","imgUrl":"","name":"[dr]","symbol":"[dr]","updateDate":"2018-03-16 21:50:30","updateUser":"赵峰"},{"analysis":"[tr] 辅音音素","audio":"878259759575470db65f1c35158f72cd","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/16/1803162149298539232.mp3","audioName":"[tr]","createDate":"2018-03-16 21:49:38","createUser":"赵峰","id":"87cb83d9-427e-4780-b42a-4eccfb82bbfb","imgUrl":"","name":"[tr]","symbol":"[tr]","updateDate":"2018-03-16 21:49:38","updateUser":"赵峰"},{"analysis":"[dz] 辅音音素","audio":"5d925560cb69402786f9cf9b0304b937","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/16/1803162148451820938.mp3","audioName":"[dz]","createDate":"2018-03-16 21:48:52","createUser":"赵峰","id":"138c2467-ff2f-4f3b-8ff2-9235189e1f50","imgUrl":"","name":"[dz]","symbol":"[dz]","updateDate":"2018-03-16 21:48:52","updateUser":"赵峰"},{"analysis":"[ts] 辅音音素","audio":"0e885f1130584b149c5d3542bb0fa5d8","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/16/1803162148059164938.mp3","audioName":"[ts]","createDate":"2018-03-16 21:48:09","createUser":"赵峰","id":"22dd00fc-d41b-4f8c-9027-989997ed91f9","imgUrl":"","name":"[ts]","symbol":"[ts]","updateDate":"2018-03-16 21:49:06","updateUser":"赵峰"},{"analysis":"[r] 辅音音素","audio":"04714b81a4ff4a49a4ce807350e5da2b","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/16/1803162144184946028.mp3","audioName":"[r]","createDate":"2018-03-16 21:44:27","createUser":"赵峰","id":"ad930278-ed21-4703-84cc-c867551c0e6a","imgUrl":"","name":"[r]","symbol":"[r]","updateDate":"2018-03-16 21:44:27","updateUser":"赵峰"},{"analysis":"[l] 辅音音素","audio":"8818da3d9f4a46f7a442b583a91f7ed5","audioKey":"http://media.adxs.civaonline.cn/upload/audio/201803/16/1803162143413852128.mp3","audioName":"[l]","createDate":"2018-03-16 21:43:49","createUser":"赵峰","id":"bb95381e-f0cc-49bd-a072-e2fbc52e6f01","imgUrl":"","name":"[l]","symbol":"[l]","updateDate":"2018-03-16 21:43:49","updateUser":"赵峰"}]
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
      }
    }
  }
</script>

<style scoped>

</style>
