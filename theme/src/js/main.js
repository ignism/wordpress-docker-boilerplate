import { eventBus } from './event-bus'
import { scrollController } from './scroll-controller'
import ScrollMagic from 'scrollmagic'
import debounce from 'lodash/debounce'
import { config } from './config'

let sceneScrolledTop
let sceneScrolledBottom

function initSceneScrolledTop() {
  sceneScrolledTop = new ScrollMagic.Scene({
    offset: config.offsetFromTop
  }).addTo(scrollController) 

  sceneScrolledTop.on('enter', (event)=>{
    eventBus.$emit('scrolled-from-top')
  })

  sceneScrolledTop.on('leave', (event)=>{
    eventBus.$emit('scrolled-to-top')
  })
}

function initSceneScrolledBottom() {
  sceneScrolledBottom = new ScrollMagic.Scene({
    offset: document.body.clientHeight - window.innerHeight
  }).addTo(scrollController) 

  sceneScrolledBottom.on('enter', (event)=>{
    eventBus.$emit('scrolled-to-bottom')
  })

  sceneScrolledBottom.on('leave', (event)=>{
    eventBus.$emit('scrolled-from-bottom')
  })
}

window.addEventListener('DOMContentLoaded', (event) => {
  eventBus.$emit('init', event)

  initSceneScrolledTop()
  initSceneScrolledBottom()

  eventBus.$on('barba-page-change', event => {
    if (sceneScrolledBottom) {
      Controller.removeScene(sceneScrolledBottom)
      initSceneScrolledBottom()
    }
  })
})

window.addEventListener('resize', debounce((event) => {
  eventBus.$emit('window-resized', event)
}, 400))
