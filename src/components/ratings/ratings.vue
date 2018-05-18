<template>
  <div class="ratings">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <span class="title">综合评分</span>
          <span class="rank">高于周边商家{{seller.rankRate}}%</span>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score="seller.serviceScore" :size="36"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score="seller.foodScore" :size="36"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="content"></div>
  </div>
</template>
<script>
import split from 'components/split/split';
import star from 'components/star/star';
export default {
  components: {
    split,
    star
  },
  props: {
    seller: {
      type: Object
    }
  }
};
</script>
<style lang="stylus" scoped>
.ratings {
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overview {
    display: flex
    padding: 18px 0
    font-size: 0
    .overview-left {
      flex: 0 0 137px
      width: 137px
      text-align: center
      color: rgb(7, 17, 27)
      .score {
        font-size: 24px
        line-height: 28px
        color: rgb(255, 153, 0)
      }
      .title {
        display: block
        margin-top: 6px
        margin-bottom: 8px
        font-size: 12px
        font-weight: 700
        line-height: 12px
      }
      .rank {
        display: block
        margin-bottom: 6px
        font-size: 10px
        line-height: 10px
      }
    }
    .overview-right {
      flex: 1
      padding: 0 12px
      border-left: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(7, 17, 27)
      .score-wrapper {
        font-size: 0
        margin-bottom: 8px
        .title {
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 18px
        }
        .star {
          display: inline-block
          margin: 0 12px
        }
        .score {
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 18px
          color: rgb(255, 153, 0)
        }
      }
      .delivery-wrapper {
        font-size: 0
        .title {
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 18px
        }
        .delivery {
          display: inline-block
          margin: 0 12px
          vertical-align: top
          font-size: 12px
          line-height: 18px
          color: rgb(147, 153, 159)
        }
      }
    }
  }
}
</style>
