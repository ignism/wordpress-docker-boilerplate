import { EventBus } from './event-bus'

let count = 0

window.addEventListener('DOMContentLoaded', (event) => {
  EventBus.$emit('init')
})

EventBus.$on('click', (event) => {
  count++
  EventBus.$emit('count', { clickCount: count })
})