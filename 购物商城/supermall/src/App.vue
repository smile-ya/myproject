<template>
  <div id="app">
<!--    keep-alive:切换时让原先的组件不被销毁，即不调用组件生存周期的destroyed函数-->

    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>


  </div>
</template>

<script>
  import MainTabBar from "components/content/maintabbaar/MainTabBar";


  export default {
  name: 'App',
  components: {
        MainTabBar,


   }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
