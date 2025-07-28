import styles from '../project/ProjectCard.module.css'

import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {BsFillTrashFill} from 'react-icons/bs'


function ServiceCard({service, handleRemove}){

    function remove(e){
        e.preventDefault();
        handleRemove(service.id, service.cost);
    }

    return(
        <Card className={styles.projectCard} style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
        <Card.Body>
            <Card.Title>{service.name}</Card.Title>
            <Card.Text>
            {service.description ? service.description : "Sem descrição."}
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            {/* <ListGroupItem>ID: {service.id}</ListGroupItem> */}
            <ListGroupItem>Custo: R${service.cost}</ListGroupItem>
        </ListGroup>
        <Card.Body>
            {/* <Link className={styles.projectCardActions} to={`/project/${service.id}`} >
                <BsPencil/>
            </Link> */}
            <Link className={styles.projectCardActions} to="#">
                <BsFillTrashFill className={styles.deleteIcon} onClick={remove}/>
            </Link>
        </Card.Body>
        </Card>
    )
}

export default ServiceCard