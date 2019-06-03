import { EventBus } from './event-bus'

EventBus.$once('init', (event) => {
  let header = document.querySelector('.header-main')
  let menu = document.querySelector('.nav-main .nav-menu')
  let toggle = document.querySelector('.nav-main .nav-burger')

  if (header && menu) {
    let h = new Header(header, menu)
    h.init()
  }

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.preventDefault()

      EventBus.$emit('toggle-header')
    })
  }
})

class Header {
  constructor(element, menu) {
    this.element = element
    this.menu = menu
    this.animationDuration = 900
  }

  init() {
    EventBus.$on('toggle-header', (event) => {
      if (this.element.classList.contains('active')) {
        this.element.classList.add('animating')
        setTimeout(() => {
          this.element.classList.remove('animating')
        }, this.animationDuration)
        this.element.classList.remove('active')
      } else {
        this.element.classList.add('animating')
        setTimeout(() => {
          this.element.classList.remove('animating')
        }, this.animationDuration)
        this.element.classList.add('active')
      }
    })

    EventBus.$on('window-resized', event => {
      if (window.innerWidth >= 1024) {
        this.element.classList.remove('active')
      }
    })
  }
}