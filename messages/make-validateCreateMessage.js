module.exports = ({ createError, validator }) => (req, res, next) => {
  if (validator.isEmpty(req.body.from)) {
    createError(422, 'from is required.')
  }

  if (!validator.isEmail(req.body.from)) {
    createError(422, 'from should be a valid e-mail address.')
  }

  if (validator.isEmpty(req.body.body)) {
    createError(422, 'body is required.')
  }

  req.body.from = validator.normalizeEmail(req.body.from)
  req.body.body = validator.trim(req.body.body)
  req.body.expiration = new Date(req.body.expiration)

  if (!!!req.body.expiration.getTime()) {
    createError(422, 'expiration should be a Date.')
  }

  return next()
}
