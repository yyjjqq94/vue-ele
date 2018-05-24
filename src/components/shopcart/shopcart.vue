<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left" @click="toggleList">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'highlight':totalCount>0}">
                      <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                  </div>
                  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <div class="pay" :class="payClass">{{payDesc}}</div>
          </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
              <ul>
                  <li class="food" v-for="(food,index) in selectFoods" :key="index">
                      <span class="name">{{food.name}}</span>
                      <div class="price">
                          <span>￥{{food.price * food.count}}</span>
                      </div>
                      <div class="cartcontrol-wrapper">
                          <cartcontrol :food=food></cartcontrol>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      <div class="mask" @click="hideList" v-show="listShow"></div>
  </div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      fold: true
    };
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元结算`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow: {
      get: function() {
        if (!this.totalCount) {
          this._initFold();
          return false;
        }
        return !this.fold;
      },
      set: function(newVal) {
        this.fold = newVal;
      }
    }
  },
  methods: {
    _initFold() {
      this.fold = true;
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.listShow = !this.fold;
    },
    hideList() {
      this.listShow = !this.fold;
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.listContent, {
          click: true
        });
      } else {
        this.scroll.refresh();
        console.log('refresh');
      }
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.shopcart {
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content {
        display: flex
        position: relative
        background: #141d27
        sont-size: 0
        color: rgba(255, 255, 255, 0.4)
        z-index: 50
        .content-left {
            flex: 1
            .logo-wrapper {
                display: inline-block
                position: relative
                top: -10px
                margin: 0 12px
                padding: 6px
                width: 56px
                height: 56px
                box-sizing: border-box
                vertical-align: top
                border-radius: 50%
                background: #141d27
                .logo {
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    background: #2b343c
                    text-align: center
                    .icon-shopping_cart {
                        line-height: 44px
                        font-size: 24px
                        color: #80858a
                        &.highlight {
                            color: #fff
                        }
                    }
                    &.highlight {
                        background: rgb(0, 160, 280)
                    }
                }
                .num {
                    position: absolute
                    top: 0
                    right: 0
                    width: 24px
                    height: 16px
                    line-height: 16px
                    text-align: center
                    border-radius: 16px
                    font-size: 9px
                    font-weight: 700
                    color: #fff
                    background: rgb(240, 20, 20)
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                }
            }
            .price {
                display: inline-block
                vertical-align: top
                margin-top: 12px
                padding-right: 12px
                line-height: 24px
                box-sizing: border-box
                border-right: 1px solid rgba(255, 255, 255, 0.1)
                font-size: 16px
                font-weight: 700
                &.highlight {
                    color: #fff
                }
            }
            .desc {
                display: inline-block
                vertical-align: top
                line-height: 24px
                margin: 12px 0 0 12px
                font-size: 10px
            }
        }
        .content-right {
            flex: 0 0 105px
            width: 105px
            .pay {
                height: 48px
                line-height: 48px
                text-align: center
                font-size: 12px
                font-weight: 700
                background: #2b333b
                &.not-enough {
                    background: #2b333b
                }
                &.enough {
                    background: #00b43c
                    color: #fff
                }
            }
        }
    }
    .shopcart-list {
        position: absolute
        bottom: 48px
        left: 0
        z-index: 40
        width: 100%
        .list-header {
            height: 40px
            line-height: 40px
            padding: 0 18px
            background: #f3f5f7
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            .title {
                float: left
                font-size: 14px
                color: rgb(7, 17, 27)
            }
            .empty {
                float: right
                font-size: 12px
                color: rgb(0, 160, 220)
            }
        }
        .list-content {
            padding: 0 18px
            max-height: 217px
            overflow: hidden
            background: #fff
            .food {
                position: relative
                padding: 12px 0
                box-sizing: border-box
                border-1px(rgba(7, 17, 27, 0.1))
                .name {
                    line-height: 24px
                    hight: 24px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                }
                .price {
                    position: absolute
                    right: 90px
                    bottom: 12px
                    line-height: 24px
                    hight: 24px
                    color: rgb(240, 20, 20)
                    font-weight: 700
                }
                .cartcontrol-wrapper {
                    position: absolute
                    right: 0
                    bottom: 6px
                }
            }
        }
    }
    .mask {
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 30
        background: rgba(7, 17, 27, 0.6)
        filter: blur(10px)
    }
}
</style>
