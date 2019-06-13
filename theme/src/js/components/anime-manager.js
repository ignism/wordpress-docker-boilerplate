import anime from 'animejs/lib/anime.es'
import ScrollMagic from 'scrollmagic'
import { scrollController } from '../core'

class AnimeManager {
  constructor() {}

  init() {
    this.addSlideIn()
  }

  addSlideIn() {
    let elements = document.querySelectorAll('.anime-slide-in')

    elements.forEach((element) => {
      let child = document.createElement('span')
      let slider = document.createElement('span')

      child.innerText = element.innerText
      slider.innerText = element.innerText

      let lineHeight = window.getComputedStyle(element).lineHeight
      let lineHeightNumber = lineHeight.substr(0, lineHeight.length - 2)

      element.classList.add('pointer-events-none', 'text-transparent')
      element.classList.add('relative')
      child.classList.add('absolute', 'block', 'inset-0', 'text-black')
      slider.classList.add('absolute', 'block', 'top-0', 'left-0', 'bg-white')

      element.appendChild(child)
      element.appendChild(slider)

      let childAnime = anime({
        targets: child,
        translateY: ['0.5em', 0],
        lineHeight: [lineHeightNumber * 1.5, lineHeightNumber],
        duration: 600,
        autoplay: false,
        easing: 'easeOutSine',
        complete: (anime) => {
          element.classList.add('anime-completed')
        }
      })

      let sliderAnime = anime({
        targets: slider,
        translateY: ['0.5em', 0],
        lineHeight: [lineHeightNumber * 1.5 + 8, 0],
        duration: 600,
        autoplay: false,
        easing: 'easeOutSine',
        complete: (anime) => {
          element.classList.add('anime-completed')
          element.removeChild(slider)
        }
      })

      let scene = new ScrollMagic.Scene({
        triggerElement: element,
        triggerHook: 0.9
      })

      scene.on('enter', (event) => {
        let element = event.currentTarget.triggerElement()
        if (!element.classList.contains('anime-completed')) {
          childAnime.play()
          sliderAnime.play()
        }
      })

      scene.addTo(scrollController)
    })
  }
}

export const animeManager = new AnimeManager()