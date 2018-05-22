<template>
  <div class="ratings" ref="ratings">
      <div>
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
      <div class="ratingselect-wrapper border-1px">
        <ratingselect :ratings=ratings :ratingType=ratingType :onlyText=onlyText @selectType="selectType" @toggleContent="toggleContent"></ratingselect>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType,rating.text)">
            <img :src="rating.avatar" width="28" height="28" alt="" class="avatar">
            <div class="content">
                <span class="username">{{rating.username}}</span>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon" :class="{'icon-thumb_up':rating.rateType === 0 || 'icon-thumb_down'}"></span>
                  <span class="recommend-item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                </div>
                <div class="rating-time">
                  <span class="time">{{rating.rateTime | formatDate}}</span>
                </div>
            </div>
          </li>
        </ul>
      </div>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import split from 'components/split/split';
import star from 'components/star/star';
import ratingselect from 'components/ratingselect/ratingselect';
import { formatDate } from 'common/js/date';
const ERR_OK = 0;
export default {
  components: {
    split,
    star,
    ratingselect
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      ratingType: 2,
      onlyText: false
    };
  },
  created() {
    this.$http.get('/api/ratings').then(res => {
      res = res.data;
      if (res.errno === ERR_OK) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
  },
  methods: {
    needShow(type, text) {
      if (this.onlyText && !text) {
        return false;
      }
      if (this.ratingType === 2) {
        return true;
      } else {
        return this.ratingType === type;
      }
    },
    selectType(obj) {
      this.ratingType = obj.type;
    },
    toggleContent(obj) {
      this.onlyText = obj.flag;
    }
  },
  filters: {
    formatDate(time) {
      return formatDate(time, 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
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
  .ratingselect-wrapper {
    padding: 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
  }
  .rating-wrapper {
    .rating-item {
      display: flex
      padding: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child {
        border-none()
      }
      .avatar {
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        border-radius: 50%
      }
      .content {
        position: relative
        flex: 1
        font-size: 0
        color: rgb(7, 17, 27)
        .username {
          font-size: 10px
          line-height: 12px
        }
        .star-wrapper {
          margin: 4px 0 6px 0
          .star {
            display: inline-block
            margin-right: 6px
          }
          .delivery-time {
            display: inline-block
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          }
        }
        .text {
          font-size: 12px
          line-height: 18px
          font-weight: 700
        }
      }
      .recommend {
        margin-top: 8px
        font-size: 0
        .icon {
          font-size: 12px
          line-height: 16px
          color: rgb(183, 187, 191)
          &.icon-thumb_up {
            color: rgb(0, 160, 220)
          }
        }
        .recommend-item {
          vertical-align: top
          margin-left: 8px
          padding: 0 12px
          text-align: center
          border: 1px solid rgba(7, 17, 27, 0.1)
          border-radius: 2px
          background-color: rgb(2555, 255, 255)
          font-size: 9px
          line-height: 16px
          color: rgb(147, 153, 159)
        }
      }
      .rating-time {
        position: absolute
        right: 0
        top: 0
        .time {
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 12px
        }
      }
    }
  }
}
</style>
