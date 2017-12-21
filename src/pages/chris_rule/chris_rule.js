import Vue from 'vue'

import fastclick from 'fastclick'
fastclick.attach(document.body, {})

import 'common/styles/gb-strap.css'
import './styles/chris_rule.styl'

new Vue({
  el: '#app',
  // template: '<App/>',
  // components: { App }
  data() {
    return {
      isChristmas: false
    }
  },
  computed: {
  },
  created() {
    let nowDay = this.generateBeforeDate().substring(0, 8)
    if (nowDay === '20171224' || nowDay === '20171225') {
      this.isChristmas = true
    }
    console.log(nowDay)
  },
  mounted() {
  },
  methods: {
    // 个位数双位显示
    pad2: function(n) {
      return n < 10 ? '0' + n : n
    },
    generateBeforeDate: function() {
      let date = new Date()

      return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds()) // getMonth() 返回索引值0-11，需要+1
    },
  }
})