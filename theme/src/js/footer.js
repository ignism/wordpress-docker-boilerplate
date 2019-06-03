import { EventBus } from './event-bus'
import { easing, tween } from 'popmotion'
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
    let offset = Math.max(
      Math.min(120, scrollOffsetBottom - documentOffset(this.wrapper).top),
      0
    )
    
    if (offset === this.element.clientHeight) return

    this.element.style.position = 'fixed'
    this.element.style.bottom = -1 * offset + 'px'

    this.animation = tween({
      from: this.element.clientHeight - offset,
      to: 0,
      duration: 600,
      ease: easing.easeOut
    }).start((v) => {
      this.element.style.bottom = (-1 * v) + 'px'
    })

    this.element.classList.add('active')
  }

  slideOut() {
    this.pin()

    let scrollOffsetBottom = window.scrollY + window.innerHeight
    let offset = Math.max(
      Math.min(120, scrollOffsetBottom - documentOffset(this.wrapper).top),
      0
    )

    this.animation = tween({
      from: 0,
      to: this.element.clientHeight - offset,
      duration: 600,
      ease: easing.easeOut
    }).start({
      update: (v) => {
        this.element.style.bottom = (-1 * v) + 'px'
      },

      complete: () => this.unpin()
    })
  }

  pin() {
    this.element.classList.add('active')
    this.element.style.position = 'fixed'
    this.element.style.bottom = 0
  }

  unpin() {
    if (this.animation) {
      this.animation.stop()
    }
    this.element.classList.remove('active')
    this.element.style = ''
  }
}
