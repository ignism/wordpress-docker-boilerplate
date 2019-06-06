import objectFitImages from 'object-fit-images'
import { eventBus } from './event-bus'

eventBus.$once('init', () => {
  objectFitImages()
})