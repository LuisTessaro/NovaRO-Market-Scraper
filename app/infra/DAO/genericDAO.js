const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

function player_dao() { }

player_dao.prototype.create = (obj, dbName, tableName) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db(dbName)
    dbo.collection(tableName).insertOne(obj, (err, res) => {
      if (err) throw err
      console.log('Generic create Success' + res)
      db.close()
    })
  })
}

module.exports = function () {
  return player_dao
}
