import { EventBus } from './event-bus'

window.addEventListener('load', (event) => {
  EventBus.$emit('init')
})

EventBus.$on('click', (event) => {
  EventBus.$emit('count')
})

EventBus.$on('over', (event) => {
  console.log('over event')
})
