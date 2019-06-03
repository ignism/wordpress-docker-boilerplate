import { EventBus } from './event-bus'
import { Controller } from './scrollmagic-controller'
import ScrollMagic from 'scrollmagic'

window.addEventListener('DOMContentLoaded', (event) => {
  EventBus.$emit('init')

  const scene = new ScrollMagic.Scene({
    offset: document.body.clientHeight - window.innerHeight
  })
  scene.addTo(Controller) // assign the scene to the controller
  scene.on('enter', (event)=>{
    EventBus.$emit('scrolled-to-bottom')
  })
})
