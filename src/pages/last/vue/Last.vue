<template>
<div class="index">
  <div class="alert4" v-if="isRule">
    <div class="alertbg">
      <img src="~assets/alertbg.png" alt="">
    </div>
    <div class="alertclose" @click="isRule = false">
    </div>
    <div class="alert4-container">
      <p>1.活动仅限东方头条新用户参加，每位用户仅有1次参加机会。</p>
      <p>2.新人完成活动新人完成任务可获得现金奖励，完成分享被阅读任务奖励无上限，还有更多的活动奖励等你来拿哦。</p>
      <p>3.获得的现金可在“我的”-“钱包”内进行查看和体现。</p>
      <p>4.活动结束时间以东方头条官方信息为准，活动的最终解释权归东方头条所有。</p>
    </div>
  </div>
  <div class="main-container">
    <div class="mc-top">
      <div class="mc-top-avatar">
        <img src="~assets/mc-t1.png" alt="">
        <img class="avatar" src="~assets/mc-t2.png" alt="">
      </div>
      <div class="mc-top-rule" @click="isRule = true">
        <img src="~assets/mc-t4.png" alt="">
      </div>
      <div class="mc-top-name txt-center">xxxx</div>
      <div class="mc-top-txt txt-center">我在东方头条总共赚了100元</div>
      <div class="mc-top-tip txt-center"><img src="~assets/mc-t3.png" alt=""></div>
    </div>
    <div class="mc-bottom">
      <img src="~assets/2222.png" alt="">
    </div>
    <!-- <div class="mc-timer">倒计时：{{count}}s</div>

    <div class="mc-banner">
      <div class="mc-banner-top">
        <img src="~assets/banner1.png" alt="">
      </div>
      <div class="mc-banner-logo">
        <img src="~assets/banner2.png" alt="">
        <div class="prize-counter">礼物数量：</div>
      </div>
    </div> -->
  </div>
  <!-- <BackTop></BackTop> -->
</div>
</template>

<script>
import * as API from 'common/js/api'
import BackTop from 'common/vue/BackTop'

export default {
  components: {
    BackTop
  },
  data: function() {
    return {
      page: 1,
      list: [],
      gravity: .05,
      floor: 1000,
      count: 6,
      clickPrz: 0,
      isRule: false
    }
  },
  computed: {
  },
  created: function() {
  },
  mounted: function() {
  },
  methods: {
    startGame() {
      if (this.page !== 1) {
        return
      }
      let $content = document.querySelector('.mc-content')

      // 插入礼包dom
      for (let i = 0; i < 50; i++) {
        let present = new Present(i, window.innerWidth/2 - 30, 180)
        this.list.push(present)
        present.add($content)
      }

      let scope = this
      // 下落动画
      window.presentTimer = requestAnimationFrame(function ani() {
        for (var i = 0; i < 40; i++) {
          scope.list[i].move(scope.gravity, scope.floor)
        }
        presentTimer = requestAnimationFrame(ani)
      })
      // 倒计时
      window.countTimer = setInterval(function co() {
        if (scope.count > 0) {
          scope.count--
        } else {
          cancelAnimationFrame(presentTimer)
          clearInterval(countTimer)
          scope.clickPrz = document.querySelectorAll('.click').length
          scope.goPage(2)
        }
        console.log('interval')
      }, 1000)
    },
    resetGame() {
      if (this.page !== 1) {
        return
      }
      // 插入礼包dom
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].reset()
      }

      let scope = this
      // 下落动画
      window.presentTimer = requestAnimationFrame(function ani() {
        for (var i = 0; i < 40; i++) {
          scope.list[i].move(scope.gravity, scope.floor)
        }
        presentTimer = requestAnimationFrame(ani)
      })
      // 倒计时
      this.count = 6
      window.countTimer = setInterval(function co() {
        if (scope.count > 0) {
          scope.count--
        } else {
          cancelAnimationFrame(presentTimer)
          clearInterval(countTimer)
          scope.clickPrz = document.querySelectorAll('.click').length
          scope.goPage(2)
        }
        console.log('interval')
      }, 1000)
    },
    goPage(n) {
      this.page = n
      if (this.page === 2) {
        if (this.clickPrz < 1) {
          this.page = 3
        }
      }
    },
    // 个位数双位显示
    pad2: function(n) {
      return n < 10 ? '0' + n : n
    },
    generateBeforeDate: function() {
      let date = new Date()

      return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds()) // getMonth() 返回索引值0-11，需要+1
    },
    backTop: function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="stylus">
@import '~@/common/styles/gb-strap.css'
@import '../styles/last.styl'
</style>

