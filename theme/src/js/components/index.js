import { eventBus } from '@/js/core'
import { animeManager } from './anime-manager'
import { imageManager } from './image-manager'

eventBus.$on('init', () => {
  animeManager.init()
  imageManager.init()
})

export { animeManager, imageManager }
