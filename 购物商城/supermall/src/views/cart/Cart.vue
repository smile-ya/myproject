<template>
  <div class="cart">
    <!--导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品的列表-->
    <cart-list/>

    <!--底部汇总-->
    <CartBottomBar @addPrice="addPrice"/>

    <toast :message="message" :show="show"/>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import {mapGetters} from 'vuex'
  import CartBottomBar from "./childComps/CartBottomBar";
  import Toast from "components/common/toast/Toast";


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
      Toast
    },
    data(){
      return {
        message:'',
        show:false
      }
    },
    computed:{
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength',
        clist:'cartList'
      })
    },
    methods:{
      addPrice(){
        this.show = true;
       if(this.length)
       {
         if(this.clist.some(item =>item.checked))
         {

           this.message= '结算成功';
         }
         else{
           this.message='请选择至少一件商品'
         }
       }

       else
         this.message='当前购物车没有商品'

        setTimeout(()=>this.show = false,1500)
          // alert(res);
        }

    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    /*font-weight:600;*/
  }
</style>
