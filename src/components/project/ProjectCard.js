
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import styles from './ProjectCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ project, handleRemove }) {

	const remove = (e) => {
		e.preventDefault();
		handleRemove(project.id);
	}

	return (
		<Card className={styles.projectCard} style={{ width: '300px' }}>
			{/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
			<Card.Body>
				<Card.Title>{project.name}</Card.Title>
				<Card.Text>
					{project.description ? project.description : "Sem descrição."}
				</Card.Text>
			</Card.Body>
			<ListGroup className="list-group-flush">
				<ListGroupItem>ID: {project.id}</ListGroupItem>
				<ListGroupItem>Budget: R${project.budget}</ListGroupItem>
				<ListGroupItem className={styles.categoryText}>
					<span className={`${styles[project.category.name.toLowerCase()]}`}></span> {project.category.name}
				</ListGroupItem>
			</ListGroup>
			<Card.Body>
				<Link className={styles.projectCardActions} to={`/project/${project.id}`} >
					<BsPencil />
				</Link>
				<Link className={styles.projectCardActions} to="#">
					<BsFillTrashFill className={styles.deleteIcon} onClick={remove} />
				</Link>
			</Card.Body>
		</Card>
	)
}

export default ProjectCard