
import {Form , FloatingLabel , Spinner  ,Row , Col , Button} from 'react-bootstrap';
import "./FormFun.css";
import { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button as AntButton, Space, Upload , message } from 'antd';
import {ref, uploadBytesResumable, getDownloadURL,storage ,  addDoc, collection , doc, updateDoc , db } from "../../../Firebase/Firebase"

function FormFun({onHide }) {
  const [name , setName] = useState("")
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")

  const [option , setOption] = useState("")
  const [startDate , setStartDate] = useState("")
  const [endDate , setEndDate] = useState("")
  const [imageUrl, setImageUrl] = useState('');
  const [eventSubmitBtn, setEventSubmitBtn] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const formRef = useRef(null);

const selectValueChange = (e) => {
  setOption(e.target.value)
}

const ImageUploader = (info) => {
  if (info.file.status === 'done') {
    setEventSubmitBtn(false);

    let id;
    const latestUserData = JSON.parse(localStorage.getItem("latestUser"))
    id = latestUserData.id

    // const storageRef = ref(storage, `images/${id}`);
    const storageRef = ref(storage, `images/EventsImages/${new Date().getTime()}_${info.file.type}`);
    const uploadTask = uploadBytesResumable(storageRef, info.file.originFileObj);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log('error', error.message);
        console.log('error', error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL); 
          setEventSubmitBtn(true);

        });
      }
    );
  } else if (info.file.status === 'error') {
    console.error(`${info.file.name} file upload failed.`);
  }
};

const submitHandler = async (e) => {
    e.preventDefault();
    const latestUser = JSON.parse(localStorage.getItem("latestUser"));
  
    if (name && title && description && startDate && endDate && imageUrl && option) {
      setEventSubmitBtn(false)
      // setIsLoader(true)
      try {
       
        const EventsDocRef = await addDoc(collection(db, "Events"), {
          Organizer_Name: name,
          Event_Title: title,
          Event_Description: description,
          startDate:startDate,
          endDate:endDate,
          category:option,
          imageUrl:imageUrl,
        });
        console.log("Document written with ID: ", EventsDocRef.id);
        const updatedEventsDocRef = doc(db, "Events", EventsDocRef.id);
        await updateDoc(updatedEventsDocRef, {
          EventId:EventsDocRef.id
        });
        // formRef.current.reset()
        setOption("")
        success();

        setTimeout(() => {
          onHide();
        },1000);

      
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    else{
      alert("FILL ALL FIELDS!...");
    }
    
}

const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Event Added Successfully',
    });
  };

  return (
    <>
      {isLoader ? (
        <div
          style={{
            height: "50vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <Row className="g-2">
          {contextHolder}
  
          <Form
            className="modalCustomClass"
            ref={formRef}
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <FloatingLabel controlId="floatingTextName" label="Organizer's Name" className="">
              <Form.Control type="text" placeholder="Organizer's Name" onChange={(e) => setName(e.target.value)} />
            </FloatingLabel>
  
            <FloatingLabel controlId="floatingTextTitle" label="Event's Title" className="mt-2">
              <Form.Control type="text" placeholder="Event's Title" onChange={(e) => setTitle(e.target.value)} />
            </FloatingLabel>
  
            <FloatingLabel controlId="floatingTextDescription" label="Event's Description" className="mt-2">
              <Form.Control
                as="textarea"
                placeholder="Event's Description"
                style={{ height: '100px' }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
  
            <Col sm={6} md={12}>
              <select
                value={option}
                onChange={selectValueChange}
                className='selectCustom'
                style={{ height: '4rem', marginTop: '1rem' }}
              >
                <option value="" className='optionCustom'>
                  Open this select menu
                </option>
                <option value="FAST" className='optionCustom'>
                  FAST
                </option>
                <option value="SSUET" className='optionCustom'>
                  SSUET
                </option>
                <option value="UBIT" className='optionCustom'>
                  UBIT
                </option>
              </select>
            </Col>
  
            <Col sm={12} className='dateContainer'>
              <Form.Group className="mb-3 border" controlId="eventStart">
                <Form.Label>Start Event</Form.Label>
                <Form.Control
                  type='date'
                  name='eventStart'
                  placeholder='Event starting Date'
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3 border" controlId="eventEnd">
                <Form.Label>End Event</Form.Label>
                <Form.Control
                  type='date'
                  name='eventEnd'
                  placeholder='Event Ending Date'
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
  
            <Col className='mt-4 mb-4'>
              <Space
                direction="vertical"
                style={{
                  width: '100%',
                }}
                size="large"
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture"
                  maxCount={1}
                  onChange={ImageUploader}
                >
                  <AntButton icon={<UploadOutlined />}>Upload (Max: 1)</AntButton>
                </Upload>
              </Space>
            </Col>
  
            {eventSubmitBtn && (
              <Button variant="primary" type="submit" className='modalSubmitbtn'>
                Submit
              </Button>
            )}
          </Form>
        </Row>
      )}
    </>
  );
  
  // return (
  //   <>
    
  //   {isLoader ? 
  //   <div
  //   style={{
  //     height: "100vh",
  //     width: "100%",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   }}
  // >
  //   <Spinner animation="border" variant="warning" />
  //   </div>
  // :
  //   <Row className="g-2">
  //     {contextHolder}

  //   <Form className="modalCustomClass" ref={formRef} onSubmit={(e) => {submitHandler(e)}} >
  //     <FloatingLabel controlId="floatingTextName" label="Organizer's Name"  className="">
  //       <Form.Control type="text" placeholder="Organizer's Name" onChange={(e) => {setName(e.target.value)}}/>
  //     </FloatingLabel>

  //     <FloatingLabel controlId="floatingTextTitle" label="Event's Title"  className="mt-2">
  //       <Form.Control type="text" placeholder="Event's Title" onChange={(e) => {setTitle(e.target.value)}}/>
  //     </FloatingLabel>

  //    <FloatingLabel controlId="floatingTextDescription" label="Event's Description"  className="mt-2">
  //       <Form.Control
  //         as="textarea"
  //         placeholder="Event's Description"
  //         style={{ height: '100px' }}
  //         onChange={(e) => {setDescription(e.target.value)}}
  //       />
  //     </FloatingLabel>

  //     <Col sm = {6} md = {12}>

  //       {/* <div> */}
  //         <select value={option} onChange={selectValueChange} className='selectCustom' style={{height : "4rem" , marginTop : "1rem"}}>
  //           <option value = "" className='optionCustom'>Open this select menu</option>
  //           <option value = "FAST" className='optionCustom' >FAST</option>
  //           <option value = "SSUET" className='optionCustom' >SSUET</option>
  //           <option value = "UBIT" className='optionCustom'>UBIT</option>
  //         </select>
  //       {/* </div> */}

  //     </Col>

  //     <Col sm = {12} className='dateContainer' >
  //         <Form.Group className="mb-3 border" controlId="eventStart">
  //           <Form.Label>Start Event</Form.Label>
  //           <Form.Control type='date' name='eventStart' placeholder='Event starting Date'  onChange={(e) => {setStartDate(e.target.value)}}/>
  //         </Form.Group>

  //         <Form.Group className="mb-3 border" controlId="eventEnd">
  //           <Form.Label>End Event</Form.Label>
  //           <Form.Control type='date' name='eventEnd' placeholder='Event Ending Date'  onChange={(e) => {setEndDate(e.target.value)}}/>
  //         </Form.Group>
  //     </Col>
  //     <Col className='mt-4 mb-4'>
  //       <Space
  //             direction="vertical"
  //             style={{
  //               width: '100%',
  //             }}
  //             size="large"
  //           >
  //           <Upload
  //             action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
  //             listType="picture"
  //             maxCount={1}
  //             onChange={ImageUploader}
  //           >
  //             <AntButton icon={<UploadOutlined />}>Upload (Max: 1)</AntButton>
  //           </Upload>
  //       </Space>
  //     </Col>

         

  //     {eventSubmitBtn &&
  //     <Button variant="primary" type="submit">
  //       Submit
  //     </Button>
  //     }
  //   </Form>

  //   </Row>

  //  </>
  // );
}

export default FormFun;
