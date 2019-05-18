import Vue from 'vue'
import About from './vue/About.vue'

let element = document.querySelector('#about')

if (element) {
    new Vue({
        render: (h) => h(About)
    }).$mount(element)
}
