import * as tailwind from "@root/tailwind.config.js"

const config = tailwind.theme.config

let screens = config.screens
Object.keys(screens).forEach(key => {
  screens[key] = parseInt(screens[key].slice(0, -2))
})

export default {
  fontFamily: config.fontFamily,
  fontSize: config.fontSize,
  colors: config.colors,
  screens: screens,
  gutter: {
    sm: parseInt(config.gutter.sm.slice(0, -2)),
    md: parseInt(config.gutter.md.slice(0, -2)),
    lg: parseInt(config.gutter.lg.slice(0, -2)),
  },
  section: {
    offset: {
      sm: parseInt(config.section.offset.sm.slice(0, -2)),
      md: parseInt(config.section.offset.md.slice(0, -2)),
      lg: parseInt(config.section.offset.lg.slice(0, -2)),
    }
  },
  page: {
    maxWidth: parseInt(config.page.maxWidth.slice(0, -2)),
    offset: {
      sm: parseInt(config.page.offset.sm.slice(0, -2)),
      md: parseInt(config.page.offset.md.slice(0, -2)),
      lg: parseInt(config.page.offset.lg.slice(0, -2)),
    }
  },
  duration: {
    short: parseInt(config.duration.short.slice(0, -2)),
    medium: parseInt(config.duration.medium.slice(0, -2)),
    long: parseInt(config.duration.long.slice(0, -2)),
  }
}