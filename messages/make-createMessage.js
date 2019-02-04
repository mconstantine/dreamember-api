module.exports = ({ getDb, sendEmail }) => async (req, res) => {
  const { from, expiration, body } = req.body

  if (expiration.getTime() <= Date.now()) {
    await sendEmail(from, body)
    return res.end()
  }

  // TODO: save the email, set the timeout
  const db = await getDb()
  return res.status(201).end()
}
