import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Projects from '../pages/Projects/Projects'
import ProjectsId from '../pages/Projects/ProjectId/ProjectId'
import ContactUs from '../pages/ContactaUs/ContactUs'

import Singin from '../pages/Singin/Singin'
import AdminHome from '../pages/Admin/AdminHome'

import HomeEdit from '../pages/Admin/HomeEdit/HomeEdit'
import ContactMe from '../pages/Admin/ContactMe/ContactMe'
import ProjectsEdit from '../pages/Admin/ProjectsEdit/ProjectsEdit'


const routes = props => {
    return(
        <Switch>
            {/* Componentes publicos */}
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/details/:id" component={ProjectsId}/>
            <Route path="/contact/us" component={ContactUs} />

            {/* Componentes admins */}
            <Route path="/singin" component={Singin} />
            <Route path="/admin/home" component={AdminHome} />
            <Route path="/home/edit" component={HomeEdit} />
            <Route path="/projects/edit" component={ProjectsEdit} />
            <Route path="/contact" component={ContactMe} />
        </Switch>
    )
}

export default routes