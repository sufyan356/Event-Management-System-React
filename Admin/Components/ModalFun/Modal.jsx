import { Button, Modal} from "react-bootstrap";
import FormFun from "../FormFun";
function ModalFun({ show, handleClose , initialEventData  }) {
  return (
    <>
        <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton>
          <Modal.Title>Add Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFun onHide={handleClose} />
        </Modal.Body>

      </Modal>
    </>
  )
}

export default ModalFun