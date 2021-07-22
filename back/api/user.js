const encryptPass = require('../config/encryptPass')
module.exports = app => {
    const insertUser = (req, res) => {
        const { existOrError, notExistsOrError, equalsOrError} = app.config.validation
        const user = {...req.body}

        try {
            existOrError(user.name, 'Informe o nome do usuário')
            existOrError(user.email, 'Informe o e-mail')
            existOrError(user.phone, 'Informe o telefone')
            existOrError(user.password, 'Informe a senha')
            existOrError(user.confirmPassword, 'Confirme a senha')

            equalsOrError(user.password, user.confirmPassword, 'As senhas não conferem')
        } catch(msg) {
            return res.status(400).send(`Erro: ${msg}`)
        }

        delete user.confirmPassword
        user.password = encryptPass(user.password)

        if(req.params.id) user.id = req.params.id

        if(!user.id) {
            app.db('users')
                .insert({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password
                })
                .then(_ => res.status(204).send('Usuário cadastrado com sucesso!'))
                .catch(err => res.status(500).send(`Não foi possivel cadastrar usuário! Erro: ${err}`))
        } else {
            app.db('users')
                .update({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password
                })
                .where('id', user.id)
                .then(_ => res.status(204).send('Usuário atualizado'))
                .catch(err => res.status(500).send(`Não foi possivel atualizar o usuário! Erro: ${err}`))
        }
    }

    const getUsers = (req, res) => {
        if(!req.params.id) {
            app.db('users')
                .select('name', 'phone', 'email')
                .then(user => res.json(user))
                .catch(err => res.status(500).send(`Erro ao se conectar com o servidor: ${err}`))
        } else {
            app.db('users')
            .select('name', 'phone', 'email')
            .where('id', req.params.id)
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(`Erro ao se conectar com o servidor: ${err}`))
        }
    }
    return {insertUser, getUsers}
}