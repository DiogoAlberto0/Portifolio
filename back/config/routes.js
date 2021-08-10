const path = require('path')
const express = require('express')

module.exports = app => {

    const auth = app.config.passport.authenticate()

    app.route('/singin')
        .post(app.api.singin.singin)

    // Usuários
    app.route('/user').all(auth).post(app.api.user.insertUser)
        
    app.route('/user').get(app.api.user.getUsers)
    
    app.route('/user/alter/:id').all(auth).put(app.api.user.insertUser)
        
    app.route('/user/:id').get(app.api.user.getUsers)


    // Projetos
    app.route('/projects').get(app.api.projects.getProjects)
    
    app.route('/projects').all(auth).post(app.api.singin.validateToken, app.api.projects.insertProjects)

    app.route('/projects/:id').get(app.api.projects.getProjects)
    
    app.route('/projects/:id').all(auth).put(app.api.projects.insertProjects)

    app.route('/projects/name/:name').get(app.api.projects.getProjectByName)

    // Home
    app.route('/home').all(auth).post(app.api.home.createHome)

    app.route('/home/:id').get(app.api.home.getHome)
        
    app.route('/home/:id').all(auth).put(app.api.home.createHome)

    // Contate-nos
    app.route('/contactus').post(app.api.contactus.createContact)
        
    app.route('/contactus').all(auth).get(app.api.contactus.getContact)

    app.route('/contactus/:id').all(auth).put(app.api.contactus.seenContact)


    // Imagens

    app.post('/img', app.config.multer, (app.api.image.createImg))
    
    app.get('/img/:projectid', app.api.image.getImg)

    app.get('/img/thumb/:projectid', app.api.image.getImgThumb)

    app.delete('/img/:id', auth, app.api.image.deleteImg)

    app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

}