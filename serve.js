const config = require('config')
const fs = require('fs')
const express = require('express')
const proxy = require('http-proxy-middleware')
const spdy = require('spdy')
const cors = require('cors')

const cert = fs.readFileSync(config.get('certPath'), 'utf-8')
const key = fs.readFileSync(config.get('keyPath'), 'utf-8')
const port = config.get('port')
const router = config.get('router')

const app = express()
app.use(cors())

app.use('/', proxy({
  target: 'https://localhost:8443',
  router: router,
  changeOrigin: true
}))

spdy.createServer({
  key: key,
  cert: cert
}, app).listen(port)
