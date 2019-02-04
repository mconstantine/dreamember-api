module.exports = ({ createError, validator, datePattern }) => (req, res, next) => {
  if (validator.isEmpty(req.body.from)) {
    createError(422, 'from is required.')
  }

  if (!validator.isEmail(req.body.from)) {
    createError(422, 'from should be a valid e-mail address.')
  }

  if (validator.isEmpty(req.body.expiration)) {
    createError(422, 'expiration is required.')
  }

  const expirationMatch = req.body.expiration.match(datePattern)

  if (!expirationMatch) {
    createError(
      422, 'expiration should be a Date in the form "YYYYMMdd" or "YYYYmmdd HH:mm".'
    )
  }

  if (validator.isEmpty(req.body.body)) {
    createError(422, 'body is required.')
  }

  return next()
}
