import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   meta: { roles: ['admin'] }, // you can set roles in root nav
  //   children: [{
  //     path: 'index',
  //     component: _import('permission/index'),
  //     name: 'permission',
  //     meta: {
  //       title: 'permission',
  //       icon: 'lock',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  {
    path: '/civa',
    component: Layout,
    redirect: 'noredirect',
    name: 'civa',
    meta: {
      title: 'civa3.0系列',
      icon: 'form'
    },
    children: [
      {
        path: 'course',
        component: _import('civa/course'),
        name: 'course',
        meta: { title: '课程管理', icon: 'table' }
      },
      { path: 'new_create_class/:type/:courseObj?', hidden: true, component: _import('civa/newCreateClass'), name: 'newCreateClass', meta: { title: '新建课程' }},
      { path: 'care_teach_week/:bookId/:clueId?/:type?', hidden: true, component: _import('civa/careTeachWeek'), name: 'careTeachWeek', meta: { title: '维护教学周' }},
      { path: 'new_create_task/:obj?', hidden: true, component: _import('civa/newCreateTask'), name: 'newCreateTask', meta: { title: '新建Task' }},
      { path: 'look_course/:courseId/:bookId', hidden: true, component: _import('civa/lookCourse'), name: 'lookCourse', meta: { title: '查看课程' }},
      { path: 'look_teach_week/:look', hidden: true, component: _import('civa/lookTeachWeek'), name: 'lookTeachWeek', meta: { title: '查看教学周' }}
    ]
  },
  {
    path: '/question-bank',
    component: Layout,
    redirect: 'noredirect',
    name: 'questionBank',
    meta: {
      title: '题库',
      icon: 'form'
    },
    children: [
      {
        path: 'selectList',
        component: _import('question-bank/select-list'),
        name: 'selectList',
        meta: { title: '选择题', icon: 'table' }
      },
      {
        path: 'gapFillingList',
        component: _import('question-bank/gap-filling-list'),
        name: 'gapFillingList',
        meta: { title: '填空题', icon: 'table' }
      },
      {
        path: 'addGapFilling',
        component: _import('question-bank/add-gap-filling'),
        name: 'addGapFilling',
        meta: { title: '新增填空题', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/courseware-storehouse',
    component: Layout,
    redirect: 'noredirect',
    name: 'courseWareStorehouse',
    meta: {
      title: '课件库',
      icon: 'form'
    },
    children: [
      {
        path: 'phoneticSymbolList',
        component: _import('courseware-storehouse/phonetic-symbol-list'),
        name: 'phoneticSymbolList',
        meta: { title: '音标', icon: 'table' }
      },
      {
        path: 'glossaryList',
        component: _import('courseware-storehouse/glossary-list'),
        name: 'glossaryList',
        meta: { title: '词汇', icon: 'table' }
      },
      {
        path: 'addPhoneticSymbol',
        component: _import('courseware-storehouse/add-phonetic-symbol'),
        name: 'addPhoneticSymbol',
        meta: { title: '新增音标', icon: 'table' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
