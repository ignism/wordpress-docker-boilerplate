import objectFitImages from 'object-fit-images'
import { EventBus } from './event-bus'

EventBus.$once('init', () => {
  objectFitImages()
})