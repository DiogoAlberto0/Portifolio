require('dotenv/config')

const fs = require('fs')
const http = require('http')
const https = require('https')

const express = require('express')
const consign = require('consign')


const privateKey = fs.readFileSync('sslcert/private.key', 'utf8')
const certificate = fs.readFileSync('sslcert/certificate.crt', 'utf8')

const credentials = {key: privateKey, cert: certificate}

const app = express()


const db = require('./db/db')
app.db = db

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

consign()
    .include('./config/middlewares.js')
    .include('./config/validation.js')
    .include('./config/passport.js')
    .include('./config/multer.js')
    .include('./api')
    .include('./config/routes.js')
    .into(app)

httpServer.listen(80)
httpsServer.listen(443)

//const port = 4000
// app.listen(port, () => console.log(`Backend executando. Porta:${port}`))