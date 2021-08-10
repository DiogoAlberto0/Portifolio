import './ProjectId.css'

import { useEffect, useState } from 'react'

import Carousel from '../../../components/Carousel/Carousel'


import baseApiUrl from '../../../services/api'

const projectModel = {
    project: {
        name: '',
        userId: undefined,
        programingLanguage: '',
        repositoryLink: '',
        link: '',
        thumbLink: '',
        obs: ''
    },
    images: [],
    user:{
        name: ''
    }
}
const ProjectId = props => {

    const [projectId, setProjectId] = useState({...projectModel})

    useEffect(() => {
        const getProject = async () => {
            await baseApiUrl
                .get(`/projects/${props.match.params.id}`)
                .then(resp => setProjectId(prevState => {
                    getUser(resp.data.userId)
                    return {...prevState, project: resp.data}
                }))
                .catch(err =>console.log(err))
        }
        const getImages = async () => {
            await baseApiUrl
                .get(`/img/${props.match.params.id}`)
                .then(resp => setProjectId(prevState => {
                    return { ...prevState, images: resp.data}
                }))
                .catch(err=> console.log(err.response))
        }
        const getUser = async (userId) => {
            await baseApiUrl
                .get(`/user/${userId}`)
                .then(resp => setProjectId(prevState => {
                    return { ...prevState, user: resp.data}
                }))
                .catch(err => console.log(err.response.data))
        }
        getProject()
        getImages()
        
    }, [props])


    const slides = [] 
    projectId.images.map(image => {
        return slides.push(<img key={image.id} src={`${image.url}`} alt={image.id}></img>)
    })
    return(
        <div className="project-id-background">
            <div className="project-id-content">
                <div className="project-id-name">
                    <h1>{projectId.project.name}</h1>
                    <div className="project-id-divisor"></div>
                </div>
                <div className="carousel">
                    <Carousel images={slides}></Carousel>
                </div>
                <div className="project-id-infos">
                    <div className="project-id-divisor"></div>
                    <h2 className="project-infos">Linguagem: {projectId.project.programingLanguage}</h2>
                    <div className="project-id-divisor"></div>
                    <h2 className="project-infos"><a href={projectId.project.repositoryLink} target="_blank" rel="noreferrer">Repositório</a></h2>
                    <div className="project-id-divisor"></div>
                    <h2 className="project-infos"><a href={projectId.project.link} target="_blank" rel="noreferrer">Link</a></h2>
                    <div className="project-id-divisor"></div>
                    <h3 className="project-obs">Resumo: <br/>
                        {projectId.project.obs}
                    </h3>
                    <div className="project-id-divisor"></div>
                </div>
                <div className="project-id-user">
                    <h1 className="project-infos">Developer: {projectId.user.name}</h1>
                    <div className="project-id-divisor"></div>
                    <div className="project-is-user-infos">
                        <h2 className="project-infos">Telefone: {projectId.user.phone}</h2>
                        <h2 className="project-infos">E-mail: {projectId.user.email}</h2>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProjectId