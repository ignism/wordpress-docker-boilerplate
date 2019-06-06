import Turbolinks from 'turbolinks'
import {eventBus} from './event-bus'

eventBus.$once('init', () => {
    Turbolinks.start()
})