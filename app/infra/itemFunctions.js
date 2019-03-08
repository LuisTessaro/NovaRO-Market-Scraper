function itemFunctions() { }

const dbName = marketScraper
const tableName = itens

const PlayerDAO = new bot.infra.DAO.genericDAO()

itemFunctions.prototype.handleItemExists = (item, bot) => {
  return new Promise((resolve, reject) => {
    PlayerDAO.readOneByParameter(params)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('no item by that id')
      })
  })
}


module.exports = function () {
  return itemFunctions
}