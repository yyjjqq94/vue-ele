<template>
  <div class="food" v-show="showFlag" ref="food">
      <div class="content-wrapper">
          <div class="img-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
                </div>
          </div>
          <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper" v-show="food.count || food.count > 0">
                    <cartcontrol :food=food></cartcontrol>
                </div>
                <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
          </div>
          <split></split>
          <div class="info">
              <h1 class="title">商品介绍</h1>
              <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
              <h1 class="title">商品评价</h1>
              <ratingselect :ratings=food.ratings @selectType="selectType" :rating-type=ratingType :only-text=onlyText @toggleContent="toggleContent"></ratingselect>
              <div class="rating-wrapper">
                  <ul v-show="food.ratings">
                      <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="(rating, index) in food.ratings" :key="index">
                          <span class="time">{{rating.ratetime}}</span>
                          <p class="text">
                              <span class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                          </p>
                          <div class="user">
                              <span class="username">{{rating.username}}</span>
                              <img width="12" height="12" :src="rating.avatar" alt="" class="avatar">
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
export default {
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  data() {
    return {
      showFlag: false,
      ratingType: 2,
      onlyText: false
    };
  },
  methods: {
    addFirst() {
      Vue.set(this.food, 'count', 1);
    },
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    selectType(obj) {
      this.ratingType = obj.type;
    },
    needShow(type, text) {
      if (this.onlyText && !text) {
        return false;
      }
      if (this.ratingType === 2) {
        return true;
      } else {
        return type === this.ratingType;
      }
    },
    toggleContent(obj) {
      this.onlyText = obj.flag;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.food {
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 40
    width: 100%
    overflow: hidden
    background: #fff
    .img-header {
        width: 100%
        height: 375px
        img {
            width: 100%
            height: 100%
        }
        .back {
            position: absolute
            left: 0
            top: 10px
            .icon-arrow_lift {
                display: block
                padding: 10px
                font-size: 20px
                color: #fff
            }
        }
    }
    .content {
        position: relative
        padding: 18px
        .name {
            font-size: 14px
            line-height: 14px
            font-weight: 700
            color: rgb(7, 17, 27)
        }
        .extra {
            margin-top: 8px
            margin-bottom: 18px
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
        }
        .price {
            font-weight: 700
            line-height: 24px
            .now {
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
            }
            .old {
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            }
        }
        .cartcontrol-wrapper {
            position: absolute
            right: 18px
            bottom: 18px
        }
        .buy {
            position: absolute
            padding: 6px 12px
            right: 18px
            bottom: 18px
            width: 74px
            height: 24px
            text-align: center
            line-height: 24px
            font-size: 10px
            color: rgb(255, 255, 255)
            background: rgb(0, 160, 220)
            border-radius: 12px
        }
    }
    .info {
        padding: 26px
        .title {
            font-size: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
        }
        .text {
            display: block
            margin: 12px 16px
            font-size: 12px
            line-height: 24px
            color: rgb(77, 85, 93)
        }
    }
    .rating {
        padding: 18px
        position: relative
        .title {
            font-size: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
        }
        .rating-wrapper {
            .rating-item {
                padding: 16px 0
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child {
                    border-none()
                }
                .time {
                    font-size: 10px
                    line-height: 12px
                    color: rgb(147, 153, 159)
                }
                .text {
                    font-size: 12px
                    line-height: 16px
                    color: rgb(7, 17, 27)
                    font-weight: 700
                    .icon {
                        margin-right: 4px
                        line-height: 24px
                        color: rgb(147, 153, 159)
                        &.icon-thumb_up {
                            color: rgb(0, 160, 220)
                        }
                    }
                }
                .user {
                    position: absolute
                    right: 0
                    bottom: 16px
                    .username {
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        line-height: 12px
                        margin-right: 6px
                    }
                    .avatar {
                        border-radius: 50%
                    }
                }
            }
        }
    }
}
</style>
