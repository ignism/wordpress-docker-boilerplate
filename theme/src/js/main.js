import { EventBus } from './event-bus'

let count = 0

window.addEventListener('load', (event) => {
  EventBus.$emit('init')
})

EventBus.$on('click', (event) => {
  count++
  EventBus.$emit('count', { clickCount: count })
})