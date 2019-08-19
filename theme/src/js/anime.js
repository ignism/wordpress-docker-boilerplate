import { eventBus } from './core/event-bus'
import anime from 'animejs/lib/anime.es.js'

eventBus.$on('init', () => {
  anime({
    targets: '.anime-text',
    translateY: [100, 0],
    opacity: [0, 1],
    lineHeight: ['2em', '1em'],
    easing: 'easeOutCirc',
    duration: 800
  })
})
