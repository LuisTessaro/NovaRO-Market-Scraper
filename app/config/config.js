const TeleBot = require('telebot')
const token = require('./key.json')
const load = require('consign')

module.exports = function () {
  var bot = new TeleBot(token.key)

  load({ cwd: 'app' })
    .include('routes')
    .into(bot)

  return bot
}