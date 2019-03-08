const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

function player_dao() { }

player_dao.prototype.create = (obj, dbName, tableName) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db(dbName)
    dbo.collection(tableName).insertOne(obj, (err, res) => {
      if (err) throw err
      console.log('Generic create Success ' + res)
      db.close()
    })
  })
}

player_dao.prototype.deleteByParameter = (name, dbName, tableName) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db(dbName)
    const myquery = { name: name }
    dbo.collection(tableName).deleteOne(myquery, (err, res) => {
      if (err) throw err
      console.log('Generic delete Success ' + res)
      db.close()
    })
  })
}

player_dao.prototype.update = (query, newValues, dbName, tableName) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db(dbName)
    dbo.collection(tableName).updateOne(query, newValues, (err, res) => {
      if (err) throw err
      console.log('Generic update Success ' + res)
      db.close()
    })
  })
}

player_dao.prototype.readTable = (dbName, tableName) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      const dbo = db.db(dbName)
      dbo.collection(tableName).find({}).toArray((err, result) => {
        if (err) {
          reject(err)
          throw err
        }
        resolve(result)
      })
      db.close()
    })
  })
}

player_dao.prototype.readOneByParameter = (param, dbName, tableName) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      const dbo = db.db(dbName)
      dbo.collection(tableName).find({ param: param }).toArray((err, result) => {
        if (err) {
          reject(err)
          throw err
        }
        console.log('Generic readOne Success ' + res)
        resolve(result)
        db.close()
      })
    })
  })
}

module.exports = function () {
  return player_dao
}