<template>
  <div class="recommend">
      <div v-for="item in recommends" :key="item.link">
        <a :href="item.link" ></a>
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
        return []
       }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size:10px;
    border-bottom: 10px solid #EEE;
    padding: 5px 0px 10px;
  }
  img{
    flex:1;
    width:70%;
    padding: 5px 0px 5px;

  }
</style>
