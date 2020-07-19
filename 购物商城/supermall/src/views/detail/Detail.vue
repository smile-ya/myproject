<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
    <detail-params-info ref="params" :param-info="itemParams"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <detail-bottom-bar @addCart="addToCart"/>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  <toast :message="message" :show="show"/>
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {debounce} from "common/utils";

  import {getDetail,Goods,Shop,getRecommend} from "network/detail";
  import {itemListerMixin} from "common/mixin";
  import BackTop from 'components/content/backTop/BackTop'
  import Toast from "components/common/toast/Toast";

  export default {
    name: "Detail",
    components:{
      DetailCommentInfo,
      DetailGoodsInfo,
      DetailShopInfo,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop,
      Toast

    },
    mixins:[itemListerMixin],
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        itemParams:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
        message:'',
        show:false
      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.iid;

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
             //1.获取顶部的图片轮播数据
              const data = res.data.result;


              this.topImages = data.itemInfo.topImages

            //2.获取商品信息
              this.goods = new Goods(data.itemInfo,data.columns, data.shopInfo.services)

              //3.获取店铺信息
              this.shop = new Shop( data.shopInfo);

              //4.获取商品详情数据
              this.detailInfo = data.detailInfo;


              //5.取出参数的信息
              this.itemParams =data.itemParams;

              //6.取出评论的信息
              if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
              }

              this.$nextTick(()=>{
                //根据最新的数据，对应的DOM是已经被渲染出来的
                //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片
                this.themeTopYs = []
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)


              })

      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list;
      })

      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-30)
        this.themeTopYs.push(Number.MAX_VALUE);

      },100)


    },
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgLister);
    },


    methods:{
      imgLoad(){
        const refresh = debounce(this.$refs.scroll.refresh,200);
        //图片懒加载
        refresh();
        this.getThemeTopY()

      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0);
      },
      contentScroll(position){
          //1.获取y值
        const positionY = -position.y

          //2.positionY和主题中值进行对比
        let length = this.themeTopYs.length
        for(let i = 0;i < length-1;i++){
          if(this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }

          //2.判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 500;

        }



      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车里
        this.$store.dispatch('addCart',product).then(res => {
          this.message=res;
          this.show = true;

          setTimeout(()=>this.show = false,1500)
          // alert(res);
        })

      }
    }
  }
</script>

<style scoped>
  #detail{
    position:relative;
    z-index:9;

    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index:9;
    background-color: #ffffff;
  }
  .content{

    height: calc(100% - 44px - 100px);
    background-color: #ffffff;
  }
</style>
