const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const port = process.env.APP_PORT || 5000
require(`dotenv`).config()

const app = express()

app.use('/', serveStatic(path.join(
  __dirname + `/dist/`
)))

app.get(/.*/, function (req, res) {
  res.sendFile(
    __dirname + `/dist/index.html`
  );
})

app.listen(port)