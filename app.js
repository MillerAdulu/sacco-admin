const express = require('express')
const history = require('connect-history-api-fallback')

const port = process.env.APP_PORT || 5000
require(`dotenv`).config()

const app = express()

app.use(history())

app.listen(port)