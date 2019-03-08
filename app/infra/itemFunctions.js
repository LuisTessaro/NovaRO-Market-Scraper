let bot
let ItemDao
function itemFunctions(bot) {
  this.bot = bot
  ItemDao = new bot.infra.DAO.genericDAO()
}

const dbName = 'marketScraper'
const tableName = 'itens'


itemFunctions.prototype.handleItemExists = (itemId) => {
  return new Promise((resolve, reject) => {
    ItemDao.readOneByParameter({itemId : itemId}, dbName, tableName)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('no item by that id')
      })
  })
}

itemFunctions.prototype.createItem = (item) => {
  ItemDao.create(item, dbName, tableName)
}


module.exports = function () {
  return itemFunctions
}