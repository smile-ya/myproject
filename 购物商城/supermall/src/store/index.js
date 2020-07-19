import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new  Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    //mutations唯一的目的是修改state中的状态
    //mutations中的每个方法尽可能完成的事件比较单一一点
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
        payload.checked =false;
        state.cartList.push(payload)
    }

  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        //1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        //2.判断oldProduct
        if(oldProduct){
          // oldProduct.count += 1;
          context.commit('addCounter',oldProduct)
          resolve('当前的商品数量+1')
        }else{
          payload.count = 1;
          context.commit('addToCart',payload)
          resolve('添加成功')
        }
      })

    },

  },
  getters
})

//3.挂载vue实例
export default store
