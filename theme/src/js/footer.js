import { EventBus } from './event-bus'
import { easing, tween, styler } from 'popmotion'

EventBus.$once('init', (event) => {
  let footer = document.querySelector('.footer-main')
  let toggle = document.querySelector('.footer-toggle')
  let wrapper = document.querySelector('.footer-wrapper')

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.preventDefault()

      EventBus.$emit('toggle-footer')
    })
  }

  if (wrapper && footer) {
    wrapper.style.minHeight = footer.clientHeight + 'px'
  }
})

EventBus.$on('toggle-footer', (event) => {
  let footer = document.querySelector('.footer-main')

  if (footer) {
    const footerStyler = styler(footer)

    if (footer.classList.contains('active')) {
      footer.classList.remove('active')
      footer.style = ''
    } else {
      footer.classList.add('active')
      footer.style.position = 'fixed'
      footer.style.top = '100vh'
      console.log(footer.clientHeight)
      tween({
        from: 0,
        to: footer.clientHeight,
        duration: 800,
        ease: easing.circOut
      }).start((v) => footer.style.top = 'calc(100vh - ' + v + 'px)')
    }
  }
})

EventBus.$on('scrolled-to-bottom', event => {
  
})
