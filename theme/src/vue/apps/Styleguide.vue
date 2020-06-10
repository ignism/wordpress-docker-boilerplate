<template>
  <div id="styleguide">
    <section class="section">
      <div class="container">
        <h1 class="text-4xl font-bold tracking-wider uppercase">styleguide</h1>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2
          class="text-2xl mb-4 font-bold tracking-wide uppercase text-gray-500"
        >colors</h2>
      </div>

      <div class="container">
        <div class="row">
          <div
            :key="index"
            class="col my-4 w-full md:w-6/12 lg:w-3/12"
            v-for="(key, index) in Object.keys(theme.colors)"
          >
            <div
              :style="{ backgroundColor: theme.colors[key] }"
              class="p-4 text-gray-500 shadow-2xl rounded"
            >
              {{ theme.colors[key] }}
              <span class="tw-class">{{ key }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container mb-4">
        <h2
          class="text-2xl font-bold tracking-wide uppercase text-gray-500"
        >fonts</h2>
      </div>

      <div class="container mb-4">
        <div class="row">
          <div
            :key="index"
            class="col w-full"
            v-for="(key, index) in Object.keys(theme.fontFamily)"
          >
            <div
              :style="{ fontFamily: theme.fontFamily[key] }"
              class="text-4xl"
            >
              {{ theme.fontFamily[key] }}
              <span class="tw-class">{{ key }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container mb-4">
        <div class="row">
          <div class="col w-full md:w-6/12">
            <ul>
              <li
                :key="index"
                class="leading-none my-4 flex items-baseline"
                v-for="(key, index) in Object.keys(theme.fontSize)"
              >
                <div class="text-gray-500 w-1/3 lg:w-1/4">{{ theme.fontSize[key] }}</div>
                <div :class="'text-' + key">Aa</div>
                <div class="tw-class">text-{{ key }}</div>
              </li>
            </ul>
          </div>
          <div class="col w-full md:w-6/12">
            <ul>
              <li
                :key="index"
                class="leading-none my-4 flex items-baseline"
                v-for="(key, index) in Object.keys(textSizes)"
              >
                <div class="text-gray-500 w-1/3 lg:w-1/4">{{ textSizes[key] }}</div>
                <div :id="key" :class="key">{{ key }}</div>
                <div class="tw-class">{{ key }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2
          class="text-2xl font-bold tracking-wide uppercase text-gray-500"
        >responsive screens</h2>
      </div>

      <div class="container mb-4">
        <div class="row">
          <div class="col w-3/12 md:w-2/12 lg:w-1/12">
            <ul>
              <li class="leading-none my-4 flex items-baseline text-gray-500">base</li>
              <li
                :key="index"
                class="leading-none my-4 flex items-baseline text-gray-500"
                v-for="(size, index) in theme.screens"
              >{{ size }}px</li>
            </ul>
          </div>
          <div class="col flex-grow">
            <ul>
              <li class="leading-none my-4 flex items-baseline">{{ getScreen(0) }}</li>
              <li
                :key="index"
                class="leading-none my-4 flex items-baseline"
                v-for="(key, index) in Object.keys(theme.screens)"
              >
                <span>{{ getScreen(index + 1) }}</span>
                <span class="tw-class">{{ key }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="w-full flex sm:hidden bg-gray-400">
        <div class="mx-auto p-4 text-gray-700 bg-gray-300">
          {{ getScreen(0) }}
        </div>
      </div>
      <div class="w-full hidden sm:flex md:hidden bg-gray-400">
        <div class="mx-auto p-4 text-gray-700 bg-gray-300">
          {{ getScreen(1) }}
        </div>
      </div>
      <div class="w-full hidden md:flex lg:hidden bg-gray-400">
        <div class="mx-auto p-4 text-gray-700 bg-gray-300">
          {{ getScreen(2) }}
        </div>
      </div>
      <div class="w-full hidden lg:flex xl:hidden bg-gray-400">
        <div class="mx-auto p-4 text-gray-700 bg-gray-300">
          {{ getScreen(3) }}
        </div>
      </div>
      <div class="w-full hidden xl:flex 2xl:hidden bg-gray-400">
        <div class="mx-auto p-4 text-gray-700 bg-gray-300">
          {{ getScreen(4) }}
        </div>
      </div>
      <div class="w-full hidden 2xl:flex 3xl:hidden bg-gray-400">
        <div class="mx-auto p-4 text-gray-700 bg-gray-300">
          {{ getScreen(5) }}
        </div>
      </div>
      <div class="w-full hidden 3xl:flex bg-gray-400">
        <div class="mx-auto p-4 text-gray-700 bg-gray-300">
          {{ getScreen(6) }}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2
          class="text-2xl mb-4 font-bold tracking-wide uppercase text-gray-500"
        >grid</h2>
      </div>

      <div class="container">
        <div class="row mb-8">
          <div class="col w-8/12 md:w-6/12 lg:w-3/12 2xl:w-2/12">
            <ul>
              
              <li
                class="p-2 my-2 shadow-2xl rounded bg-gray-400 text-gray-800"
              >
                gutter
                <span class="tw-class">row</span>
                <span class="tw-class">col</span>
              </li><li class="p-2 my-2 shadow-2xl rounded bg-yellow-400 text-yellow-800">
                section offset
                <span class="tw-class">section</span>
              </li>
              <li
                class="p-2 my-2 shadow-2xl rounded bg-orange-400 text-orange-800"
              >
                page offset
                <span class="tw-class">container</span>
              </li>
              <li
                class="p-2 my-2 shadow-2xl rounded bg-orange-300 text-orange-700"
              >page max width</li>
            </ul>
          </div>
          <div class="col block md:hidden w-2/12 lg:w-1/12 text-gray-500">
            <ul>
              <li class="p-2 my-2">{{ theme.gutter.sm }}px</li>
              <li class="p-2 my-2">{{ theme.section.offset.sm }}px</li>
              <li class="p-2 my-2">{{ theme.page.offset.sm }}px</li>
              <li class="p-2 my-2">{{ theme.page.maxWidth }}px</li>
            </ul>
          </div>
          <div class="col hidden md:block lg:hidden w-2/12 lg:w-1/12 text-gray-500">
            <ul>
              <li class="p-2 my-2">{{ theme.gutter.md }}px</li>
              <li class="p-2 my-2">{{ theme.section.offset.md }}px</li>
              <li class="p-2 my-2">{{ theme.page.offset.md }}px</li>
              <li class="p-2 my-2">{{ theme.page.maxWidth }}px</li>
            </ul>
          </div>
          <div class="col hidden lg:block w-2/12 lg:w-1/12 text-gray-500">
            <ul>
              <li class="p-2 my-2">{{ theme.gutter.lg }}px</li>
              <li class="p-2 my-2">{{ theme.section.offset.lg }}px</li>
              <li class="p-2 my-2">{{ theme.page.offset.lg }}px</li>
              <li class="p-2 my-2">{{ theme.page.maxWidth }}px</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-orange-300 my-4">
        <div class="container bg-orange-400">
          <section class="section bg-yellow-400">
            <div class="row bg-gray-400">
              <div
                :key="index"
                class="col w-1/12"
                v-for="(item, index) in new Array(12)"
              >
                <div class="w-full py-4 bg-gray-300 text-gray-500 text-center">
                  <span class="hidden md:inline-block">1/12</span>
                </div>
              </div>
            </div>
            <div class="row bg-gray-400">
              <div
                :key="index"
                class="col w-2/12"
                v-for="(item, index) in new Array(6)"
              >
                <div class="w-full py-4 bg-gray-300 text-gray-500 text-center">
                  <span class="hidden md:inline-block">2/12</span>
                </div>
              </div>
            </div>
            <div class="row bg-gray-400">
              <div
                :key="index"
                class="col w-3/12"
                v-for="(item, index) in new Array(4)"
              >
                <div class="w-full py-4 bg-gray-300 text-gray-500 text-center">
                  <span class="hidden md:inline-block">3/12</span>
                </div>
              </div>
            </div>
            <div class="row bg-gray-400">
              <div
                :key="index"
                class="col w-4/12"
                v-for="(item, index) in new Array(3)"
              >
                <div class="w-full py-4 bg-gray-300 text-gray-500 text-center">
                  <span class="hidden md:inline-block">4/12</span>
                </div>
              </div>
            </div>
            <div class="row bg-gray-400">
              <div
                :key="index"
                class="col w-6/12"
                v-for="(item, index) in new Array(2)"
              >
                <div class="w-full py-4 bg-gray-300 text-gray-500 text-center">
                  <span class="hidden md:inline-block">6/12</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <div
      class="section"
      ref="duration"
    >
      <div class="container">
        <h2
          class="text-2xl mb-4 font-bold tracking-wide uppercase text-gray-500"
        >transition duration</h2>
      </div>

      <div class="container">
        <div class="row">
          <div class="col w-full md:w-8/12 xl:w-6/12">
            <ul>
              <li
                :key="index"
                class="leading-none my-4"
                v-for="(key, index) in Object.keys(theme.duration)"
              >
                <div class="w-full">
                  {{ theme.duration[key] }}ms
                  <span class="tw-class">duration-{{ key }}</span>
                </div>
                <div class="w-full bg-gray-300">
                  <div
                    :data-duration="theme.duration[key]"
                    class="w-full h-8 mt-4 mb-8 bg-gray-500"
                  ></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import theme from '@src/js/helpers/theme.config.js'
import anime from 'animejs'

export default {
  data() {
    return {
      theme: theme,
      responsiveNames: ['phone', 'phablet', 'tablet portrait', 'tablet landscape', 'desktop', 'wide', 'full width'],
      textSizes: {
        h1: 0,
        h2: 0,
        h3: 0,
        p1: 0,
        p2: 0,
        p3: 0
      },
    }
  },
  computed: {
    fontSizeStyle() {
      return (index) => 'height: ' + this.theme.fontSize[index]
    }
  },
  methods: {},
  filters: {
    convertToRem(value) {
      value = value.toString().substring(0, value.length - 2)
      value = value / 16
      return value + 'rem'
    }
  },
  methods: {
    getScreen(index) {
      index = index > this.responsiveNames.length - 1 ? this.responsiveNames.length - 1 : index
      return this.responsiveNames[index]
    },
    getScreenSize(key) {
      index = index > this.responsiveNames.length - 1 ? this.responsiveNames.length - 1 : index
      return this.theme.screens[key]
    },
    setTextSizes() {
      this.$nextTick(() => {
        let element = null

        Object.keys(this.textSizes).forEach(key => {
          element = document.getElementById(key)
          if (element) {
            this.textSizes[key] = window.getComputedStyle(element).getPropertyValue('font-size')
          }
        })
        // element = document.getElementById('h2')
        // this.textSizes.h2 = window.getComputedStyle(element).getPropertyValue('font-size')
        // element = document.getElementById('h3')
        // this.textSizes.h3 = window.getComputedStyle(element).getPropertyValue('font-size')
        // element = document.getElementById('p1')
        // this.textSizes.p1 = window.getComputedStyle(element).getPropertyValue('font-size')
        // element = document.getElementById('p2')
        // this.textSizes.p2 = window.getComputedStyle(element).getPropertyValue('font-size')
        // element = document.getElementById('p3')
        // this.textSizes.p3 = window.getComputedStyle(element).getPropertyValue('font-size')
      })
    },
  },
  mounted() {
    this.setTextSizes()

    window.addEventListener('resize', () => {
      this.setTextSizes()
    })

    this.$refs['duration'].querySelectorAll('[data-duration]').forEach((element) => {
      let duration = element.getAttribute('data-duration')
      let animation = () => {
        anime({
          targets: element,
          easing: 'linear',
          opacity: [0, 1],
          width: [0, '100%'],
          duration: duration,
          complete: () => {
            reverse()
          }
        })
      }

      let reverse = () => {
        anime({
          targets: element,
          easing: 'linear',
          opacity: [1, 0],
          width: ['100%', 0],
          duration: duration,
          complete: () => {
            animation()
          }
        })
      }

      animation()
    })
  }
}
</script>

<style lang="css" scoped>
.tw-class {
  @apply ml-2 text-teal-600 font-sans font-light tracking-normal text-xs bg-teal-200 border-teal-200 rounded px-1 shadow;
}
</style>
