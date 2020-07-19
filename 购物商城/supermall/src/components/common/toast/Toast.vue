<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      message:{
        type:String,
        default:''
      },
      show:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .toast{
    width:200px;
    height: 50px;

    text-align: center;
    position: fixed;
    top:50%;
    left:25%;
    transfrom:translate(-50%, -50%);
    padding:20px 10px;
    color:#fff;
    background-color:rgba(0,0,0,.6)
  }
</style>
