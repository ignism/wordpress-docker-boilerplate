<template>
  <header
    :class="{ 'js-fixed': isFixed, 'js-hide-on-scroll': hideOnScroll, 'js-pinned': (isPinned && hideOnScroll), 'js-top': (isTop && hideOnScroll) }"
    class="absolute flex items-center w-full top-0 left-0"
    id="page-header"
    @mouseleave="eventBus.$emit('header:hide-submenus')"
  >
  <div class="absolute inset-0 flex items-center z-10 bg-transparent text-white">
    <div class="container">
      <div class="row justify-start items-start">
        <slot name="branding"></slot>

        <slot name="navigation"></slot>

        <div class="col flex flex-grow lg:hidden justify-end">
          <div :class="{ 'js-active': isBurgerActive }" @click="eventBus.$emit('navoverlay:toggle')" class="burger">
          <span></span>
          <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>

    <slot name="sub-menus"></slot>
  </header>
</template>

<script>
import ScrollMagic from 'scrollmagic'
import eventBus from '@src/js/helpers/event-bus'
import scrollController from '@src/js/helpers/scroll-controller'
import throttle from 'lodash/throttle'

export default {
  data() {
    return {
      eventBus: eventBus,
      currScrollY: 0,
      prevScrollY: 0,
      isPinned: true,
      isTop: true,
      scene: null,
      isBurgerActive: false
    }
  },
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    hideOnScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init() {
      if (this.scene) {
        scrollController.removeScene(this.scene)
      }

      if (this.isFixed && this.hideOnScroll) {
        this.scene = new ScrollMagic.Scene({
          offset: this.$el.clientHeight
        })

        this.scene.on('update', this.onUpdate)

        this.scene.on('enter', this.onEnter)

        this.scene.on('leave', this.onLeave)

        scrollController.addScene(this.scene)

        window.addEventListener('mousemove', throttle((event) => {
          if (!this.isPinned) {
            if(event.clientY < 64) {
              this.pin()
            }
          }
        }, 100))
      }
    },
    pin() {
      this.isPinned = true
    },
    unpin() {
      this.isPinned = false
    },
    onEnter() {
      this.isTop = false
    },
    onLeave() {
      this.isTop = true
    },
    onUpdate() {
      const scrollY = scrollController.scrollPos()
      const headerHeight = this.$el.clientHeight

      this.currScrollY = scrollY

      if (this.prevScrollY < this.currScrollY && !this.isTop) {
        this.unpin()
      } else if (this.prevScrollY > this.currScrollY && !this.isTop) {
        this.pin()
      }

      this.prevScrollY = this.currScrollY
    },
    onBurgerActivate() {
      this.isBurgerActive = true
      this.pin()
    },
    onBurgerDeactivate() {
      this.isBurgerActive = false
    },
    onShowSubmenu(event) {
      let element = document.getElementById('submenu-' + event.submenu)

      if (element) {
        element.classList.add('js-active')
      }
    },
    onHideSubmenus() {
      let elements = document.querySelectorAll('.submenu')
      elements.forEach(element => {
        element.classList.remove('js-active')
      })
    }
  },
  mounted() {
    eventBus.$on('window:resized', this.init)
    eventBus.$on('burger:activate', this.onBurgerActivate)
    eventBus.$on('burger:deactivate', this.onBurgerDeactivate)
    eventBus.$on('header:show-submenu', this.onShowSubmenu)
    eventBus.$on('header:hide-submenus', this.onHideSubmenus)
    this.init()
  },
  beforeDestroy() {
    eventBus.$off('window:resized', this.init)
    eventBus.$off('burger:activate', this.onBurgerActivate)
    eventBus.$off('burger:deactivate', this.onBurgerDeactivate)
  }
}
</script>

<style lang="pcss" scoped>
</style>