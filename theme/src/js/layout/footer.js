import { CoreModule } from '../core/core-module'

class Footer extends CoreModule {
  init(options) {
    this.element = options.element

    this.toggles = document.querySelectorAll('.toggle-footer')

    this.toggles.forEach(toggle => {
      toggle.element = this.element
      toggle.addEventListener('click', this.onToggle)
    })

    return super.init()
  }

  destroy() {
    super.destroy()

    this.toggles.forEach(toggle => {
      toggle.removeEventListener('click', this.onToggle)
    })
  }

  onToggle(event) {
    event.preventDefault();

    this.element.classList.toggle('pinned')
  }
}

export const footer = new Footer()
