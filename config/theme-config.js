const slug = require('slug')
const fs = require('fs')
const path = require('path')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

let config = {
  name: 'Timber Tailwind',
  slug: 'timber-tailwind',
  class: 'TimberTailwind',
  description: 'A Timber wordpress theme using tailwindcss.',
  author: {
    name: 'Anonymous',
    email: 'demo@anonymous.com'
  }
}

readline.question('Theme name <Timber Tailwind>? ', (name) => {
  name = name.toString().trim()

  if (name.length) {
    config.name = name
    config.slug = getSlug(name)
    config.class = getClass(name)
  }

  readline.question('Short description <A Timber wordpress theme using tailwindcss.>? ', (description) => {
    description = description.toString().trim()

    if (description.length) {
      config.description = description
    }

    readline.question('Your name <Anonymous>? ', (name) => {
      name = name.toString().trim()

      if (name.length) {
        config.author.name = name
      }

      readline.question('Your email <demo@anonymous.com>? ', (email) => {
        email = email.toString().trim()

        if (email.length) {
          config.author.email = email
        }

        doGenerate()

        readline.close()
      })
    })
  })
})

function getSlug (name) {
  let options = {
    replacement: '-',
    symbols: true,
    remove: /[.]/g,
    lower: true
  }

  return slug(name, options)
}

function getClass (name) {
  let parts = getSlug(name).split('-')
  let className = ''

  parts.forEach((part) => {
    className += part.charAt(0).toUpperCase() + part.substring(1)
  })

  return className
}

function doGenerate () {
  writeConfigFile()

  generateStyleCSS()
  generateFunctionsPhp()
}

function generateStyleCSS () {
  let data = '/*\n  Theme Name: ' + config.name + '\n  Version: 0.1.0\n  Author: ' + config.author.name + '\n  Description: A Timber wordpress theme using tailwindcss.\n  */'

  let file = 'style.css'

  fs.writeFile(path.resolve(__dirname, '../theme/public/', file), data, (err) => {
    if (err)
      console.log(err)
  })
}

function generateFunctionsPhp () {
  let data

  let file = 'functions.php'

  fs.readFile(path.resolve(__dirname, file), 'utf8', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      result = result.toString()
      data = result.replace(/BoilerplateClass/g, config.class)

      fs.writeFile(path.resolve(__dirname, '../theme/public/', file), data, (err) => {
        if (err)
          console.log(err)
      })
    }
  })
}

function writeConfigFile () {
  let data = JSON.stringify(config)

  let file = 'theme.json'
  fs.writeFile(path.resolve(__dirname, file), data, (err) => {
    if (err)
      console.log(err)
  })
}