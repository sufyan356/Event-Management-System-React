import React, { useState , useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import CarouselFun from "../../Components/CarouselFun";
import Cards from "../../Components/Cards";
import {NavLink} from "react-router-dom"
import {
  collection,
  db,
  onSnapshot
} from "../../Firebase/Firebase";

function Home() {
  const [eventsData, setEventsData] = useState([]);

    // FETCH EVENTS DATA
    useEffect(() => {
      try{
        const unsubscribe = onSnapshot(collection(db, "Events"), (snapshot) => {
          const EventsData = snapshot.docs.map((doc) => doc.data());
          setEventsData(EventsData);
  
          // setIsLoader(false);
          console.log("EventsData" ,EventsData)
  
          return () => {
            // Cleanup the listeners when the component unmounts
            unsubscribe();
          };
  
        });
      }
      catch(error){
        console.log(error.code)
        console.log(error.message)
      }
      
  
      
    },[]);

  const images = [
    "https://templatebundle.net/templates/eventwings-html-template/images/eve1.jpg",
    "https://templatebundle.net/templates/eventwings-html-template/images/eve2.jpg",
    "https://templatebundle.net/templates/eventwings-html-template/images/eve3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  return (
    <>
      <div className="home-container" id="home">
        <Slider {...settings} className="sliderCustom">
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
        <div className="overlay-text">
          <h1 className="mainOverlay">All Events At This Plateform</h1>
          <p className="paraMainOverlay">Event , Activities and Experiencies</p>
          {/* Additional text or content */}
        </div>
      </div>

      <Container fluid>
        <Row>
          <Col sm={6} className="leftBoxCol">
            <div className="leftBox border">
              <h1>Who we are</h1>
              <span className="headingsBorder"></span>
              <p className="leftBoxPara">
                The EventWing is a premier event management Organization which
                Works India. We act as a solution provider for all your event
                needs. Our fortelies in being able to deliver a tailor made
                event as per our client’s requirement, even under short notices.
              </p>
              <span className="leftBoxSpan">
                We have served many clients in various industries from music to
                IT, telecom to automotive, educational institutes to banks and
                many big corporate. We aim to make the organisation process
                seamless and enjoyable providing you with the finest VIP client
                experience available.
              </span>
            </div>
          </Col>
          <Col sm={6}>
            <div className="rightBox border">
              <h1>What We Do</h1>
              <span className="headingsBorder"></span>
              <p className="rightBoxPara">
                What We Do Backed up by well trained and qualified
                professionals, our Organization has become one of the stalwarts
                in offering a range of Event Management and Promotional Event
                Management Services. We hold expertise in organizing Corporate
                Events, Star Nights and Road Shows.
              </p>

              <span className="rightBoxSpan">
                Our team of highly knowledgeable, friendly and professional
                planners are ever attentive to your requirements, working with
                you to produce an unparalleled result right down to the last
                detail. Whatever your needs are, anywhere is the country, steps
                in, you just sit back and enjoy the show.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* All Events  */}
      <Container fluid>
        <Row id="all-events-section">
          <Col sm={11} className="ms-auto me-auto mt-3">
            <div className="AllFieldsSlider">
              <h2 className="text-center mt-3 mb-3">All Events</h2>

              <div className=" ">
                   <Col className="mt-3 ms-auto me-auto h4" md = {6} lg = {7} >
                      <CarouselFun eventsFetchedData = {eventsData}/>
                  </Col>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Upcoming Events  */}
      <Container fluid>
        <Row className="" id="upcoming-events">
          <h2 className="text-center mt-3 mb-3">UPCOMING EVENTS</h2>
          {eventsData.length > 0 ? eventsData.map((event, index) => (
            <Col className="mt-3" sm={12} lg={6} xl={3} key={index}>
              <Cards eventsFetchedData = {event} className = "cardsCustom"/>
            </Col>
          )):<h3 className="text-center">No Event Have</h3>}
        </Row>
      </Container>

    </>
  );
}

export default Home;
