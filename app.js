const express = require('express')
const logger = require('morgan')
const cors = require('cors')


const usersRouter = require('./routes/usersRouter')
const journalsRouter = require('./routes/journalsRouter')
const client = require('./database/setup')

client()

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.get('/', (req , res) => {
  res.send('hello from simple server :)')
})

app.use('/users', usersRouter)
app.use('/checklists', checklistsRouter)

app.use('/journals', journalsRouter)

app.use('/journals', journalsRouter)

module.exports = app
