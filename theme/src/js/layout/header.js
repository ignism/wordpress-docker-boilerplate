import { eventBus } from '../core/event-bus'
import { config } from '../core/config'

eventBus.$once('init', (event) => {
  let header = document.querySelector('.header-main')
  let menu = document.querySelector('.nav-main')
  let toggle = document.querySelector('.nav-main .nav-burger')

  if (header && menu) {
    let h = new Header(header, menu)
    h.init()
  }

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.preventDefault()

      eventBus.$emit('toggle-menu')
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
    if (window.scrollY < config.offsetFromTop) {
      this.unpin()
    }

    eventBus.$on('scrolled-from-top', (event) => {
      this.pin()
    })

    eventBus.$on('scrolled-to-top', (event) => {
      this.unpin()
    })

    eventBus.$on('toggle-menu', (event) => {
      if (this.menu.classList.contains('animating')) {
        return
      }
      if (this.menu.classList.contains('active')) {
        this.menu.classList.add('animating')
        setTimeout(() => {
          this.menu.classList.remove('animating')
        }, this.animationDuration)
        this.menu.classList.remove('active')
      } else {
        this.menu.classList.add('animating')
        setTimeout(() => {
          this.menu.classList.remove('animating')
        }, this.animationDuration)
        this.menu.classList.add('active')
      }
    })

    eventBus.$on('window-resized', event => {
      if (window.innerWidth >= 1024) {
        this.element.classList.remove('active')
      }
    })
  }

  pin() {
    this.element.classList.add('header-pin')
    this.element.classList.remove('header-unpin')
  }

  unpin() {
    this.element.classList.remove('header-pin')
    this.element.classList.add('header-unpin')
  }
}