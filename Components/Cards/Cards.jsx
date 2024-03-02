import React, { useState, useEffect } from "react";
import {Button , Card , Container , Row , Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { collection, db, getDocs, onSnapshot , doc , deleteDoc } from "../../Firebase/Firebase";

function Cards({ eventsFetchedData }) {
  const isUser = JSON.parse(localStorage.getItem("latestUser"));

  const navigate = useNavigate();
  const [registerationData, setRegisterationData] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isEvent, setIsEvent] = useState(true);

  async function deleteFun() {
    try {
      // Assuming eventsFetchedData.EventId is the document ID
      const eventDocRef = doc(db, "Events", eventsFetchedData.EventId);
      
      // Delete the event document
      await deleteDoc(eventDocRef);
      
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // FETCH REGISTERATION DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Registeration"));
        const EventsData = snapshot.docs.map((doc) => doc.data());
        setRegisterationData(EventsData);
        // setIsLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    if (timeRemaining && (timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0)) {
      console.log("DELETE")
      deleteFun();
    }
  }, [timeRemaining]);

  function calculateTimeRemaining() {
    const now = new Date();
    const endTime = new Date(eventsFetchedData.endDate);

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

    return { days, hours, minutes, seconds };
  }
  
  let isUserExist;
if (isUser && eventsFetchedData && Array.isArray(eventsFetchedData.userId)) {
  // isUserExist = eventsFetchedData.userId;

  if (Array.isArray(eventsFetchedData.userId)) {
    if (eventsFetchedData.userId.includes(isUser.id)) {
      isUserExist = isUser.id;
    } else {
      // console.log("NIKAL!..")
    }
  } else {
    console.log("eventsFetchedData.userId is not an array.");
  }
}
 else {
  console.log("isUser or eventsFetchedData not available.");
}



  return (
    <>
          {isEvent && timeRemaining && (timeRemaining.days !== 0 || timeRemaining.hours !== 0 || timeRemaining.minutes !== 0)  
          && 
          (
            <Card
            style={{ width: "19rem", cursor: "pointer" }}
            className="cardsCustom"
          >
            <div className="cardsImage">
              <Card.Img variant="top" src={eventsFetchedData.imageUrl} className="img-fluid" style={{ width: '100%',height:"10rem", objectFit: 'fill' }}/>
            </div>
            <Card.Body>
              <Card.Title className="cardsTitleStyle">
                {eventsFetchedData.Event_Title.slice(0, 20)}
              </Card.Title>
              <Card.Text className="cardsDescriptionStyle">
                {eventsFetchedData.Event_Description.slice(0, 20)}{" "}
                
              </Card.Text>
              <Card.Text className="cardsStartDate">{eventsFetchedData.startDate}</Card.Text>
              {timeRemaining !== null && (
                <div className="dateContainerParent">
                  <div className="dateContainer">
                    <span className="p-3 border days">{timeRemaining.days}</span>
                    <span className="text-center timeText">DAYS</span>
                  </div>
                  <div className="dateContainer ">
                    <span className="p-3 border hours">
                      {timeRemaining.hours}
                    </span>
                    <span className="text-center timeText">HOURS</span>
                  </div>
                  <div className="dateContainer">
                    <span className="p-3 border mins">
                      {timeRemaining.minutes}
                    </span>
                    <span className="text-center timeText">MINS</span>
                  </div>
                  <div className="dateContainer">
                    <span className="p-3 border secs">
                      {timeRemaining.seconds}
                    </span>
                    <span className="text-center timeText">SECS</span>
                  </div>
                </div>
              )}
              <div className="registerBtnContainer">
                {isUser ? (
                  isUserExist ? (
                    <Button variant="primary" className="registerBtn">
                      Already Registered
                    </Button>
                  ) : (
                    <Link to={`/registeration/${eventsFetchedData.EventId}`}>
                      <Button variant="primary" className="registerBtn">
                        Register
                      </Button>
                    </Link>
                  )
                ) : (
                  <Link to={"/login"}>
                    <Button variant="primary" className="registerBtn">
                      REGISTER
                    </Button>
                  </Link>
                )}
                <Link to={`/details/${eventsFetchedData.EventId}`}>
                  <Button variant="primary" className="eventdetailsBtn">
                    See Details
                  </Button>
                </Link>
                
              </div>
            </Card.Body>
            </Card>
          
          )}
    </>
  );
}

export default Cards;
