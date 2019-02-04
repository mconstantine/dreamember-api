const { Router } = require('express')

module.exports = ({ validateCreateMessage, createMessage }) =>
Router()
.post('/', validateCreateMessage, createMessage)
