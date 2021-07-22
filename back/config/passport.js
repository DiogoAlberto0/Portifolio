const passport = require('passport')
const passportJwt = require('passport-jwt')

const { authSecret } = require('../.env')


const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: process.env.AUTH_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        const infos = {...payload}

        app.db('users')
            .where('id', infos.id)
            .then(user => done(null, user ? infos : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {authenticate: ()=> passport.authenticate('jwt', {session: false})}
}