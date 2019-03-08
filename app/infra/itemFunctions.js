function itemFunctions() { }

const dbName = 'marketScraper'
const tableName = 'itens'

const ItemDao = require('./DAO/genericDAO')()

itemFunctions.prototype.handleItemExists = (itemId) => {
  return new Promise((resolve, reject) => {
    ItemDao.readOneByParameter(itemId, dbName, tableName)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('no item by that id')
      })
  })
}

itemFunctions.prototype.createItem = (item) => {
  ItemDao.create(item, dbName, tableName)
}

itemFunctions.prototype.test = test => test


module.exports = function () {
  return itemFunctions
}