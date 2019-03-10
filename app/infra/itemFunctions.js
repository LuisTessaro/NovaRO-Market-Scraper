let bot
let ItemDao
function itemFunctions(bot) {
  this.bot = bot
  ItemDao = new bot.infra.DAO.genericDAO()
}

const dbName = 'marketScraper'
const tableName = 'itens'

itemFunctions.prototype.handleItemExists = itemId => {
  return new Promise((resolve, reject) => {
    ItemDao.readOneByParameter({ itemId: itemId }, dbName, tableName)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('no item by that id')
      })
  })
}

itemFunctions.prototype.createItem = item => {
  ItemDao.create(item, dbName, tableName)
}

itemFunctions.prototype.deleteItem = itemId => {
  ItemDao.deleteByParameter({ itemId: itemId }, dbName, tableName)
}

itemFunctions.prototype.addPlayerToItem = (itemId, player) => {
  ItemDao.readOneByParameter({ itemId: itemId }, dbName, tableName)
    .then(resp => {
      if (!resp[0].players.find(elem => elem.playerId === player.playerId))
        ItemDao.update({ itemId: itemId }, { $push: { players: { $each: [{ playerId: player.playerId, intendedPrice: player.intendedPrice }] } } }, dbName, tableName)
    })
}
/*

      */

itemFunctions.prototype.removePlayerFromItem = (itemId, player) => {
  ItemDao.readOneByParameter({ itemId: itemId }, dbName, tableName)
    .then(_ => {
      ItemDao.update({ itemId: itemId }, { $pull: { players: { playerId: player.playerId } } }, dbName, tableName)
    })
}


module.exports = function () {
  return itemFunctions
}