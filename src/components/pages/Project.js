import { JSON_API } from '../helper/Constants'
import { v4 as uuidv4 } from 'uuid'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading';
// import Container from '../layout/Container';
import Switch from '../helper/Switch';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

import {Row} from 'react-bootstrap'




function Project() {

	const { id } = useParams();
	const [project, setProject] = useState({});
	const [services, setServices] = useState([]);
	const [removeLoading, setRemoveLoading] = useState(false);
	const [showProjectForm, setShowProjectForm] = useState(false);
	const [showServiceForm, setShowServiceForm] = useState(false);

	useEffect(() => {
		// setTimeout(() => {
		fetch(`${JSON_API}/projects/${id}`, {
			method: "GET",
			headers: { 'Content-Type': "application/json" }
		})
			.then((resp) => resp.json())
			.then((data) => {
				// console.log(data);
				setProject(data);
				setServices(data.services);
				setRemoveLoading(true);
			})
			.catch(err => {
				console.log(err);
				setRemoveLoading(true);
			})

		// }, 300);

	}, [id]);

	function toggleProjectForm() {
		setShowProjectForm(!showProjectForm);
	}
	function toggleServiceForm() {
		setShowServiceForm(!showServiceForm);
	}

	function editarProjeto(project) {
		if (project.budget < project.cost) {
			toast.error("Custo menor do que o budget.");
			return;
		}

		if (project.category.id == "") {
			toast.warning("Selecione a categoria.");
			return;
		}

		fetch(`${JSON_API}/projects/${project.id}`, {
			method: "PUT",
			headers: { 'Content-Type': "application/json" },
			body: JSON.stringify(project)
		})
			.then((resp) => resp.json())
			.then((data) => {
				// console.log(data);
				toast.success("Projeto alterado.");
				setProject(data);
				toggleProjectForm();
			})
			.catch(err => {
				console.log(err);
			})
	}

	function createService(project) {

		var lastService = {};
		if (project.services.length > 0)
			lastService = project.services[project.services.length - 1];
		lastService.id = uuidv4();

		// calculate project cost
		var projectCost = 0;
		project.services.map((service) => projectCost += parseFloat(service.cost))
		project.cost = projectCost;

		// console.log(lastService);

		var lastServiceCost = (lastService.cost) ? lastService.cost : 0;

		var newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

		// console.log(project);
		// console.log(project.cost + "/" + newCost + "/" + parseFloat(project.budget));
		if (newCost > parseFloat(project.budget)) {
			toast.warning("Orçamento ultrapassado, verifique o valor do serviço.");
			project.services.pop();
			return false;
		}

		// add service cost to project total cost
		project.cost = newCost;

		// update project
		fetch(`${JSON_API}/projects/${project.id}`, {
			method: "PUT",
			headers: { 'Content-Type': "application/json" },
			body: JSON.stringify(project)
		})
			.then((resp) => resp.json())
			.then((data) => {
				// console.log(data);
				toast.success("Serviço adicionado.");
				setProject(data);
				toggleServiceForm();
			})
			.catch(err => {
				console.log(err);
				toast.error("Erro ao adicionar serviço.");
			})

	}

	function removeService(serviceId, serviceCost) {
		const servicesUpdated = project.services.filter(
			(service) => service.id !== serviceId
		)

		const projectUpdated = project;

		projectUpdated.services = servicesUpdated;
		projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(serviceCost);

		fetch(`${JSON_API}/projects/${project.id}`, {
			method: "PUT",
			headers: { 'Content-Type': "application/json" },
			body: JSON.stringify(projectUpdated)
		})
			.then((resp) => resp.json())
			.then((data) => {
				setProject(projectUpdated);
				setServices(servicesUpdated);
				toast.success("Serviço removido.");
			})
			.catch(err => {
				console.log(err);
				toast.error("Erro ao remover serviço.");
			})
	}


	return (
		<div>

			{!project.name ? (
				<>
					{!removeLoading && <Loading />}
				</>
			) : (
				<div className={styles.projectDetails}>

					<ToastContainer pauseOnFocusLoss={false} position="bottom-right" autoClose={3000}/>

						<div className={styles.detailsContainer}>
							<h1>Projeto: {project.name}</h1>
							<button onClick={toggleProjectForm} className={styles.btn}>
								{showProjectForm ? "Fechar" : "Editar projeto"}
							</button>
							<Switch test={showProjectForm}>
								<div value={false} className={styles.projectInfo}>
									<p>
										<span>Categoria: </span> {project.category.name}
									</p>
									<p>
										<span>Budget Total: </span> R${project.budget}
									</p>
									<p>
										<span>Total Utilizado: </span> R${project.cost}
									</p>
								</div>
								<div value={true} className={styles.projectInfo}>
									<ProjectForm handleSubmit={editarProjeto} btnText="Salvar" projectData={project} />
								</div>
							</Switch>
						</div>

						<div className={styles.serviceFormContainer}>
							<h2>Adicione um serviço:</h2>
							<button onClick={toggleServiceForm} className={styles.btn}>
								{showServiceForm ? "Fechar" : "Adicionar serviço"}
							</button>
							<div className={styles.projectInfo}>
								{showServiceForm && 
									<ServiceForm
										btnText="Adicionar serviço"
										handleSubmit={createService}
										projectData={project}
									/>
								}
							</div>
						</div>
						
						<div>
							<h2>Serviços</h2>
							<Row>
								{services.length > 0 &&
									services.map((service) => (
										<ServiceCard key={service.id} service={service} handleRemove={removeService} />
									))}
								{services.length == 0 && (
									<p>Não há serviços cadastrados.</p>

								)}
							</Row>
						</div>
				</div>
			)}
		</div>
	)
}

export default Project