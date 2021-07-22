import './ProjectsEdit.css'

import { useContext, useEffect, useState } from 'react'

import baseApiUrl from '../../../services/api'

import {Context} from '../../../Context/AuthContext'

import Button from '../../../components/Button/Button'

import history from '../../../Main/history'

const imagesModel = []

const projectModel = {
    project: {
        name: '',
        programingLanguage: '',
        repositoryLink: undefined,
        link: undefined,
        thumbLink: undefined,
        obs: undefined
    }
}

const ProjectsEdit = props => {
    const { getUser } = useContext(Context)
    
    useEffect(() => {
        getUser()
    }, [getUser])
    
    // criando e setando o estado do projeto
    const [projects, setProjects] = useState({...projectModel})
    
    const handleProject = event => {
        const project = {...projects.project}
        project[event.target.name] = event.target.value
        setProjects({project})
    }

    const submitProject = async () => {
        const project = {...projects.project}
        await baseApiUrl
            .post('/projects', {...project})
            .then(resp => console.log(resp))
            .catch(err => console.warn(err.response.data))
    }
    
    // criando e setando o estado das imagens
    const [images, setImages] = useState([...imagesModel])

    const handleUpload = files => {
        setImages([...files])
    }

    const submitImg = async () => {

        images.map(async image => {
            const data = new FormData()
            data.append('image', image)
            data.append('projectName', projects.project.name)
    
            await baseApiUrl
                .post(`/img`, data )
                .then(resp => console.log(resp.data))
                .catch(err => console.log(err))
            
        })

    }

    const submitForm = event => {
        event.preventDefault()
        submitProject()
        submitImg()
    }

    return(
        <div className="project-edit-background">
            <div >
                <form onSubmit={e => submitForm(e)} className="form-project">
                    <label htmlFor="projectname">Nome:</label>
                    <input 
                        id="projectname"
                        className="project-form-input"
                        type="text" name="name"
                        placeholder="nome..."
                        onChange={e => handleProject(e)}
                    />

                    <label htmlFor="programingLanguage">Linguagem de programação:</label>
                    <input
                        id="programingLanguage"
                        className="project-form-input"
                        type="text" name="programingLanguage"
                        placeholder="Linguagem..."
                        onChange={e => handleProject(e)}
                    />

                    <label htmlFor="repositoryLink">Link do repositório:</label>
                    <input
                        id="repositoryLink"
                        className="project-form-input"
                        type="text"
                        name="repositoryLink"
                        placeholder="Link do repositório..."
                        onChange={e => handleProject(e)}
                    />

                    <label htmlFor="link">Link do projeto:</label>
                    <input
                        id="link"
                        className="project-form-input"
                        type="text"
                        name="link"
                        placeholder="Link..."
                        onChange={e => handleProject(e)}
                    />

                    <label htmlFor="obs">Pequeno resumo do projeto:</label>
                    <input 
                        id="obs"
                        className="project-form-input"
                        type="text"
                        name="obs"
                        placeholder="Resumo..."
                        onChange={e => handleProject(e)}
                    />

                    <label htmlFor="projects-imgs">Imagens:</label>
                    <input
                        id="projects-imgs"
                        className="project-form-input "
                        type="file"
                        name="single"
                        accept="image/*"
                        onChange={e => handleUpload(e.target.files)}
                        multiple
                    />
                    <div className="projects-buttons">
                        <Button title="Ok" type="submit"></Button>
                        <Button title="Voltar" onClick={e => history.push('/admin/home')}/>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ProjectsEdit