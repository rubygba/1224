<template>
<div class="index">
  <div class="alert1" v-if="page === 0">
    <div class="alertbg">
      <img src="~assets/alertbg.png" alt="">
    </div>
    <div class="alert1-container">
      <h2>圣诞礼物大派送</h2>
      <h3>快来抢礼物！</h3>
      <div class="btn btn1" @click="page = 1, startGame()">开始抢</div>
    </div>
  </div>
  <div class="main-container">
    <div class="mc-timer">倒计时：{{count}}s</div>

    <div class="mc-content"></div>

    <div class="mc-banner">
      <div class="mc-banner-top">
        <img src="~assets/banner1.png" alt="">
      </div>
      <div class="mc-banner-logo">
        <img src="~assets/banner2.png" alt="">
        <div class="prize-counter">礼物数量：</div>
      </div>
    </div>
  </div>
  <div class="alert2" v-if="page === 2">
    <div class="alertbg">
      <img src="~assets/alertbg.png" alt="">
    </div>
    <div class="alert2-container">
      <h2>恭喜你</h2>
      <h3>获得20个圣诞老人派发的礼物，</h3>
      <h3>快去打开吧</h3>
      <a href="last.html" class="btn btn2">立即开启</a>
    </div>
  </div>
  <div class="alert2 alert3" v-if="page === 3">
    <div class="alertbg">
      <img src="~assets/alertbg.png" alt="">
    </div>
    <div class="alert2-container">
      <h2>很抱歉</h2>
      <h3>你一个礼物都没拿到哦</h3>
      <div class="btn btn3" @click="page = 1, resetGame()">再试一次</div>
    </div>
  </div>
  <!-- <BackTop></BackTop> -->
</div>
</template>

<script>
import * as API from 'common/js/api'
import BackTop from 'common/vue/BackTop'

class Present {
  constructor(number, ox, oy) {
    this.ox = ox
    this.oy = oy
    this.xpos = 0
    this.ypos = 0
    this.vx = 0
    this.vy = 0
    this.mass = 1
    this.number = number
    this.w = 260
    this.delay = Math.random()
    this.tdelay = 0
    this.dom = document.createElement('div')
    this.dom.className = 'present present-' + Math.ceil(Math.random() * 9)
    this.dom.style.transform = `translate3d(0px, ${this.oy}px, 0)`
    this.dom.style.left = (Math.random() * this.w) + ox - (this.w / 2) + 'px'
    this.dom.addEventListener('click', () => {
      this.dom.className = 'present click'
      // this.dom.innerHTML = '+1'
    })
  }

  add(parent) {
    parent.appendChild(this.dom)
  }

  setPosition(x, y) {
    this.dom.style.transform = `translate3d(${x}px, ${y}px, 0)`
    // this.dom.style.left = x + 'px'
    // this.dom.style.top = y + 'px'
  }

  setVisible(iShow) {
    this.dom.style.display = iShow ? 'block' : 'none'
    console.log(iShow)
  }

  move(gravity, floor) {
    this.tdelay++
    // if (this.tdelay > this.delay * 60 * 5) {
    if (this.tdelay > this.number * 12) {
      this.vy += gravity * this.mass
      this.ypos += this.vy
      if (this.ypos < floor) {
        // this.setVisible(1)
        this.setPosition(this.xpos, this.ypos + this.oy)
      } else {
        // this.setVisible(0)
      }
    }
  }

  reset() {
    this.xpos = 0
    this.ypos = 0
    this.vx = 0
    this.vy = 0
    this.tdelay = 0
    this.setPosition(0, this.oy)
  }
}

export default {
  components: {
    BackTop
  },
  data: function() {
    return {
      page: 0,
      list: [],
      gravity: .05,
      floor: 1000,
      count: 6,
      clickPrz: 0
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
@import '../styles/index.styl'
</style>

