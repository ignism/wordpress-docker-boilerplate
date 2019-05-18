<template>
  <div @mouseenter="over" class="w-full flex justify-center bg-grey-light p-8">
    <button @click="click">{{ buttonText }}</button>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
  data() {
    return {
      buttonText: 'Click Me'
    }
  },
  methods: {
    click: function() {
      EventBus.$emit('click', this)
    },
    over: function() {
      EventBus.$emit('over')
    }
  }
}
</script>

<style>
button {
  margin: 0;
}
</style>
