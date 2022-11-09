import Vue from 'vue'
import VueRouter from 'vue-router'
import FoundView from '../views/FoundView/FoundView.vue'
import SearchView from '../views/FoundView/SearchView.vue'
import MyView from '../views/MyView/MyView.vue'
import MusicView from '../views/MusicView/MusicView.vue'
import LoginView from "../views/MyView/LoginView.vue";
import SearchMain from "../views/FoundView/SearchMain.vue";

Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      ShowAndHide:true,
    }
    
  },
  {
    path: '/',
    name: 'Found',
    component: FoundView,
    meta: {
      // 下面的导航栏的标题
      ShowAndHide:false,
      // 缓存，有动画
      keepAlive: true,
      // 是否有动画
      shows:true
    }
  },
  // {
  //   path: '/wyy/dist/index.html',
  //   name: 'Found',
  //   component: FoundView,
  //   meta: {
  //     // 下面的导航栏的标题
  //     ShowAndHide:false,
  //     // 缓存，有动画
  //     keepAlive: true,
  //     // 是否有动画
  //     shows:true
  //   }
  // },
  
  // /dist/index.html
  {
    path: '/foundview',
    name: 'FoundView',
    component: FoundView,
    meta: {
      ShowAndHide:false,
      keepAlive: true,
      shows:true
    }
  },
  {
    path: '/myview',
    name: 'MyView',
    component: MyView,
    meta: {
      ShowAndHide:false,
      keepAlive:true,
      shows:true

    }
  },
  {
    path: '/musicview',
    name: 'MusicView',
    component: MusicView,
    meta: {
      ShowAndHide:true,
      shows:true

    }
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView,
    meta: {
      ShowAndHide:true,
      keepAlive:true,
      shows:true

    }
  },
  {
    path: '/searchview',
    name: 'SearchMain',
    component: SearchMain,
    meta: {
      ShowAndHide:true,
      keepAlive:true,
      shows:true

    }

  },
  {
    path:'/setupthe',
    name:'SetupThe',
    component:()=>import('../views/MyNav/SetUpThe.vue'),
    meta: {
      ShowAndHide:true,
      keepAlive:true,
      shows:true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router