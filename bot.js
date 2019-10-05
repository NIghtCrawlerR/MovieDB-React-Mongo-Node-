const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config()
}
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID
const bot = new TelegramBot(token, { polling: true });
const User = require('./models/user.model')


bot.on('callback_query', function (msg) {
    if (msg.data !== 'reject') {
        User.findOneAndUpdate({ email: msg.data }, { $set: { group: "admin" } }, (err, doc) => {
            if (err) {
                console.log(err)
            }
            console.log(doc);
        });
    }
});

module.exports = {
    sendMessage: (message) => {
        // var iKeys = [];
        var keyboard = [
            [{ text: 'Give access', callback_data: message.email }],
            [{ text: 'Reject', callback_data: 'reject' }]
        ]

        bot.sendMessage(chatId, message.text, { parse_mode: 'HTML', reply_markup: { inline_keyboard: keyboard } })
    },
    sendBugReport: (data) => {
        const messageHtml = `
            *${data.title}*
            date: _${data.date}_
            email: _${data.email}_
            ${data.body}
        `
            bot.sendMessage(chatId, messageHtml, { parse_mode: 'markdown' })
    }
}
