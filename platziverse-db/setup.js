'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  let flag = false

  process.argv.forEach(e => {
    if (e === '--yes') {
      flag = true
    }
  })

  if (flag === false) {
    // Pregunta en la consola
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])

    // Si la respuesta es falsa (es negativa), no pasa nada
    // Si la respuesta es verdadera (es positia), re-crea la DB
    if (!answer.setup) {
      returnconsole.log('Nothing happended :)')
    }
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'mrromo',
    password: process.env.DB_PASS || 'mrromo',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
