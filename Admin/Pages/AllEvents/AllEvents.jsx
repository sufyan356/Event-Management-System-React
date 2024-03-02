import { Button, Modal , Container , Row , Col } from "react-bootstrap";
import { useState } from "react";
import ModalFun from "../../Components/ModalFun"
import "./AllEvents.css"
import TableComp from "../../Components/TableComp"
import { IoRefresh } from "react-icons/io5";



function AllEvents() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex border eventModalButton_Heading">
              <h1>EVENTS</h1>
              <div className="d-flex gap-3">
                <Button variant="primary" onClick={handleShow} className="addEventsBtn">
                  Add Events
                </Button>
                <Button variant="primary d-flex justify-content-center align-items-center" onClick={() => {location.reload()}} >
                  Refresh
                  <IoRefresh />
                </Button>
              </div>
              
            </div>
            <div className="tableContainer">
              <TableComp/>
            </div>
            <ModalFun show={show} handleClose={handleClose}/>

          </Col>
        </Row>
      </Container>

      
    </>
  );
}

export default AllEvents;
