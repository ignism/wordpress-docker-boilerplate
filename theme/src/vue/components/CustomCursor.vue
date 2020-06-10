<template>
  <div
    class="fixed"
    id="custom-cursor"
    v-show="isEnabled"
  >
    <transition name="js-scale">
      <div
        :class="{ 'js-active': isActive }"
        class="w-16 h-16 -ml-8 -mt-8 flex justify-center items-center"
        v-show="isActive"
      >
        <slot name="cursors"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import eventBus from '@src/js/helpers/event-bus'

export default {
  data() {
    return {
      isEnabled: true,
      isActive: false,
      cursors: [],
      currentCursor: null
    }
  },
  methods: {
    onMouseMove(event) {
      if (this.isActive) {
        this.$el.style.left = event.clientX + 'px'
        this.$el.style.top = event.clientY + 'px'
      }
    },
    show(event) {
      if (this.isEnabled) {
        let cursor = this.cursors.find((cursor) => cursor.getAttribute('id') === event.cursor)
        if (cursor) {
          this.currentCursor = cursor
          this.currentCursor.classList.add('js-active')
          this.isActive = true
          document.body.classList.add('has-custom-cursor')
        }
      }
    },
    hide(event) {
      this.currentCursor.classList.remove('js-active')
      this.isActive = false
      document.body.classList.remove('has-custom-cursor')
    },
    enable() {
      this.isEnabled = true
    },
    disable() {
      this.isEnabled = false
    }
  },
  mounted() {
    this.cursors = Array.from(this.$el.querySelectorAll('.cursor'))

    window.addEventListener('mousemove', this.onMouseMove)

    eventBus.$on('customcursor:show', this.show)
    eventBus.$on('customcursor:hide', this.hide)
    eventBus.$on('customcursor:enable', this.enable)
    eventBus.$on('customcursor:disable', this.disable)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.onMouseMove)

    eventBus.$off('customcursor:show', this.show)
    eventBus.$off('customcursor:hide', this.hide)
    eventBus.$off('customcursor:enable', this.enable)
    eventBus.$off('customcursor:disable', this.disable)
  }
}
</script>

<style lang="pcss" scoped>
#custom-cursor {
  pointer-events: none;
  @apply hidden;
}

.js-scale-enter-active,
.js-scale-leave-active {
  @apply transition-transform duration-short transform scale-100;
}
.js-scale-enter,
.js-scale-leave-to {
  @apply transform scale-0;
}

@screen lg {
  #custom-cursor {
    @apply block;
  }
}
</style>