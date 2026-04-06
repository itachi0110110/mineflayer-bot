const express = require('express')
const mineflayer = require('mineflayer')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const bot = mineflayer.createBot({
  host: 'yourserver.aternos.me',
  username: 'BotName',
  version: false
})

bot.on('login', () => {
  console.log('Bot joined')
})

bot.on('chat', (username, message) => {
  io.emit('chat', `${username}: ${message}`)
})

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    bot.chat(msg)
  })
})

app.use(express.static('public'))

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running')
})
