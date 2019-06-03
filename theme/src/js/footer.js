import { EventBus } from './event-bus'
import { easing, tween, styler } from 'popmotion'
import { documentOffset } from './utilities'

EventBus.$once('init', (event) => {
  let footer = document.querySelector('.footer-main')
  let wrapper = document.querySelector('.footer-wrapper')
  let toggle = document.querySelector('.footer-toggle')

  if (footer && wrapper) {
    let f = new Footer(footer, wrapper)
    f.init()
  }

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.preventDefault()

      EventBus.$emit('toggle-footer')
    })
  }
})

class Footer {
  constructor(element, wrapper) {
    this.element = element
    this.wrapper = wrapper
    this.animation
  }

  init() {
    this.wrapper.style.minHeight = this.element.clientHeight + 'px'

    EventBus.$on('toggle-footer', (event) => {
      if (this.element.classList.contains('active')) {
        this.slideOut()
      } else {
        this.slideIn()
      }
    })

    EventBus.$on('scrolled-to-bottom', (event) => {
      this.unpin()
    })
  }

  slideIn() {
    let scrollOffsetBottom = window.scrollY + window.innerHeight
    let offset = Math.max(0, scrollOffsetBottom - documentOffset(this.wrapper).top)

    this.element.style.position = 'fixed'
    this.element.style.top = 'calc(100vh - ' + offset + 'px)'

    this.animation = tween({
      from: offset,
      to: this.element.clientHeight,
      duration: 400,
      ease: easing.circOut
    }).start((v) => (this.element.style.top = 'calc(100vh - ' + v + 'px)'))

    this.element.classList.add('active')
  }

  slideOut() {
    this.pin()

    let scrollOffsetBottom = window.scrollY + window.innerHeight
    let offset = Math.max(0, scrollOffsetBottom - documentOffset(this.wrapper).top)

    this.animation = tween({
      from: this.element.clientHeight,
      to: this.element.clientHeight - (this.element.clientHeight - offset),
      duration: 400,
      ease: easing.circIn
    }).start({
      update: (v) => {
        this.element.style.top =
          'calc(100vh - ' + v + 'px)'
      },

      complete: () => this.unpin()
    })
  }

  pin() {
    this.element.classList.add('active')
    this.element.style.position = 'fixed'
    this.element.style.top = 'calc(100vh - ' + this.element.clientHeight + 'px)'
  }

  unpin() {
    this.animation.stop()
    this.element.classList.remove('active')
    this.element.style = ''
  }
}