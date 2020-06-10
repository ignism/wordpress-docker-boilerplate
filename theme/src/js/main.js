import '@src/js/helpers/pre-loader.js'

// node modules
import Vue from 'vue'
import barba from '@barba/core'
import prefetch from '@barba/prefetch'
import anime from 'animejs'
import debounce from 'lodash/debounce'
import zenscroll from 'zenscroll'

// custom modules
import eventBus  from '@src/js/helpers/event-bus'
import themeConfig from '@src/js/helpers/theme.config.js'

// vue components
import Styleguide from '@src/vue/apps/Styleguide.vue'
import PageHeader from '@src/vue/layout/PageHeader.vue'
import PageFooter from '@src/vue/layout/PageFooter.vue'
import NavOverlay from '@src/vue/layout/NavOverlay.vue'
import LazyImage from '@src/vue/components/LazyImage.vue'
import Slider from '@src/vue/components/Slider.vue'
import CustomCursor from '@src/vue/components/CustomCursor.vue'
import ScrollTrigger from '@src/vue/animations/ScrollTrigger.vue'
import VideoPlayer from '@src/vue/components/VideoPlayer.vue'

Vue.component('styleguide', Styleguide)
Vue.component('page-header', PageHeader)
Vue.component('page-footer', PageFooter)
Vue.component('nav-overlay', NavOverlay)
Vue.component('lazy-image', LazyImage)
Vue.component('slider', Slider)
Vue.component('custom-cursor', CustomCursor)
Vue.component('scroll-trigger', ScrollTrigger)
Vue.component('video-player', VideoPlayer)

zenscroll.setup(800, 0)

// init vue
const app = new Vue({
  el: '#app',
  data: {
    eventBus: eventBus
  },
  methods: {
    init() {
      anime({
        targets: this.$el,
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: '2000ms',
        complete: () => {
          eventBus.$emit('app:init')
        }
      })
    }
  },
  mounted() {
    window.addEventListener('resize', debounce(() => {
      eventBus.$emit('window:resized')
    }, 200))
    
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        this.init()
      }, 800)
    })
  }
})

// init barba
barba.use(prefetch)

barba.hooks.before((data) => {
  console.log(data)
})

barba.hooks.beforeEnter(() => {
  window.scrollTo(0, 0)
})
barba.hooks.beforeLeave(() => {
  eventBus.$emit('barba:beforeLeave')
})

barba.hooks.enter((data) => {
  let compiled = Vue.compile('<main data-barba=\"container\" style=\"opacity:0\">' + data.next.container.innerHTML + '</main>')

  new Vue({
    render: (h) => h(compiled)
  }).$mount(data.next.container)

  return data
})

barba.hooks.afterEnter((data) => {
  // only emit after initial init
  if (data.current.container) {
    eventBus.$emit('barba:afterEnter')
  }

  let hash = data.next.url.hash

  return anime({
    targets: 'main',
    opacity: [0, 1],
    duration: '400ms',
    easing: 'linear',
    complete: () => {
      if (hash) {
        let element = document.getElementById(hash)
        zenscroll.to(element)
      }
    }
  })
})

barba.init({
  transitions: [{
    name: 'default-transition',
    leave() {
      return anime({
        targets: 'main',
        opacity: [1, 0],
        duration: '400ms',
        easing: 'linear',
      }).finished
    },
  }],
  debug: true,
  timeout: 8000
})

eventBus.$on('link:anchor', (event) => {
  let element = document.getElementById(event.anchor)
  console.log("element", element)
  console.log("event.anchor", event.anchor)
  if (element) {
    zenscroll.to(element)
  } else {
    let anchor = event.pathname + '#' + event.anchor
    console.log("anchor", anchor)
    barba.go(anchor)
  }
})
