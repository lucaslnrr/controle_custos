import { useState } from 'react'

import styles from '../project/ProjectForm.module.css'

import SubmitButton from '../form/SubmitButton'
import { CInputGroup, CInputGroupText, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'



function ServiceForm({ handleSubmit, btnText, projectData }) {

	const [service, setService] = useState([]);

	function submit(e) {
		e.preventDefault();
		projectData.services.push(service);
		handleSubmit(projectData);
	}
	
	function handleChange(e) {
		setService({ ...service, [e.target.name]: e.target.value });
	}

	return (
		<form onSubmit={submit} className={styles.form}>
			<div className="mb-3">
				<CFormLabel htmlFor="name">Nome do serviço</CFormLabel>
				<CFormInput type="text" name="name" placeholder="" required
					onChange={handleChange}
				/>
			</div>
			<div className="mb-3">
				<CFormLabel htmlFor="cost">Custo:</CFormLabel>
				<CInputGroup className="mb-3">
					<CInputGroupText>R$</CInputGroupText>
					<CFormInput type="number" name="cost" placeholder="0,00" required
						onChange={handleChange}
					/>
				</CInputGroup>
			</div>
			<div className="mb-3">
				<CInputGroup>
					<CInputGroupText name="description">Descrição</CInputGroupText>
					<CFormTextarea aria-label="description" placeholder="Insira a descrição do serviço"
						onChange={handleChange}
					></CFormTextarea>
				</CInputGroup>
			</div>

			<SubmitButton text={btnText} />
		</form>
	)
}

export default ServiceForm