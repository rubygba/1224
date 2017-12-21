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
  }
})