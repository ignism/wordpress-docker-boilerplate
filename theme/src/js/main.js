import ScrollMagic from 'scrollmagic'
import debounce from 'lodash/debounce'
import { eventBus } from './core/event-bus'
import { scrollController } from './core/scroll-controller'
import { config } from './core/config'

let sceneScrolledTop
let sceneScrolledBottom

function initToggleMenu() {
  let toggles = Array.from(document.querySelectorAll('.toggle-menu'))

  console.log(toggles)
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      eventBus.$emit('toggle-menu')
    })
  })
}

function initToggleFooter() {
  let toggles = Array.from(document.querySelectorAll('.toggle-footer'))

  console.log(toggles)
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      eventBus.$emit('toggle-footer')
    })
  })
}

function initSceneScrolledTop() {
  sceneScrolledTop = new ScrollMagic.Scene({
    offset: config.offsetFromTop
  }).addTo(scrollController)

  sceneScrolledTop.on('enter', (event) => {
    eventBus.$emit('scrolled-from-top')
  })

  sceneScrolledTop.on('leave', (event) => {
    eventBus.$emit('scrolled-to-top')
  })
}

function initSceneScrolledBottom() {
  sceneScrolledBottom = new ScrollMagic.Scene({
    offset: document.body.clientHeight - window.innerHeight
  }).addTo(scrollController)

  sceneScrolledBottom.on('enter', (event) => {
    eventBus.$emit('scrolled-to-bottom')
  })

  sceneScrolledBottom.on('leave', (event) => {
    eventBus.$emit('scrolled-from-bottom')
  })
}

window.addEventListener('DOMContentLoaded', (event) => {
  eventBus.$emit('init', event)

  initToggleMenu()
  initToggleFooter()
  initSceneScrolledTop()
  initSceneScrolledBottom()

  eventBus.$on('barba-page-change', (event) => {
    if (sceneScrolledBottom) {
      scrollController.removeScene(sceneScrolledBottom)
      initSceneScrolledBottom()
    }
  })
})

window.addEventListener(
  'resize',
  debounce((event) => {
    eventBus.$emit('window-resized', event)
  }, 400)
)
