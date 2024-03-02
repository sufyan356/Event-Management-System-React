import { useState , useEffect } from "react";
import { useParams } from "react-router-dom"
import {Container , Row , Col} from "react-bootstrap";

import {
    collection,db,onSnapshot
  } from "../../Firebase/Firebase";
function Details() {
    const [eventDetails , setEventDetails] = useState()
    const [isLoader , setIsLoader] = useState(true)
    const {id} = useParams();

     // FETCH EVENTS DATA
  useEffect(() => {
    try{
      const unsubscribe = onSnapshot(collection(db, "Events"), (snapshot) => {
        const EventsData = [];
        snapshot.forEach((doc) => {
          EventsData.push(doc.data());
        });

        const evetDetailsId = EventsData.find((val) => val.EventId === id)
        setEventDetails(evetDetailsId);
        console.log(evetDetailsId)
        
        setIsLoader(false)

        return () => {
            unsubscribe();
        };

      });
    }
    catch(error){
      console.log(error.code)
      console.log(error.message)
      setIsLoader(false)

    }
  },[id]);
    
  return (
   <>
    {isLoader? 
    <h1>loader</h1> : 
    <Container fluid>
        <Row className="detailsRow">
            <Col sm = {6} className="leftBoxCardsDetails">
                <h1 style={{fontFamily: "cursive"}} className="detailsTitle">{eventDetails.Event_Title}</h1>
                <div className="mt-2">
                    <h4 className="detailsDesc">Events Overview: </h4>
                    <p className="mt-2">{eventDetails.Event_Description}</p>
                </div>
                <div className="mt-2">
                    <p><span style={{opacity: "0.8" , fontSize: "0.8rem" , marginRight : "0.5rem"}}>Event Organized By : </span><span>{eventDetails.Organizer_Name}</span></p>
                    <p><span style={{opacity: "0.8" , fontSize: "0.8rem" , marginRight : "0.5rem"}}>Event Start At :</span> <span>{eventDetails.startDate}</span></p>
                    <p><span style={{opacity: "0.8" , fontSize: "0.8rem" , marginRight : "0.5rem"}}>Event End At :</span> <span>{eventDetails.endDate}</span></p>
                </div>
            </Col>
                
            <Col sm = {6} className="rightBoxCardsDetails">
                <img src={eventDetails.imageUrl} alt="detailedImage" />
            </Col>
                
        </Row>
    </Container>
       
    }
    
   </>
  )
}

export default Details