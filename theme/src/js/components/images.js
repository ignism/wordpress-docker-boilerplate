import objectFitImages from 'object-fit-images'
import { eventBus } from '../core/event-bus'

eventBus.$once('init', () => {
  objectFitImages()
})