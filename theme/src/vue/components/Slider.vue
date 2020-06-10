<template>
  <div
    class="flickity-wrapper"
    ref="wrapper"
  >
    <div class="flickity-container main-carousel">
      <slot></slot>
    </div>

    <div v-if="navigation && !isTouch">
      <div class="flickity-prev-wrapper w-3/12">
        <div
          @click="slider.previous(true)"
          @mouseenter="eventBus.$emit('customcursor:show', { cursor: 'arrow-left' })"
          @mouseleave="eventBus.$emit('customcursor:hide')"
          class="flickity-prev w-full h-full"
        ></div>
      </div>
      <div class="flickity-next-wrapper w-3/12">
        <div
          @click="slider.next(true)"
          @mouseenter="eventBus.$emit('customcursor:show', { cursor: 'arrow-right' })"
          @mouseleave="eventBus.$emit('customcursor:hide')"
          class="flickity-next w-full h-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@src/js/helpers/event-bus'
import Flickity from 'flickity-fade'
import 'flickity/css/flickity.css'
import 'flickity-fade/flickity-fade.css'

export default {
  data() {
    return {
      eventBus: eventBus,
      slider: null,
      touchBreakpoint: 1024,
      wasTouch: false,
      isTouch: false,
      lazyLoad: true
    }
  },
  props: {
    navigation: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    init() {
      let draggable = this.isTouch ? true : !this.navigation
      if (draggable) draggable = '>1'
      this.slider = new Flickity(this.$refs.wrapper.querySelector('.flickity-container'), {
        fade: false,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        draggable: draggable
      })

      this.slider.on('dragStart', () => {
        eventBus.$emit('customcursor:disable')
      })

      this.slider.on('dragEnd', () => {
        eventBus.$emit('customcursor:enable')
      })

      this.wasTouch = this.isTouch
    },
    onResize() {
      console.log('resized slider')
      this.isTouch = window.innerWidth < this.touchBreakpoint

      if (this.isTouch != this.wasTouch) {
        this.slider.destroy()
        this.init()
      }
    },
    onLoad() {
      console.log('loaded')
    }
  },
  mounted() {
    this.isTouch = window.innerWidth < this.touchBreakpoint
    eventBus.$on('window:resized', this.onResize)

    this.eventBus.$on('app:init', () => {
      this.$nextTick(() => {
        console.log('init slider init')
        this.init()
      })
    })

    this.eventBus.$on('barba:afterEnter', () => {
      this.$nextTick(() => {
              console.log('init slider afterEnter')
        this.init()
      })
    })

    this.eventBus.$on('barba:beforeLeave', () => {
      eventBus.$off('window:resized', this.onResize)
    })
  },
  beforeDestroy() {
    eventBus.$off('window:resized', this.onResize)
  }
}
</script>
