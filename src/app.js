require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

const app = express()

// init middleware
app.use(morgan('dev')) // DEV
// app.use(morgan('combined')) // PRO
app.use(helmet())
app.use(compression())

// init db
require('./databases/init.mongodb')
const { isOverload } = require('./helpers')
isOverload()

// init routes
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Done',
    metadata: 'DATA'.repeat(100000),
  })
})

// error handling

module.exports = app
