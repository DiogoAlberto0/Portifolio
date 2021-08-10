const path = require('path')
const { promisify } = require("util");
const fs = require("fs");

module.exports = app => {

    const createImg = async (req, res) => {
        if(!req.file) {
            return res.status(400).send('Selecione a imagem')
        } else {
            const { originalname: name, size, key, location: url = `${process.env.APP_URL}/files/${key}`} = req.file
            
            const sendImg = async (projectId) => {
                await app.db('imgprojects')
                    .insert({
                        name,
                        size,
                        key,
                        url,
                        projectId
                    })
                    .then(_ => res.send('Imagem salva'))
                    .catch(err => res.status(500).send(err))
            }

            await app.db('projects')
            .select('id')
            .first()
            .where('name', req.body.projectName)
            .then(resp => {
                sendImg(resp.id)
                console.log('parou aqui')
            })
            .catch(err => res.status(500).send('Err:' + err))  
        }
    }

    const deleteImg = async (req, res) => {

        async function deleteOnStorage() {
            await app.db('imgprojects')
                .select('key')
                .where('id', req.params.id)
                .then(resp => {
                    return promisify(fs.unlink)(
                        path.resolve(__dirname, '..', 'tmp', 'uploads', `${resp[0].key}`)
                    )
                })
                .catch(err => res.status(500).send(err))
        }
        deleteOnStorage()
        
        await app.db('imgprojects')
            .delete()
            .where('id', req.params.id)
            .then(_ => res.status(204).send('Imagem salva'))
            .catch(err => res.status(500).send(err))
    }

    const getImg = async (req, res) => {
        await app.db('imgprojects')
            .select()
            .where('projectId', req.params.projectid)
            .then(resp => res.json(resp))
            .catch(err => res.status(500).send(err))
    }

    const getImgThumb = async (req, res) => {
        await app.db('imgprojects')
            .select()
            .first()
            .where('projectId', req.params.projectid)
            .then(resp => res.json(resp))
            .catch(err => res.status(500).send(err))
    }

    return { createImg, deleteImg, getImg,  getImgThumb}
}