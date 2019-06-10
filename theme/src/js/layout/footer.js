import { eventBus } from '../core/event-bus'
import { easing, tween } from 'popmotion'
import { documentOffset } from '../utilities'

const animationDuration = 300

eventBus.$once('init', (event) => {
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

      eventBus.$emit('toggle-footer')
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

    eventBus.$on('toggle-footer', (event) => {
      if (this.element.classList.contains('animating')) {
        return
      }

      if (this.animation) {
        this.animation.stop()
      }
      
      if (this.element.classList.contains('active')) {
        this.slideOut()
      } else {
        this.slideIn()
      }
    })

    eventBus.$on('scrolled-to-bottom', (event) => {
      this.unpin()
    })
  }

  slideIn() {
    this.element.classList.add('animating')

    let scrollOffsetBottom = window.scrollY + window.innerHeight
    let offset = Math.max(
      Math.min(120, scrollOffsetBottom - documentOffset(this.wrapper).top),
      0
    )
    
    if (offset === this.element.clientHeight) return

    this.element.style.bottom = -1 * (this.element.clientHeight - offset) + 'px'
    this.element.style.position = 'fixed'

    this.animation = tween({
      from: this.element.clientHeight - offset,
      to: 0,
      duration: animationDuration,
      ease: easing.circOut
    }).start({
      update: (v) => {
        this.element.style.bottom = (-1 * v) + 'px'
      }, 
      complete: () => {
        this.element.classList.remove('animating')
        this.pin()
      }
    })
  }

  slideOut() {
    this.element.classList.add('animating')
    this.pin()

    let scrollOffsetBottom = window.scrollY + window.innerHeight
    let offset = Math.max(
      Math.min(120, scrollOffsetBottom - documentOffset(this.wrapper).top),
      0
    )

    this.animation = tween({
      from: 0,
      to: this.element.clientHeight - offset,
      duration: animationDuration,
      ease: easing.circOut
    }).start({
      update: (v) => {
        this.element.style.bottom = (-1 * v) + 'px'
      },

      complete: () => {
        this.unpin()
        this.element.classList.remove('animating')
      }
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
