import './css/style.css'
import { siteManager } from './js/main.js'
import './js/components'
import './js/layout'

window.addEventListener('DOMContentLoaded', (event) => {
    siteManager.init()

    console.log(siteManager)
});

// EXAMPLE: integrate Vue components
//
// import Vue from 'vue'
// import Button from './js/vue/button.vue'
// import Counter from './js/vue/counter.vue'
//
// let buttons = Array.from(document.querySelectorAll('.button'))
// buttons.forEach((button) => {
//   new Vue({
//     render: (h) => h(Button)
//   }).$mount(button)
// })
//
// let counters = Array.from(document.querySelectorAll('.counter'))
// counters.forEach((counter) => {
//   new Vue({
//     render: (h) => h(Counter)
//   }).$mount(counter)
// })
//
// END EXAMPLE
