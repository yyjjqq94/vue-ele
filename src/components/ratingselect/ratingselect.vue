<template>
    <div class="ratingselect border-1px">
        <div class="up border-1px">
            <span class="block all" :class="{'active':ratingType === 2}" @click="select(2,$event)">全部<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':ratingType === 0}" @click="select(0,$event)">推荐<span class="count">{{ratingUp}}</span></span>
            <span class="block negative" :class="{'active':ratingType === 1}" @click="select(1,$event)">吐槽<span class="count">{{ratingDown}}</span></span>
        </div>
        <div class="down" @click="toggleContent">
            <i class="icon-check_circle" :class="{'active':onlyText}"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    ratingType: {
      type: Number,
      default: 2
    },
    onlyText: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ratingUp() {
      let length = 0;
      this.ratings.forEach(rating => {
        if (rating.rateType === 0) {
          length++;
        }
      });
      return length;
    },
    ratingDown() {
      let length = 0;
      this.ratings.forEach(rating => {
        if (rating.rateType === 1) {
          length++;
        }
      });
      return length;
    }
  },
  methods: {
    select(type, event) {
      this.$emit('selectType', { type: type });
    },
    toggleContent() {
      let flag = !this.onlyText;
      this.$emit('toggleContent', { flag: flag });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.ratingselect {
    padding: 12px 0
    .up {
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .block {
            display: inline-block
            padding: 8px 12px
            margin-right: 8px
            &.active {
                color: rgb(255, 255, 255)
                background: rgb(0, 160, 220)
            }
        }
    }
    .down {
        padding-top: 12px
        font-size: 0
        line-height: 24px
        .icon-check_circle {
            display: inline-block
            vertical-align: top
            font-size: 24px
            color: rgba(7, 17, 27, 0.1)
            margin-right: 4px
            &.active {
                color: #00c850
            }
        }
        .text {
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(147, 153, 1159)
        }
    }
}
</style>
