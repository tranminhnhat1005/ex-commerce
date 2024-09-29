'use strict'

const mongoose = require('mongoose')
const { count } = require('../helpers/')
const {
  db: { host, port, name },
} = require('../configs/config.mongodb')

const DATABASE = `mongodb://${host}:${port}/${name}`

class Database {
  constructor() {
    this.connect()
  }

  // connect
  connect() {
    mongoose.set('debug', true)
    mongoose.set('debug', { color: true })

    mongoose
      .connect(DATABASE)
      .then(() => {
        console.log('Connect MongoDB Success', count())
      })
      .catch(() => {
        console.log('Connect Failed')
      })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongoDB = Database.getInstance()

module.exports = instanceMongoDB
