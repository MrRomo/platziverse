'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const aswer = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy your database, are you sure?'
  })
  if (!aswer.setup) {
    return console.log('Nothing happened :)')
  }
  const aswer2 = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'Really?'
  })
  if (!aswer2.setup) {
    return console.log('Nothing happened :)')
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
  console.log('Success')
  process.exit(0)
}
function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.log(err.stack)
  process.exit(1)
}
setup()
