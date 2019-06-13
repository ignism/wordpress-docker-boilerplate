import { eventBus } from '@/js/core'
import { header } from './header.ts'
import { navMenu } from './nav-menu.ts'
import { footer } from './footer.ts'
import { barbaManager } from './barba-manager'

function initHeader() {
  let headerElement = document.querySelector('.header-main')

  if (headerElement) {
    header.init(headerElement)
  }
}

function initNavMenu() {
  let navElement = document.querySelector('.nav-main')

  if (navElement) {
    navMenu.init(navElement)
  }
}

function initFooter() {
  let footerElement = document.querySelector('.footer-main')
  let footerWrapper = document.querySelector('.footer-wrapper')

  if (footerElement) {
    footer.init(footerElement, footerWrapper)
  }
}

eventBus.$on('init', (event) => {
  initHeader()
  initNavMenu()
  initFooter()

  barbaManager.init()

  console.log('init layout')
})

export { header, navMenu, footer, barbaManager }