<template>
  <div class="look_teach_week">
    <el-row class="title">
      <el-col :span="24"><div class="grid-content bg-purple-dark">教材名称-单元名称-weekN</div></el-col>
    </el-row>
    <el-row class="teach_aim">教学目标：</el-row>
    <el-row>
      1.掌握PartB词汇，能完成单词的直读、直拼、直背；<br/>
      ①人名<br/>
      2.掌握PartB句型，能完成词句替换；<br/>
      ①Hello!<br/>
      ②Hi!<br/>
      ③How are you?<br/>
      ④I'm fine!<br/>
      3.掌握PartB知识点，能正确运用并完成线上练习；<br/>
      ①How引导的特殊疑问句询问他人状况<br/>
      4.掌握PartB对话，能进行角色扮演及完成情景迁移；<br/>
      5.掌握字母A-H的书写及含有相同音素的分类。<br/>
    </el-row>
    <el-row class="teach_aim">教学重难点：</el-row>
    <el-row>
      1.人名朗读<br/>
      2.男女生名字的区分
    </el-row>
    <careTeach></careTeach>
  </div>
</template>

<script>
  import careTeach from './civaConponent/dragTable'
  export default {
    data() {
      return {
        jj: ''
      }
    },
    created() {
      console.log(this.$route.params.look)
      this.jj = this.$route.params.look
    },
    components: {
      careTeach
    }
  }
</script>

<style lang="scss" scoped>
  .look_teach_week {
    padding: 0 10px;
    margin: 0;
    .title {
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 30px;
    }
    .teach_aim{
      color: #ff00f6;
    }
  }
</style>
