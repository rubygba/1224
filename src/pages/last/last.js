// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import fastclick from 'fastclick'
import cookies from 'js-cookie'
// import cache from 'web-storage-cache'
// import VueTouchRipple from 'vue-touch-ripple'

import App from './vue/Last.vue'

Vue.config.productionTip = false

// fastclick
fastclick.attach(document.body, {})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
