module.exports = app => {
    const insertProjects = async (req, res, next) => {
        const project = { ...req.body }

        const { existOrError, notExistOrError } = app.config.validation

        try {
            existOrError(project.name, 'Informe o nome do projeto')
            // existOrError(project.userId, 'Informe o desenvolvedor')
            existOrError(project.programingLanguage, 'Informe a linguagem de desenvolvimento')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(req.params.id) project.id = req.params.id

        if(!project.id) {

            project.id = req.userId

            await app.db('projects')
                .insert({
                    name: project.name,
                    userId: project.id,
                    programingLanguage: project.programingLanguage,
                    repositoryLink: project.repositoryLink,
                    link: project.link,
                    thumbLink: project.thumbLink,
                    obs: project.obs
                })
                .select('id')
                .then(_ => res.status(204).send('Projeto cadastrado'))
                .catch(err => res.status(500).send(`Não foi possivel cadastrar projeto. Erro:${err}`))
        } else {
            await app.db('projects')
                .update({
                    name: project.name,
                    userId: project.userId,
                    programingLanguage: project.programingLanguage,
                    repositoryLink: project.repositoryLink,
                    link: project.link,
                    thumbLink: project. thumbLink,
                    obs: project.obs
                })
                .where('id', project.id)
                .then(_ => res.status(204).send('Projeto atualizado com sucesso'))
                .catch(err => res.status(500).send(`Não foi possivel cadastrar projeto. Erro:${err}`))
        }
        return next()
    }

    const getProjects = async (req, res) => {
        if(!req.params.id) {
            await app.db('projects')
                .select('id', 'name', 'userId', 'programingLanguage', 'repositoryLink', 'link', 'thumbLink', 'obs')
                .then(project => res.json(project))
                .catch(err => res.status(500).send(`Erro:${err}`))
        } else {
            await app.db('projects')
            .select('name', 'userId', 'programingLanguage', 'repositoryLink', 'link', 'thumbLink', 'obs')
            .where('id', req.params.id)
            .first()
            .then(project => res.json(project))
            .catch(err => res.status(500).send(`Erro:${err}`))
        }


    }

    const getProjectByName = async (req, res, next) => {

        await app.db('projects')
            .select('id')
            .where('name', req.params.name)
            .first()
            .then(resp => res.json(resp.id))
            .catch(err => res.status(500).send(`Erro:${err}`))
    }


    return { insertProjects, getProjects, getProjectByName }
}