import { JSON_API } from '../helper/Constants'

import {useNavigate} from 'react-router-dom'

import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProject(){

    const navigate = useNavigate();

    function createPost(project){
        // initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch(`${JSON_API}/projects`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data);
            //redirect
            navigate("/projects", {state: {title: "Novo projeto", message: "Projeto criado com sucesso."}});
        })
        .catch(err => console.log(err))

    }



    return(
       <div className={styles.newProjectContainer}>
           <h1>Criar Projeto</h1>
           <p>Crie seu projeto para depois adicionar os serviços.</p>

           <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
       </div>
    )
}

export default NewProject