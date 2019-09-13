import Vue from 'vue'
import App from './vue/styleguide.vue'

let element = document.querySelector('#app')

if (element) {
    new Vue({
        render: (h) => h(App)
    }).$mount(element)
}
