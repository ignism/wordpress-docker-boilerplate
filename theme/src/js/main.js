import { EventBus } from './event-bus'
import { Controller } from './scrollmagic-controller'
import ScrollMagic from 'scrollmagic'
import debounce from 'lodash/debounce'

window.addEventListener('DOMContentLoaded', (event) => {
  EventBus.$emit('init', event)

  let scrolledToBottom = new ScrollMagic.Scene({
    offset: document.body.clientHeight - window.innerHeight
  }).addTo(Controller) 

  scrolledToBottom.on('enter', (event)=>{
    EventBus.$emit('scrolled-to-bottom')
  })

  scrolledToBottom.on('leave', (event)=>{
    EventBus.$emit('scrolled-from-bottom')
  })

  EventBus.$on('barba-page-change', event => {
    if (scrolledToBottom) {
      Controller.removeScene(scrolledToBottom)

      scrolledToBottom = new ScrollMagic.Scene({
        offset: document.body.clientHeight - window.innerHeight
      }).addTo(Controller)

      scrolledToBottom.on('enter', (event)=>{
        EventBus.$emit('scrolled-to-bottom')
      })

      scrolledToBottom.on('leave', (event)=>{
        EventBus.$emit('scrolled-from-bottom')
      })
    }
  })
})

window.addEventListener('resize', debounce((event) => {
  EventBus.$emit('window-resized', event)
}, 400))
