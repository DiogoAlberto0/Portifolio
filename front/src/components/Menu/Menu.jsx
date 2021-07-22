import './Menu.css'

import { Link } from 'react-router-dom'

function Menu( props ) {

    return(
        <div className = "background-menu" v-if={props.vif}>
            <div className = "menu-left-side">
                <Link to = "/" className = "menu-link">Home</Link>
                <Link to = "/projects" className = "menu-link">Projetos</Link>
                <Link to = "/contact/us" className = "menu-link">Contate-nos</Link>
            </div>
            <div className="menu-right-side">
                <Link to="/singin" className="menu-link">Entrar</Link>
            </div>
        </div>
    )
}


export default Menu