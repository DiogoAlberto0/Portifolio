import './Projects.css'

import ProjectCard from './projectCard/ProjectCard'

import baseApiUrl from '../../services/api'
import history from '../../Main/history'
import { useEffect, useState } from 'react'


function ProjectsPage(props) {

    const [ projects, setProjects ] = useState([])

    useEffect(() => {
        const getProjects = async () => {
            await baseApiUrl
                .get(`/projects`)
                .then(resp => getImages([...resp.data]))
                .catch(err =>console.warn(err.response))
        }
        getProjects()

        const getImages = async (projectsArray) => {

            const array = [...projectsArray]
            setProjects([...array])
            for (let index = 0; index < array.length; index++) {
                const element = array[index];

                await baseApiUrl
                    .get(`/img/thumb/${element.id}`)
                    .then(resp => setProjects(prevState => {
                        if(element.id === resp.data.projectId) {
                            prevState[index].thumbLink = resp.data.url
                            return [...prevState]
                        }
                    }))
                    .catch(err => console.warn(err.response))
            }
        }
    }, [])

    return (
        <div className="project-background">
            <div className="project-content">

                <h1 className="project-title">Projetos</h1>
                <div className="project-area">
                {
                    projects.map(project => {
                        return(
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                name={project.name}
                                repositoryLink={project.repositoryLink}
                                programingLanguage={project.programingLanguage}
                                detailsLink={() => history.push(`/projects/details/${project.id}`)}
                                img={project.thumbLink}
                            />
                        )
                    })
                }
                </div>

            </div>
        </div>
    )
}

export default ProjectsPage