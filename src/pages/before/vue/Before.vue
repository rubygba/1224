<template>
<div class="before">
  <div class="before-1">
    <div class="b1-gift txt-right">
      <img src="~assets/before_float.png" alt="">
    </div>
  </div>
  <div class="before-2">
    <div class="b2-top txt-center">
      每收1名徒弟，最高收入6元！
    </div>
    <div class="b2-bottom clearfix">
      <div class="float-left">圣诞分享金币收益：240</div>
      <div class="float-right">圣诞收徒收益：XX元</div>
    </div>
    <div class="b2-rule">
      <div class="b2-rule-title txt-center"><i></i>——   活动规则   ——<i></i></div>
      <div class="b2-rule-content">
        <h5>活动时间：</h5>
        <p>2017年12月23日09：00-12月27日24：00</p>
        <h5>活动介绍：</h5>
        <p>1. 活动期间，点击分享按钮，邀请好友成为你的徒弟，每新增一位有效徒弟可获得2元奖励。</p>
        <p>2. 活动期间，每日首次成功分享收徒链接，可获得10-20金币的奖励。</p>
        <p>3. 12月24日和12月25日将会开启“圣诞祝福“，每个用户都有机会领取iPhoneX/现金礼包等优质好礼~</p>
        <p>4. 如果你是首次收徒,当新徒弟满足进贡100金币的条件时，还可额外获得1元奖励。</p>
        <p>5. 用户仅能使用个人有效注册账号参与此次活动，不得以非法形式或不正当形势注册账号参与活动。同一自然人仅可通过一个注册账号参与本次活动。</p>
        <p>6. 本活动奖励可与日常收徒的3元奖励叠加获得。</p>
        <p>7. 用户获取的红包奖励将会在活动结束后存至系统钱包，您可在活动页面内查看预计收入，活动结束后移至【我的】-【钱包】查看明细。</p>
        <p>8. 零钱可通过微信或支付宝进行提现，提现订单将在人工审核后5个工作日内到账。如果后台检测到用户有作弊行为，则该用户会被拉黑处理，活动奖励概不兑现，并保留追究其法律责任的权利。</p>
        <p>9. 有效徒弟：活动期间收取的每位徒弟，满足“建立师徒关系当日向师傅进贡200金币”的条件时，即为有效徒弟</p>
        <h5>其他规则声明：</h5>
        <p>1. 用户在本次活动遇到任何问题，可以通过两个途径反馈：
        <br>&nbsp;&nbsp;a. 官方QQ群：651773997；
        <br>&nbsp;&nbsp;b. 打开【我的】-【帮助与反馈】-提交问题。</p>
        <p>2. 本次活动最终解释权归东方头条所有。<br>&nbsp;&nbsp;东方头条会按照国家相关规定代扣个人所得税</p>
      </div>
    </div>
  </div>
  <div class="before-3"></div>
  <div class="before-4"></div>
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
@import '../styles/before.styl'
</style>

