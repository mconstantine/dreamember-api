const express = require('express')
const bodyParser = require('body-parser')
const validator = require('validator')
const createError = require('./misc/createServerError')
const datePattern = require('./messages/datePattern')
const validateCreateMessage = require('./messages/make-validateCreateMessage')({
  createError, validator, datePattern
})
const createMessage = require('./messages/createMessage')
const messages = require('./messages/make-index')({ validateCreateMessage, createMessage })
const app = express()

app
.use(bodyParser.json())
.use('/messages', messages)
.use((error, req, res, next) => {
  if (!error instanceof Error) {
    return next()
  }

  const code = error.httpCode || 500
  const message = error.httpMessage || ''

  if (message) {
    return res.status(code).send({
      error: message
    })
  }

  console.log(error)
  return res.status(code).end()
})

.use((req, res) => res.status(404).end())
.listen(5000)
