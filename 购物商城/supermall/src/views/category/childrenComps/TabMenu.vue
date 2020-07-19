<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           :class="{active: index===currentIndex}"
           v-for="(item, index) in categories"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "TabMenu",
    components:{
      Scroll,

    },
    data(){
      return {
        currentIndex:0
      }
    },
    props:{
      categories:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    }
  }
</script>

<style scoped>

  .menu-list-item{
    padding-top: 10px;
    height: 40px;
    text-align: center;
    background-color: gainsboro;
  }
  .active{
    background-color: #fff;
  }
</style>
