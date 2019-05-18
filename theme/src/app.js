import Vue from 'vue'
import App from './js/vue/app.vue'

let element = document.querySelector('#app')

if (element) {
    new Vue({
        render: (h) => h(App)
    }).$mount(element)
}
