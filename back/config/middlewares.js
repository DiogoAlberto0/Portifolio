const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const path = require('path')


module.exports = app => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use(morgan("dev"))

    //upload images

    app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
}