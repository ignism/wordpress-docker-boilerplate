import { eventBus } from '../core'
import barba from '@barba/core'
import barbaCss from '@barba/css'
import axios from 'axios'

// tell Barba to use the css module
barba.use(barbaCss)

class BarbaManager {
  constructor() {}

  init() {
    barba.init({
      transitions: [
        {
          name: 'barba-fade',

          beforeLeave() {
            document.body.classList.remove('barba-enter')
            document.body.classList.add('barba-leave')
          },

          beforeEnter() {
            document.body.classList.add('barba-enter')
            document.body.classList.remove('barba-leave')

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

            eventBus.$emit('barba-page-change')
          },

          afterEnter() {
            document.body.classList.remove('barba-enter')
            document.body.classList.remove('barba-leave')
          }
        }
      ]
    })
  }
}

export const barbaManager = new BarbaManager()
