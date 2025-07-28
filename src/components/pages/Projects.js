import { JSON_API } from '../helper/Constants'

import ToastMessage from "../layout/ToastMessage"
// import Container from "../layout/Container"

import styles from './Projects.module.css'

import { useLocation } from 'react-router-dom'
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from 'react';
import Loading from "../layout/Loading";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Row} from 'react-bootstrap'



function Projects() {

	const [projectsList, setProjectsList] = useState([]);
	const [removeLoading, setRemoveLoading] = useState(false);
	const [projectMessage, setProjectMessage] = useState({ title: "", message: "", type: "" });



	const location = useLocation();
	let message = '';
	let title = '';
	let type = "light";

	if (location.state) {
		message = location.state.message;
		title = location.state.title;

	}

	useEffect(() => {
		getProjectsList();
	}, [])

	function getProjectsList() {
		// setTimeout(() => {
		fetch(`${JSON_API}/projects`, {
			method: "GET",
			headers: {
				'Content-Type': "application/json"
			}
		})
			.then((resp) => resp.json())
			.then((data) => {
				// console.log(data);
				setProjectsList(data);
				setRemoveLoading(true);
			})
			.catch(err => {
				console.log(err);
				setRemoveLoading(true);
			})
		// }, 300);
	}

	function removeProject(id) {
		fetch(`${JSON_API}/projects/${id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': "application/json"
			}
		})
			.then((resp) => resp.json())
			.then((data) => {
				setRemoveLoading(false);
				toast.success("Projeto ID " + id + " removido.");
				getProjectsList();
			})
			.catch(err => {
				console.log(err);
				setRemoveLoading(true);
			})
	}

	return (
		<div>
			<ToastContainer pauseOnFocusLoss={false} position="bottom-right" autoClose={3000}/>

			<div className={styles.titleContainer}>
				<h1>Meus Projetos</h1>
				<LinkButton to="/newproject" text="Novo projeto" />
			</div>

			{message && <ToastMessage title={title} message={message} type={type} />}
			{projectMessage.message && <ToastMessage title={projectMessage.title} message={projectMessage.message} type={projectMessage.type} />}

			{!removeLoading && <Loading />}
			{removeLoading && projectsList.length === 0 && 
				<p>Não há projetos cadastrados.</p>
			}

			<Row className={styles.cardsContainer}>
				{projectsList.length > 0 &&
					projectsList.filter((project) => project.category != null).map((project) => (
						<ProjectCard project={project} key={project.id} handleRemove={removeProject} />
					))}
			</Row>
		</div>

	)
}

export default Projects