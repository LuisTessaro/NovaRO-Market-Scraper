module.exports = function (bot) {

  let protoDataBase = {}

  bot.on(['/start', '/hello'], (msg) => {
    msg.reply.text('/lowestPrice "id do item"\n/addItem "id do item" "preço minimo pra te avisar"')
  })

  setInterval(function () {
    Object.keys(protoDataBase).forEach((key) => {
      lowestPrice(key).then((resolve) => {
        let tellList = protoDataBase[key].playerPrices.filter((elem) => {
          if (elem.price > resolve.price) {
            return elem
          }
        })
        tellList.forEach((elem) => {
          bot.sendMessage(elem.playerId, resolve.itemName + ' : ' + resolve.buildPage + '\nLowest price: ' + resolve.price.toLocaleString())
        })
      })
    })
  }, 30000)


  bot.on(/^\/addItem (.+)$/, (msg, props) => {
    const payload = props.match[1];
    const item = payload.split(' ')
    const itemId = item[0]
    const playerPrice = item[1]
    if (!protoDataBase[itemId]) {//item não existe cria o item add o player que quer
      console.log('criei o item addei o player')
      protoDataBase[itemId] = {
        id: itemId,
        players: [msg.from.id],
        playerPrices: [{ playerId: msg.from.id, price: playerPrice, beenNotifed: false }],
      }
      console.log(protoDataBase[itemId])

    } else if (!protoDataBase[itemId].players.includes(msg.from.id)) {//item existe o player ainda não está na lista addeda o player
      protoDataBase[itemId].players.push(msg.from.id)
      protoDataBase[itemId].playerPrices.push({ playerId: msg.from.id, price: playerPrice, beenNotifed: false })
    }
    return bot.sendMessage(msg.from.id, 'Vou ver e te aviso sobre o item ' + itemId + ' se ele tiver menos que ' + playerPrice.toLocaleString() + 'z')
  })

  bot.on(/^\/lowestPrice (.+)$/, (msg, props) => {
    const itemId = props.match[1];
    lowestPrice(itemId).then((resolve) => {
      const replyText = resolve.itemName + ' : ' + resolve.buildPage + '\nLowest price: ' + resolve.price.toLocaleString()
      return bot.sendMessage(msg.from.id, replyText + 'z')
    }).catch((reject) => {
      return bot.sendMessage(msg.from.id, 'Escreve o id direito, animal (ou não tem nenhum no market)')
    })
  })


  bot.start();



  async function lowestPrice(itemId) {
    const buildPage = 'https://www.novaragnarok.com/?module=vending&action=item&id=' + itemId
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(buildPage)

    const lowestPrice = await page.evaluate(
      () => document.querySelector('table.nova-table.no-footer tr.odd td span').textContent
    )

    const itemName = await page.evaluate(
      () => document.querySelector('title').textContent
    )

    await browser.close()

    let price = parseInt(lowestPrice.replace(/,/g, ''))

    return {
      itemName: itemName,
      price: price,
      buildPage: buildPage,
    }
  }
}