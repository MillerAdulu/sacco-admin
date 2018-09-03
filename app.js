const express = require('express')
const port = process.env.APP_PORT || 5000
require(`dotenv`).config()

const app = express()

app.use(express.static(
  __dirname + `/dist/`
))

app.get(/.*/, function (req, res) {
  res.sendFile(
    __dirname + `/dist/index.html`
  );
})

app.listen(port)