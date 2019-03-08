//const puppeteer = require('puppeteer')

module.exports = function (bot) {
  const itemFunctions = new bot.infra.itemFunctions(bot)

  bot.on(['/start', '/hello'], (msg) => {
    msg.reply.text('Favor não tentar quebrar o meu bot, usem à vontade.\n/lowestPrice "id do item"\n/addItem "id do item" "preço minimo pra te avisar"\n/cancel "id do item"')
  })

  bot.on('/createItem', (msg) => {
    console.log('bateu')
    itemFunctions.handleItemExists(15147)
      .then(item => {
        bot.sendMessage(msg.from.id, item.itemName + ' já existe')
      })
  })
  /*

  itemFuncs.createItem()

  let protoDataBase = {}
  

  setInterval(function () {
    Object.keys(protoDataBase).forEach((key) => {
      lowestPrice(key).then((resolve) => {
        let tellList = protoDataBase[key].playerPrices.filter((elem) => {
          if (elem.price > resolve.price && elem.wantsNotification === true) {
            return elem
          }
        })
        tellList.forEach((elem) => {
          const coordinates = resolve.location.split(',')
          if (coordinates[0] === 'nova_vend')
            bot.sendMessage(elem.playerId, `${resolve.itemName} \nLowest price: ${resolve.price.toLocaleString()} \n@shopjump ${coordinates[1]} ${coordinates[2]}`)
          else
            bot.sendMessage(elem.playerId, `${resolve.itemName} \nLowest price: ${resolve.price.toLocaleString()} \n/nav ${coordinates[0]} ${coordinates[1]} ${coordinates[2]}`)
        })
      })
    })
  }, 3000)

  bot.on(/^\/cancel (.+)$/, (msg, props) => {
    const itemId = props.match[1];
    //tirar onde for msg.from.id
    //se não for o cara eu mando de volta se for eu deleto
    protoDataBase[itemId].playerPrices.find((elem) => {
      if (elem.playerId === msg.from.id) {
        console.log('b4 ' + elem.wantsNotification)
        elem.wantsNotification = false
        console.log('after ' + elem.wantsNotification)
        return
      }
    })
  })


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
        playerPrices: [{ playerId: msg.from.id, price: playerPrice, wantsNotification: true }],
      }
      console.log(protoDataBase[itemId])

    } else if (!protoDataBase[itemId].players.includes(msg.from.id)) {//item existe o player ainda não está na lista addeda o player
      protoDataBase[itemId].players.push(msg.from.id)
      protoDataBase[itemId].playerPrices.push({ playerId: msg.from.id, price: playerPrice, wantsNotification: true })
    } else {
      protoDataBase[itemId].playerPrices.find((elem) => {
        if (elem.playerId === msg.from.id) {
          elem.wantsNotification = true
          return
        }
      })
    }
    return bot.sendMessage(msg.from.id, 'Vou ver e te aviso sobre o item ' + itemId + ' se ele tiver menos que ' + playerPrice.toLocaleString() + 'z')
  })

  bot.on(/^\/lowestPrice (.+)$/, (msg, props) => {
    const itemId = props.match[1];
    lowestPrice(itemId).then((resolve) => {
      const replyText = resolve.itemName + ' : ' + resolve.buildPage + '\nLowest price: ' + resolve.price.toLocaleString() + ' tem '
        + resolve.amount + ' shopjump: ' + resolve.location
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
      () => document.querySelectorAll('table.nova-table.no-footer tr')[1].children[0].innerText
    )

    const itemName = await page.evaluate(
      () => document.querySelector('title').textContent
    )

    const amount = await page.evaluate(
      () => document.querySelectorAll('table.nova-table.no-footer tr')[1].children[1].innerText
    )

    const location = await page.evaluate(
      () => document.querySelectorAll('table.nova-table.no-footer tr')[1].children[2].innerText
    )

    await browser.close()

    let price = parseInt(lowestPrice.replace(/,/g, ''))

    return {
      itemName: itemName,
      price: price,
      buildPage: buildPage,
      amount: amount,
      location: location,
    }
  }
  */
}