module.exports = app => {

    const createHome = async (req, res) => {
        const textHome = {...req.body}

        textHome.id = req.params.id
        if(!textHome.text) {
            return res.status(400).send('Digite o texto')
        }

        if(!textHome.id) {
            await app.db('homepage')
                .insert({
                    text: textHome.text
                })
                .then(_ => res.status(204).send('Texto cadastrado com sucesso'))
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('homepage')
            .update({
                text: textHome.text
            })
            .where('id', textHome.id)
            .then(_ => res.status(204).send('Texto cadastrado com sucesso'))
            .catch(err => res.status(500).send(err))
        }
    }

    const getHome = async (req, res) => {
        await app.db('homepage')
        .select('id', 'text')
        .where('id', req.params.id)
        .then(resp => res.json(resp))
        .catch(err => res.status(500).send(err))
    }

    return { createHome, getHome }
}