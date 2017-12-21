import Vue from 'vue'

import fastclick from 'fastclick'
fastclick.attach(document.body, {})

import 'common/styles/gb-strap.css'
import './styles/chris_share.styl'

new Vue({
  el: '#app',
  // template: '<App/>',
  // components: { App }
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
})