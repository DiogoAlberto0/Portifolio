import './Projects.css'

import ProjectCard from './projectCard/ProjectCard'

import baseApiUrl from '../../services/api'
import history from '../../Main/history'
import { /*useContext,*/ useEffect, useState } from 'react'
// import { Context } from '../../Context/AuthContext'

const inicialState = {
    list: []
}

function ProjectsPage(props) {

    const [projects, setProjects] = useState({...inicialState})

    useEffect(() => {
        async function getProject() {
            await baseApiUrl
                .get('/projects')
                .then(resp => setProjects({list: resp.data}))
                .catch(e => console.warn(e))
        }
        getProject()
    }, [])
    return (
        <div className="project-content">
            <h1 className="project-title">Projetos</h1>
            <div className="project-area">
            {
                projects.list.map(project => {
                    return(<ProjectCard 
                        key={`${project.id}`} 
                        title={project.name}
                        img={project.thumbLink}
                        repositoryLink={project.repositoryLink}
                        programingLanguage={project.programingLanguage}
                        detailsLink={e => history.push(`/projects/details/${project.id}`)}
                    />)
                })
            }
            </div>
        </div>
    )
}

export default ProjectsPage