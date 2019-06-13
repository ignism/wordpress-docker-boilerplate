import ScrollMagic from 'scrollmagic'
import debounce from 'lodash/debounce';
import { eventBus, scrollController, config } from './core/index.js';

class SiteManager {
  constructor() {
    this.sceneScrolledTop
    this.sceneScrolledBottom
  }

  init() {
    eventBus.$emit('init', event);

    this.addToggleMenu();
    this.addToggleFooter();
    this.addSceneScrolledTop();
    this.addSceneScrolledBottom();

    this.addEventListeners();
  }

  addToggleMenu() {
    let toggles = document.querySelectorAll('.toggle-menu');

    console.log(toggles);
    toggles.forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        eventBus.$emit('toggle-menu');
      });
    });
  }

  addToggleFooter() {
    let toggles = document.querySelectorAll('.toggle-footer');

    console.log(toggles);
    toggles.forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        eventBus.$emit('toggle-footer');
      });
    });
  }

  addSceneScrolledTop() {
    this.sceneScrolledTop = new ScrollMagic.Scene({
      offset: config.offsetFromTop
    }).addTo(scrollController);

    this.sceneScrolledTop.on('enter', (event) => {
      eventBus.$emit('scrolled-from-top');
    });

    this.sceneScrolledTop.on('leave', (event) => {
      eventBus.$emit('scrolled-to-top');
    });
  }

  addSceneScrolledBottom() {
    this.sceneScrolledBottom = new ScrollMagic.Scene({
      offset: document.body.clientHeight - window.innerHeight
    }).addTo(scrollController);

    this.sceneScrolledBottom.on('enter', (event) => {
      eventBus.$emit('scrolled-to-bottom');
    });

    this.sceneScrolledBottom.on('leave', (event) => {
      eventBus.$emit('scrolled-from-bottom');
    });
  }

  addEventListeners() {
    window.addEventListener(
      'resize',
      debounce((event) => {
        eventBus.$emit('window-resized', event);
      }, 400)
    );

    eventBus.$on('barba-page-change', (event) => {
      if (this.sceneScrolledBottom) {
        scrollController.removeScene(this.sceneScrolledBottom);
        this.addSceneScrolledBottom();
      }
    });
  }
}

export const siteManager = new SiteManager();
