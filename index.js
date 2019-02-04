const express = require('express')
const app = express()

app
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
