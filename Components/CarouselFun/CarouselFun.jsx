// // import Carousel from "react-bootstrap/Carousel";
// // import ExampleCarouselImage from 'components/ExampleCarouselImage';
// import { Carousel } from 'antd';

// function CarouselFun({ eventsFetchedData }) {
//   const contentStyle = {
//     width: '50%',
//     color: '#fff',
//     textAlign: 'center',
//     background: '#364d79',
//     marginLeft: "auto",
//     marginRight: "auto",
//     objectFit: "cover",
//   };
  

//   return (
//  <>
//         <Carousel autoplay>
//           {eventsFetchedData.map((event, index) => (
//               <div key={index}>
//             <img
//               src={event.imageUrl}
//               alt={`Slide ${index + 1}`}
//               style={{
//                 width: window.innerWidth <= 991 ? '100%' : '50%',
//                 // width: '70%',
//                 marginLeft: "auto",
//                 marginRight: "auto"
//               }}
//             />                
//             <h3 style={{textAlign:"center" , zIndex: "100!important" , color:"blue" , marginBottom:"2rem"}}>{event.startDate}</h3>
//               </div>
//           ))}
//         </Carousel>
//  </>
//   );
// }

// export default CarouselFun;
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';

function CarouselFun({ eventsFetchedData }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Carousel autoplay>
        {eventsFetchedData.map((event, index) => (
          <div 
          key={index}
          style={{ maxHeight: '300px', objectFit: 'fill' , border:"10px solid red"}}
          >
            <img
              src={event.imageUrl}
              alt={`Slide ${index + 1}`}
              style={{
                width: windowWidth <= 991 ? '100%' : '50%', // Adjust the widths as needed
                marginLeft: 'auto',
                marginRight: 'auto',
                maxHeight: '300px', // Adjust this value as needed
                objectFit: 'fill',
              }}
              className='img-fluid'
            />
            <h3
              style={{
                textAlign: 'center',
                zIndex: '100!important',
                color: 'blue',
                marginBottom: '2rem',
              }}
            >
              {event.startDate}
            </h3>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselFun;
