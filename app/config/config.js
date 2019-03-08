const puppeteer = require('puppeteer')
const TeleBot = require('telebot')
const token = require('./key.json')

module.exports = function () {
  var bot = new TeleBot(token.key)
  return bot
}