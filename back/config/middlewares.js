const cors = require('cors')
const morgan = require('morgan')
const express = require('express')



module.exports = app => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use(morgan("dev"))

}