const express = require("express")

const app = express()

app.use(express.json())

app.use(require('./routes'))

app.use(require('./errors'))

module.exports = app