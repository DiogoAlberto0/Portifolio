import './Menu.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

import { Navbar, Container, Nav } from 'react-bootstrap'

function Menu(props) {

    return (
        <Navbar expand="lg" className="background-menu">
            <Container>
                <Navbar.Brand><Link to="/" className="menu-link">Diogo Alberto</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <i class="fas fa-bars" style={{color: 'chartreuse', fontSize: `${28}px`}}></i>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="teste">
                    <Nav className="me-auto" >
                        <Nav.Link><Link to="/projects" className="menu-link">Projetos</Link></Nav.Link>
                        <Nav.Link><Link to="/contact/us" className="menu-link">Contate-nos</Link></Nav.Link>
                    </Nav>
                    <Nav className="mr-auto" >
                        <Nav.Link><Link to="/singin" className="menu-link">Entrar</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default Menu