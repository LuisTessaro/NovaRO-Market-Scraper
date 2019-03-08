function itemFunctions() { }

const dbName = 'marketScraper'
const tableName = 'itens'

const PlayerDAO = new bot.infra.DAO.genericDAO()

itemFunctions.prototype.handleItemExists = (itemId) => {
  return new Promise((resolve, reject) => {
    PlayerDAO.readOneByParameter(itemId, dbName, tableName)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('no item by that id')
      })
  })
}

itemFunctions.prototype.createItem = (item) => {
  PlayerDAO.create(item, dbName, tableName)
}

module.exports = function () {
  return itemFunctions
}