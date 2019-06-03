import { EventBus } from './event-bus'
import barba from '@barba/core'
import barbaCss from '@barba/css'
import axios from 'axios'

// tell Barba to use the css module
barba.use(barbaCss);

EventBus.$once('init', (event) => {
  barba.init({
    transitions: [{
      name: 'barba-fade',
  
      // available hooks…
      beforeAppear() {
        console.log('before appear')
      },
      appear() {
        console.log('appear')
      },
      afterAppear() {
        console.log('after appear')
      },
      beforeLeave() {
        console.log('before leave')
      },
      leave() {
        console.log('leave')
      },
      afterLeave() {
        console.log('after leave')
      },
      beforeEnter() {
        console.log('before enter')
        let main = document.querySelector('.main')
        let scripts = Array.from(main.querySelectorAll('script'))
        scripts.forEach(script=> {
          axios.get(script.getAttribute('src')).then(function (response) {
            eval(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
        })
      },
      enter() {
        console.log('enter')
        // let main = document.querySelector('.main')
        // console.log(main)
        // let scripts = Array.from(main.querySelectorAll('script'))
        // scripts.forEach(script=> {
        //   eval(script)
        //   console.log(script)
        // })
      },
      afterEnter() {
        console.log('after enter')
      }
    }]
  });
})