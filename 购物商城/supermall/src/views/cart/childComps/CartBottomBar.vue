<template>
 <div class="bottom-bar">
   <div class="check-content">
     <CheckButton :is-checked="isSelectALL" class="check-button" @click.native="checkClick"></CheckButton>
     <span>全选</span>
   </div>
   <div class="price">
     合计:{{totalPrice}}
   </div>
   <div class="calculate" @click="addPrice">
     去结算:{{checkLength}}
   </div>
 </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton,

    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectALL() {
        // return !this.cartList.filter(item => !item.checked).length
        if (this.cartList.length === 0) {
          return false;
        }
        return this.cartList.every(item => item.checked)

      },

    },
    methods:{
      checkClick(){
        if(this.isSelectALL){
          this.cartList.forEach(item => item.checked = false)
        }else{
          this.cartList.forEach(item => item.checked = true)
        }
      },
      addPrice(){
        this.$emit('addPrice');
      }
    }

  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height:40px;
    background-color: #eee;

    line-height:40px;

  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right:30px;
    width:60px;
  }
  .check-button{
    width:20px;
    height:20px;
    line-height:20px;
    margin-right: 8px;

  }
  .price{
    flex:1;
  }
  .calculate{
    width:100px;
    background-color: var(--color-high-text);
    text-align: center;
    color:#fff;
  }
</style>
