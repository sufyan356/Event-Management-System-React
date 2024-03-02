import {Container , Row , Col , Card , Spinner} from 'react-bootstrap';
import "./AdminHome.css"
import { useEffect, useState } from 'react';
import {
  collection,
  db,
  getDocs
} from "../../../Firebase/Firebase";
function AdminHome() {
  // const [eventdata , setEventsData] = useState([])
  const [eventLength , setEventLength] = useState(null)
  const [registerationLength , setRegistrationLength] = useState(null)
  const [usersDataLength , setUsersDataLength] = useState(null)
  const [isLoader , setIsLoader] = useState(true)
   // FETCH EVENTS DATA
   useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Events Data
        const eventsSnapshot = await getDocs(collection(db, "Events"));
        const eventsData = eventsSnapshot.docs.map((doc) => doc.data());
        setEventLength(eventsData.length);
  
        // Fetch Registration Data
        const registrationsSnapshot = await getDocs(collection(db, "Registeration"));
        const registrationsData = registrationsSnapshot.docs.map((doc) => doc.data());
        setRegistrationLength(registrationsData.length);

        // Fetch Users Data
        const usersSnapshot = await getDocs(collection(db, "Users"));
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        setUsersDataLength(usersData.length);
  
        setIsLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoader(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
  <>
    <Container>
      <Row className='mt-2'>
        {isLoader ? (
           <div
           style={{
             height: "100vh",
             width: "100%",
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
           }}
         >
           <Spinner animation="border" variant="warning" />
         </div>
        ) : (
         <>
            <Col sm={6} md={4} key = "1" className='AdminHomeColClass'>
                <Card>
                  <Card.Body className='cardBodyForAdminHome'>
                    No of Events {eventLength}
                  </Card.Body>
                </Card>
            </Col>

            <Col sm={6} md={4} key = "2" className='AdminHomeColClass'>
              <Card>
                <Card.Body className='cardBodyForAdminHome'>
                  No of Registerations {registerationLength}
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} md={4} key = "3" className='AdminHomeColClass'>
              <Card>
                <Card.Body className='cardBodyForAdminHome'>
                  No of Users: {usersDataLength}
                </Card.Body>
              </Card>
            </Col>
         </>
            
         
        )}
      </Row>
    </Container>
  </>
);

}

export default AdminHome