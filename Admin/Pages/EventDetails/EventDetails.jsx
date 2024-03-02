
import { useState, useEffect } from "react";
import { collection, db, getDocs, deleteDoc , doc } from "../../../Firebase/Firebase";
import { Table, Spinner } from "react-bootstrap";

function EventDetails() {
  const [isRegisterationData, setRegistrationData] = useState([]);
  const [isEventsData, setEventsData] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  const deleteFun = async (docId) => {
    console.log("Deleting document with ID:", docId);
    await deleteDoc(doc(db, "Registeration", docId));
  };

  const getEventsData = (eventId) => {
    return isEventsData.find((event) => event.EventId === eventId) || {};
  };

  // FETCH EVENTS & REGISTERATIONS DATA WHEN COMP MOUNT FIRST TIME
  useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch Events Data
          const eventsSnapshot = await getDocs(collection(db, "Events"));
          const eventsData = eventsSnapshot.docs.map((doc) => doc.data());
          setEventsData(eventsData);
    
          // Fetch Registration Data
          const registrationsSnapshot = await getDocs(collection(db, "Registeration"));
          const registrationsData = registrationsSnapshot.docs.map((doc) => doc.data());
          setRegistrationData(registrationsData);
          setIsLoader(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoader(false);
        }
      };

      fetchData();
  }, []);

  // WHEN EVENTS OR REGISTERATIONS DATA IS CHANGED
  useEffect(() => {
    const processRegistrationData = async () => {
      let myArr = [];

      for (let i = 0; i < isRegisterationData.length; i++) {
        let found = false;

        for (let j = 0; j < isEventsData.length; j++) {
          if (isRegisterationData[i].eventId === isEventsData[j].EventId) {
            found = true;
            break;
          }
        }

        if (!found) {
          myArr.push(isRegisterationData[i].eventId);
          await deleteFun(isRegisterationData[i].docId);
        }
      }

      for (let i = 0; i < myArr.length; i++) {
        const eventImageUrl = getEventsData(myArr[i]).imageUrl;
        const eventTitle = getEventsData(myArr[i]).Event_Title;
      }
    };

    processRegistrationData();
  }, [isEventsData, isRegisterationData]);




  return (
    <div className="tableContainer">
      <Table bordered>
        {isLoader ? (
          <tbody>
            <tr>
              <td colSpan="9" className="text-center">
                <Spinner animation="border" />
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            {isRegisterationData.length ? (
              <>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Event's Title</th>
                    <th>User Name</th>
                    <th>User Email</th>
                  </tr>
                </thead>
                <tbody>
                  {isRegisterationData.map((reg, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={getEventsData(reg.eventId).imageUrl || ''}
                          alt="EventsImage"
                          className="img-fluid"
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "100%",
                          }}
                        />
                      </td>
                      <td>{getEventsData(reg.eventId).Event_Title || ''}</td>
                      <td>{reg.userName}</td>
                      <td>{reg.userEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="9" className="text-center">
                    <p>No Registerations Have...</p>
                  </td>
                </tr>
              </tbody>
            )}
          </>
        )}
      </Table>
    </div>
  );
}

export default EventDetails;
