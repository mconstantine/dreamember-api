let db

module.exports = ({ MongoClient, config }) => async () => {
  if (!db) {
    const client = new MongoClient(config.db.url, { useNewUrlParser: true })
    const connection = await client.connect()
    db = connection.db(config.db.dbName)
  }

  return db
}
