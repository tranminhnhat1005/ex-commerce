'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const _SECONDS = 5000
const MAX_CONNECTION_PER_CORE = 5

// using to count the connections
const count = () => {
  const num = mongoose.connections.length

  return num
}

// using to check is overload system
const isOverload = () => {
  setInterval(() => {
    const connections = mongoose.connections.length
    const cores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    console.log(`Active connections: ${connections}`)
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    const maxConnections = cores * MAX_CONNECTION_PER_CORE

    if (connections > maxConnections) {
      console.log('CONNECTIONS OVERLOAD!!!!')

      return true
    }

    return false
  }, _SECONDS) // monitor every 5 seconds
}

module.exports = {
  count,
  isOverload,
}
