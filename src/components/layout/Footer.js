import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import {Navbar, Col} from 'react-bootstrap'
import styles from './Footer.module.css'

function Footer(){

    let fullYear = new Date().getFullYear();

    return(
        <footer>
            <Navbar fixed="bottom" className={styles.footer}>
                <Col className="text-center">
                    <ul className={styles.socialList}>
                        <li>
                            <span className={styles.copyRight}>
                                <span>Costs  </span> &copy;  <small>{fullYear}-{fullYear + 1}</small>
                            </span>
                        </li>
                        <li><FaFacebook/></li>
                        <li><FaInstagram/></li>
                        <li><FaLinkedin/></li>
            
                    </ul>
                </Col>
            </Navbar>
        </footer>
    )
}

export default Footer