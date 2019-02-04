module.exports = function createServerError(httpCode, httpMessage) {
  const error = new Error()

  if (httpCode) {
    error.httpCode = httpCode
  }

  if (httpMessage) {
    error.httpMessage = httpMessage
  }

  throw error
}
