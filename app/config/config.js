const puppeteer = require('puppeteer')
const TeleBot = require('telebot')
const token = require('./key.json')
const bot = new TeleBot(token.key)

module.exports = function () {
  var bot = new TeleBot(token)
  return bot
}