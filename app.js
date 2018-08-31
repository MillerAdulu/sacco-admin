const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
require(`dotenv`).config()

const app = express()

app.use(`/`, serveStatic(
  path.join(__dirname, '/dist')
)
)

app.get(`*`, function(req, res) {
  res.sendFile(
    path.join(__dirname, `/dist/index.html`)
  )
})

const port = process.env.APP_PORT || 5000

app.listen(port, function () {
  console.log(`Sacco app is running on port ${port}`)
})