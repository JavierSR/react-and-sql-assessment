const express = require("express")
const { resolve } = require("path")
const cors = require('cors')
const router = require('./router')

const app = express()

app.use(express.static(resolve(__dirname, '..', 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(router)

module.exports = app
