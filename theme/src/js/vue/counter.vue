<template>
  <div @mouseenter="over" class="w-full bg-black text-white text-5xl text-center p-8 mb-8">
    <span class="counter">{{ counter }}</span>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    over: function() {
      EventBus.$emit('over')
    }
  },
  mounted() {
    EventBus.$on('count', event => {
      this.counter++
    })
  }
}
</script>

<style>
</style>
