import Vue from 'vue'
import VueRouter from 'vue-router'

const Home =  () => import('views/home/Home')
const Cart =  () => import('views/cart/Cart')
const Category =  () => import('views/category/Category')
const Profile =  () => import('views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
//1.安装插件
Vue.use(VueRouter);

//2.创建router
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

//导出router
export default router

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
