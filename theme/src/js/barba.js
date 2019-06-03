import { EventBus } from './event-bus'
import barba from '@barba/core'
import barbaCss from '@barba/css'
import axios from 'axios'

// tell Barba to use the css module
barba.use(barbaCss)

EventBus.$once('init', (event) => {
  barba.init({
    transitions: [
      {
        name: 'barba-fade',

        beforeEnter() {
          let main = document.querySelector('.main')
          let scripts = Array.from(main.querySelectorAll('script'))
          scripts.forEach((script) => {
            axios
              .get(script.getAttribute('src'))
              .then(function(response) {
                eval(response.data)
              })
              .catch(function(error) {
                console.log(error)
              })
          })

          EventBus.$emit('barba-page-change')
        }
      }
    ]
  })
})
