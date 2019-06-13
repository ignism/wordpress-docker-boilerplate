import anime from 'animejs/lib/anime.es';
import { eventBus, config } from '../core';
import { documentOffset } from '../utilities';

class Footer {
  element: HTMLElement;
  wrapper: HTMLElement;

  constructor() {}

  init(element: HTMLElement, wrapper: HTMLElement) {
    this.element = element;
    this.wrapper = wrapper;

    this.wrapper.style.minHeight = this.element.clientHeight + 'px';

    this.addEventListeners();
  }

  pin() {
    this.element.classList.add('pinned');
  }

  unpin() {
    this.element.classList.remove('pinned');
    this.element.removeAttribute('style');
  }

  slideIn() {
    this.element.classList.add('animating');

    let scrollOffsetBottom = window.scrollY + window.innerHeight;
    let offset = Math.max(
      Math.min(120, scrollOffsetBottom - documentOffset(this.wrapper).top),
      0
    );

    // can't slide in if offset equals own height
    if (offset === this.element.clientHeight) return;

    this.element.style.bottom =
      -1 * (this.element.clientHeight - offset) + 'px';
    this.element.style.position = 'fixed';

    anime({
      targets: this.element,
      bottom: [-1 * this.element.clientHeight - offset, 0],
      duration: config.animation.duration.medium,
      easing: 'easeOutQuad',
      complete: (anim) => {
        this.element.classList.remove('animating');
        this.pin();
      }
    });
  }

  slideOut() {
    this.element.classList.add('animating', 'pinned');

    let scrollOffsetBottom = window.scrollY + window.innerHeight;
    let offset = Math.max(
      Math.min(120, scrollOffsetBottom - documentOffset(this.wrapper).top),
      0
    );

    anime({
      targets: this.element,
      bottom: [0, -1 * this.element.clientHeight - offset],
      duration: config.animation.duration.short,
      easing: 'easeOutQuad',
      complete: (anim) => {
        this.element.classList.remove('animating');
        this.unpin();
      }
    });
  }

  addEventListeners() {
    eventBus.$on('toggle-footer', (event) => {
      // return if it's already animating
      if (this.element.classList.contains('animating')) {
        return;
      }

      if (this.element.classList.contains('pinned')) {
        this.slideOut();
      } else {
        this.slideIn();
      }
    });

    eventBus.$on('scrolled-to-bottom', (event) => {
      this.unpin();
    });
  }
}

export const footer = new Footer();
