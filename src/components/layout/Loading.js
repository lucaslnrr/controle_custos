import styles from './Loading.module.css'
import {Spinner} from 'react-bootstrap'

function Loading({to, text}){
    return(
       <div className={styles.loadingContainer}>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
       </div>
    )
}

export default Loading