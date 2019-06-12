import { eventBus } from '../core/event-bus';
import { config } from '../core/config';

class NavMenu {
  element: HTMLElement;

  constructor() {}

  init(element) {
    this.element = element;
    this.addEventListeners();
  }

  addEventListeners() {
    eventBus.$on('toggle-menu', (event) => {
      // return if it's already animating
      if (this.element.classList.contains('animating')) {
        return;
      }

      if (this.element.classList.contains('active')) {
        this.element.classList.add('animating');
        setTimeout(() => {
          this.element.classList.remove('animating');
        }, config.animation.duration.medium);
        this.element.classList.remove('active');
      } else {
        this.element.classList.add('animating');
        setTimeout(() => {
          this.element.classList.remove('animating');
        }, config.animation.duration.medium);
        this.element.classList.add('active');
      }
    });

    eventBus.$on('window-resized', (event) => {
      if (window.innerWidth >= 1024) {
        this.element.classList.remove('active');
      }
    });
  }
}

export const navMenu = new NavMenu()