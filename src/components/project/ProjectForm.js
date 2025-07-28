import { JSON_API } from '../helper/Constants'


import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

import { useEffect, useState } from 'react'

import { CInputGroup, CInputGroupText, CFormInput, CFormLabel, CFormFloating, CFormSelect } from '@coreui/react'





function ProjectForm({ handleSubmit, btnText, projectData }) {

	const [categories, setCategories] = useState([]);
	const [project, setProject] = useState(projectData || {});

	useEffect(() => {

		fetch(`${JSON_API}/categories`, {
			method: "GET",
			headers: {
				'Content-Type': "application/json"
			}
		})
			.then((resp) => resp.json())
			.then((data) => {
				setCategories(data);
			})
			.catch(err => console.log(err))

	}, []);


	const submit = (e) => {
		e.preventDefault();
		//console.log(project);
		handleSubmit(project);
	}
	function handleChange(e) {
		setProject({ ...project, [e.target.name]: e.target.value });
	}

	function handleCategory(e) {
		setProject({
			...project, category: {
				id: e.target.value,
				name: e.target.options[e.target.selectedIndex].text
			}

		});
	}

	return (
		<form onSubmit={submit} className={styles.form}>
			<div className="mb-3">
				<CFormLabel htmlFor="name">Nome do projeto</CFormLabel>
				<CFormInput type="text" name="name" placeholder=""
					onChange={handleChange}
					value={project.name ? project.name : ""}
				/>
			</div>
			<div className="mb-3">
				<CFormLabel htmlFor="budget">Orçamento</CFormLabel>
				<CInputGroup className="mb-3">
					<CInputGroupText>R$</CInputGroupText>
					<CFormInput type="number" name="budget" placeholder="0,00"
						onChange={handleChange}
						value={project.budget ? project.budget : ""}
					/>
				</CInputGroup>
			</div>

			<div className="mb-3">
				<CFormFloating>
					<CFormSelect id="categoryId" name="categoryId" aria-label="Floating label select example"
						onChange={handleCategory}
						value={project.category ? project.category.id : ""}
					>
						<option value="" disabled>Selecione a categoria...</option>
						{categories.length > 0 &&
							categories.map((category) => (
								<option key={category.id} value={category.id}>{category.name}</option>
							))}
					</CFormSelect>
					<CFormLabel htmlFor="categoryId">Categoria</CFormLabel>
				</CFormFloating>
			</div>

			<SubmitButton text={btnText} />
		</form>
	)
}

export default ProjectForm