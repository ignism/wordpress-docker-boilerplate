<template>
  <div
    class="scroll-trigger" :class="{ 'js-active': isActive }"
    ref="root"
  >
    <slot></slot>
  </div>
</template>

<script>
import anime from 'animejs'
import ScrollMagic from 'scrollmagic'
import scrollController from '@src/js/helpers/scroll-controller'

export default {
  data() {
    return {
      scene: null,
      isActive: false
    }
  },
  props: {
    hook: {
      type: String,
      default: '0.85'
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  methods: {
    init() {},
    onEnter() {
      setTimeout(() => {
        this.isActive = true;
      }, this.delay)
    },
    onLeave() {
      setTimeout(() => {
        this.isActive = false;
      }, this.delay)
    },
  },
  mounted() {
    this.scene = new ScrollMagic.Scene({
      triggerElement: this.$el,
      triggerHook: this.hook,
      offset: 0
    })

    this.scene.on('enter', this.onEnter)
    this.scene.on('leave', this.onLeave)

    scrollController.addScene(this.scene)

    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>

<style scoped>
.scroll-trigger {
  transition: transform 400ms ease, opacity 400ms ease; 
  transform: translateY(20px) translateZ(0);
  opacity: 0;
  will-change: transform;
}

.scroll-trigger.js-active {
  opacity: 1;
  transform: translateY(0);
}
</style>