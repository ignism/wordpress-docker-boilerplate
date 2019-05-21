import { EventBus } from './event-bus'

let count = 0

window.addEventListener('DOMContentLoaded', (event) => {
  EventBus.$emit('init')

  let headerHeight = document.querySelector('.header-main').offsetHeight + 'px'

  if (document.querySelector('.header-space')) {
    document.querySelector('.header-space').style.paddingTop = headerHeight
  }
})

EventBus.$on('click', (event) => {
  count++
  EventBus.$emit('count', { clickCount: count })
})