
import {Toast, ToastContainer} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import styles from './ToastMessage.module.css'


function ToastMessage({title, message, type}) {
    const [show, setShow] = useState(false);

    const toastTimeoutSeconds = 4;
    const toastTimeout = toastTimeoutSeconds * 1000;

    useEffect(() => {
      if (!message){
        setShow(false);
        return;
      }

      setShow(true);



    }, [message]);

    return (
      

      <ToastContainer className={styles.toastContainer}>
        <Toast onClose={() => setShow(false)} show={show} delay={toastTimeout} autohide bg={type}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>


      
    );
  }
  
  // render(<ToastMessage />);


export default ToastMessage