import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import {
  collection,
  db,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  getDocs
} from "../../../Firebase/Firebase";
import { FaTrash } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";


// EVENTS DATA SHOWS IN TABLE
function TableComp() {
  const [eventsData, setEventsData] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

    // FETCH EVENTS DATA
    useEffect(() => {
      const fetchData = async () => {
        try {
          const snapshot = await getDocs(collection(db, "Events"));
          const EventsData = snapshot.docs.map((doc) => doc.data());
          setEventsData(EventsData);
          setIsLoader(false);
          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    },[]);


    useEffect(() => {
      const calculateAndSetTimeRemaining = () => {
        if (dataFetched && eventsData.length > 0) {
          const updatedTimeRemaining = eventsData.map((event) => ({
            ...event,
            timeRemaining: calculateTimeRemaining(event.endDate),
          }));
          setTimeRemaining(updatedTimeRemaining);
        }
      };
  
      calculateAndSetTimeRemaining(); // Initial calculation
  
      const interval = setInterval(() => {
        calculateAndSetTimeRemaining(); // Recalculate at each interval
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
  
    }, [dataFetched, eventsData]);
  
  
  
    
  
  function calculateTimeRemaining(endDate) {
    const now = new Date();
    const endTime = new Date(endDate);

    // Set the end time to 12:00 AM of the next day
    endTime.setDate(endTime.getDate() + 1);
    endTime.setHours(0, 0, 0, 0);
  
    // Calculate the time difference between now and the adjusted end time
    const timeDifference = endTime - now;
  
    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      // console.log(days + " " + hours + " " + minutes + " " + seconds)
      // console.log("timeDifference: " , timeDifference)
      // console.log("timeRemaining 2: " , timeRemaining)

    return { days, hours, minutes, seconds };
  }

  // DELETE FUNCTION
  const deleteFun = async (e) => {
    await deleteDoc(doc(db, "Events", e));
  };

  // EDIT FUNCTION
const editFun = async(id, e) => {
  const eventID = eventsData.find((val) => val.EventId === id)
  if(eventID){
    const UpdatedName = prompt("Updated Name:", e.Organizer_Name).trim();
    const UpdatedEventTitle = prompt("Updated Title:", e.Event_Title).trim();
    const UpdatedEventDescription = prompt("Updated Description:", e.Event_Description).trim();
    const UpdatedCategory = prompt("Updated category:", e.category).trim();
    const UpdatedStartDate = prompt("Updated startDate:", e.startDate).trim();
    const UpdatedEndDate = prompt("Updated endDate:", e.endDate).trim();

    if (
      UpdatedName === "" ||
      UpdatedEventTitle === "" ||
      UpdatedEventDescription === "" ||
      UpdatedCategory === "" ||
      UpdatedStartDate === "" ||
      UpdatedEndDate === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    else{
      calculateTimeRemaining(UpdatedEndDate)
      const updatedEventRef = doc(db, "Events", id);
      await updateDoc(updatedEventRef, {
        Organizer_Name : UpdatedName,
        Event_Title : UpdatedEventTitle,
        Event_Description : UpdatedEventDescription,
        category : UpdatedCategory,
        endDate : UpdatedEndDate,
        startDate : UpdatedStartDate,
        EventId : id,
      });
  
    }

  }
  
};

  return (
    <>
      <Table bordered >
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
            {eventsData.length ? (
              <>
                <thead>
                  <tr>
                    <th>#</th>
                    <th colSpan={3}>D&nbsp;&nbsp;&nbsp;&nbsp;H&nbsp;&nbsp;&nbsp;&nbsp;M</th>
                    <th>Image</th>
                    <th>Organizer Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Start Event</th>
                    <th>End Event</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {timeRemaining && eventsData.map((event, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {timeRemaining !== undefined && timeRemaining !== null && timeRemaining.length  && <td className={timeRemaining[index].timeRemaining.days <= 1 ? "warningMsg" : ""}>{timeRemaining[index].timeRemaining.days === 0 ? <ImCross /> : timeRemaining[index].timeRemaining.days}</td>}                     
                      {timeRemaining !== undefined && timeRemaining !== null && timeRemaining.length && <td className={timeRemaining[index].timeRemaining.days <= 1 ? "warningMsg" : ""}>{timeRemaining[index].timeRemaining.hours === 0 ? <ImCross /> : timeRemaining[index].timeRemaining.hours}</td>}                     
                      {timeRemaining !== undefined && timeRemaining !== null && timeRemaining.length  && <td className={timeRemaining[index].timeRemaining.days <= 1 ? "warningMsg" : ""}>{timeRemaining[index].timeRemaining.minutes === 0 ? <ImCross /> : timeRemaining[index].timeRemaining.minutes}</td>}                     
                      <td>
                        <img
                          src={event.imageUrl}
                          alt="EventsImage"
                          className="img-fluid"
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "100%",
                          }}
                        />
                      </td>
                      <td>{(event.Organizer_Name).slice(0 , 20)}</td>
                      <td>{(event.Event_Title).slice(0,20)}</td>
                      <td>{(event.Event_Description).slice(0,20)}</td>
                      <td>{event.category}</td>
                      <td>{event.startDate}</td>
                      <td>{event.endDate}</td>
                       {/* <Link to = {`/details/${event.EventId}`} className="adminSeeDetails"><td>See Detals</td></Link> */}
                      <td>
                        <FaTrash
                        style={{cursor:"pointer"}}
                          onClick={() => {
                            deleteFun(event.EventId);
                          }}
                        />
                      </td>
                      <td>
                        <FaUserEdit
                        style={{cursor:"pointer"}}
                          onClick={() => {
                            editFun(event.EventId , event);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="9" className="text-center">
                    <p>No Events Added yet...</p>
                  </td>
                </tr>
              </tbody>
            )}
          </>
        )}
      </Table>
      
    </>
  );
}

export default TableComp;

