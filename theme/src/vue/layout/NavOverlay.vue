<template>
  <div
    :class="{ 'js-active': isActive }"
    class="fixed top-0 left-0 w-screen h-screen"
    id="nav-overlay"
  >
    <nav class="w-full h-full flex items-center justify-center">
      <div>
      <slot name="menu"></slot>
      </div>
    </nav>
  </div>
</template>

<script>
import eventBus from '@src/js/helpers/event-bus'

export default {
  data() {
    return {
      isActive: false,
      scrollY: 0
    }
  },
  methods: {
    onToggle() {
      if (this.isActive) {
        this.onDeactivate()
      } else {
        this.onActivate()
      }
    },
    onActivate() {
      this.scrollY = window.scrollY
      this.isActive = true
      eventBus.$emit('burger:activate')
      setTimeout(() => {
        document.body.classList.add('js-nav-active')
      }, 400)
    },
    onDeactivate() {
      document.body.classList.remove('js-nav-active')
      window.scrollTo(0, this.scrollY)
      this.isActive = false
      eventBus.$emit('burger:deactivate')
}
  },
  mounted() {
    eventBus.$on('navoverlay:toggle', this.onToggle)
    eventBus.$on('navoverlay:activate', this.onActivate)
    eventBus.$on('navoverlay:deactivate', this.onDeactivate)
  },
  beforeDestroy() {
    eventBus.$off('navoverlay:toggle', this.onToggle)
    eventBus.$off('navoverlay:activate', this.onActivate)
    eventBus.$off('navoverlay:deactivate', this.onDeactivate)
  }
}
</script>

<style lang="pcss" scoped>
</style>
