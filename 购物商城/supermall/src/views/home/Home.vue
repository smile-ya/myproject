<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                  class="tabControl"
                 ref="tabcontrol1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <home-recommend-view :recommends="recommends"  />
    <feature-view/>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabcontrol2"
                 />
    <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
  import HomeSwiper from "./childrenComps/HomeSwiper";
  import HomeRecommendView from "./childrenComps/HomeRecommendView";
  import FeatureView from "./childrenComps/FeatureView";

  import GoodsList from "components/content/goods/GoodsList";
  import TabControl from "components/content/tabcontrol/TabControl";
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {debounce} from 'common/utils'
  import {itemListerMixin} from "common/mixin";

  export default {
    name: "Home",
    components:{

      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListerMixin],
    data(){
         return {
           banners: [],
           recommends: [],
           goods:{
             'pop':{page:0,list:[]},
             'new':{page:0,list:[]},
             'sell':{page:0,list:[]}
           },
           currentType:'pop',
           isShowBackTop:false,
           tabOffsetTop:0,
           isTabFixed:false,
         }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }

    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,200);
      this.$refs.scroll.refresh();
    },
    deactivated(){
      //1.保存y值
      this.saveY = this.$refs.scroll.getScrollY();

      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgLister)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },

    methods:{
      /*
       *事件监听相关的方法
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;
      },
      backClick(){
          this.$refs.scroll.scrollTo(0,0);
      },
      contentScroll(position){
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 500;
        //2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore(){
        this.getHomeGoods(this.currentType);

      },
      swiperImageLoad(){

        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;

      },
      /*
      *网络请求相关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners =res.data.data.banner.list;
          this.recommends =res.data.data.recommend.list;


        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page +=1;
          this.$refs.scroll.finishPullUp();

      })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height:100vh;
    position:relative;
  }
  /*#home{*/
  /*  padding: 44px 0 800px;*/
  /*}*/
  .home-nav{

    background-color: var(--color-tint);
    color:#fff;

    /*在使用默认浏览器时，为了不让导航跟随滚动*/
    position: fixed;
    z-index:9;
    top:0;
    left:0;
    right:0;

  }
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top:44px;*/
  /*  z-index:1;*/
  /*}*/
  .content{

      /*overflow:hidden;*/
      position: absolute;
      top:44px;
      bottom:49px;

  }
  .tabControl{
    position: relative;
    /*z-index只对定位元素起效果*/
    z-index:9
  }

</style>
