import {Link} from 'react-router-dom'

import {Navbar, Nav} from 'react-bootstrap'
import styles from './Navibar.module.css'
import logo from '../../img/costs_logo.png'

function Navibar(){

    const logoStyle = {
        height: "40px",
        marginRight: "10px"
    }

    return(
        <nav >
            <Navbar fixed="top" variant="dark" className={`${styles.navbar}`}>
                <Nav className="me-auto" >
                    <Link to="/"><img src={logo} style={logoStyle} alt="Costs"/></Link>
                    <Link className="navbar-brand" to="/">Costs</Link>
                </Nav>
                <Nav className="me" >
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/projects">Projetos</Link>
                    {/* <Link className="nav-link" to="/company">Empresa</Link> */}
                    {/* <Link className="nav-link" to="/contact">Contato</Link> */}
                </Nav>
            </Navbar>
        </nav>
    )
}

export default Navibar
