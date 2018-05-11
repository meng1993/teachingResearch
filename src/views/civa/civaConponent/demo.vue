<template>
  <div class="tableComponent">
    <el-row>
      <el-col :span="23">
        <el-card style="border:1px solid blue;margin: 15px 0;">
          <!--TASK title-->
          <div slot="header" class="clearfix">
            <el-tag type="success">TASK 1</el-tag>
            <div style="float: right;">
              <el-button>上移</el-button>
              <el-button>下移</el-button>
              <el-button>删除</el-button>
              <el-button @click="handle" v-if="stepContent">收起</el-button>
              <el-button @click="handle" v-else>展开</el-button>
            </div>
          </div>
          <!--场景、模块、时长占比、线下资源-->
          <el-row>
            <!--场景-->
            <el-col :span="4">
              场景:
              <el-select v-model="scenes" placeholder="请选择" style="width:100px;">
                <el-option
                  v-for="item in scenesList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <!--模块-->
            <el-col :span="4">
              模块:
              <el-select v-model="module" placeholder="请选择" style="width:100px;">
                <el-option
                  v-for="item in moduleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <!--时长占比-->
            <el-col :span="8">
              <el-row type="flex" align="middle">
                <el-col :span="6">时长占比:</el-col>
                <el-col :span="12">
                  <div class="block">
                    <el-slider
                      v-model="duration"
                      show-input>
                    </el-slider>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <!--线下资源-->
            <el-col :span="8">
              <el-row type="flex" align="middle">
                <el-col :span="5">线下资源:</el-col>
                <el-col :span="19">
                  <el-input v-model="offlineResource" placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--任务结果描述-->
          <el-row style="height:60px;margin: 30px 0;line-height: 60px">
            <el-col :span="4" style="width:12%">任务结果描述：</el-col>
            <el-col :span="20" style="width:88%">
              <el-input type="textarea" :autosize="{minRows:2,maxRows:2}" v-model="resultDescription"
                       :maxlength="500" placeholder="文本输入"></el-input>
            </el-col>
          </el-row>
          <!--步骤模板开始-->
          <template v-if="stepContent">
            <el-row>
              <!--步骤头部-->
              <el-card style="height:48px;background-color:#c1daf5;font-size:12px">
                <el-col :span="23">
                  <el-row>
                    <el-col :span="1">
                      <div>步骤</div>
                    </el-col>
                    <el-col :span="5">
                      <div>话术</div>
                    </el-col>
                    <el-col :span="3">
                      <div>建议check方式</div>
                    </el-col>
                    <el-col :span="2">
                      <div>线上资源</div>
                    </el-col>
                    <el-col :span="3">
                      <div>角标</div>
                    </el-col>
                    <el-col :span="3">
                      <div>线上资源使用目的</div>
                    </el-col>
                    <el-col :span="2">
                      <div>终端推送</div>
                    </el-col>
                    <el-col :span="3">
                      <div>学生端任务话术</div>
                    </el-col>
                    <el-col :span="1">
                      Highlight
                    </el-col>
                    <el-col :span="1" style="text-align:right">操作</el-col>
                  </el-row>
                </el-col>
              </el-card>
              <!--步骤内容-->
              <el-card v-for="(items,indexs) in stepList" padding="11" style="height:98px;" :key="indexs">
                <el-col :span="23">
                  <el-row>
                    <el-col :span="1">
                      <div v-model="items.seqNo">{{indexs+1}}</div>
                    </el-col>
                    <el-col :span="5">
                      <el-input style="padding-right: 15px;" type="textarea" v-model="items.talks"
                               :autosize="{minRows:3,maxRows:3}" :maxlength="1000"
                               placeholder="文本输入"></el-input>
                    </el-col>
                    <el-Col :span="3">
                      <el-input style="padding-right: 15px" type="textarea"
                               v-model="items.checkMode" :autosize="{minRows:3,maxRows:3}"
                               :maxlength="1000" placeholder="文本输入"></el-input>
                    </el-Col>
                    <!--线上资源-->
                    <el-col :span="2">
                      <div v-show="items.targetStatus==0">
                        <el-button
                          @click="chooseResources(index,indexs,items.targetType,items.id)"
                          style="padding: 6px 8px;">资源管理
                        </el-button>
                      </div>
                      <div v-show="items.targetStatus==1">
                        <el-button
                          @click="chooseResources(index,indexs,items.targetType,items.id)"
                          style="padding:6px 12px;color: red">资源管理
                        </el-button>
                      </div>
                    </el-col>
                    <!--角标-->
                    <el-col :span="3">
                      <el-input style="width:135px" type="textarea"
                               v-model="items.subscript" :autosize="{minRows:3,maxRows:3}"
                               :maxlength="1000" placeholder="文本输入"></el-input>
                    </el-col>
                    <!--线上资源使用目的-->
                    <el-col :span="3">
                      <el-input style="width:135px" type="textarea"
                               v-model="items.usePurpose"
                               :autosize="{minRows:3,maxRows:3}"
                               :maxlength="1000" placeholder="文本输入"></el-input>
                    </el-col>
                    <!--终端推送-->
                    <el-col :span="2">
                      <el-checkbox-group v-model="items.range">
                        <el-checkbox label="1">学生端</el-checkbox>
                        <el-checkbox label="2">老师端</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <!--学生端任务话术-->
                    <el-col :span="3">
                      <el-input style="width:135px" type="textarea"
                               v-model="items.title" :autosize="{minRows:3,maxRows:3}"
                               :maxlength="500" placeholder="文本输入"></el-input>
                    </el-col>
                    <!--highlight-->
                    <el-col :span="1" style="text-align:center">
                      <el-checkbox v-model="items.status" :true-value="1"
                                :false-value="0"></el-checkbox>
                    </el-col>
                    <!--操作-->
                    <el-col :span="1" style="text-align: right">
                      <el-button :disabled="indexs==0" circle
                                icon="el-icon-arrow-up" @click="handleUpTask(index,indexs)"
                                style="margin-bottom:2px"></el-button>
                      <el-button :disabled="indexs==0" circle
                                 icon="el-icon-arrow-down" @click="handleUpTask(index,indexs)"
                                 style="margin-bottom:2px"></el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-card>
            </el-row>
          </template>
          <!--步骤模板结束-->

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 课前、课中、课后（场景）开始
        scenesList: [
          {
            value: '1',
            label: '课前'
          },
          {
            value: '2',
            label: '课中'
          },
          {
            value: '3',
            label: '课后'
          }
        ],
        scenes: '',
        // 课前、课中、课后（场景）结束
        moduleList: [
          { label: '音标', value: 1 },
          { label: '词汇', value: 2 },
          { label: '句型', value: 3 },
          { label: '语篇', value: 4 },
          { label: '知识点', value: 5 },
          { label: '综合', value: 7 },
          { label: '在线练习', value: 9 },
          { label: '教学活动', value: 10 }
        ],
        module: '',
        // 时长占比
        duration: 3,
        // 线下资源
        offlineResource: '说好的幸福呢',
        resultDescription: '你在干嘛呢',
        stepContent: true,
        stepList: [
          {
            id: '1', seqNo: 1, talks: '222', targetType: 0, targetId: '说好的幸福呢',
            targetStatus: 0, usePurpose: '带读', checkMode: '444', range: [2, 3],
            subscript: '111', title: '学生端话术', status: 0
          },
          {
            id: '222', seqNo: 1, talks: '222', targetType: 0, targetId: '说好的幸福呢',
            targetStatus: 0, usePurpose: '带读', checkMode: '444', range: [2, 3],
            subscript: '111', title: '学生端话术', status: 0
          }
        ],
        ruleForm: {
        }
      }
    },
    methods: {
      btnBack() {
      },
      handle() {
        this.stepContent = !this.stepContent
      },
      handleUpTask(index, indexs) {
        this.clueTaskList[index].stepList.move(indexs, indexs - 1)
        this.changeTaskSeqNo(index)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
