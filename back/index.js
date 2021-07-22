require('dotenv/config')

const express = require('express')
const consign = require('consign')

const db = require('./db/db')

const app = express()
app.db = db

consign()
    .include('./config/middlewares.js')
    .include('./config/validation.js')
    .include('./config/passport.js')
    .include('./config/multer.js')
    .include('./api')
    .include('./config/routes.js')
    .into(app)


const port = 4000
app.listen(port, () => console.log(`Backend executando. Porta:${port}`))