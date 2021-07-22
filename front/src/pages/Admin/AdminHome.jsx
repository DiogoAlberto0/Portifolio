import './AdminHome.css'

import AdminButton from '../../components/AdminButton/AdminButton'
import Button from '../../components/Button/Button'

import HomeButton from '../../images/botao-home.png'
import ProjectButton from '../../images/projeto-da-casa.png'
import ContactButton from '../../images/contato.png'

import { Context } from '../../Context/AuthContext'
import { useContext } from 'react'

import history from '../../Main/history'

const AdminHome = props => {

    const { handleLogout } = useContext(Context)

    return(
        <div className="background-admin-home">
            <aside className="menu-admin">
                <AdminButton img={HomeButton} onClick={e => history.push('/home/edit')} alt="Home"/>
                <AdminButton img={ProjectButton} onClick={e => history.push('/projects/edit')} alt="Project"/>
                <AdminButton img={ContactButton} onClick={e => history.push('/contact')} alt="Contact"/>
            </aside>
            <Button title="Sair" secondaryClass="admin-button-out" onClick={e => handleLogout(e)}/>
        </div>
    )
}

export default AdminHome