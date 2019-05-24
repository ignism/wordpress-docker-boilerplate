import Turbolinks from 'turbolinks'
import {EventBus} from './event-bus'

EventBus.$once('init', () => {
    Turbolinks.start()
})