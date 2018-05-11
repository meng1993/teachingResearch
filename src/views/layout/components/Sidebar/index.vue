<template>
  <scroll-bar>
    <h3 class="nameTitle" v-if="this.sidebar.opened">Civa教研平台</h3>
    <h3 class="nameTitle" v-if="!this.sidebar.opened">TR</h3>
    <!--<span class="sidebar-title">应用中心</span>-->
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .nameTitle{
    color:white;
    text-align: center;
    margin: 16px 0;
    /*border-bottom: 1px solid #e6e6e6;*/
  }
  .sidebar-title{
    font-size: 12px;
    color:#97a8be;
    margin-left: 12px;
  }
</style>
