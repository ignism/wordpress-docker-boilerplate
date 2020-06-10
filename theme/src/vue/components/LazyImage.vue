<template>
  <img
    @load="onLoad"
    class="lazy-image"
    ref="lazy-image"
  />
</template>

<script>
import lozad from 'lozad'

export default {
  name: 'lazy-image',
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    onLazyLoad() {
      this.$el.classList.add('js-lazy-loaded')
    },
    onLoad() {
      this.$el.classList.add('js-loaded')
    }
  },
  mounted() {
    const setLoadingState = () => {
      this.isLoading = false
    }

    const observer = lozad(this.$refs['lazy-image'], {
      loaded: () => {
        this.onLazyLoad()
      }
    })

    observer.observe()
  }
}
</script>