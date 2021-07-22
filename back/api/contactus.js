module.exports = app => {
    
    const createContact = async (req, res) => {

        const contact = {...req.body}

        if(!contact.name || !contact.email || !contact.subject) {
            return res.status(400).send("Favor inserir todas as informações")
        }

        await app.db('contactus')
            .insert({
                name: contact.name,
                email: contact.email,
                subject: contact.subject
            })
            .then(_ => res.json('Menssagem enviada!'))
            .catch(err => res.status(500).send(err.response))
    }

    const getContact = async (req, res) => {
        await app.db('contactus')
            .select('id', 'name', 'email', 'subject')
            .where('seen', false)
            .then(response => res.json(response))
            .catch(err => res.status(500).send(err))
    }

    const seenContact = async(req, res) => {
        await app.db('contactus')
            .update({seen: true})
            .where('id', req.params.id)
            .then(_ => res.status(204).send('Menssagem lida'))
            .catch(err => res.status(500).send(err.response))
    }

    return {createContact, getContact, seenContact}
}

