<template>
  <div>
    <m-header class="header" :seller="seller"></m-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
         <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from 'components/header/header';
const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then(res => {
      res = res.data;
      if (res.errno === ERR_OK) {
        this.seller = res.data;
      }
    });
  },
  components: {
    MHeader: header
  }
};
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl'
.tab {
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item {
    flex: 1
    text-align: center
    &>a {
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.router-link-active {
        color: rgb(240, 20, 20)
      }
    }
  }
}
</style>
