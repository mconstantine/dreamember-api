const express = require('express')
const bodyParser = require('body-parser')
const validator = require('validator')
const { MongoClient } = require('mongodb')
const nodemailer = require('nodemailer')

const config = require('./config')
const createError = require('./misc/createServerError')
const getDb = require('./misc/make-getDb')({ MongoClient, config })

const sendEmail = require('./messages/make-sendEmail')({ nodemailer })
const validateCreateMessage = require('./messages/make-validateCreateMessage')({
  createError, validator
})
const createMessage = require('./messages/make-createMessage')({ getDb, sendEmail })
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
