const puppeteer = require('puppeteer')

module.exports = function (bot) {
  itemFunctions = new bot.infra.itemFunctions(bot)

  bot.on(['/start', '/hello'], msg =>
    msg.reply.text('Favor não tentar quebrar o meu bot, usem à vontade.\n/lowestPrice "id do item"\n/addItem "id do item" "preço minimo pra te avisar"\n/cancel "id do item"')
  )

  bot.on(/^\/addItem (.+)$/, (msg, props) => {
    const payload = props.match[1];
    const item = payload.split(' ')
    const itemId = item[0]
    const playerPrice = item[1]

    itemFunctions.handleItemExists(itemId)
      .then(item => {
        return bot.sendMessage(msg.from.id, item.itemName + ' já existe')
      })
      .catch(_ => {//adicionar item ao db
        getItemInfos(itemId)
          .then(item => {
            itemFunctions.createItem({
              players: [{
                playerId: msg.from.id,
                intendedPrice: playerPrice,
              }],
              itemId: itemId,
              itemName: item.itemName,
              price: item.price,
              buildPage: item.buildPage,
            })
          })
          .catch(_ => bot.sendMessage(msg.from.id, 'Id errado (ou não tem nenhum no market)'))
      })
  })

  bot.on(/^\/deleteItem (.+)$/, (msg, props) => {
    itemFunctions.deleteItem(props.match[1])
  })

  async function getItemInfos(itemId) {
    const buildPage = 'https://www.novaragnarok.com/?module=vending&action=item&id=' + itemId
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(buildPage)

    const firstElem = await page.evaluate(
      () => document.querySelectorAll('table.nova-table.no-footer tr')[1].children[0].innerText
    )
    const secondElem = await page.evaluate(
      () => document.querySelectorAll('table.nova-table.no-footer tr')[1].children[1].innerText
    )

    let price
    if (isNumeric(firstElem[0])) {
      price = parseInt(firstElem.replace(/,/g, ''))
    } else {
      price = parseInt(secondElem.replace(/,/g, ''))
    }

    const itemName = await page.evaluate(
      () => document.querySelector('title').textContent
    )
    await browser.close()

    return {
      itemName: itemName,
      price: price,
      buildPage: buildPage,
    }
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}