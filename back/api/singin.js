const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

const { authSecret } = require('../.env')
module.exports = app => {
    const singin = async(req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha')
        }

        const userFromDb = await app.db('users')
            .where('email', req.body.email)
            .first()

        if(!userFromDb) return res.status(400).send('Usuário não encontrado!')

        const isMath = bcrypt.compareSync(req.body.password, userFromDb.password)

        if(!isMath) return res.status(400).send('Senha incorreta')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: userFromDb.id,
            iat: now,
            exp: now + ( 60 * 60 * 24)
        }

        return res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }
    const validateToken = async (req, res, next) => {
        const userData = req.headers.authorization.replace(/bearer /i, '') || null

            try{
                if(userData) {
                    const token = jwt.decode(userData, authSecret)
                    if(new Date(token.exp * 1000) > new Date()) {
                        req.userId = token.id
                        return next()
                    }
                    
                }
            } catch(e) {
                
            }
        return res.send(false)
    }

    return { singin, validateToken }
}