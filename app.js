const express = require('express')
const app = express()

app.get('/', (req , res) => {
  res.send('hello from simple server :)')
})

module.exports = app
