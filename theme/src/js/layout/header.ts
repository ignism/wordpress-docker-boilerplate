import { eventBus } from '../core/event-bus';
import { config } from '../core/config';

class Header {
  element: HTMLElement;

  constructor() {}

  public init(element) {
    this.element = element;

    if (window.scrollY > config.offsetFromTop) {
      this.pin();
    }

    this.addEventListeners()
  }

  addEventListeners() {
    eventBus.$on('scrolled-from-top', (event) => {
      this.pin();
    });

    eventBus.$on('scrolled-to-top', (event) => {
      this.unpin();
    });
  }

  pin() {
    this.element.classList.add('pinned');
  }

  unpin() {
    this.element.classList.remove('pinned');
  }
}

export const header = new Header();
